// Injeta automaticamente os novos estilos CSS modernos no cabeçalho da página
(function injectModernStyles() {
    if (document.getElementById("al-app-styles")) return;
    const style = document.createElement("style");
    style.id = "al-app-styles";
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        :root {
            --bg-main: #0f172a;
            --card-bg: rgba(30, 41, 59, 0.75);
            --card-border: rgba(255, 255, 255, 0.08);
            --accent-blue: #3b82f6;
            --accent-purple: #8b5cf6;
            --accent-green: #10b981;
            --accent-amber: #f59e0b;
            --accent-rose: #f43f5e;
            --accent-cyan: #06b6d4;
            --text-main: #f8fafc;
            --text-muted: #94a3b8;
        }

        body {
            font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
            background-color: var(--bg-main);
            color: var(--text-main);
            margin: 0;
            padding: 24px 16px;
            min-height: 100vh;
            background-image: 
                radial-gradient(at 0% 0%, rgba(59, 130, 246, 0.15) 0px, transparent 50%),
                radial-gradient(at 100% 100%, rgba(139, 92, 246, 0.15) 0px, transparent 50%);
            background-attachment: fixed;
        }

        #result {
            max-width: 900px;
            margin: 0 auto;
        }

        /* Cartões com efeito Glassmorphism */
        .glass-card {
            background: var(--card-bg);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid var(--card-border);
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 18px;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
            transition: all 0.2s ease;
        }

        .glass-card:hover {
            border-color: rgba(255, 255, 255, 0.15);
        }

        /* Botões Modernos */
        .btn-modern {
            font-family: inherit;
            padding: 10px 18px;
            font-size: 14px;
            font-weight: 600;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid transparent;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        .btn-modern:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
        }

        .btn-modern:active {
            transform: translateY(0);
        }

        .btn-secondary {
            background: rgba(255, 255, 255, 0.05);
            color: var(--text-main);
            border-color: rgba(255, 255, 255, 0.1);
        }

        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.12);
        }

        .btn-active-blue {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: #fff;
            box-shadow: 0 4px 14px rgba(59, 130, 246, 0.4);
        }

        .btn-active-green {
            background: linear-gradient(135deg, #10b981, #047857);
            color: #fff;
            box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);
        }

        .btn-active-purple {
            background: linear-gradient(135deg, #8b5cf6, #6d28d9);
            color: #fff;
            box-shadow: 0 4px 14px rgba(139, 92, 246, 0.4);
        }

        .btn-active-cyan {
            background: linear-gradient(135deg, #06b6d4, #0e7490);
            color: #fff;
            box-shadow: 0 4px 14px rgba(6, 182, 212, 0.4);
        }

        .btn-copy-pt {
            background: rgba(16, 185, 129, 0.15);
            color: #34d399;
            border: 1px solid rgba(16, 185, 129, 0.3);
            font-size: 13px;
            padding: 6px 14px;
        }

        .btn-copy-es {
            background: rgba(6, 182, 212, 0.15);
            color: #38bdf8;
            border: 1px solid rgba(6, 182, 212, 0.3);
            font-size: 13px;
            padding: 6px 14px;
        }

        /* Botão do Relógio no Canto Superior Direito */
        .btn-clock {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.15);
            color: var(--text-main);
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .btn-clock:hover {
            transform: rotate(15deg) scale(1.08);
            background: rgba(139, 92, 246, 0.25);
            border-color: #8b5cf6;
            box-shadow: 0 0 15px rgba(139, 92, 246, 0.4);
        }

        .btn-clock.active {
            background: linear-gradient(135deg, #8b5cf6, #6d28d9);
            border-color: #a78bfa;
            box-shadow: 0 0 15px rgba(139, 92, 246, 0.5);
        }

        /* Chips / Badges */
        .chip {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 600;
            margin: 4px 6px 4px 0;
        }

        .chip-urgent {
            background: rgba(244, 63, 94, 0.15);
            color: #fb7185;
            border: 1px solid rgba(244, 63, 94, 0.3);
        }

        .chip-normal {
            background: rgba(59, 130, 246, 0.15);
            color: #60a5fa;
            border: 1px solid rgba(59, 130, 246, 0.3);
        }

        .chip-free {
            background: rgba(16, 185, 129, 0.15);
            color: #34d399;
            border: 1px solid rgba(16, 185, 129, 0.3);
        }

        /* Títulos */
        h1 {
            font-size: 24px;
            font-weight: 800;
            letter-spacing: -0.02em;
            margin: 0 0 20px 0;
            background: linear-gradient(135deg, #ffffff, #cbd5e1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        h2 {
            font-size: 17px;
            font-weight: 700;
            color: #f1f5f9;
            margin: 0;
        }

        /* Spinner de Carregamento */
        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        .spinner {
            width: 22px;
            height: 22px;
            border: 3px solid rgba(255, 255, 255, 0.1);
            border-top-color: #3b82f6;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            display: inline-block;
            vertical-align: middle;
            margin-right: 10px;
        }

        /* Grelha de Estatísticas Mensais */
        .stat-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 14px;
            margin-bottom: 25px;
        }

        .stat-card {
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 14px;
            padding: 16px;
        }

        .stat-value {
            font-size: 22px;
            font-weight: 800;
            color: #ffffff;
            margin-top: 4px;
        }

        .progress-bar-bg {
            height: 6px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 3px;
            overflow: hidden;
            margin-top: 10px;
        }

        .progress-bar-fill {
            height: 100%;
            background: linear-gradient(90deg, #3b82f6, #10b981);
            border-radius: 3px;
        }
    `;
    document.head.appendChild(style);
})();

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
let currentView = "cleaning";
let showHistoryMode = false;
let selectedHouse = "achada";
let showOccupancyStats = false;
let showPastStatsMode = false;
let selectedSnapshotDate = null;

// Função auxiliar com Timeout + Anti-Cache Seguro
async function fetchWithTimeout(resource, options = {}, timeout = 10000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const separator = resource.includes("?") ? "&" : "?";
    const noCacheUrl = `${resource}${separator}_t=${Date.now()}`;

    try {
        const response = await fetch(noCacheUrl, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        throw error;
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
    } else if (currentView === "occupancy") {
        showOccupancyPlan();
    } else if (currentView === "snapshots") {
        selectedSnapshotDate = null;
        showSnapshotsPlan();
    }
};

window.toggleHistoryView = function() {
    showHistoryMode = !showHistoryMode;
    showCleaningPlan();
};

window.toggleOccupancyStats = function() {
    showOccupancyStats = !showOccupancyStats;
    if (!showOccupancyStats) showPastStatsMode = false;
    showOccupancyPlan();
};

window.togglePastStats = function() {
    showPastStatsMode = !showPastStatsMode;
    showOccupancyPlan();
};

window.selectHouse = function(house) {
    selectedHouse = house;
    showOccupancyPlan();
};

window.selectSnapshot = function(dateKey) {
    selectedSnapshotDate = dateKey;
    showSnapshotsPlan();
};

async function fetchCloudHistory() {
    try {
        const res = await fetchWithTimeout(`${WORKER_BASE_URL}?action=getHistory`, {}, 8000);
        let data = await res.json();
        cloudHistory = typeof data === 'string' ? JSON.parse(data) : data;
        
        if (typeof cloudHistory !== 'object' || cloudHistory === null || Array.isArray(cloudHistory)) {
            cloudHistory = {};
        }
    } catch (e) {
        console.warn("Aviso: Histórico da cloud não carregou a tempo ou falhou.", e);
        cloudHistory = {};
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
    result.innerHTML = `
        <div class="glass-card" style="text-align: center; padding: 40px 20px;">
            <div class="spinner"></div>
            <span style="font-size: 16px; font-weight: 600; color: #60a5fa;">
                A ligar à Cloud e a sincronizar calendários...
            </span>
        </div>
    `;

    try {
        const historyPromise = fetchCloudHistory();
        
        const calendarPromises = calendars.map(async (calendar) => {
            try {
                const response = await fetchWithTimeout(calendar.url, {}, 12000);
                if (!response.ok) return [];
                const text = await response.text();
                return parseICS(text, calendar.name);
            } catch (e) {
                console.warn("Erro ou atraso extremo ao carregar " + calendar.name + ". A ignorar por agora.");
                return [];
            }
        });

        const [_, results] = await Promise.all([historyPromise, Promise.all(calendarPromises)]);
        globalReservations = results.flat();

        updateCloudHistory();
        
        if (currentView === "cleaning") showCleaningPlan();
        else if (currentView === "occupancy") showOccupancyPlan();
        else if (currentView === "snapshots") showSnapshotsPlan();

    } catch (err) {
        result.innerHTML = `
            <div class="glass-card" style="border-color: rgba(244, 63, 94, 0.4); text-align: center;">
                <p style="color: #fb7185; font-weight: 700; margin: 0;">❌ Erro ao carregar dados: ${err.message}</p>
            </div>
        `;
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
    try {
        let hasChanges = false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

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

                if (!mergedHistory[dateKey] || typeof mergedHistory[dateKey] !== 'object') {
                    mergedHistory[dateKey] = { dateIso: info.date.toISOString(), rooms: [] };
                    hasChanges = true;
                }

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

        if (!mergedHistory["_snapshots"] || typeof mergedHistory["_snapshots"] !== 'object') {
            mergedHistory["_snapshots"] = {};
        }

        const todayKey = today.getFullYear() + "-" + 
                         (today.getMonth() + 1).toString().padStart(2, '0') + "-" + 
                         today.getDate().toString().padStart(2, '0');

        if (!mergedHistory["_snapshots"][todayKey]) {
            let snapshotPlan = {};
            let limitDate = addDays(today, 6);

            globalReservations.forEach(reservation => {
                const info = getCleaningInfo(reservation, globalReservations);
                
                if (info.date >= today && info.date <= limitDate) {
                    const snapDateKey = info.date.getFullYear() + "-" +
                        (info.date.getMonth() + 1).toString().padStart(2, '0') + "-" +
                        info.date.getDate().toString().padStart(2, '0');

                    if (!snapshotPlan[snapDateKey]) {
                        snapshotPlan[snapDateKey] = { dateIso: info.date.toISOString(), rooms: [] };
                    }

                    const exists = snapshotPlan[snapDateKey].rooms.some(r => r.room === reservation.room);
                    if (!exists) {
                        snapshotPlan[snapDateKey].rooms.push({
                            room: reservation.room,
                            sunday: info.sunday,
                            urgent: info.urgent
                        });
                    }
                }
            });

            mergedHistory["_snapshots"][todayKey] = snapshotPlan;
            hasChanges = true;
        }

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
    const isSnapshots = currentView === "snapshots";

    return `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; gap: 12px; flex-wrap: wrap;">
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <button onclick="window.switchMainView('cleaning')" class="btn-modern ${isCleaning ? 'btn-active-blue' : 'btn-secondary'}">
                    🧹 Plano de Limpezas
                </button>
                <button onclick="window.switchMainView('occupancy')" class="btn-modern ${isOccupancy ? 'btn-active-green' : 'btn-secondary'}">
                    📊 Disponibilidade
                </button>
            </div>
            
            <button onclick="window.switchMainView('snapshots')" class="btn-clock ${isSnapshots ? 'active' : ''}" title="Ver Previsões Guardadas (Snapshots)">
                🕒
            </button>
        </div>
    `;
}

// VISTA 3: PREVISÕES GUARDADAS (SNAPSHOTS)
function showSnapshotsPlan() {
    let html = renderNavigation();
    html += `<h1>🕒 Previsões Passadas</h1>`;

    const snapshots = cloudHistory["_snapshots"] || {};
    const snapshotKeys = Object.keys(snapshots).sort().reverse();

    if (snapshotKeys.length === 0) {
        html += `
            <div class="glass-card">
                <p style="color: var(--text-muted); margin: 0;">Ainda não há previsões guardadas de dias anteriores. A primeira foi gerada agora mesmo!</p>
            </div>
        `;
        result.innerHTML = html;
        return;
    }

    if (!selectedSnapshotDate) {
        html += `<p style="color: var(--text-muted); margin-bottom: 16px;">Escolhe um dia para ver o plano de limpezas (dos 7 dias seguintes) que estava previsto nesse exato momento:</p>`;
        html += `<div style="display: flex; gap: 10px; flex-wrap: wrap;">`;
        
        snapshotKeys.forEach(key => {
            const dateObj = new Date(key);
            const label = dateObj.toLocaleDateString("pt-PT", { day: "numeric", month: "long", year: "numeric" });
            html += `
                <button onclick="window.selectSnapshot('${key}')" class="btn-modern btn-secondary">
                    📅 ${label}
                </button>
            `;
        });
        html += `</div>`;
    } else {
        const dateObj = new Date(selectedSnapshotDate);
        const label = dateObj.toLocaleDateString("pt-PT", { day: "numeric", month: "long", year: "numeric" });
        
        html += `
            <div style="margin-bottom: 20px;">
                <button onclick="window.selectSnapshot(null)" class="btn-modern btn-secondary">
                    🔙 Voltar à Lista
                </button>
            </div>
            <div class="glass-card">
                <h2 style="color: #60a5fa; margin-bottom: 16px;">Plano visualizado no dia: <span style="color: #fff;">${label}</span></h2>
        `;

        const plan = snapshots[selectedSnapshotDate];
        const planKeys = Object.keys(plan).sort();

        if (planKeys.length === 0) {
            html += `<p style="color: var(--text-muted);">Não havia nenhuma limpeza planeada para os 7 dias seguintes a esta data.</p>`;
        }

        planKeys.forEach(key => {
            const day = plan[key];
            const d = new Date(day.dateIso);
            let title = d.toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
            
            if (day.rooms.some(r => r.sunday)) title = "🔴 " + title;

            let roomsChips = "";
            day.rooms.sort((a, b) => a.room.localeCompare(b.room)).forEach(clean => {
                const badgeClass = clean.urgent ? "chip-urgent" : "chip-normal";
                const emoji = clean.urgent ? "⚠️" : "🧹";
                let tag = clean.urgent ? " (entrada no mesmo dia)" : ""; 
                
                roomsChips += `<span class="chip ${badgeClass}">${emoji} ${clean.room}${tag}</span>`;
            });

            html += `
                <div style="margin-top: 16px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.06);">
                    <h3 style="color: #f1f5f9; font-size: 16px; margin-bottom: 8px;">${title}</h3>
                    <div>${roomsChips}</div>
                </div>
            `;
        });
        html += `</div>`;
    }

    result.innerHTML = html;
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
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
            <h1>${mainTitle}</h1>
            <button onclick="window.toggleHistoryView()" class="btn-modern btn-secondary">
                ${buttonText}
            </button>
        </div>
    `;

    if (sortedKeys.length === 0) {
        html += `
            <div class="glass-card">
                <p style="color: var(--text-muted); margin: 0;">Não há limpezas registadas ${showHistoryMode ? 'anteriores a hoje no histórico' : 'agendadas'}.</p>
            </div>
        `;
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

        let roomsChips = "";

        day.rooms.sort((a, b) => a.room.localeCompare(b.room)).forEach(clean => {
            const hasCheckout = globalReservations.some(r => r.room === clean.room && sameDay(r.checkOut, day.date));
            const hasCheckin = clean.urgent || globalReservations.some(r => r.room === clean.room && sameDay(r.checkIn, day.date));

            let tagTextPt = "";
            let tagTextEs = "";

            if (hasCheckout && hasCheckin) {
                tagTextPt = " (sai e entra)";
                tagTextEs = " (sale y entra)";
            } else if (hasCheckout) {
                tagTextPt = " (sai hoje)";
                tagTextEs = " (sale hoy)";
            } else if (hasCheckin) {
                tagTextPt = " (entrada hoje)";
                tagTextEs = " (entrada hoy)";
            }

            const emoji = hasCheckin ? "⚠️" : "🧹";
            const badgeClass = hasCheckin ? "chip-urgent" : "chip-normal";

            copyLinesPt.push(`${emoji} ${clean.room}${tagTextPt}`);
            copyLinesEs.push(`${emoji} ${clean.room}${tagTextEs}`);
            roomsChips += `<span class="chip ${badgeClass}">${emoji} ${clean.room}<b>${tagTextPt}</b></span>`;
        });

        const encodedCopyTextPt = encodeURIComponent(copyLinesPt.join("\n"));
        const encodedCopyTextEs = encodeURIComponent(copyLinesEs.join("\n"));

        html += `
            <div class="glass-card">
                <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-bottom: 12px;">
                    <h2>${title}</h2>
                    <div style="display: flex; gap: 8px;">
                        <button onclick="window.copyFromData(this, '${encodedCopyTextPt}')" class="btn-modern btn-copy-pt">
                            🇵🇹 Copiar PT
                        </button>
                        <button onclick="window.copyFromData(this, '${encodedCopyTextEs}')" class="btn-modern btn-copy-es">
                            🇪🇸 Copiar ES
                        </button>
                    </div>
                </div>
                <div>${roomsChips}</div>
            </div>
        `;
    });

    result.innerHTML = html;
}

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

            const hasCheckin = houseReservations.some(r => r.room === room && sameDay(r.checkIn, current));
            if (hasCheckin) stats[monthKey].checkins++;
        });

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
        <div style="display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap;">
            <button onclick="window.selectHouse('achada')" class="btn-modern ${selectedHouse === 'achada' ? 'btn-active-cyan' : 'btn-secondary'}">
                🏡 Achada
            </button>
            <button onclick="window.selectHouse('impasse')" class="btn-modern ${selectedHouse === 'impasse' ? 'btn-active-cyan' : 'btn-secondary'}">
                🏡 Impasse
            </button>
            <button onclick="window.selectHouse('vizinho')" class="btn-modern ${selectedHouse === 'vizinho' ? 'btn-active-cyan' : 'btn-secondary'}">
                🏡 Vizinho
            </button>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
            <h1>📊 Ocupação - ${houseLabels[selectedHouse]}</h1>
            <div style="display: flex; gap: 8px;">
                <button onclick="window.toggleOccupancyStats()" class="btn-modern ${showOccupancyStats ? 'btn-active-purple' : 'btn-secondary'}">
                    ${showOccupancyStats ? '🔙 Ocultar Estatísticas' : '📈 Estatísticas Mensais'}
                </button>
                ${showOccupancyStats ? `
                <button onclick="window.togglePastStats()" class="btn-modern btn-secondary">
                    ${showPastStatsMode ? '📅 Meses Atuais e Futuros' : '📜 Meses Passados'}
                </button>
                ` : ''}
            </div>
        </div>
    `;

    if (showOccupancyStats) {
        const stats = calculateHouseStats(selectedHouse);
        let statKeys = Object.keys(stats);

        const todayDate = new Date();
        const currentMonthKey = todayDate.getFullYear() + "-" + String(todayDate.getMonth() + 1).padStart(2, '0');

        if (showPastStatsMode) {
            statKeys = statKeys.filter(key => key < currentMonthKey).sort().reverse();
        } else {
            statKeys = statKeys.filter(key => key >= currentMonthKey).sort();
        }

        if (statKeys.length === 0) {
            html += `<div class="glass-card"><p style="color: var(--text-muted); margin:0;">Sem estatísticas registradas para esta seleção.</p></div>`;
        } else {
            html += `<div class="stat-grid">`;
            
            statKeys.forEach(key => {
                const s = stats[key];
                const taxa = s.totalCapacity > 0 ? Math.round((s.dormidas / s.totalCapacity) * 100) : 0;
                
                html += `
                    <div class="stat-card">
                        <div style="color: #60a5fa; font-weight: 700; font-size: 15px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 6px;">${s.label}</div>
                        <div class="stat-value">${taxa}% <span style="font-size: 13px; font-weight: 500; color: var(--text-muted);">ocupação</span></div>
                        <div class="progress-bar-bg">
                            <div class="progress-bar-fill" style="width: ${taxa}%;"></div>
                        </div>
                        <div style="margin-top: 12px; font-size: 13px; color: var(--text-muted); display: flex; flex-direction: column; gap: 4px;">
                            <span>🌙 Dormidas: <strong style="color: #fff;">${s.dormidas}</strong> / ${s.totalCapacity}</span>
                            <span>🧳 Check-ins: <strong style="color: #fff;">${s.checkins}</strong></span>
                            <span>🔥 Dias 100% cheios: <strong style="color: #34d399;">${s.diasEsgotados}</strong></span>
                        </div>
                    </div>
                `;
            });
            
            html += `</div>`;
        }
    }

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
                    tag = " (sai e entra)";
                } else if (hasCheckout) {
                    tag = " (sai)";
                } else if (hasCheckin) {
                    tag = " (entra)";
                }

                roomDetails.push(`${roomName}<b>${tag}</b>`);
            }
        });

        const count = roomDetails.length;
        const dateFormatted = currentDate.toLocaleDateString("pt-PT", {
            weekday: "long", day: "numeric", month: "long", year: "numeric"
        });

        const statusBadge = count === 0
            ? `<span class="chip chip-free">0 🟢 Livre</span>`
            : `<span class="chip chip-urgent">${count} / ${totalRooms} 🔴 Ocupado</span>`;

        let roomsChips = roomDetails.map(r => `<span class="chip chip-normal">${r}</span>`).join("");

        html += `
            <div class="glass-card">
                <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-bottom: 8px;">
                    <h2>${dateFormatted}</h2>
                    ${statusBadge}
                </div>
                ${count > 0 ? `<div style="margin-top: 8px;">${roomsChips}</div>` : ''}
            </div>
        `;
    }

    result.innerHTML = html;
}

loadCalendars();
