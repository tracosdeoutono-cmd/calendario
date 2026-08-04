// Injeta dinamicamente os 8 temas no cabeçalho da página
(function injectThemeStyles() {
    if (document.getElementById("al-app-multitheme")) return;
    const style = document.createElement("style");
    style.id = "al-app-multitheme";
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        * { box-sizing: border-box; }

        body {
            font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
            margin: 0;
            padding: 20px 16px;
            min-height: 100vh;
            transition: background-color 0.3s ease, color 0.3s ease;
        }

        #result {
            max-width: 900px;
            margin: 0 auto;
        }

        /* ------------------------------------------------------------------ */
        /* DEFINIÇÕES DOS 8 TEMAS */
        /* ------------------------------------------------------------------ */

        /* 1. TEMA BRANCO (ORIGINAL) - PADRÃO AO ENTRAR */
        body[data-theme="white"], body:not([data-theme]) {
            --bg-main: #ffffff;
            --bg-card: #ffffff;
            --border-card: #e5e7eb;
            --text-main: #111827;
            --text-muted: #6b7280;
            --accent-blue: #007bff;
            --accent-green: #28a745;
            --accent-purple: #6c757d;
            --chip-bg: #f3f4f6;
            --chip-text: #1f2937;
            --shadow-card: 0 1px 3px rgba(0,0,0,0.08);
        }

        /* 2. OUTONO LUXURY (COM TÍTULO TRAÇOS DE OUTONO) */
        body[data-theme="outono"] {
            --bg-main: #12100e;
            --bg-card: rgba(28, 23, 20, 0.9);
            --border-card: rgba(245, 158, 11, 0.25);
            --text-main: #fff8f0;
            --text-muted: #a3998e;
            --accent-blue: #ea580c;
            --accent-green: #10b981;
            --accent-purple: #f59e0b;
            --chip-bg: rgba(245, 158, 11, 0.12);
            --chip-text: #fbbf24;
            --shadow-card: 0 10px 30px -10px rgba(0,0,0,0.5);
        }

        /* 3. DARK GLASSMORPHISM */
        body[data-theme="glass"] {
            --bg-main: #0f172a;
            --bg-card: rgba(30, 41, 59, 0.8);
            --border-card: rgba(255, 255, 255, 0.1);
            --text-main: #f8fafc;
            --text-muted: #94a3b8;
            --accent-blue: #3b82f6;
            --accent-green: #10b981;
            --accent-purple: #8b5cf6;
            --chip-bg: rgba(255, 255, 255, 0.08);
            --chip-text: #f8fafc;
            --shadow-card: 0 10px 25px -5px rgba(0,0,0,0.3);
        }

        /* 4. NATURE EMERALD */
        body[data-theme="emerald"] {
            --bg-main: #064e3b;
            --bg-card: rgba(6, 78, 59, 0.85);
            --border-card: rgba(52, 211, 153, 0.25);
            --text-main: #ecfdf5;
            --text-muted: #a7f3d0;
            --accent-blue: #10b981;
            --accent-green: #34d399;
            --accent-purple: #059669;
            --chip-bg: rgba(52, 211, 153, 0.15);
            --chip-text: #a7f3d0;
            --shadow-card: 0 10px 25px -5px rgba(0,0,0,0.4);
        }

        /* 5. CYBER NEON */
        body[data-theme="cyber"] {
            --bg-main: #09090b;
            --bg-card: rgba(24, 24, 27, 0.9);
            --border-card: rgba(168, 85, 247, 0.35);
            --text-main: #fafafa;
            --text-muted: #a1a1aa;
            --accent-blue: #06b6d4;
            --accent-green: #10b981;
            --accent-purple: #a855f7;
            --chip-bg: rgba(168, 85, 247, 0.15);
            --chip-text: #c084fc;
            --shadow-card: 0 0 20px rgba(168, 85, 247, 0.25);
        }

        /* 6. WARM CAPPUCCINO */
        body[data-theme="cappuccino"] {
            --bg-main: #f5f0eb;
            --bg-card: #ffffff;
            --border-card: #e6ded6;
            --text-main: #3d342d;
            --text-muted: #8c7e72;
            --accent-blue: #8c5a3c;
            --accent-green: #5a8c5a;
            --accent-purple: #c29b7f;
            --chip-bg: #efe8e0;
            --chip-text: #3d342d;
            --shadow-card: 0 4px 15px rgba(61, 52, 45, 0.08);
        }

        /* 7. OCEAN BREEZE */
        body[data-theme="ocean"] {
            --bg-main: #0f2b3c;
            --bg-card: rgba(21, 50, 67, 0.85);
            --border-card: rgba(56, 189, 248, 0.25);
            --text-main: #f0f9ff;
            --text-muted: #7dd3fc;
            --accent-blue: #0284c7;
            --accent-green: #06b6d4;
            --accent-purple: #38bdf8;
            --chip-bg: rgba(56, 189, 248, 0.12);
            --chip-text: #38bdf8;
            --shadow-card: 0 10px 25px -5px rgba(0,0,0,0.35);
        }

        /* 8. ROYAL GOLD */
        body[data-theme="royalgold"] {
            --bg-main: #0a0a0a;
            --bg-card: rgba(20, 20, 20, 0.9);
            --border-card: rgba(234, 179, 8, 0.35);
            --text-main: #fef08a;
            --text-muted: #ca8a04;
            --accent-blue: #eab308;
            --accent-green: #10b981;
            --accent-purple: #ca8a04;
            --chip-bg: rgba(234, 179, 8, 0.12);
            --chip-text: #fde047;
            --shadow-card: 0 10px 30px rgba(234, 179, 8, 0.15);
        }

        /* ------------------------------------------------------------------ */
        /* ELEMENTOS VISUAIS DA INTERFACE */
        /* ------------------------------------------------------------------ */

        body {
            background-color: var(--bg-main);
            color: var(--text-main);
        }

        .card {
            background-color: var(--bg-card);
            border: 1px solid var(--border-card);
            border-radius: 12px;
            padding: 18px;
            margin-bottom: 16px;
            box-shadow: var(--shadow-card);
            transition: all 0.2s ease;
        }

        .btn-ui {
            font-family: inherit;
            padding: 10px 16px;
            font-size: 14px;
            font-weight: 600;
            border-radius: 8px;
            cursor: pointer;
            border: 1px solid var(--border-card);
            background-color: var(--bg-card);
            color: var(--text-main);
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }

        .btn-ui:hover {
            opacity: 0.9;
            transform: translateY(-1px);
        }

        .btn-ui.active-blue {
            background-color: var(--accent-blue);
            color: #ffffff;
            border-color: var(--accent-blue);
        }

        .btn-ui.active-green {
            background-color: var(--accent-green);
            color: #ffffff;
            border-color: var(--accent-green);
        }

        .btn-ui.active-purple {
            background-color: var(--accent-purple);
            color: #ffffff;
            border-color: var(--accent-purple);
        }

        .btn-clock {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            cursor: pointer;
            border: 1px solid var(--border-card);
            background-color: var(--bg-card);
            color: var(--text-main);
            transition: all 0.2s ease;
        }

        .btn-clock.active {
            border-color: var(--accent-purple);
            box-shadow: 0 0 10px var(--accent-purple);
        }

        .chip {
            display: inline-block;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 600;
            background-color: var(--chip-bg);
            color: var(--chip-text);
            margin: 3px 4px 3px 0;
            border: 1px solid var(--border-card);
        }

        .chip-urgent {
            background-color: rgba(220, 53, 69, 0.15);
            color: #dc3545;
            border-color: rgba(220, 53, 69, 0.3);
        }

        .chip-free {
            background-color: rgba(40, 167, 69, 0.15);
            color: #28a745;
            border-color: rgba(40, 167, 69, 0.3);
        }

        .theme-select-dropdown {
            padding: 9px 14px;
            font-size: 14px;
            font-weight: bold;
            border-radius: 8px;
            border: 2px solid var(--border-card);
            background-color: var(--bg-card);
            color: var(--text-main);
            cursor: pointer;
            outline: none;
            transition: all 0.2s ease;
        }

        .theme-select-dropdown:hover {
            border-color: var(--accent-blue);
        }

        h1 { font-size: 22px; font-weight: 700; margin: 0 0 16px 0; }
        h2 { font-size: 16px; font-weight: 700; margin: 0; }
        p { margin: 6px 0; }
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

// Gestão de Temas (Por defeito ao entrar: "white" - Branco Clássico Original)
let currentTheme = localStorage.getItem("al_theme") || "white";
document.body.setAttribute("data-theme", currentTheme);

// Função global para Mudar o Tema da Página
window.setTheme = function(themeKey) {
    currentTheme = themeKey;
    try { localStorage.setItem("al_theme", themeKey); } catch(e){}
    document.body.setAttribute("data-theme", currentTheme);
    renderCurrentView();
};

function renderCurrentView() {
    if (currentView === "cleaning") showCleaningPlan();
    else if (currentView === "occupancy") showOccupancyPlan();
    else if (currentView === "snapshots") showSnapshotsPlan();
}

// Fetch com Anti-Cache seguro (Sem erros de CORS)
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

// Copiar dados para a área de transferência
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
    if (currentView === "snapshots") selectedSnapshotDate = null;
    renderCurrentView();
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
        console.warn("Aviso: Histórico da cloud não carregou.", e);
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
        console.error("Erro ao guardar histórico:", e);
    }
}

async function loadCalendars() {
    result.innerHTML = "<div class='card'><p style='font-weight:bold; color:var(--accent-blue);'>⏳ A ligar à Cloud e a carregar calendários (aguarda)...</p></div>";

    try {
        const historyPromise = fetchCloudHistory();
        
        const calendarPromises = calendars.map(async (calendar) => {
            try {
                const response = await fetchWithTimeout(calendar.url, {}, 12000);
                if (!response.ok) return [];
                const text = await response.text();
                return parseICS(text, calendar.name);
            } catch (e) {
                console.warn("Erro ao carregar " + calendar.name);
                return [];
            }
        });

        const [_, results] = await Promise.all([historyPromise, Promise.all(calendarPromises)]);
        globalReservations = results.flat();

        updateCloudHistory();
        renderCurrentView();

    } catch (err) {
        result.innerHTML = `<div class='card'><p style='color:red; font-weight:bold;'>Erro geral: ${err.message}</p></div>`;
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
        console.error("Erro no histórico:", err);
    }
}

// Cabeçalho de Navegação com Menu Dropdown Visível de Temas
function renderNavigation() {
    const isCleaning = currentView === "cleaning";
    const isOccupancy = currentView === "occupancy";
    const isSnapshots = currentView === "snapshots";

    let brandingBanner = "";
    if (currentTheme === "outono") {
        brandingBanner = `
            <div style="margin-bottom: 20px;">
                <h1 style="font-size: 26px; font-weight: 800; background: linear-gradient(135deg, #fff8f0 30%, #f59e0b 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0;">🍂 Traços de Outono</h1>
                <div style="font-size: 13px; color: var(--text-muted); font-weight: 500;">Gestão de Alojamento Local</div>
            </div>
        `;
    }

    return `
        ${brandingBanner}
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; gap: 10px; flex-wrap: wrap;">
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <button onclick="window.switchMainView('cleaning')" class="btn-ui ${isCleaning ? 'active-blue' : ''}">
                    🧹 Plano de Limpezas
                </button>
                <button onclick="window.switchMainView('occupancy')" class="btn-ui ${isOccupancy ? 'active-green' : ''}">
                    📊 Disponibilidade da Casa
                </button>
            </div>
            
            <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                <!-- MENU DROPDOWN VISÍVEL DE SELEÇÃO DE TEMA -->
                <select class="theme-select-dropdown" onchange="window.setTheme(this.value)" title="Mudar Estilo da Página">
                    <option value="white" ${currentTheme === 'white' ? 'selected' : ''}>⬜ Branco Clássico (Original)</option>
                    <option value="outono" ${currentTheme === 'outono' ? 'selected' : ''}>🍂 Outono Luxury (Traços de Outono)</option>
                    <option value="glass" ${currentTheme === 'glass' ? 'selected' : ''}>🌙 Dark Glassmorphism</option>
                    <option value="emerald" ${currentTheme === 'emerald' ? 'selected' : ''}>🌿 Nature Emerald</option>
                    <option value="cyber" ${currentTheme === 'cyber' ? 'selected' : ''}>🌆 Cyber Neon</option>
                    <option value="cappuccino" ${currentTheme === 'cappuccino' ? 'selected' : ''}>☕ Warm Cappuccino</option>
                    <option value="ocean" ${currentTheme === 'ocean' ? 'selected' : ''}>🌊 Ocean Breeze</option>
                    <option value="royalgold" ${currentTheme === 'royalgold' ? 'selected' : ''}>👑 Royal Gold</option>
                </select>

                <!-- BOTÃO RELÓGIO -->
                <button onclick="window.switchMainView('snapshots')" class="btn-clock ${isSnapshots ? 'active' : ''}" title="Ver Previsões Guardadas (Snapshots)">
                    🕒
                </button>
            </div>
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
        html += `<div class="card"><p style="color: var(--text-muted);">Ainda não há previsões guardadas de dias anteriores.</p></div>`;
        result.innerHTML = html;
        return;
    }

    if (!selectedSnapshotDate) {
        html += `<p style="color: var(--text-muted); margin-bottom: 14px;">Escolhe um dia para ver o plano de limpezas previsto nesse momento:</p>`;
        html += `<div style="display: flex; gap: 8px; flex-wrap: wrap;">`;
        
        snapshotKeys.forEach(key => {
            const dateObj = new Date(key);
            const label = dateObj.toLocaleDateString("pt-PT", { day: "numeric", month: "long", year: "numeric" });
            html += `
                <button onclick="window.selectSnapshot('${key}')" class="btn-ui">
                    📅 ${label}
                </button>
            `;
        });
        html += `</div>`;
    } else {
        const dateObj = new Date(selectedSnapshotDate);
        const label = dateObj.toLocaleDateString("pt-PT", { day: "numeric", month: "long", year: "numeric" });
        
        html += `
            <div style="margin-bottom: 16px;">
                <button onclick="window.selectSnapshot(null)" class="btn-ui">
                    🔙 Voltar à Lista
                </button>
            </div>
            <div class="card">
                <h2>Plano visualizado no dia: <span style="color: var(--accent-blue);">${label}</span></h2>
        `;

        const plan = snapshots[selectedSnapshotDate];
        const planKeys = Object.keys(plan).sort();

        if (planKeys.length === 0) {
            html += `<p style="color: var(--text-muted);">Não havia nenhuma limpeza planeada para os 7 dias seguintes.</p>`;
        }

        planKeys.forEach(key => {
            const day = plan[key];
            const d = new Date(day.dateIso);
            let title = d.toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
            if (day.rooms.some(r => r.sunday)) title = "🔴 " + title;

            let chips = "";
            day.rooms.sort((a, b) => a.room.localeCompare(b.room)).forEach(clean => {
                const badgeClass = clean.urgent ? "chip-urgent" : "";
                const emoji = clean.urgent ? "⚠️" : "🧹";
                let tag = clean.urgent ? " (entrada no mesmo dia)" : ""; 
                chips += `<span class="chip ${badgeClass}">${emoji} ${clean.room}${tag}</span>`;
            });

            html += `
                <div style="margin-top: 12px; padding-bottom: 8px; border-bottom: 1px solid var(--border-card);">
                    <div style="font-weight: 700; margin-bottom: 6px;">${title}</div>
                    <div>${chips}</div>
                </div>
            `;
        });
        html += `</div>`;
    }

    result.innerHTML = html;
}

// VISTA 1: PLANO DE LIMPEZAS
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
            <button onclick="window.toggleHistoryView()" class="btn-ui">
                ${buttonText}
            </button>
        </div>
    `;

    if (sortedKeys.length === 0) {
        html += `<div class="card"><p style="color: var(--text-muted);">Não há limpezas registadas ${showHistoryMode ? 'anteriores a hoje' : 'agendadas'}.</p></div>`;
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

        let chips = "";

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
            const badgeClass = hasCheckin ? "chip-urgent" : "";

            copyLinesPt.push(`${emoji} ${clean.room}${tagTextPt}`);
            copyLinesEs.push(`${emoji} ${clean.room}${tagTextEs}`);
            chips += `<span class="chip ${badgeClass}">${emoji} ${clean.room}<b>${tagTextPt}</b></span>`;
        });

        const encodedCopyTextPt = encodeURIComponent(copyLinesPt.join("\n"));
        const encodedCopyTextEs = encodeURIComponent(copyLinesEs.join("\n"));

        html += `
            <div class="card">
                <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-bottom: 10px;">
                    <h2>${title}</h2>
                    <div style="display: flex; gap: 6px;">
                        <button onclick="window.copyFromData(this, '${encodedCopyTextPt}')" class="btn-ui" style="font-size:12px; padding:4px 10px;">
                            🇵🇹 Copiar PT
                        </button>
                        <button onclick="window.copyFromData(this, '${encodedCopyTextEs}')" class="btn-ui" style="font-size:12px; padding:4px 10px;">
                            🇪🇸 Copiar ES
                        </button>
                    </div>
                </div>
                <div>${chips}</div>
            </div>
        `;
    });

    result.innerHTML = html;
}

function getHouseRooms(houseKey) {
    if (houseKey === "achada") return ["Achada 1", "Achada 2", "Achada 3", "Achada 4", "Achada 5", "Achada 6"];
    if (houseKey === "impasse") return ["Impasse 2", "Impasse 3", "Impasse 4"];
    if (houseKey === "vizinho") return ["Vizinho 1", "Vizinho 2", "Vizinho 3"];
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
            <button onclick="window.selectHouse('achada')" class="btn-ui ${selectedHouse === 'achada' ? 'active-blue' : ''}">
                🏡 Achada
            </button>
            <button onclick="window.selectHouse('impasse')" class="btn-ui ${selectedHouse === 'impasse' ? 'active-blue' : ''}">
                🏡 Impasse
            </button>
            <button onclick="window.selectHouse('vizinho')" class="btn-ui ${selectedHouse === 'vizinho' ? 'active-blue' : ''}">
                🏡 Vizinho
            </button>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
            <h1>📊 Ocupação - ${houseLabels[selectedHouse]}</h1>
            <div style="display: flex; gap: 8px;">
                <button onclick="window.toggleOccupancyStats()" class="btn-ui ${showOccupancyStats ? 'active-purple' : ''}">
                    ${showOccupancyStats ? '🔙 Ocultar Estatísticas' : '📈 Estatísticas Mensais'}
                </button>
                ${showOccupancyStats ? `
                <button onclick="window.togglePastStats()" class="btn-ui">
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
            html += `<div class="card"><p style="color: var(--text-muted);">Sem dados de estatísticas.</p></div>`;
        } else {
            html += `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-bottom: 20px;">`;
            
            statKeys.forEach(key => {
                const s = stats[key];
                const taxa = s.totalCapacity > 0 ? Math.round((s.dormidas / s.totalCapacity) * 100) : 0;
                
                html += `
                    <div class="card">
                        <h3 style="margin-top:0; color: var(--accent-blue); text-transform: capitalize; border-bottom: 1px solid var(--border-card); padding-bottom: 6px;">${s.label}</h3>
                        <p><strong>🛏️ Ocupação:</strong> ${taxa}%</p>
                        <p><strong>🌙 Dormidas:</strong> ${s.dormidas} <span style="font-size:12px; color:var(--text-muted);">(de ${s.totalCapacity})</span></p>
                        <p><strong>🧳 Check-ins:</strong> ${s.checkins}</p>
                        <p><strong>🔥 Dias cheios:</strong> ${s.diasEsgotados}</p>
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

        let chips = roomDetails.map(r => `<span class="chip">${r}</span>`).join("");

        html += `
            <div class="card">
                <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-bottom: 6px;">
                    <h2>${dateFormatted}</h2>
                    ${statusBadge}
                </div>
                ${count > 0 ? `<div style="margin-top: 6px;">${chips}</div>` : ''}
            </div>
        `;
    }

    result.innerHTML = html;
}

loadCalendars();
