const WORKER_BASE_URL = "https://al.tracosdeoutono.workers.dev";

const calendars = [
    { name: "Achada 1", url: `${WORKER_BASE_URL}?room=achada1` },
    { name: "Achada 2", url: `${WORKER_BASE_URL}?room=achada2` },
    { name: "Achada 3", url: `${WORKER_BASE_URL}?room=achada3` },
    { name: "Achada 4", url: `${WORKER_BASE_URL}?room=achada4` },
    { name: "Achada 5", url: `${WORKER_BASE_URL}?room=achada5` },
    { name: "Achada 6", url: `${WORKER_BASE_URL}?room=achada6` },
    { name: "Impasse 2", url: `${WORKER_BASE_URL}?room=impasse2` },
    { name: "Impasse 3", url: `${WORKER_BASE_URL}?room=impasse3` },
    { name: "Impasse 4", url: `${WORKER_BASE_URL}?room=impasse4` },
    { name: "Impasse Villa", url: `${WORKER_BASE_URL}?room=impassevilla` },
    { name: "Vizinho 1", url: `${WORKER_BASE_URL}?room=vizinho1` },
    { name: "Vizinho 2", url: `${WORKER_BASE_URL}?room=vizinho2` },
    { name: "Vizinho 3", url: `${WORKER_BASE_URL}?room=vizinho3` }
];

const result = document.getElementById("result");

let globalReservations = [];
let cloudHistory = {};

// Estados da Aplicação
let currentView = "cleaning"; // "cleaning" ou "occupancy"
let showHistoryMode = false;  // modo histórico das limpezas
let selectedHouse = "achada";  // "achada", "impasse", "vizinho"

// Função global para copiar texto para a área de transferência
window.copyFromData = function(btnElement, encodedText) {
    const text = decodeURIComponent(encodedText);
    navigator.clipboard.writeText(text).then(() => {
        const originalText = btnElement.innerText;
        btnElement.innerText = "Copiado! ✅";
        setTimeout(() => { btnElement.innerText = originalText; }, 1500);
    }).catch(err => {
        console.error("Erro ao copiar:", err);
    });
};

// Alternar entre Vistas Principais
window.switchMainView = function(view) {
    currentView = view;
    if (currentView === "cleaning") {
        showCleaningPlan();
    } else {
        showOccupancyPlan();
    }
};

// Alternar Histórico no modo Limpezas
window.toggleHistoryView = function() {
    showHistoryMode = !showHistoryMode;
    showCleaningPlan();
};

// Selecionar Casa no modo Disponibilidade
window.selectHouse = function(house) {
    selectedHouse = house;
    showOccupancyPlan();
};

async function fetchCloudHistory() {
    try {
        const res = await fetch(`${WORKER_BASE_URL}?action=getHistory`);
        cloudHistory = await res.json();
    } catch (e) {
        console.error("Erro ao carregar histórico da cloud:", e);
    }
}

async function saveToCloudHistory(newEntries) {
    try {
        await fetch(`${WORKER_BASE_URL}?action=saveHistory`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEntries)
        });
    } catch (e) {
        console.error("Erro ao guardar histórico na cloud:", e);
    }
}

async function loadCalendars() {
    result.innerHTML = "<p style='font-size: 18px; font-weight: bold;'>⏳ Está quase...</p>";

    try {
        const historyPromise = fetchCloudHistory();
        
        const calendarPromises = calendars.map(async (calendar) => {
            try {
                const response = await fetch(calendar.url);
                if (!response.ok) return [];
                const text = await response.text();
                return parseICS(text, calendar.name);
            } catch (e) {
                console.error("Erro ao carregar " + calendar.name, e);
                return [];
            }
        });

        const [_, results] = await Promise.all([historyPromise, Promise.all(calendarPromises)]);
        globalReservations = results.flat();

        updateCloudHistory();
        showCleaningPlan();

    } catch (err) {
        result.innerHTML = "Erro ao carregar dados: " + err.message;
    }
}

function parseDate(icsDate) {
    const year = Number(icsDate.substring(0, 4));
    const month = Number(icsDate.substring(4, 6)) - 1;
    const day = Number(icsDate.substring(6, 8));

    return new Date(year, month, day);
}

function parseICS(text, roomName) {
    const reservations = [];
    if (!text || !text.includes("BEGIN:VEVENT")) return reservations;

    const events = text.split("BEGIN:VEVENT");

    for (const event of events) {
        const start = event.match(/DTSTART(?:;[^:]*)?:(\d{8})/);
        const end = event.match(/DTEND(?:;[^:]*)?:(\d{8})/);

        if (!start || !end) continue;

        reservations.push({
            room: roomName,
            checkIn: parseDate(start[1]),
            checkOut: parseDate(end[1])
        });
    }

    return reservations;
}

function sameDay(a, b) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

function addDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
}

function isSunday(date) {
    return date.getDay() === 0;
}

function getDaysBetween(dateA, dateB) {
    const diffTime = dateB.getTime() - dateA.getTime();
    return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

function getCleaningInfo(reservation, allReservations) {
    const checkout = reservation.checkOut;

    const nextReservation = allReservations
        .filter(r => r.room === reservation.room && r.checkIn >= checkout)
        .sort((a, b) => a.checkIn - b.checkIn)[0];

    const sameDayArrival = nextReservation && sameDay(checkout, nextReservation.checkIn);

    let bestDay = checkout;
    let isForcedSunday = false;

    if (isSunday(checkout) && sameDayArrival) {
        bestDay = checkout;
        isForcedSunday = true;
    } else {
        let startDay = isSunday(checkout) ? addDays(checkout, 1) : checkout;
        let endDay = startDay;

        if (nextReservation) {
            const gap = getDaysBetween(checkout, nextReservation.checkIn);
            if (gap <= 2) endDay = nextReservation.checkIn;
        }

        let bestScore = -1;

        for (let d = new Date(startDay); d <= endDay; d = addDays(d, 1)) {
            if (isSunday(d)) continue;

            let score = 0;

            allReservations.forEach(r => {
                if (sameDay(r.checkOut, d)) {
                    score += 1;
                    const currentIsAchada = reservation.room.toLowerCase().includes("achada");
                    const otherIsAchada = r.room.toLowerCase().includes("achada");
                    if (currentIsAchada && otherIsAchada) score += 10;
                }
            });

            if (score >= bestScore) {
                bestScore = score;
                bestDay = new Date(d);
            }
        }
    }

    const urgent = nextReservation ? sameDay(bestDay, nextReservation.checkIn) : false;

    return {
        date: bestDay,
        sunday: isForcedSunday,
        urgent: urgent
    };
}

function updateCloudHistory() {
    const newHistoryEntries = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    globalReservations.forEach(reservation => {
        const info = getCleaningInfo(reservation, globalReservations);
        
        if (info.date <= today) {
            const dateKey = info.date.getFullYear() + "-" +
                (info.date.getMonth() + 1).toString().padStart(2, '0') + "-" +
                info.date.getDate().toString().padStart(2, '0');

            if (!newHistoryEntries[dateKey]) {
                newHistoryEntries[dateKey] = { dateIso: info.date.toISOString(), rooms: [] };
            }

            const exists = newHistoryEntries[dateKey].rooms.some(r => r.room === reservation.room);
            if (!exists) {
                newHistoryEntries[dateKey].rooms.push({
                    room: reservation.room,
                    sunday: info.sunday,
                    urgent: info.urgent
                });
            }
        }
    });

    if (Object.keys(newHistoryEntries).length > 0) {
        saveToCloudHistory(newHistoryEntries);
    }
}

// Cabeçalho de Navegação Principal
function renderNavigation() {
    const isCleaning = currentView === "cleaning";
    const isOccupancy = currentView === "occupancy";

    return `
        <div style="margin-bottom: 20px; display: flex; gap: 10px; flex-wrap: wrap;">
            <button onclick="window.switchMainView('cleaning')" style="
                padding: 12px 18px; font-size: 15px; cursor: pointer; border-radius: 8px;
                border: 2px solid #007bff; background-color: ${isCleaning ? '#007bff' : '#ffffff'};
                color: ${isCleaning ? '#ffffff' : '#007bff'}; font-weight: bold;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            ">
                🧹 Plano de Limpezas
            </button>
            <button onclick="window.switchMainView('occupancy')" style="
                padding: 12px 18px; font-size: 15px; cursor: pointer; border-radius: 8px;
                border: 2px solid #28a745; background-color: ${isOccupancy ? '#28a745' : '#ffffff'};
                color: ${isOccupancy ? '#ffffff' : '#28a745'}; font-weight: bold;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            ">
                📊 Disponibilidade da Casa
            </button>
        </div>
    `;
}

// VISTA 1: PLANO DE LIMPEZAS & HISTÓRICO
function showCleaningPlan() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let grouped = {};

    if (showHistoryMode) {
        Object.keys(cloudHistory).forEach(dateKey => {
            const itemDate = new Date(cloudHistory[dateKey].dateIso);
            if (itemDate < today) {
                grouped[dateKey] = {
                    date: itemDate,
                    rooms: cloudHistory[dateKey].rooms
                };
            }
        });
    } else {
        globalReservations.forEach(reservation => {
            const info = getCleaningInfo(reservation, globalReservations);
            
            if (info.date >= today) {
                const dateKey = info.date.getFullYear() + "-" +
                    (info.date.getMonth() + 1).toString().padStart(2, '0') + "-" +
                    info.date.getDate().toString().padStart(2, '0');

                if (!grouped[dateKey]) {
                    grouped[dateKey] = { date: info.date, rooms: [] };
                }

                grouped[dateKey].rooms.push({
                    room: reservation.room,
                    sunday: info.sunday,
                    urgent: info.urgent
                });
            }
        });
    }

    let sortedKeys = Object.keys(grouped).sort();
    if (showHistoryMode) sortedKeys.reverse();

    let buttonText = showHistoryMode ? "📅 Ver Próximas Limpezas" : "📜 Ver Dias Anteriores";
    let mainTitle = showHistoryMode ? "📜 Histórico de Limpezas (Cloud)" : "🧹 Plano de Limpezas";

    let html = renderNavigation();
    html += `
        <div style="margin-bottom: 25px;">
            <button onclick="window.toggleHistoryView()" style="
                padding: 10px 16px; font-size: 14px; cursor: pointer; border-radius: 6px;
                border: 1px solid #6c757d; background-color: #6c757d; color: white; font-weight: bold;
            ">
                ${buttonText}
            </button>
        </div>
        <h1>${mainTitle}</h1>
    `;

    if (sortedKeys.length === 0) {
        html += `<p>Não há limpezas registadas ${showHistoryMode ? 'anteriores a hoje no histórico' : 'agendadas'}.</p>`;
    }

    sortedKeys.forEach(key => {
        const day = grouped[key];
        
        let title = day.date.toLocaleDateString("pt-PT", {
            weekday: "long", day: "numeric", month: "long", year: "numeric"
        });

        if (day.rooms.some(r => r.sunday)) title = "🔴 " + title;

        // Construção do texto legível para copiar
        let dateForCopy = title.replace("🔴 ", "");
        dateForCopy = dateForCopy.charAt(0).toUpperCase() + dateForCopy.slice(1);
        let copyLines = [`🧹 Limpezas - ${dateForCopy}:`];

        let roomsHtml = "";

        day.rooms.sort((a, b) => a.room.localeCompare(b.room)).forEach(clean => {
            const hasCheckout = globalReservations.some(r => r.room === clean.room && sameDay(r.checkOut, day.date));
            const hasCheckin = clean.urgent || globalReservations.some(r => r.room === clean.room && sameDay(r.checkIn, day.date));

            let tagText = "";
            let tagHtml = "";

            if (hasCheckout && hasCheckin) {
                tagText = " (sai e entra)";
                tagHtml = " <b>(sai e entra)</b>";
            } else if (hasCheckout) {
                tagText = " (sai hoje)";
                tagHtml = " <b>(sai hoje)</b>";
            } else if (hasCheckin) {
                tagText = " (entrada hoje)";
                tagHtml = " <b>(entrada hoje)</b>";
            }

            copyLines.push(`• ${clean.room}${tagText}`);
            roomsHtml += `🧹 ${clean.room}${tagHtml}<br>`;
        });

        const encodedCopyText = encodeURIComponent(copyLines.join("\n"));

        html += `
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-top: 15px;">
                <h2 style="margin: 0;">${title}</h2>
                <button onclick="window.copyFromData(this, '${encodedCopyText}')" style="
                    padding: 6px 12px; font-size: 13px; cursor: pointer; border-radius: 6px;
                    border: 1px solid #28a745; background-color: #28a745; color: white; font-weight: bold;
                ">
                    📋 Copiar
                </button>
            </div>
            <div style="margin-top: 8px;">${roomsHtml}</div>
            <hr>
        `;
    });

    result.innerHTML = html;
}

// Retorna os quartos de cada casa
function getHouseRooms(houseKey) {
    if (houseKey === "achada") {
        return ["Achada 1", "Achada 2", "Achada 3", "Achada 4", "Achada 5", "Achada 6"];
    } else if (houseKey === "impasse") {
        // Apenas Impasse 2, 3 e 4 (exclui Impasse Villa)
        return ["Impasse 2", "Impasse 3", "Impasse 4"];
    } else if (houseKey === "vizinho") {
        return ["Vizinho 1", "Vizinho 2", "Vizinho 3"];
    }
    return [];
}

// VISTA 2: DISPONIBILIDADE DA CASA
function showOccupancyPlan() {
    const houseRooms = getHouseRooms(selectedHouse);
    const totalRooms = houseRooms.length;

    const houseLabels = {
        achada: "Achada (6 Quartos)",
        impasse: "Impasse (3 Quartos)",
        vizinho: "Vizinho (3 Quartos)"
    };

    let html = renderNavigation();

    // Botões para escolher a Casa
    html += `
        <div style="margin-bottom: 25px; display: flex; gap: 8px; flex-wrap: wrap;">
            <button onclick="window.selectHouse('achada')" style="
                padding: 10px 16px; font-size: 14px; cursor: pointer; border-radius: 6px;
                border: 2px solid #17a2b8; background-color: ${selectedHouse === 'achada' ? '#17a2b8' : '#ffffff'};
                color: ${selectedHouse === 'achada' ? '#ffffff' : '#17a2b8'}; font-weight: bold;
            ">
                🏡 Achada
            </button>
            <button onclick="window.selectHouse('impasse')" style="
                padding: 10px 16px; font-size: 14px; cursor: pointer; border-radius: 6px;
                border: 2px solid #17a2b8; background-color: ${selectedHouse === 'impasse' ? '#17a2b8' : '#ffffff'};
                color: ${selectedHouse === 'impasse' ? '#ffffff' : '#17a2b8'}; font-weight: bold;
            ">
                🏡 Impasse
            </button>
            <button onclick="window.selectHouse('vizinho')" style="
                padding: 10px 16px; font-size: 14px; cursor: pointer; border-radius: 6px;
                border: 2px solid #17a2b8; background-color: ${selectedHouse === 'vizinho' ? '#17a2b8' : '#ffffff'};
                color: ${selectedHouse === 'vizinho' ? '#ffffff' : '#17a2b8'}; font-weight: bold;
            ">
                🏡 Vizinho
            </button>
        </div>
        <h1>📊 Ocupação - ${houseLabels[selectedHouse]}</h1>
        <hr>
    `;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calcula a data máxima com base nas reservas existentes para ser "infinito"
    let maxDate = addDays(today, 60); // Mínimo de 60 dias garantidos
    globalReservations.forEach(r => {
        if (houseRooms.includes(r.room)) {
            const outDate = new Date(r.checkOut);
            outDate.setHours(0, 0, 0, 0);
            if (outDate > maxDate) {
                maxDate = outDate;
            }
        }
    });

    const totalDays = getDaysBetween(today, maxDate) + 1;

    for (let i = 0; i < totalDays; i++) {
        const currentDate = addDays(today, i);

        let roomDetails = [];

        houseRooms.forEach(roomName => {
            const hasCheckout = globalReservations.some(r => r.room === roomName && sameDay(r.checkOut, currentDate));
            const hasCheckin = globalReservations.some(r => r.room === roomName && sameDay(r.checkIn, currentDate));
            
            const isOccupiedOvernight = globalReservations.some(r => {
                if (r.room !== roomName) return false;
                const checkIn = new Date(r.checkIn); checkIn.setHours(0, 0, 0, 0);
                const checkOut = new Date(r.checkOut); checkOut.setHours(0, 0, 0, 0);
                return currentDate >= checkIn && currentDate < checkOut;
            });

            // Se o quarto tem qualquer movimento ou ocupação no dia
            if (isOccupiedOvernight || hasCheckout || hasCheckin) {
                let tag = "";
                if (hasCheckout && hasCheckin) {
                    tag = " <b>(sai e entra)</b>";
                } else if (hasCheckout) {
                    tag = " <b>(sai)</b>";
                } else if (hasCheckin) {
                    tag = " <b>(entra)</b>";
                }

                roomDetails.push(`${roomName}${tag}`);
            }
        });

        const count = roomDetails.length;
        const dateFormatted = currentDate.toLocaleDateString("pt-PT", {
            weekday: "long", day: "numeric", month: "long", year: "numeric"
        });

        html += `<h2>${dateFormatted}</h2>`;

        if (count === 0) {
            html += `<div style="font-size: 18px; font-weight: bold; color: #28a745; margin-bottom: 5px;">0 🟢</div>`;
        } else {
            html += `<div style="font-size: 18px; font-weight: bold; color: #dc3545; margin-bottom: 5px;">
                ${count} / ${totalRooms} 🔴
            </div>`;
            html += `<div style="font-size: 14px; color: #333;">Ocupados: ${roomDetails.join(", ")}</div>`;
        }

        html += "<hr>";
    }

    result.innerHTML = html;
}

loadCalendars();
