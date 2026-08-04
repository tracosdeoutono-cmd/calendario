// Injeta dinamicamente as 8 arquiteturas de design CSS na página
(function injectAllUniqueThemes() {
    if (document.getElementById("al-app-allthemes")) return;
    const style = document.createElement("style");
    style.id = "al-app-allthemes";
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@400;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Fira+Code:wght@500;700&display=swap');

        * { box-sizing: border-box; }

        body {
            margin: 0;
            padding: 24px 16px;
            min-height: 100vh;
            transition: all 0.3s ease;
        }

        #result {
            max-width: 920px;
            margin: 0 auto;
        }

        /* ------------------------------------------------------------------ */
        /* 1. TEMA BRANCO CLÁSSICO (ORIGINAL - PADRÃO AO ENTRAR) */
        /* ------------------------------------------------------------------ */
        body[data-theme="white"], body:not([data-theme]) {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: #f8f9fa;
            color: #212529;
            --bg-card: #ffffff;
            --border-card: #dee2e6;
            --accent-blue: #007bff;
            --accent-green: #28a745;
            --accent-purple: #6f42c1;
            --chip-bg: #e9ecef;
            --chip-text: #212529;
            --shadow-card: 0 2px 6px rgba(0,0,0,0.06);
            --card-radius: 12px;
        }

        /* ------------------------------------------------------------------ */
        /* 2. OUTONO LUXURY (EXACTAMENTE COMO O PRIMEIRO DESIGN) */
        /* ------------------------------------------------------------------ */
        body[data-theme="outono"] {
            font-family: 'Outfit', sans-serif;
            background-color: #12100e;
            color: #fff8f0;
            background-image: 
                radial-gradient(at 10% 10%, rgba(245, 158, 11, 0.14) 0px, transparent 45%),
                radial-gradient(at 90% 90%, rgba(234, 88, 12, 0.12) 0px, transparent 45%);
            background-attachment: fixed;
            --bg-card: rgba(26, 22, 19, 0.85);
            --border-card: rgba(245, 158, 11, 0.2);
            --accent-blue: #ea580c;
            --accent-green: #10b981;
            --accent-purple: #f59e0b;
            --chip-bg: rgba(245, 158, 11, 0.12);
            --chip-text: #fbbf24;
            --shadow-card: 0 12px 30px -10px rgba(0,0,0,0.5);
            --card-radius: 20px;
        }

        /* ------------------------------------------------------------------ */
        /* 3. CYBER NEON 2099 (FUTURISTA / MONOSPACE / EDGES AFISADOS) */
        /* ------------------------------------------------------------------ */
        body[data-theme="cyber"] {
            font-family: 'Fira Code', monospace;
            background-color: #050508;
            color: #00f0ff;
            background-image: repeating-linear-gradient(0deg, rgba(0,240,255,0.03) 0px, rgba(0,240,255,0.03) 1px, transparent 1px, transparent 2px);
            background-size: 100% 4px;
            --bg-card: #0c0c14;
            --border-card: #ff0055;
            --accent-blue: #00f0ff;
            --accent-green: #00ff66;
            --accent-purple: #ff0055;
            --chip-bg: rgba(255, 0, 85, 0.15);
            --chip-text: #ff6699;
            --shadow-card: 0 0 15px rgba(255, 0, 85, 0.3);
            --card-radius: 2px;
        }

        /* ------------------------------------------------------------------ */
        /* 4. WARM CAPPUCCINO (BOUTIQUE VINTAGE / SERIF) */
        /* ------------------------------------------------------------------ */
        body[data-theme="cappuccino"] {
            font-family: 'Playfair Display', serif;
            background-color: #f4efe9;
            color: #3d342d;
            --bg-card: #ffffff;
            --border-card: #d9ceb2;
            --accent-blue: #8c5a3c;
            --accent-green: #5a8c5a;
            --accent-purple: #c29b7f;
            --chip-bg: #eae1d5;
            --chip-text: #4a3b32;
            --shadow-card: 0 4px 12px rgba(61, 52, 45, 0.08);
            --card-radius: 6px;
        }

        /* ------------------------------------------------------------------ */
        /* 5. NATURE EMERALD (ORGANIC CAPSULE DESIGN) */
        /* ------------------------------------------------------------------ */
        body[data-theme="emerald"] {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: #042f2e;
            color: #ecfdf5;
            --bg-card: rgba(15, 118, 110, 0.25);
            --border-card: rgba(52, 211, 153, 0.3);
            --accent-blue: #10b981;
            --accent-green: #34d399;
            --accent-purple: #059669;
            --chip-bg: rgba(52, 211, 153, 0.2);
            --chip-text: #6ee7b7;
            --shadow-card: 0 10px 25px rgba(0, 0, 0, 0.4);
            --card-radius: 28px;
        }

        /* ------------------------------------------------------------------ */
        /* 6. DARK GLASSMORPHISM (VISCO TRANSLÚCIDO) */
        /* ------------------------------------------------------------------ */
        body[data-theme="glass"] {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: #0f172a;
            color: #f8fafc;
            --bg-card: rgba(30, 41, 59, 0.75);
            --border-card: rgba(255, 255, 255, 0.12);
            --accent-blue: #3b82f6;
            --accent-green: #10b981;
            --accent-purple: #8b5cf6;
            --chip-bg: rgba(255, 255, 255, 0.08);
            --chip-text: #f8fafc;
            --shadow-card: 0 10px 25px -5px rgba(0,0,0,0.35);
            --card-radius: 18px;
        }

        /* ------------------------------------------------------------------ */
        /* 7. OCEAN BREEZE (ONDA FLUIDA AQUÁTICA) */
        /* ------------------------------------------------------------------ */
        body[data-theme="ocean"] {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: #072534;
            color: #f0f9ff;
            --bg-card: rgba(14, 116, 144, 0.2);
            --border-card: rgba(56, 189, 248, 0.3);
            --accent-blue: #0284c7;
            --accent-green: #06b6d4;
            --accent-purple: #38bdf8;
            --chip-bg: rgba(56, 189, 248, 0.15);
            --chip-text: #38bdf8;
            --shadow-card: 0 10px 30px rgba(2, 132, 199, 0.2);
            --card-radius: 16px 30px 16px 30px;
        }

        /* ------------------------------------------------------------------ */
        /* 8. ROYAL GOLD (PRETO OBSIDIAN & OURO 24K) */
        /* ------------------------------------------------------------------ */
        body[data-theme="royalgold"] {
            font-family: 'Outfit', sans-serif;
            background-color: #050505;
            color: #fef08a;
            --bg-card: rgba(20, 20, 20, 0.95);
            --border-card: rgba(234, 179, 8, 0.4);
            --accent-blue: #eab308;
            --accent-green: #10b981;
            --accent-purple: #ca8a04;
            --chip-bg: rgba(234, 179, 8, 0.15);
            --chip-text: #fde047;
            --shadow-card: 0 10px 30px rgba(234, 179, 8, 0.2);
            --card-radius: 14px;
        }

        /* ------------------------------------------------------------------ */
        /* ESTRUTURA GERAL DOS ELEMENTOS DA INTERFACE */
        /* ------------------------------------------------------------------ */

        .card {
            background-color: var(--bg-card);
            border: 1px solid var(--border-card);
            border-radius: var(--card-radius);
            padding: 20px;
            margin-bottom: 18px;
            box-shadow: var(--shadow-card);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            transition: all 0.25s ease;
        }

        .card:hover {
            transform: translateY(-2px);
        }

        .btn-ui {
            font-family: inherit;
            padding: 10px 18px;
            font-size: 14px;
            font-weight: 600;
            border-radius: calc(var(--card-radius) / 1.5);
            cursor: pointer;
            border: 1px solid var(--border-card);
            background-color: var(--bg-card);
            color: inherit;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }

        .btn-ui:hover {
            transform: translateY(-1px);
            opacity: 0.9;
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
            width: 46px;
            height: 46px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            cursor: pointer;
            border: 1px solid var(--border-card);
            background-color: var(--bg-card);
            color: inherit;
            transition: all 0.25s ease;
        }

        .btn-clock:hover {
            transform: rotate(20deg) scale(1.08);
            border-color: var(--accent-purple);
        }

        .btn-clock.active {
            background-color: var(--accent-purple);
            color: #fff;
            box-shadow: 0 0 15px var(--accent-purple);
        }

        .chip {
            display: inline-block;
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 600;
            background-color: var(--chip-bg);
            color: var(--chip-text);
            margin: 4px 5px 4px 0;
            border: 1px solid var(--border-card);
        }

        .chip-urgent {
            background-color: rgba(244, 63, 94, 0.18);
            color: #fb7185;
            border-color: rgba(244, 63, 94, 0.4);
        }

        .chip-free {
            background-color: rgba(16, 185, 129, 0.18);
            color: #34d399;
            border-color: rgba(16, 185, 129, 0.4);
        }

        .theme-select-dropdown {
            padding: 10px 14px;
            font-size: 14px;
            font-weight: bold;
            border-radius: 10px;
            border: 2px solid var(--border-card);
            background-color: var(--bg-card);
            color: inherit;
            cursor: pointer;
            outline: none;
            transition: all 0.2s ease;
        }

        /* ------------------------------------------------------------------ */
        /* COMPONENTES EXCLUSIVOS DO TEMA OUTONO LUXURY */
        /* ------------------------------------------------------------------ */
        
        .pulse-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: inline-block;
            margin-right: 4px;
            animation: pulse 1.6s infinite;
        }
        .pulse-red { background-color: #f43f5e; box-shadow: 0 0 0 0 rgba(244, 63, 94, 0.7); }
        .pulse-green { background-color: #10b981; box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }

        @keyframes pulse {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(244, 63, 94, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(244, 63, 94, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(244, 63, 94, 0); }
        }

        .stat-box {
            background: rgba(18, 16, 14, 0.7);
            border: 1px solid rgba(245, 158, 11, 0.2);
            border-radius: 16px;
            padding: 18px;
        }

        .stat-val {
            font-size: 26px;
            font-weight: 800;
            color: #ffffff;
            margin-top: 4px;
        }

        .bar-bg {
            height: 6px;
            background: rgba(255, 255, 255, 0.08);
            border-radius: 3px;
            overflow: hidden;
            margin-top: 10px;
        }

        .bar-fill {
            height: 100%;
            background: linear-gradient(90deg, #f59e0b, #ea580c);
            border-radius: 3px;
        }

        h1 { font-size: 22px; font-weight: 700; margin: 0 0 16px 0; }
        h2 { font-size: 17px; font-weight: 700; margin: 0; }
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

// Gestão de Temas (Por defeito: "white" - Branco Clássico)
let currentTheme = localStorage.getItem("al_theme") || "white";
document.body.setAttribute("data-theme", currentTheme);

// Alterar Tema
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

// Copiar texto para área de transferência
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

// Alternar Vistas
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

// Cabeçalho de Navegação com Seletor de Temas
function renderNavigation() {
    const isCleaning = currentView === "cleaning";
    const isOccupancy = currentView === "occupancy";
    const isSnapshots = currentView === "snapshots";

    let brandingBanner = "";
    if (currentTheme === "outono") {
        brandingBanner = `
            <div style="margin-bottom: 22px;">
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
                <!-- DROPDOWN VISÍVEL PARA MUDAR O ESTILO COMPLETO DA PÁGINA -->
                <select class="theme-select-dropdown" onchange="window.setTheme(this.value)" title="Mudar Estilo Completo da Página">
                    <option value="white" ${currentTheme === 'white' ? 'selected' : ''}>⬜ Branco Clássico (Original)</option>
                    <option value="outono" ${currentTheme === 'outono' ? 'selected' : ''}>🍂 Outono Luxury (Traços de Outono)</option>
                    <option value="cyber" ${currentTheme === 'cyber' ? 'selected' : ''}>🌆 Cyber Neon 2099</option>
                    <option value="cappuccino" ${currentTheme === 'cappuccino' ? 'selected' : ''}>☕ Warm Cappuccino</option>
                    <option value="emerald" ${currentTheme === 'emerald' ? 'selected' : ''}>🌿 Nature Emerald</option>
                    <option value="glass" ${currentTheme === 'glass' ? 'selected' : ''}>🌙 Dark Glassmorphism</option>
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
            html += `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; margin-bottom: 20px;">`;
            
            statKeys.forEach(key => {
                const s = stats[key];
                const taxa = s.totalCapacity > 0 ? Math.round((s.dormidas / s.totalCapacity) * 100) : 0;
                
                // Renderização Premium para o tema Outono Luxury
                if (currentTheme === "outono") {
                    html += `
                        <div class="stat-box">
                            <div style="color: #fbbf24; font-weight: 700; font-size: 15px; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 6px;">${s.label}</div>
                            <div class="stat-val">${taxa}% <span style="font-size: 13px; font-weight: 500; color: var(--text-muted);">ocupação</span></div>
                            <div class="bar-bg">
                                <div class="bar-fill" style="width: ${taxa}%;"></div>
                            </div>
                            <div style="margin-top: 12px; font-size: 13px; color: var(--text-muted); display: flex; flex-direction: column; gap: 4px;">
                                <span>🌙 Dormidas: <strong style="color: #fff;">${s.dormidas}</strong> / ${s.totalCapacity}</span>
                                <span>🧳 Check-ins: <strong style="color: #fff;">${s.checkins}</strong></span>
                                <span>🔥 Dias 100% cheios: <strong style="color: #34d399;">${s.diasEsgotados}</strong></span>
                            </div>
                        </div>
                    `;
                } else {
                    html += `
                        <div class="card">
                            <h3 style="margin-top:0; color: var(--accent-blue); text-transform: capitalize; border-bottom: 1px solid var(--border-card); padding-bottom: 6px;">${s.label}</h3>
                            <p><strong>🛏️ Ocupação:</strong> ${taxa}%</p>
                            <p><strong>🌙 Dormidas:</strong> ${s.dormidas} <span style="font-size:12px; color:var(--text-muted);">(de ${s.totalCapacity})</span></p>
                            <p><strong>🧳 Check-ins:</strong> ${s.checkins}</p>
                            <p><strong>🔥 Dias cheios:</strong> ${s.diasEsgotados}</p>
                        </div>
                    `;
                }
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

        let statusBadge = "";
        if (currentTheme === "outono") {
            statusBadge = count === 0
                ? `<span class="chip chip-free"><span class="pulse-dot pulse-green"></span> 0 Livre</span>`
                : `<span class="chip chip-urgent"><span class="pulse-dot pulse-red"></span> ${count} / ${totalRooms} Ocupado</span>`;
        } else {
            statusBadge = count === 0
                ? `<span class="chip chip-free">0 🟢 Livre</span>`
                : `<span class="chip chip-urgent">${count} / ${totalRooms} 🔴 Ocupado</span>`;
        }

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
