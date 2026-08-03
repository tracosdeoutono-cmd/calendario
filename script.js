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
let showOccupancyStats = false; // Novo: estado para mostrar as estatísticas

// Função auxiliar para evitar que os "fetches" fiquem presos para sempre (Timeout de 10 segundos)
async function fetchWithTimeout(resource, options = {}, timeout = 10000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(resource, {
            ...options,
            signal: controller.signal  
        });
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        throw error; // Propaga o erro (timeout ou falha de rede)
    }
}

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

// Alternar Estatísticas no modo Disponibilidade
window.toggleOccupancyStats = function() {
    showOccupancyStats = !showOccupancyStats;
    showOccupancyPlan();
};

// Selecionar Casa no modo Disponibilidade
window.selectHouse = function(house) {
    selectedHouse = house;
    showOccupancyPlan();
};

async function fetchCloudHistory() {
    try {
        const res = await fetchWithTimeout(`${WORKER_BASE_URL}?action=getHistory`, {}, 8000);
        let data = await res.json();
        // Se por acaso a cloud retornar uma string encadeada, tenta convertê-la
        cloudHistory = typeof data === 'string' ? JSON.parse(data) : data;
        
        // Garante que é um objeto seguro
        if (typeof cloudHistory !== 'object' || cloudHistory === null || Array.isArray(cloudHistory)) {
            cloudHistory = {};
        }
    } catch (e) {
        console.warn("Aviso: Histórico da cloud não carregou a tempo ou falhou.", e);
        cloudHistory = {}; // Permite continuar sem travar
    }
}

async function saveToCloudHistory(newEntries) {
    try {
        await fetchWithTimeout(`${WORKER_BASE_URL}?action=saveHistory`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEntries)
        }, 8000);
    } catch (e) {
        console.error("Erro ao guardar histórico na cloud:", e);
    }
}

async function loadCalendars() {
    result.innerHTML = "<p style='font-size: 18px; font-weight: bold; color: #007bff;'>⏳ A ligar à Cloud e a carregar calendários (aguarda)...</p>";

    try {
        const historyPromise = fetchCloudHistory();
        
        const calendarPromises = calendars.map(async (calendar) => {
            try {
                const response = await fetchWithTimeout(calendar.url, {}, 12000);
                if (!response.ok) return [];
                const text = await response.text();
                return parseICS(text, calendar.name);
            } catch (e) {
                console.warn("Erro ou atraso extremo ao carregar " + calendar.name + ". A ignorar este calendário por agora.");
                return []; // Se um falhar, retorna vazio mas NÃO bloqueia a app
            }
        });

        const [_, results] = await Promise.all([historyPromise, Promise.all(calendarPromises)]);
        globalReservations = results.flat();

        updateCloudHistory();
        showCleaningPlan();

    } catch (err) {
        result.innerHTML = `<p style="color: red; font-weight: bold;">Erro geral ao carregar dados: ${err.message}</p>`;
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

// Versão completamente segura para não falhar nem causar loops
function updateCloudHistory() {
    try {
        let hasChanges = false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Clona de forma defensiva
        let mergedHistory = {};
        if (typeof cloudHistory === 'object' && cloudHistory !== null) {
            mergedHistory = JSON.parse(JSON.stringify(cloudHistory));
        }

        globalReservations.forEach(reservation => {
            const info = getCleaningInfo(reservation, globalReservations);
            
            if (info.date <= today) {
                const dateKey = info.date.getFullYear() + "-" +
                    (info.date.getMonth() + 1).toString().padStart(2, '0') + "-" +
                    info.date.getDate().toString().padStart(2, '0');

                // Inicializa a data em segurança se não existir
                if (!mergedHistory[dateKey] || typeof mergedHistory[dateKey] !== 'object') {
                    mergedHistory[dateKey] = { dateIso: info.date.toISOString(), rooms: [] };
                    hasChanges = true;
                }

                // Proteção contra lixo vindo da cloud antiga
                if (!Array.isArray(mergedHistory[dateKey].rooms)) {
                    mergedHistory[dateKey].rooms = [];
                }

                const exists = mergedHistory[dateKey].rooms.some(r => r.room === reservation.room);
                if (!exists) {
                    mergedHistory[dateKey].rooms.push({
                        room: reservation.room,
                        sunday: info.sunday,
                        urgent: info.urgent
                    });
                    hasChanges = true;
                }
            }
        });

        if (hasChanges) {
            saveToCloudHistory(mergedHistory);
            cloudHistory = mergedHistory; 
        }
    } catch (err) {
        console.error("Erro interno ao gerir histórico de limpezas:", err);
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
            if (cloudHistory[dateKey] && cloudHistory[dateKey].dateIso) {
                const itemDate = new Date(cloudHistory[dateKey].dateIso);
                if (itemDate < today) {
                    grouped[dateKey] = {
                        date: itemDate,
                        rooms: cloudHistory[dateKey].rooms || []
                    };
                }
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

                // Evitar duplicações visuais (caso hajam problemas no cálculo)
                const alreadyAdded = grouped[dateKey].rooms.some(r => r.room === reservation.room);
                if (!alreadyAdded) {
                    grouped[dateKey].rooms.push({
                        room: reservation.room,
                        sunday: info.sunday,
                        urgent: info.urgent
                    });
                }
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

        let dateForCopyPt = title.replace("🔴 ", "");
        dateForCopyPt = dateForCopyPt.charAt(0).toUpperCase() + dateForCopyPt.slice(1);
        let copyLinesPt = [`🧹 Limpezas - ${dateForCopyPt}:`];

        let dateForCopyEs = day.date.toLocaleDateString("es-ES", {
            weekday: "long", day: "numeric", month: "long", year: "numeric"
        });
        dateForCopyEs = dateForCopyEs.charAt(0).toUpperCase() + dateForCopyEs.slice(1);
        let copyLinesEs = [`🧹 Limpiezas - ${dateForCopyEs}:`];

        let roomsHtml = "";

        day.rooms.sort((a, b) => a.room.localeCompare(b.room)).forEach(clean => {
            const hasCheckout = globalReservations.some(r => r.room === clean.room && sameDay(r.checkOut, day.date));
            const hasCheckin = clean.urgent || globalReservations.some(r => r.room === clean.room && sameDay(r.checkIn, day.date));

            let tagTextPt = "";
            let tagTextEs = "";
            let tagHtml = "";

            if (hasCheckout && hasCheckin) {
                tagTextPt = " (sai e entra)";
                tagTextEs = " (sale y entra)";
                tagHtml = " <b>(sai e entra)</b>";
            } else if (hasCheckout) {
                tagTextPt = " (sai hoje)";
                tagTextEs = " (sale hoy)";
                tagHtml = " <b>(sai hoje)</b>";
            } else if (hasCheckin) {
                tagTextPt = " (entrada hoje)";
                tagTextEs = " (entrada hoy)";
                tagHtml = " <b>(entrada hoje)</b>";
            }

            const emoji = hasCheckin ? "⚠️" : "🧹";

            copyLinesPt.push(`${emoji} ${clean.room}${tagTextPt}`);
            copyLinesEs.push(`${emoji} ${clean.room}${tagTextEs}`);
            roomsHtml += `${emoji} ${clean.room}${tagHtml}<br>`;
        });

        const encodedCopyTextPt = encodeURIComponent(copyLinesPt.join("\n"));
        const encodedCopyTextEs = encodeURIComponent(copyLinesEs.join("\n"));

        html += `
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-top: 15px;">
                <h2 style="margin: 0;">${title}</h2>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <button onclick="window.copyFromData(this, '${encodedCopyTextPt}')" style="
                        padding: 6px 12px; font-size: 13px; cursor: pointer; border-radius: 6px;
                        border: 1px solid #28a745; background-color: #28a745; color: white; font-weight: bold;
                    ">
                        🇵🇹 Copiar PT
                    </button>
                    <button onclick="window.copyFromData(this, '${encodedCopyTextEs}')" style="
                        padding: 6px 12px; font-size: 13px; cursor: pointer; border-radius: 6px;
                        border: 1px solid #17a2b8; background-color: #17a2b8; color: white; font-weight: bold;
                    ">
                        🇪🇸 Copiar ES
                    </button>
                </div>
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
        return ["Impasse 2", "Impasse 3", "Impasse 4"];
    } else if (houseKey === "vizinho") {
        return ["Vizinho 1", "Vizinho 2", "Vizinho 3"];
    }
    return [];
}

// NOVO: Função para calcular estatísticas por mês
function calculateHouseStats(houseKey) {
    const rooms = getHouseRooms(houseKey);
    if (rooms.length === 0) return {};

    const houseReservations = globalReservations.filter(r => rooms.includes(r.room));
    if (houseReservations.length === 0) return {};

    let minDate = new Date();
    let maxDate = new Date();
    
    houseReservations.forEach(r => {
        if (r.checkIn < minDate) minDate = new Date(r.checkIn);
        if (r.checkOut > maxDate) maxDate = new Date(r.checkOut);
    });

    // Expandir para o início do mês mais antigo e fim do mês mais recente
    let current = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
    let end = new Date(maxDate.getFullYear(), maxDate.getMonth() + 1, 0);

    const stats = {};

    while (current <= end) {
        const monthKey = current.getFullYear() + "-" + String(current.getMonth() + 1).padStart(2, '0');
        const monthLabel = current.toLocaleDateString("pt-PT", { month: "long", year: "numeric" });

        if (!stats[monthKey]) {
            stats[monthKey] = {
                label: monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1),
                dormidas: 0,
                checkins: 0,
                checkouts: 0,
                diasEsgotados: 0,
                totalCapacity: rooms.length * new Date(current.getFullYear(), current.getMonth() + 1, 0).getDate()
            };
        }

        let occupiedRoomsToday = 0;

        rooms.forEach(room => {
            // Conta as dormidas (noite anterior ao checkout)
            const isOccupied = houseReservations.some(r => {
                if (r.room !== room) return false;
                const cIn = new Date(r.checkIn); cIn.setHours(0, 0, 0, 0);
                const cOut = new Date(r.checkOut); cOut.setHours(0, 0, 0, 0);
                return current >= cIn && current < cOut;
            });

            if (isOccupied) {
                stats[monthKey].dormidas++;
                occupiedRoomsToday++;
            }

            // Conta os check-ins
            const hasCheckin = houseReservations.some(r => r.room === room && sameDay(r.checkIn, current));
            if (hasCheckin) stats[monthKey].checkins++;
        });

        // Se todos os quartos estiveram ocupados neste dia, é um dia esgotado
        if (occupiedRoomsToday === rooms.length) {
            stats[monthKey].diasEsgotados++;
        }

        current = addDays(current, 1);
    }

    return stats;
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
        
        <div style="margin-bottom: 20px;">
            <button onclick="window.toggleOccupancyStats()" style="
                padding: 10px 16px; font-size: 14px; cursor: pointer; border-radius: 6px;
                border: 1px solid #ffc107; background-color: ${showOccupancyStats ? '#e0a800' : '#ffc107'}; color: #333; font-weight: bold;
            ">
                ${showOccupancyStats ? '🔙 Ocultar Estatísticas' : '📈 Ver Estatísticas Mensais'}
            </button>
        </div>
    `;

    // Renderiza as estatísticas se o modo estiver ativo
    if (showOccupancyStats) {
        const stats = calculateHouseStats(selectedHouse);
        const statKeys = Object.keys(stats).sort();

        if (statKeys.length === 0) {
            html += `<p>Sem dados suficientes para calcular estatísticas desta casa.</p><hr>`;
        } else {
            html += `<div style="display: flex; flex-wrap: wrap; gap: 15px; margin-bottom: 25px;">`;
            
            statKeys.forEach(key => {
                const s = stats[key];
                // Calcula a taxa de ocupação em %
                const taxa = s.totalCapacity > 0 ? Math.round((s.dormidas / s.totalCapacity) * 100) : 0;
                
                html += `
                    <div style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; flex: 1; min-width: 220px; background-color: #f8f9fa; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                        <h3 style="margin-top: 0; color: #007bff; text-transform: capitalize; border-bottom: 1px solid #ccc; padding-bottom: 8px;">${s.label}</h3>
                        <p style="margin: 8px 0; font-size: 15px;"><strong>🛏️ Ocupação:</strong> ${taxa}%</p>
                        <p style="margin: 8px 0; font-size: 15px;"><strong>🌙 Dormidas:</strong> ${s.dormidas} <span style="font-size: 12px; color: #666;">(de ${s.totalCapacity})</span></p>
                        <p style="margin: 8px 0; font-size: 15px;"><strong>🧳 Check-ins:</strong> ${s.checkins}</p>
                        <p style="margin: 8px 0; font-size: 15px;"><strong>🔥 Dias 100% cheios:</strong> ${s.diasEsgotados}</p>
                    </div>
                `;
            });
            
            html += `</div>`;
        }
    }

    html += `<hr>`;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let maxDate = addDays(today, 60); 
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
