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
let showHistoryMode = false;

// Função global para alternar entre Futuro e Histórico
window.toggleView = function() {
    showHistoryMode = !showHistoryMode;
    showCleaningPlan();
};

// Ler histórico guardado no Cloudflare KV
async function fetchCloudHistory() {
    try {
        const res = await fetch(`${WORKER_BASE_URL}?action=getHistory`);
        cloudHistory = await res.json();
    } catch (e) {
        console.error("Erro ao carregar histórico da cloud:", e);
    }
}

// Guardar novas limpezas passadas no Cloudflare KV
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
    result.innerHTML = "<p style='font-size: 18px; font-weight: bold;'>⏳ A carregar calendários e histórico...</p>";

    try {
        const historyPromise = fetchCloudHistory();
        
        const calendarPromises = calendars.map(async (calendar) => {
            try {
                const response = await fetch(calendar.url);
                const text = await response.text();
                return parseICS(text, calendar.name);
            } catch (e) {
                console.error("Erro ao carregar: " + calendar.name, e);
                return [];
            }
        });

        const [_, results] = await Promise.all([historyPromise, Promise.all(calendarPromises)]);
        globalReservations = results.flat();

        // Sincroniza limpezas passadas/de hoje na Cloudflare
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
    const events = text.split("BEGIN:VEVENT");

    for (const event of events) {
        const start = event.match(/DTSTART.*?:(\d{8})/);
        const end = event.match(/DTEND.*?:(\d{8})/);

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

// Guarda apenas limpezas que já ocorreram ou ocorrem hoje no histórico permanente
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

function showCleaningPlan() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let grouped = {};

    if (showHistoryMode) {
        // MODO HISTÓRICO: Mostra o que está guardado no Cloudflare KV
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
        // MODO PRÓXIMAS LIMPEZAS: Calcula em tempo real para hoje e futuro
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
    if (showHistoryMode) {
        sortedKeys.reverse(); // Do mais recente ao mais antigo no histórico
    }

    let buttonText = showHistoryMode ? "📅 Ver Próximas Limpezas" : "📜 Ver Dias Anteriores";
    let mainTitle = showHistoryMode ? "📜 Histórico de Limpezas (Cloud)" : "🧹 Plano de Limpezas";

    let html = `
        <div style="margin-bottom: 25px; margin-top: 10px;">
            <button onclick="window.toggleView()" style="
                padding: 12px 20px; 
                font-size: 16px; 
                cursor: pointer; 
                border-radius: 8px; 
                border: 2px solid #007bff; 
                background-color: #007bff; 
                color: white; 
                font-weight: bold;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
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
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });

        const isSundayDay = day.rooms.some(r => r.sunday);
        if (isSundayDay) {
            title = "🔴 " + title;
        }

        html += `<h2>${title}</h2>`;

        day.rooms.sort((a, b) => a.room.localeCompare(b.room)).forEach(clean => {
            let extra = clean.urgent ? " <b>(entrada hoje)</b>" : "";
            html += `🧹 ${clean.room}${extra}<br>`;
        });

        html += "<hr>";
    });

    result.innerHTML = html;
}

loadCalendars();
