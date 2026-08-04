// Injeta os 8 temas visuais na página
(function injectAllThemes() {
    if (document.getElementById("al-app-allthemes")) return;
    const style = document.createElement("style");
    style.id = "al-app-allthemes";
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@400;600;700;800&family=VT323&family=Caveat:wght@400;700&family=Nunito:wght@400;600;700;800&family=Space+Grotesk:wght@400;500;600;700&family=Cinzel:wght@400;600;700;800&display=swap');

        * { box-sizing: border-box; }

        body {
            margin: 0;
            padding: 20px 16px;
            min-height: 100vh;
            transition: all 0.3s ease;
            position: relative;
        }

        #result {
            max-width: 920px;
            margin: 0 auto;
        }

        /* ═══════════════════════════════════════════════════ */
        /* 1. BRANCO CLÁSSICO (PADRÃO AO ENTRAR) - INTOCADO  */
        /* ═══════════════════════════════════════════════════ */
        body[data-theme="white"], body:not([data-theme]) {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: #ffffff;
            color: #212529;
        }

        /* ═══════════════════════════════════════════════════ */
        /* 2. OUTONO LUXURY (DESIGN ORIGINAL) - INTOCADO      */
        /* ═══════════════════════════════════════════════════ */
        body[data-theme="outono"] {
            font-family: 'Outfit', sans-serif;
            background-color: #12100e;
            color: #fff8f0;
            background-image: 
                radial-gradient(at 10% 10%, rgba(245, 158, 11, 0.14) 0px, transparent 45%),
                radial-gradient(at 90% 90%, rgba(234, 88, 12, 0.12) 0px, transparent 45%);
            background-attachment: fixed;
        }
        body[data-theme="outono"] div[style*="background-color: #f8f9fa"],
        body[data-theme="outono"] div[style*="border: 1px solid #ddd"] {
            background-color: rgba(26, 22, 19, 0.85) !important;
            border-color: rgba(245, 158, 11, 0.2) !important;
            color: #fff8f0 !important;
            border-radius: 16px !important;
            box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5) !important;
        }
        body[data-theme="outono"] h2, body[data-theme="outono"] h3 {
            color: #fff !important;
        }

        /* ═══════════════════════════════════════════════════ */
        /* 3. 🌆 RETRO TERMINAL (Ecrã fosforescente DOS)      */
        /*    Estética: Monitor verde dos anos 80, scanlines,  */
        /*    cursor a piscar, brilho fosforescente             */
        /* ═══════════════════════════════════════════════════ */
        body[data-theme="cyber"] {
            font-family: 'VT323', monospace;
            background-color: #000000;
            color: #00ff41;
            background-image:
                repeating-linear-gradient(
                    0deg,
                    rgba(0, 255, 65, 0.03) 0px,
                    rgba(0, 255, 65, 0.03) 1px,
                    transparent 1px,
                    transparent 3px
                );
            background-attachment: fixed;
            letter-spacing: 0.5px;
        }
        body[data-theme="cyber"] div[style*="background-color: #f8f9fa"],
        body[data-theme="cyber"] div[style*="border: 1px solid #ddd"] {
            background-color: rgba(0, 20, 0, 0.8) !important;
            border: 1px solid #00ff41 !important;
            border-radius: 0px !important;
            box-shadow: 0 0 10px rgba(0, 255, 65, 0.15), inset 0 0 30px rgba(0, 255, 65, 0.03) !important;
            color: #00ff41 !important;
        }
        body[data-theme="cyber"] h1 {
            text-shadow: 0 0 10px rgba(0, 255, 65, 0.5);
        }
        body[data-theme="cyber"] h2, body[data-theme="cyber"] h3 {
            color: #00ff41 !important;
            text-transform: uppercase;
            letter-spacing: 2px;
            text-shadow: 0 0 8px rgba(0, 255, 65, 0.4);
            border-bottom: 1px dashed rgba(0, 255, 65, 0.3);
            padding-bottom: 4px;
        }
        body[data-theme="cyber"] button {
            border-radius: 0px !important;
            font-family: 'VT323', monospace !important;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        body[data-theme="cyber"] hr {
            border-color: rgba(0, 255, 65, 0.2) !important;
        }
        body[data-theme="cyber"] p, body[data-theme="cyber"] div, body[data-theme="cyber"] span {
            text-shadow: 0 0 4px rgba(0, 255, 65, 0.15);
        }

        /* ═══════════════════════════════════════════════════ */
        /* 4. ☕ WARM CAPPUCCINO (Caderno escrito à mão)       */
        /*    Estética: Folha de caderno com linhas, letra     */
        /*    cursiva, notas coladas, caneta vermelha           */
        /* ═══════════════════════════════════════════════════ */
        body[data-theme="cappuccino"] {
            font-family: 'Caveat', cursive;
            font-size: 18px;
            background-color: #fdf6e3;
            color: #2c1810;
            background-image:
                repeating-linear-gradient(
                    transparent,
                    transparent 31px,
                    #e8d5b7 31px,
                    #e8d5b7 32px
                ),
                linear-gradient(90deg, transparent 60px, #f0c4c4 60px, #f0c4c4 61px, transparent 61px);
            background-attachment: local;
        }
        body[data-theme="cappuccino"] div[style*="background-color: #f8f9fa"],
        body[data-theme="cappuccino"] div[style*="border: 1px solid #ddd"] {
            background-color: #fffde7 !important;
            border: none !important;
            border-left: 4px solid #e88d67 !important;
            border-radius: 2px !important;
            box-shadow: 3px 3px 0px rgba(44, 24, 16, 0.1) !important;
            color: #2c1810 !important;
            padding: 16px 18px !important;
            transform: rotate(-0.3deg);
        }
        body[data-theme="cappuccino"] h1 {
            font-size: 36px;
            text-decoration: underline wavy #e88d67;
            text-underline-offset: 6px;
        }
        body[data-theme="cappuccino"] h2, body[data-theme="cappuccino"] h3 {
            color: #c0392b !important;
            font-weight: 700;
        }
        body[data-theme="cappuccino"] button {
            font-family: 'Caveat', cursive !important;
            font-size: 17px !important;
            border-radius: 4px !important;
            border-style: dashed !important;
        }
        body[data-theme="cappuccino"] hr {
            border: none !important;
            border-bottom: 2px dashed #d4b896 !important;
            margin: 16px 0 !important;
        }

        /* ═══════════════════════════════════════════════════ */
        /* 5. 🌿 NATURE EMERALD (Floresta Encantada)           */
        /*    Estética: Escuridão da floresta com pirilampos,  */
        /*    brilho orgânico, formas vivas, cogumelos         */
        /* ═══════════════════════════════════════════════════ */
        body[data-theme="emerald"] {
            font-family: 'Nunito', sans-serif;
            background-color: #060f06;
            color: #b8f0b0;
            background-image:
                radial-gradient(ellipse at 15% 80%, rgba(34, 197, 94, 0.08) 0%, transparent 50%),
                radial-gradient(ellipse at 85% 20%, rgba(74, 222, 128, 0.06) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.04) 0%, transparent 70%),
                radial-gradient(circle 2px at 20% 30%, rgba(134, 239, 172, 0.4) 0%, transparent 100%),
                radial-gradient(circle 2px at 70% 65%, rgba(134, 239, 172, 0.3) 0%, transparent 100%),
                radial-gradient(circle 1px at 40% 80%, rgba(190, 242, 100, 0.5) 0%, transparent 100%),
                radial-gradient(circle 1px at 90% 40%, rgba(190, 242, 100, 0.4) 0%, transparent 100%),
                radial-gradient(circle 2px at 10% 60%, rgba(74, 222, 128, 0.35) 0%, transparent 100%),
                radial-gradient(circle 1px at 60% 15%, rgba(134, 239, 172, 0.45) 0%, transparent 100%);
            background-attachment: fixed;
        }
        body[data-theme="emerald"] div[style*="background-color: #f8f9fa"],
        body[data-theme="emerald"] div[style*="border: 1px solid #ddd"] {
            background: linear-gradient(135deg, rgba(6, 78, 59, 0.5) 0%, rgba(6, 95, 70, 0.3) 100%) !important;
            border: 1px solid rgba(52, 211, 153, 0.25) !important;
            border-left: 4px solid #34d399 !important;
            border-radius: 24px 8px 24px 8px !important;
            color: #b8f0b0 !important;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(34, 197, 94, 0.05) !important;
        }
        body[data-theme="emerald"] h2, body[data-theme="emerald"] h3 {
            color: #4ade80 !important;
            font-weight: 800;
        }
        body[data-theme="emerald"] button {
            border-radius: 50px !important;
            font-family: 'Nunito', sans-serif !important;
            font-weight: 700 !important;
        }
        body[data-theme="emerald"] hr {
            border-color: rgba(52, 211, 153, 0.15) !important;
        }

        /* ═══════════════════════════════════════════════════ */
        /* 6. 🌙 DARK GLASSMORPHISM (Cosmos / Espaço Profundo) */
        /*    Estética: Campo de estrelas, nebulosas púrpura,  */
        /*    painéis flutuantes no espaço, aurora boreal       */
        /* ═══════════════════════════════════════════════════ */
        body[data-theme="glass"] {
            font-family: 'Space Grotesk', sans-serif;
            background-color: #07000f;
            color: #e0d4ff;
            background-image:
                radial-gradient(ellipse at 20% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                radial-gradient(ellipse at 60% 80%, rgba(236, 72, 153, 0.08) 0%, transparent 50%),
                radial-gradient(circle 1px at 10% 20%, rgba(255,255,255,0.7) 0%, transparent 100%),
                radial-gradient(circle 1px at 25% 45%, rgba(255,255,255,0.5) 0%, transparent 100%),
                radial-gradient(circle 1px at 40% 10%, rgba(255,255,255,0.6) 0%, transparent 100%),
                radial-gradient(circle 1px at 55% 70%, rgba(255,255,255,0.4) 0%, transparent 100%),
                radial-gradient(circle 1px at 70% 85%, rgba(255,255,255,0.5) 0%, transparent 100%),
                radial-gradient(circle 1px at 85% 55%, rgba(255,255,255,0.6) 0%, transparent 100%),
                radial-gradient(circle 1px at 95% 15%, rgba(255,255,255,0.7) 0%, transparent 100%),
                radial-gradient(circle 1px at 15% 75%, rgba(255,255,255,0.3) 0%, transparent 100%),
                radial-gradient(circle 1px at 50% 35%, rgba(255,255,255,0.55) 0%, transparent 100%),
                radial-gradient(circle 1px at 35% 90%, rgba(255,255,255,0.45) 0%, transparent 100%),
                radial-gradient(circle 1px at 75% 5%, rgba(255,255,255,0.5) 0%, transparent 100%);
            background-attachment: fixed;
        }
        body[data-theme="glass"] div[style*="background-color: #f8f9fa"],
        body[data-theme="glass"] div[style*="border: 1px solid #ddd"] {
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(59, 130, 246, 0.08) 100%) !important;
            border: 1px solid rgba(139, 92, 246, 0.25) !important;
            border-radius: 16px !important;
            color: #e0d4ff !important;
            backdrop-filter: blur(20px) saturate(1.5) !important;
            box-shadow: 0 10px 40px rgba(139, 92, 246, 0.1), inset 0 1px 0 rgba(255,255,255,0.06) !important;
        }
        body[data-theme="glass"] h1 {
            background: linear-gradient(135deg, #c084fc, #60a5fa, #f472b6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        body[data-theme="glass"] h2, body[data-theme="glass"] h3 {
            color: #c084fc !important;
        }
        body[data-theme="glass"] button {
            font-family: 'Space Grotesk', sans-serif !important;
            border-radius: 12px !important;
        }
        body[data-theme="glass"] hr {
            border-color: rgba(139, 92, 246, 0.15) !important;
        }

        /* ═══════════════════════════════════════════════════ */
        /* 7. 🌊 OCEAN BREEZE (Abismo Submarino)               */
        /*    Estética: Fundo do oceano escuro, criaturas      */
        /*    bioluminescentes, bolhas, raios de luz            */
        /* ═══════════════════════════════════════════════════ */
        body[data-theme="ocean"] {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: #010a15;
            color: #7dd3fc;
            background-image:
                radial-gradient(ellipse at 50% 0%, rgba(14, 165, 233, 0.08) 0%, transparent 60%),
                radial-gradient(ellipse at 30% 100%, rgba(6, 182, 212, 0.06) 0%, transparent 50%),
                radial-gradient(circle 3px at 20% 40%, rgba(34, 211, 238, 0.25) 0%, transparent 100%),
                radial-gradient(circle 2px at 75% 25%, rgba(34, 211, 238, 0.2) 0%, transparent 100%),
                radial-gradient(circle 4px at 60% 70%, rgba(34, 211, 238, 0.15) 0%, transparent 100%),
                radial-gradient(circle 2px at 85% 80%, rgba(34, 211, 238, 0.2) 0%, transparent 100%),
                radial-gradient(circle 3px at 10% 90%, rgba(34, 211, 238, 0.18) 0%, transparent 100%),
                radial-gradient(circle 2px at 45% 15%, rgba(56, 189, 248, 0.22) 0%, transparent 100%);
            background-attachment: fixed;
        }
        body[data-theme="ocean"] div[style*="background-color: #f8f9fa"],
        body[data-theme="ocean"] div[style*="border: 1px solid #ddd"] {
            background: linear-gradient(180deg, rgba(8, 47, 73, 0.6) 0%, rgba(8, 51, 68, 0.4) 100%) !important;
            border: 1px solid rgba(34, 211, 238, 0.2) !important;
            border-bottom: 3px solid rgba(34, 211, 238, 0.3) !important;
            border-radius: 20px !important;
            color: #7dd3fc !important;
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(34, 211, 238, 0.04) !important;
        }
        body[data-theme="ocean"] h1 {
            text-shadow: 0 0 20px rgba(34, 211, 238, 0.3);
        }
        body[data-theme="ocean"] h2, body[data-theme="ocean"] h3 {
            color: #22d3ee !important;
            text-shadow: 0 0 12px rgba(34, 211, 238, 0.25);
        }
        body[data-theme="ocean"] button {
            border-radius: 16px !important;
        }
        body[data-theme="ocean"] hr {
            border: none !important;
            height: 1px !important;
            background: linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.2), transparent) !important;
        }

        /* ═══════════════════════════════════════════════════ */
        /* 8. 👑 ROYAL GOLD (Manuscrito Medieval Iluminado)     */
        /*    Estética: Pergaminho escuro, bordas douradas     */
        /*    ornamentais, letras góticas, selos de cera       */
        /* ═══════════════════════════════════════════════════ */
        body[data-theme="royalgold"] {
            font-family: 'Cinzel', serif;
            background-color: #110805;
            color: #f4e4bc;
            background-image:
                radial-gradient(ellipse at 50% 0%, rgba(180, 130, 50, 0.06) 0%, transparent 60%),
                radial-gradient(ellipse at 50% 100%, rgba(120, 60, 20, 0.08) 0%, transparent 60%);
            background-attachment: fixed;
        }
        body[data-theme="royalgold"] div[style*="background-color: #f8f9fa"],
        body[data-theme="royalgold"] div[style*="border: 1px solid #ddd"] {
            background: linear-gradient(135deg, rgba(35, 18, 8, 0.9) 0%, rgba(50, 25, 10, 0.8) 100%) !important;
            border: 2px solid rgba(212, 175, 55, 0.35) !important;
            border-radius: 4px !important;
            color: #f4e4bc !important;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(212, 175, 55, 0.1) !important;
            position: relative;
        }
        body[data-theme="royalgold"] h1 {
            text-transform: uppercase;
            letter-spacing: 3px;
            font-weight: 700;
            color: #d4af37;
            text-shadow: 0 2px 4px rgba(0,0,0,0.5);
            border-bottom: 2px double #d4af37;
            padding-bottom: 10px;
        }
        body[data-theme="royalgold"] h2, body[data-theme="royalgold"] h3 {
            color: #d4af37 !important;
            font-variant: small-caps;
            letter-spacing: 1.5px;
        }
        body[data-theme="royalgold"] button {
            font-family: 'Cinzel', serif !important;
            border-radius: 3px !important;
            font-variant: small-caps;
            letter-spacing: 1px;
        }
        body[data-theme="royalgold"] hr {
            border: none !important;
            height: 2px !important;
            background: linear-gradient(90deg, transparent, #d4af37, transparent) !important;
            margin: 20px 0 !important;
        }

        /* ═══════════════════════════════════════════════════ */
        /* AJUSTES ESCUROS PARA DROPDOWN + RELÓGIO             */
        /* ═══════════════════════════════════════════════════ */
        body[data-theme="outono"] .theme-select-dropdown,
        body[data-theme="cyber"] .theme-select-dropdown,
        body[data-theme="emerald"] .theme-select-dropdown,
        body[data-theme="glass"] .theme-select-dropdown,
        body[data-theme="ocean"] .theme-select-dropdown,
        body[data-theme="royalgold"] .theme-select-dropdown {
            background-color: rgba(10, 10, 10, 0.85) !important;
            border-color: rgba(255,255,255,0.2) !important;
        }
        body[data-theme="outono"] .clock-btn,
        body[data-theme="cyber"] .clock-btn,
        body[data-theme="emerald"] .clock-btn,
        body[data-theme="glass"] .clock-btn,
        body[data-theme="ocean"] .clock-btn,
        body[data-theme="royalgold"] .clock-btn {
            background-color: rgba(10, 10, 10, 0.85) !important;
            border-color: rgba(255,255,255,0.2) !important;
        }

        /* ═══════════════════════════════════════════════════ */
        /* COMPONENTES EXCLUSIVOS DO TEMA OUTONO               */
        /* ═══════════════════════════════════════════════════ */
        .pulse-dot {
            width: 8px; height: 8px; border-radius: 50%;
            display: inline-block; margin-right: 4px;
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
            border-radius: 16px; padding: 18px;
        }
        .stat-val { font-size: 26px; font-weight: 800; color: #ffffff; margin-top: 4px; }
        .bar-bg { height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; overflow: hidden; margin-top: 10px; }
        .bar-fill { height: 100%; background: linear-gradient(90deg, #f59e0b, #ea580c); border-radius: 3px; }

        .segment-btn {
            font-family: inherit; padding: 10px 20px; font-size: 14px; font-weight: 600;
            border-radius: 12px; cursor: pointer; border: none; background: transparent;
            color: #a3998e; transition: all 0.25s ease;
        }
        .segment-btn.active-cleaning {
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: #000; font-weight: 700; box-shadow: 0 4px 15px rgba(245, 158, 11, 0.35);
        }
        .segment-btn.active-occupancy {
            background: linear-gradient(135deg, #10b981, #059669);
            color: #fff; font-weight: 700; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.35);
        }
        .clock-btn {
            border-radius: 50%; cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            transition: all 0.3s ease;
        }
        body[data-theme="outono"] .clock-btn.active {
            background: linear-gradient(135deg, #ea580c, #c2410c) !important;
            box-shadow: 0 0 15px rgba(234, 88, 12, 0.5) !important;
            border-color: transparent !important;
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

let currentView = "cleaning"; 
let showHistoryMode = false;  
let selectedHouse = "achada";  
let showOccupancyStats = false; 
let showPastStatsMode = false; 
let selectedSnapshotDate = null; 

let currentTheme = localStorage.getItem("al_theme") || "white";
document.body.setAttribute("data-theme", currentTheme);

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

async function fetchWithTimeout(resource, options = {}, timeout = 10000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const separator = resource.includes("?") ? "&" : "?";
    const noCacheUrl = `${resource}${separator}_t=${Date.now()}`;
    const noCacheOptions = { ...options, cache: 'no-store', signal: controller.signal };
    try {
        const response = await fetch(noCacheUrl, noCacheOptions);
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        throw error;
    }
}

window.copyFromData = function(btnElement, encodedText) {
    const text = decodeURIComponent(encodedText);
    navigator.clipboard.writeText(text).then(() => {
        const originalText = btnElement.innerText;
        btnElement.innerText = "Copiado! ✅";
        setTimeout(() => { btnElement.innerText = originalText; }, 1500);
    }).catch(err => { console.error("Erro ao copiar:", err); });
};

window.switchMainView = function(view) {
    currentView = view;
    if (currentView === "snapshots") selectedSnapshotDate = null;
    renderCurrentView();
};

window.toggleHistoryView = function() { showHistoryMode = !showHistoryMode; showCleaningPlan(); };
window.toggleOccupancyStats = function() { showOccupancyStats = !showOccupancyStats; if (!showOccupancyStats) showPastStatsMode = false; showOccupancyPlan(); };
window.togglePastStats = function() { showPastStatsMode = !showPastStatsMode; showOccupancyPlan(); };
window.selectHouse = function(house) { selectedHouse = house; showOccupancyPlan(); };
window.selectSnapshot = function(dateKey) { selectedSnapshotDate = dateKey; showSnapshotsPlan(); };

async function fetchCloudHistory() {
    try {
        const res = await fetchWithTimeout(`${WORKER_BASE_URL}?action=getHistory`, {}, 8000);
        let data = await res.json();
        cloudHistory = typeof data === 'string' ? JSON.parse(data) : data;
        if (typeof cloudHistory !== 'object' || cloudHistory === null || Array.isArray(cloudHistory)) cloudHistory = {};
    } catch (e) { console.warn("Aviso: Histórico da cloud não carregou.", e); cloudHistory = {}; }
}

async function saveToCloudHistory(newEntries) {
    try {
        await fetchWithTimeout(`${WORKER_BASE_URL}?action=saveHistory`, {
            method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newEntries)
        }, 8000);
    } catch (e) { console.error("Erro ao guardar histórico:", e); }
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
            } catch (e) { console.warn("Erro ao carregar " + calendar.name); return []; }
        });
        const [_, results] = await Promise.all([historyPromise, Promise.all(calendarPromises)]);
        globalReservations = results.flat();
        updateCloudHistory();
        renderCurrentView();
    } catch (err) { result.innerHTML = `<p style="color: red; font-weight: bold;">Erro geral: ${err.message}</p>`; }
}

function parseDate(icsDate) {
    return new Date(Number(icsDate.substring(0, 4)), Number(icsDate.substring(4, 6)) - 1, Number(icsDate.substring(6, 8)));
}

function parseICS(text, roomName) {
    const reservations = [];
    if (!text || !text.includes("BEGIN:VEVENT")) return reservations;
    const events = text.split("BEGIN:VEVENT");
    for (const event of events) {
        const start = event.match(/DTSTART(?:;[^:]*)?:(\d{8})/);
        const end = event.match(/DTEND(?:;[^:]*)?:(\d{8})/);
        if (!start || !end) continue;
        reservations.push({ room: roomName, checkIn: parseDate(start[1]), checkOut: parseDate(end[1]) });
    }
    return reservations;
}

function sameDay(a, b) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }
function addDays(date, days) { const d = new Date(date); d.setDate(d.getDate() + days); return d; }
function isSunday(date) { return date.getDay() === 0; }
function getDaysBetween(dateA, dateB) { return Math.round((dateB.getTime() - dateA.getTime()) / (1000 * 60 * 60 * 24)); }

function getCleaningInfo(reservation, allReservations) {
    const checkout = reservation.checkOut;
    const nextReservation = allReservations.filter(r => r.room === reservation.room && r.checkIn >= checkout).sort((a, b) => a.checkIn - b.checkIn)[0];
    const sameDayArrival = nextReservation && sameDay(checkout, nextReservation.checkIn);
    let bestDay = checkout;
    let isForcedSunday = false;

    if (isSunday(checkout) && sameDayArrival) { bestDay = checkout; isForcedSunday = true; }
    else {
        let startDay = isSunday(checkout) ? addDays(checkout, 1) : checkout;
        let endDay = startDay;
        if (nextReservation) { const gap = getDaysBetween(checkout, nextReservation.checkIn); if (gap <= 2) endDay = nextReservation.checkIn; }
        let bestScore = -1;
        for (let d = new Date(startDay); d <= endDay; d = addDays(d, 1)) {
            if (isSunday(d)) continue;
            let score = 0;
            allReservations.forEach(r => {
                if (sameDay(r.checkOut, d)) { score += 1; if (reservation.room.toLowerCase().includes("achada") && r.room.toLowerCase().includes("achada")) score += 10; }
            });
            if (score >= bestScore) { bestScore = score; bestDay = new Date(d); }
        }
    }
    return { date: bestDay, sunday: isForcedSunday, urgent: nextReservation ? sameDay(bestDay, nextReservation.checkIn) : false };
}

function updateCloudHistory() {
    try {
        let hasChanges = false;
        const today = new Date(); today.setHours(0, 0, 0, 0);
        let mergedHistory = {};
        if (typeof cloudHistory === 'object' && cloudHistory !== null) mergedHistory = JSON.parse(JSON.stringify(cloudHistory));

        globalReservations.forEach(reservation => {
            const info = getCleaningInfo(reservation, globalReservations);
            if (info.date <= today) {
                const dateKey = info.date.getFullYear() + "-" + (info.date.getMonth() + 1).toString().padStart(2, '0') + "-" + info.date.getDate().toString().padStart(2, '0');
                if (!mergedHistory[dateKey] || typeof mergedHistory[dateKey] !== 'object') { mergedHistory[dateKey] = { dateIso: info.date.toISOString(), rooms: [] }; hasChanges = true; }
                if (!Array.isArray(mergedHistory[dateKey].rooms)) mergedHistory[dateKey].rooms = [];
                if (!mergedHistory[dateKey].rooms.some(r => r.room === reservation.room)) { mergedHistory[dateKey].rooms.push({ room: reservation.room, sunday: info.sunday, urgent: info.urgent }); hasChanges = true; }
            }
        });

        if (!mergedHistory["_snapshots"] || typeof mergedHistory["_snapshots"] !== 'object') mergedHistory["_snapshots"] = {};
        const todayKey = today.getFullYear() + "-" + (today.getMonth() + 1).toString().padStart(2, '0') + "-" + today.getDate().toString().padStart(2, '0');

        if (!mergedHistory["_snapshots"][todayKey]) {
            let snapshotPlan = {};
            let limitDate = addDays(today, 6);
            globalReservations.forEach(reservation => {
                const info = getCleaningInfo(reservation, globalReservations);
                if (info.date >= today && info.date <= limitDate) {
                    const snapDateKey = info.date.getFullYear() + "-" + (info.date.getMonth() + 1).toString().padStart(2, '0') + "-" + info.date.getDate().toString().padStart(2, '0');
                    if (!snapshotPlan[snapDateKey]) snapshotPlan[snapDateKey] = { dateIso: info.date.toISOString(), rooms: [] };
                    if (!snapshotPlan[snapDateKey].rooms.some(r => r.room === reservation.room)) snapshotPlan[snapDateKey].rooms.push({ room: reservation.room, sunday: info.sunday, urgent: info.urgent });
                }
            });
            mergedHistory["_snapshots"][todayKey] = snapshotPlan;
            hasChanges = true;
        }
        if (hasChanges) { saveToCloudHistory(mergedHistory); cloudHistory = mergedHistory; }
    } catch (err) { console.error("Erro interno ao gerir histórico:", err); }
}

function renderNavigation() {
    const isCleaning = currentView === "cleaning";
    const isOccupancy = currentView === "occupancy";
    const isSnapshots = currentView === "snapshots";

    const topRightControls = `
        <div style="position: absolute; top: 12px; right: 12px; display: flex; align-items: center; gap: 8px; z-index: 9999;">
            <select class="theme-select-dropdown" onchange="window.setTheme(this.value)" title="Mudar Estilo" style="
                padding: 4px; font-size: 16px; border-radius: 6px;
                border: 1px solid rgba(0,0,0,0.2); background-color: rgba(255,255,255,0.9); color: #333;
                cursor: pointer; outline: none; box-shadow: 0 2px 6px rgba(0,0,0,0.15); backdrop-filter: blur(5px);
            ">
                <option value="white" title="Original" ${currentTheme === 'white' ? 'selected' : ''}>⬜</option>
                <option value="outono" title="Outono" ${currentTheme === 'outono' ? 'selected' : ''}>🍂</option>
                <option value="cyber" title="Terminal" ${currentTheme === 'cyber' ? 'selected' : ''}>🖥️</option>
                <option value="cappuccino" title="Caderno" ${currentTheme === 'cappuccino' ? 'selected' : ''}>📓</option>
                <option value="emerald" title="Floresta" ${currentTheme === 'emerald' ? 'selected' : ''}>🌿</option>
                <option value="glass" title="Cosmos" ${currentTheme === 'glass' ? 'selected' : ''}>🌌</option>
                <option value="ocean" title="Abismo" ${currentTheme === 'ocean' ? 'selected' : ''}>🌊</option>
                <option value="royalgold" title="Medieval" ${currentTheme === 'royalgold' ? 'selected' : ''}>👑</option>
            </select>
            <button onclick="window.switchMainView('snapshots')" class="clock-btn ${isSnapshots ? 'active' : ''}" style="
                font-size: 16px; background-color: ${isSnapshots ? '#e2e6ea' : 'rgba(255,255,255,0.9)'};
                border: 1px solid rgba(0,0,0,0.2); width: 34px; height: 34px;
                box-shadow: 0 2px 6px rgba(0,0,0,0.15); padding: 0; backdrop-filter: blur(5px);
            " title="Ver Previsões">🕒</button>
        </div>
    `;

    if (currentTheme === "outono") {
        return `${topRightControls}
            <div style="margin-bottom: 22px;">
                <h1 style="font-size: 26px; font-weight: 800; background: linear-gradient(135deg, #fff8f0 30%, #f59e0b 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0;">🍂 Traços de Outono</h1>
                <div style="font-size: 13px; color: #a3998e; font-weight: 500;">Gestão de Alojamento Local</div>
            </div>
            <div style="margin-bottom: 24px;">
                <div style="display: inline-flex; background: rgba(255,255,255,0.04); padding: 5px; border-radius: 16px; border: 1px solid rgba(245,158,11,0.2); gap: 4px;">
                    <button onclick="window.switchMainView('cleaning')" class="segment-btn ${isCleaning ? 'active-cleaning' : ''}">🧹 Limpezas</button>
                    <button onclick="window.switchMainView('occupancy')" class="segment-btn ${isOccupancy ? 'active-occupancy' : ''}">📊 Disponibilidade</button>
                </div>
            </div>`;
    }

    return `${topRightControls}
        <div style="margin-bottom: 20px; display: flex; gap: 10px; flex-wrap: wrap;">
            <button onclick="window.switchMainView('cleaning')" style="padding: 12px 18px; font-size: 15px; cursor: pointer; border-radius: 8px; border: 2px solid #007bff; background-color: ${isCleaning ? '#007bff' : '#ffffff'}; color: ${isCleaning ? '#ffffff' : '#007bff'}; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">🧹 Plano de Limpezas</button>
            <button onclick="window.switchMainView('occupancy')" style="padding: 12px 18px; font-size: 15px; cursor: pointer; border-radius: 8px; border: 2px solid #28a745; background-color: ${isOccupancy ? '#28a745' : '#ffffff'}; color: ${isOccupancy ? '#ffffff' : '#28a745'}; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">📊 Disponibilidade da Casa</button>
        </div>`;
}

function showSnapshotsPlan() {
    let html = renderNavigation();
    html += `<h1>🕒 Previsões Passadas</h1>`;
    const snapshots = cloudHistory["_snapshots"] || {};
    const snapshotKeys = Object.keys(snapshots).sort().reverse();

    if (snapshotKeys.length === 0) { html += `<p>Ainda não há previsões guardadas. A primeira foi gerada agora!</p>`; result.innerHTML = html; return; }

    if (!selectedSnapshotDate) {
        html += `<p style="color: #555;">Escolhe um dia para ver o plano que estava previsto nesse momento:</p>`;
        html += `<div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 20px;">`;
        snapshotKeys.forEach(key => {
            const label = new Date(key).toLocaleDateString("pt-PT", { day: "numeric", month: "long", year: "numeric" });
            html += `<button onclick="window.selectSnapshot('${key}')" style="padding: 10px 15px; font-size: 14px; cursor: pointer; border-radius: 6px; border: 1px solid #17a2b8; background-color: #f8f9fa; color: #17a2b8; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">📅 ${label}</button>`;
        });
        html += `</div>`;
    } else {
        const label = new Date(selectedSnapshotDate).toLocaleDateString("pt-PT", { day: "numeric", month: "long", year: "numeric" });
        html += `<div style="margin-bottom: 20px;"><button onclick="window.selectSnapshot(null)" style="padding: 8px 14px; font-size: 14px; cursor: pointer; border-radius: 6px; border: 1px solid #6c757d; background-color: #6c757d; color: white; font-weight: bold;">🔙 Voltar à Lista</button></div>`;
        html += `<h2 style="color: #007bff; border-bottom: 2px solid #eee; padding-bottom: 8px;">Plano do dia: <span style="color: #333;">${label}</span></h2>`;
        const plan = snapshots[selectedSnapshotDate];
        const planKeys = Object.keys(plan).sort();
        if (planKeys.length === 0) html += `<p>Sem limpezas planeadas para os 7 dias seguintes.</p>`;
        planKeys.forEach(key => {
            const day = plan[key]; const d = new Date(day.dateIso);
            let title = d.toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
            if (day.rooms.some(r => r.sunday)) title = "🔴 " + title;
            let roomsHtml = "";
            day.rooms.sort((a, b) => a.room.localeCompare(b.room)).forEach(clean => { roomsHtml += `${clean.urgent ? "⚠️" : "🧹"} ${clean.room}${clean.urgent ? " <b>(entrada no mesmo dia)</b>" : ""}<br>`; });
            html += `<div style="margin-top: 15px; margin-bottom: 15px;"><h3 style="margin: 0 0 8px 0; color: #333; font-size: 18px;">${title}</h3><div style="font-size: 15px;">${roomsHtml}</div></div><hr style="border: 0; border-top: 1px solid #eee;">`;
        });
    }
    result.innerHTML = html;
}

function showCleaningPlan() {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    let grouped = {};

    if (showHistoryMode) {
        Object.keys(cloudHistory).forEach(dateKey => {
            if (cloudHistory[dateKey] && cloudHistory[dateKey].dateIso) {
                const itemDate = new Date(cloudHistory[dateKey].dateIso);
                if (itemDate < today) grouped[dateKey] = { date: itemDate, rooms: cloudHistory[dateKey].rooms || [] };
            }
        });
    } else {
        globalReservations.forEach(reservation => {
            const info = getCleaningInfo(reservation, globalReservations);
            if (info.date >= today) {
                const dateKey = info.date.getFullYear() + "-" + (info.date.getMonth() + 1).toString().padStart(2, '0') + "-" + info.date.getDate().toString().padStart(2, '0');
                if (!grouped[dateKey]) grouped[dateKey] = { date: info.date, rooms: [] };
                if (!grouped[dateKey].rooms.some(r => r.room === reservation.room)) grouped[dateKey].rooms.push({ room: reservation.room, sunday: info.sunday, urgent: info.urgent });
            }
        });
    }

    let sortedKeys = Object.keys(grouped).sort();
    if (showHistoryMode) sortedKeys.reverse();

    let html = renderNavigation();
    html += `<div style="margin-bottom: 25px;"><button onclick="window.toggleHistoryView()" style="padding: 10px 16px; font-size: 14px; cursor: pointer; border-radius: 6px; border: 1px solid #6c757d; background-color: #6c757d; color: white; font-weight: bold;">${showHistoryMode ? "📅 Ver Próximas Limpezas" : "📜 Ver Dias Anteriores"}</button></div>`;
    html += `<h1>${showHistoryMode ? "📜 Histórico de Limpezas (Cloud)" : "🧹 Plano de Limpezas"}</h1>`;

    if (sortedKeys.length === 0) html += `<p>Não há limpezas registadas ${showHistoryMode ? 'anteriores a hoje no histórico' : 'agendadas'}.</p>`;

    sortedKeys.forEach(key => {
        const day = grouped[key];
        let title = day.date.toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
        if (day.rooms.some(r => r.sunday)) title = "🔴 " + title;

        let dateForCopyPt = title.replace("🔴 ", ""); dateForCopyPt = dateForCopyPt.charAt(0).toUpperCase() + dateForCopyPt.slice(1);
        let copyLinesPt = [`🧹 Limpezas - ${dateForCopyPt}:`];
        let dateForCopyEs = day.date.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
        dateForCopyEs = dateForCopyEs.charAt(0).toUpperCase() + dateForCopyEs.slice(1);
        let copyLinesEs = [`🧹 Limpiezas - ${dateForCopyEs}:`];
        let roomsHtml = "";

        day.rooms.sort((a, b) => a.room.localeCompare(b.room)).forEach(clean => {
            const hasCheckout = globalReservations.some(r => r.room === clean.room && sameDay(r.checkOut, day.date));
            const hasCheckin = clean.urgent || globalReservations.some(r => r.room === clean.room && sameDay(r.checkIn, day.date));
            let tagTextPt = "", tagTextEs = "", tagHtml = "";
            if (hasCheckout && hasCheckin) { tagTextPt = " (sai e entra)"; tagTextEs = " (sale y entra)"; tagHtml = " <b>(sai e entra)</b>"; }
            else if (hasCheckout) { tagTextPt = " (sai hoje)"; tagTextEs = " (sale hoy)"; tagHtml = " <b>(sai hoje)</b>"; }
            else if (hasCheckin) { tagTextPt = " (entrada hoje)"; tagTextEs = " (entrada hoy)"; tagHtml = " <b>(entrada hoje)</b>"; }
            const emoji = hasCheckin ? "⚠️" : "🧹";
            copyLinesPt.push(`${emoji} ${clean.room}${tagTextPt}`); copyLinesEs.push(`${emoji} ${clean.room}${tagTextEs}`);
            roomsHtml += `${emoji} ${clean.room}${tagHtml}<br>`;
        });

        const encodedPt = encodeURIComponent(copyLinesPt.join("\n"));
        const encodedEs = encodeURIComponent(copyLinesEs.join("\n"));

        html += `
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-top: 15px;">
                <h2 style="margin: 0;">${title}</h2>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <button onclick="window.copyFromData(this, '${encodedPt}')" style="padding: 6px 12px; font-size: 13px; cursor: pointer; border-radius: 6px; border: 1px solid #28a745; background-color: #28a745; color: white; font-weight: bold;">🇵🇹 Copiar PT</button>
                    <button onclick="window.copyFromData(this, '${encodedEs}')" style="padding: 6px 12px; font-size: 13px; cursor: pointer; border-radius: 6px; border: 1px solid #17a2b8; background-color: #17a2b8; color: white; font-weight: bold;">🇪🇸 Copiar ES</button>
                </div>
            </div>
            <div style="margin-top: 8px;">${roomsHtml}</div><hr>`;
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
    let minDate = new Date(); let maxDate = new Date();
    houseReservations.forEach(r => { if (r.checkIn < minDate) minDate = new Date(r.checkIn); if (r.checkOut > maxDate) maxDate = new Date(r.checkOut); });
    let current = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
    let end = new Date(maxDate.getFullYear(), maxDate.getMonth() + 1, 0);
    const stats = {};
    while (current <= end) {
        const monthKey = current.getFullYear() + "-" + String(current.getMonth() + 1).padStart(2, '0');
        const monthLabel = current.toLocaleDateString("pt-PT", { month: "long", year: "numeric" });
        if (!stats[monthKey]) stats[monthKey] = { label: monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1), dormidas: 0, checkins: 0, checkouts: 0, diasEsgotados: 0, totalCapacity: rooms.length * new Date(current.getFullYear(), current.getMonth() + 1, 0).getDate() };
        let occupiedRoomsToday = 0;
        rooms.forEach(room => {
            const isOccupied = houseReservations.some(r => { if (r.room !== room) return false; const cIn = new Date(r.checkIn); cIn.setHours(0,0,0,0); const cOut = new Date(r.checkOut); cOut.setHours(0,0,0,0); return current >= cIn && current < cOut; });
            if (isOccupied) { stats[monthKey].dormidas++; occupiedRoomsToday++; }
            if (houseReservations.some(r => r.room === room && sameDay(r.checkIn, current))) stats[monthKey].checkins++;
        });
        if (occupiedRoomsToday === rooms.length) stats[monthKey].diasEsgotados++;
        current = addDays(current, 1);
    }
    return stats;
}

function showOccupancyPlan() {
    const houseRooms = getHouseRooms(selectedHouse);
    const totalRooms = houseRooms.length;
    const houseLabels = { achada: "Achada (6 Quartos)", impasse: "Impasse (3 Quartos)", vizinho: "Vizinho (3 Quartos)" };

    let html = renderNavigation();
    html += `
        <div style="margin-bottom: 25px; display: flex; gap: 8px; flex-wrap: wrap;">
            <button onclick="window.selectHouse('achada')" style="padding: 10px 16px; font-size: 14px; cursor: pointer; border-radius: 6px; border: 2px solid #17a2b8; background-color: ${selectedHouse === 'achada' ? '#17a2b8' : '#ffffff'}; color: ${selectedHouse === 'achada' ? '#ffffff' : '#17a2b8'}; font-weight: bold;">🏡 Achada</button>
            <button onclick="window.selectHouse('impasse')" style="padding: 10px 16px; font-size: 14px; cursor: pointer; border-radius: 6px; border: 2px solid #17a2b8; background-color: ${selectedHouse === 'impasse' ? '#17a2b8' : '#ffffff'}; color: ${selectedHouse === 'impasse' ? '#ffffff' : '#17a2b8'}; font-weight: bold;">🏡 Impasse</button>
            <button onclick="window.selectHouse('vizinho')" style="padding: 10px 16px; font-size: 14px; cursor: pointer; border-radius: 6px; border: 2px solid #17a2b8; background-color: ${selectedHouse === 'vizinho' ? '#17a2b8' : '#ffffff'}; color: ${selectedHouse === 'vizinho' ? '#ffffff' : '#17a2b8'}; font-weight: bold;">🏡 Vizinho</button>
        </div>
        <h1>📊 Ocupação - ${houseLabels[selectedHouse]}</h1>
        <div style="margin-bottom: 20px; display: flex; gap: 10px; flex-wrap: wrap;">
            <button onclick="window.toggleOccupancyStats()" style="padding: 10px 16px; font-size: 14px; cursor: pointer; border-radius: 6px; border: 1px solid #ffc107; background-color: ${showOccupancyStats ? '#e0a800' : '#ffc107'}; color: #333; font-weight: bold;">${showOccupancyStats ? '🔙 Ocultar Estatísticas' : '📈 Ver Estatísticas Mensais'}</button>
            ${showOccupancyStats ? `<button onclick="window.togglePastStats()" style="padding: 10px 16px; font-size: 14px; cursor: pointer; border-radius: 6px; border: 1px solid #6c757d; background-color: ${showPastStatsMode ? '#5a6268' : '#6c757d'}; color: white; font-weight: bold;">${showPastStatsMode ? '📅 Ver Meses Atuais e Futuros' : '📜 Ver Meses Passados'}</button>` : ''}
        </div>`;

    if (showOccupancyStats) {
        const stats = calculateHouseStats(selectedHouse);
        let statKeys = Object.keys(stats);
        const currentMonthKey = new Date().getFullYear() + "-" + String(new Date().getMonth() + 1).padStart(2, '0');
        statKeys = showPastStatsMode ? statKeys.filter(key => key < currentMonthKey).sort().reverse() : statKeys.filter(key => key >= currentMonthKey).sort();

        if (statKeys.length === 0) { html += `<p>Sem dados de estatísticas para mostrar.</p><hr>`; }
        else {
            html += `<div style="display: flex; flex-wrap: wrap; gap: 15px; margin-bottom: 25px;">`;
            statKeys.forEach(key => {
                const s = stats[key]; const taxa = s.totalCapacity > 0 ? Math.round((s.dormidas / s.totalCapacity) * 100) : 0;
                if (currentTheme === "outono") {
                    html += `<div class="stat-box" style="flex: 1; min-width: 220px;"><div style="color: #fbbf24; font-weight: 700; font-size: 15px; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 6px;">${s.label}</div><div class="stat-val">${taxa}% <span style="font-size: 13px; font-weight: 500; color: #a3998e;">ocupação</span></div><div class="bar-bg"><div class="bar-fill" style="width: ${taxa}%;"></div></div><div style="margin-top: 12px; font-size: 13px; color: #a3998e; display: flex; flex-direction: column; gap: 4px;"><span>🌙 Dormidas: <strong style="color: #fff;">${s.dormidas}</strong> / ${s.totalCapacity}</span><span>🧳 Check-ins: <strong style="color: #fff;">${s.checkins}</strong></span><span>🔥 Dias 100% cheios: <strong style="color: #34d399;">${s.diasEsgotados}</strong></span></div></div>`;
                } else {
                    html += `<div style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; flex: 1; min-width: 220px; background-color: #f8f9fa; box-shadow: 0 2px 4px rgba(0,0,0,0.05);"><h3 style="margin-top: 0; color: #007bff; text-transform: capitalize; border-bottom: 1px solid #ccc; padding-bottom: 8px;">${s.label}</h3><p style="margin: 8px 0; font-size: 15px;"><strong>🛏️ Ocupação:</strong> ${taxa}%</p><p style="margin: 8px 0; font-size: 15px;"><strong>🌙 Dormidas:</strong> ${s.dormidas} <span style="font-size: 12px; color: #666;">(de ${s.totalCapacity})</span></p><p style="margin: 8px 0; font-size: 15px;"><strong>🧳 Check-ins:</strong> ${s.checkins}</p><p style="margin: 8px 0; font-size: 15px;"><strong>🔥 Dias 100% cheios:</strong> ${s.diasEsgotados}</p></div>`;
                }
            });
            html += `</div>`;
        }
    }

    html += `<hr>`;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    let maxDate = addDays(today, 60);
    globalReservations.forEach(r => { if (houseRooms.includes(r.room)) { const outDate = new Date(r.checkOut); outDate.setHours(0,0,0,0); if (outDate > maxDate) maxDate = outDate; } });
    const totalDays = getDaysBetween(today, maxDate) + 1;

    for (let i = 0; i < totalDays; i++) {
        const currentDate = addDays(today, i);
        let roomDetails = [];
        houseRooms.forEach(roomName => {
            const hasCheckout = globalReservations.some(r => r.room === roomName && sameDay(r.checkOut, currentDate));
            const hasCheckin = globalReservations.some(r => r.room === roomName && sameDay(r.checkIn, currentDate));
            const isOccupied = globalReservations.some(r => { if (r.room !== roomName) return false; const cI = new Date(r.checkIn); cI.setHours(0,0,0,0); const cO = new Date(r.checkOut); cO.setHours(0,0,0,0); return currentDate >= cI && currentDate < cO; });
            if (isOccupied || hasCheckout || hasCheckin) {
                let tag = "";
                if (hasCheckout && hasCheckin) tag = " <b>(sai e entra)</b>"; else if (hasCheckout) tag = " <b>(sai)</b>"; else if (hasCheckin) tag = " <b>(entra)</b>";
                roomDetails.push(`${roomName}${tag}`);
            }
        });
        const count = roomDetails.length;
        html += `<h2>${currentDate.toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</h2>`;
        if (count === 0) html += `<div style="font-size: 18px; font-weight: bold; color: #28a745; margin-bottom: 5px;">0 🟢</div>`;
        else { html += `<div style="font-size: 18px; font-weight: bold; color: #dc3545; margin-bottom: 5px;">${count} / ${totalRooms} 🔴</div>`; html += `<div style="font-size: 14px; color: #333;">Ocupados: ${roomDetails.join(", ")}</div>`; }
        html += "<hr>";
    }
    result.innerHTML = html;
}

loadCalendars();
