// ══════════════════════════════════════════════════════════════════════
// CASAS DO MARTIM - VISTA DEDICADA DO AJUDANTE (ESPAÑOL / PORTUGUÊS)
// Ficheiro autónomo e independente: sem funções de administração.
// ══════════════════════════════════════════════════════════════════════

// 1. Injetor de Temas Visuais
(function injectThemes() {
    if (document.getElementById("al-worker-themes")) return;

    if (!document.getElementById("al-theme-overlay")) {
        const overlay = document.createElement("div");
        overlay.id = "al-theme-overlay";
        document.body.appendChild(overlay);
    }

    const style = document.createElement("style");
    style.id = "al-worker-themes";
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;700&family=Outfit:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;600;700&display=swap');

        * { box-sizing: border-box; }

        body {
            margin: 0;
            padding: 20px 16px 30px 16px;
            min-height: 100vh;
            transition: background-color 0.4s ease, color 0.3s ease;
            position: relative;
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: #f4f6f8;
            color: #1e293b;
        }

        #result { max-width: 920px; margin: 0 auto; position: relative; z-index: 2; }

        #al-theme-overlay {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            pointer-events: none;
            z-index: 1;
            opacity: 0;
            transition: opacity 0.6s ease;
        }

        .theme-popup-wrapper { position: relative; }
        .theme-popup {
            position: absolute;
            right: 0;
            top: 42px;
            background: rgba(255,255,255,0.98);
            border: 1px solid rgba(0,0,0,0.1);
            border-radius: 14px;
            padding: 6px;
            z-index: 1000;
            min-width: 175px;
            box-shadow: 0 12px 45px rgba(0,0,0,0.18);
            backdrop-filter: blur(20px);
            animation: popupFadeIn 0.18s ease;
        }
        .theme-popup-item {
            padding: 9px 14px;
            cursor: pointer;
            border-radius: 10px;
            font-size: 14px;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
            transition: background 0.12s ease;
            white-space: nowrap;
            color: inherit;
        }
        .theme-popup-item:hover { background: rgba(0,0,0,0.06); }
        .theme-popup-item.active { background: rgba(0,120,255,0.1); font-weight: 700; }
        @keyframes popupFadeIn {
            from { opacity: 0; transform: translateY(-6px) scale(0.97); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .clock-btn {
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            font-size: 16px;
            width: 36px;
            height: 36px;
            padding: 0;
            border: 1px solid rgba(0,0,0,0.2);
            background-color: rgba(255,255,255,0.9);
            box-shadow: 0 3px 8px rgba(0,0,0,0.18);
            backdrop-filter: blur(5px);
            flex-shrink: 0;
        }
        .clock-btn:hover { transform: scale(1.08); box-shadow: 0 4px 12px rgba(0,0,0,0.25); }

        .top-navbar-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 12px;
            position: relative;
        }

        .al-badge-title {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: linear-gradient(135deg, #007bff, #0056b3);
            color: #ffffff;
            font-size: 17px;
            font-weight: 800;
            padding: 9px 18px;
            border-radius: 50px;
            box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
            letter-spacing: 0.3px;
        }

        .floating-menu-container {
            display: flex;
            align-items: center;
            gap: 8px;
            position: relative;
        }

        .menu-trigger-btn {
            width: 44px;
            height: 44px;
            padding: 0;
            border-radius: 12px;
            border: 2px solid #007bff;
            background: #ffffff;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 3px 10px rgba(0,0,0,0.15);
            transition: transform 0.25s ease, box-shadow 0.25s ease;
            overflow: hidden;
            flex-shrink: 0;
        }
        .menu-trigger-btn:hover { transform: scale(1.05); box-shadow: 0 6px 16px rgba(0,0,0,0.2); }
        .menu-trigger-img { width: 100%; height: 100%; object-fit: cover; border-radius: 10px; }

        .floating-sub-items {
            display: flex;
            align-items: center;
            gap: 8px;
            transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1), transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), max-width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
            overflow: visible;
        }
        .menu-collapsed { opacity: 0; max-width: 0; pointer-events: none; transform: translateX(12px) scale(0.92); margin: 0; }
        .menu-expanded { opacity: 1; max-width: 320px; pointer-events: auto; transform: translateX(0) scale(1); }

        /* Tema Outono */
        body[data-theme="outono"] {
            background-color: #1c1917;
            color: #f5f5f4;
        }
        body[data-theme="outono"] div[style*="background-color: #f8f9fa"],
        body[data-theme="outono"] div[style*="border: 1px solid #ddd"] {
            background-color: #292524 !important;
            border-color: rgba(255,255,255,0.08) !important;
            color: #f5f5f4 !important;
        }
        body[data-theme="outono"] div[style*="background: rgba(255,255,255,0.7)"],
        body[data-theme="outono"] div[style*="background: rgba(255,255,255,0.85)"],
        body[data-theme="outono"] div[style*="background: rgba(255,255,255,0.9)"] {
            background: rgba(41, 37, 36, 0.85) !important;
            color: #f5f5f4 !important;
            border-color: rgba(255,255,255,0.08) !important;
        }
        body[data-theme="outono"] strong[style*="color: #111"],
        body[data-theme="outono"] h2[style*="color: #333"],
        body[data-theme="outono"] h3[style*="color: #333"] {
            color: #f5f5f4 !important;
        }

        /* ── Modal de Confirmação ── */
        #al-confirm-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.55);
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            animation: alOverlayIn 0.22s ease;
        }
        @keyframes alOverlayIn {
            from { opacity: 0; }
            to   { opacity: 1; }
        }
        #al-confirm-box {
            background: #ffffff;
            border-radius: 24px;
            padding: 28px 28px 22px 28px;
            max-width: 380px;
            width: 100%;
            box-shadow: 0 30px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.15);
            animation: alBoxIn 0.28s cubic-bezier(0.34,1.56,0.64,1);
            text-align: center;
        }
        @keyframes alBoxIn {
            from { opacity: 0; transform: scale(0.82) translateY(20px); }
            to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }
        #al-confirm-icon {
            font-size: 52px;
            line-height: 1;
            margin-bottom: 14px;
            display: block;
            filter: drop-shadow(0 4px 10px rgba(0,0,0,0.15));
        }
        #al-confirm-title {
            font-size: 18px;
            font-weight: 800;
            color: #1e293b;
            margin-bottom: 10px;
            line-height: 1.3;
            font-family: 'Plus Jakarta Sans', sans-serif;
        }
        #al-confirm-detail {
            font-size: 14px;
            color: #64748b;
            margin-bottom: 22px;
            line-height: 1.55;
            font-family: 'Plus Jakarta Sans', sans-serif;
        }
        #al-confirm-detail strong { color: #1e293b; }
        .al-confirm-btns {
            display: flex;
            gap: 10px;
            justify-content: center;
        }
        #al-confirm-cancel {
            flex: 1;
            padding: 13px 16px;
            font-size: 14px;
            font-weight: 700;
            border-radius: 14px;
            border: 2px solid #e2e8f0;
            background: #f8fafc;
            color: #64748b;
            cursor: pointer;
            font-family: 'Plus Jakarta Sans', sans-serif;
            transition: background 0.15s, border-color 0.15s;
        }
        #al-confirm-cancel:hover { background: #f1f5f9; border-color: #cbd5e1; }
        #al-confirm-ok {
            flex: 1.4;
            padding: 13px 16px;
            font-size: 15px;
            font-weight: 800;
            border-radius: 14px;
            border: none;
            cursor: pointer;
            font-family: 'Plus Jakarta Sans', sans-serif;
            transition: transform 0.15s, box-shadow 0.15s, filter 0.15s;
        }
        #al-confirm-ok:hover { transform: translateY(-2px); filter: brightness(1.06); }
        #al-confirm-ok:active { transform: translateY(0px); }
    `;
    document.head.appendChild(style);
})();

// 2. Temas Disponíveis
const THEME_LIST = [
    { key: 'white',      label: 'Original ⬜',  emoji: '⬜' },
    { key: 'outono',     label: 'Outono 🍂',    emoji: '🍂' }
];

let currentTheme = localStorage.getItem("al_theme") || "white";
document.body.setAttribute("data-theme", currentTheme);
let showFloatingSubMenu = false;
let showThemePopup = false;

function getThemeEmoji(key) {
    const t = THEME_LIST.find(x => x.key === key);
    return t ? t.emoji : '⬜';
}

function buildThemePopupHTML() {
    if (!showThemePopup) return '';
    return `
        <div class="theme-popup">
            ${THEME_LIST.map(t => `
                <div class="theme-popup-item ${currentTheme === t.key ? 'active' : ''}" onclick="window.selectTheme('${t.key}')">
                    ${t.emoji} ${t.label}
                </div>
            `).join('')}
        </div>
    `;
}

window.toggleFloatingSubMenu = function(event) {
    if (event) event.stopPropagation();
    showFloatingSubMenu = !showFloatingSubMenu;
    if (!showFloatingSubMenu) showThemePopup = false;
    showWorkerView();
};

window.toggleThemePopup = function(event) {
    if (event) event.stopPropagation();
    showThemePopup = !showThemePopup;
    showWorkerView();
};

window.selectTheme = function(themeKey) {
    currentTheme = themeKey;
    try { localStorage.setItem("al_theme", themeKey); } catch(e) {}
    document.body.setAttribute("data-theme", currentTheme);
    showThemePopup = false;
    showWorkerView();
};

document.addEventListener('click', function(e) {
    if (showFloatingSubMenu && !e.target.closest('.floating-menu-container')) {
        showFloatingSubMenu = false;
        showThemePopup = false;
        showWorkerView();
    }
});

// 3. Constantes e Configurações
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

const ROOM_BEDS_INFO = {
    "Vizinho 1": { pt: "2 camas de solteiro coladas", es: "2 camas individuales juntas" },
    "Vizinho 2": { pt: "1 cama de solteiro", es: "1 cama individual" },
    "Vizinho 3": { pt: "1 cama de casal", es: "1 cama de matrimonio" },
    "Achada 1":  { pt: "1 cama de casal", es: "1 cama de matrimonio" },
    "Achada 2":  { pt: "1 cama de solteiro", es: "1 cama individual" },
    "Achada 3":  { pt: "1 cama de casal", es: "1 cama de matrimonio" },
    "Achada 4":  { pt: "1 cama de casal", es: "1 cama de matrimonio" },
    "Achada 5":  { pt: "1 cama de casal", es: "1 cama de matrimonio" },
    "Achada 6":  { pt: "3 camas de solteiro", es: "3 camas individuales" },
    "Impasse 2": { pt: "1 cama de casal", es: "1 cama de matrimonio" },
    "Impasse 3": { pt: "2 camas de solteiro", es: "2 camas individuales" },
    "Impasse 4": { pt: "2 camas de solteiro", es: "2 camas individuales" }
};

const result = document.getElementById("result");
let globalReservations = [];
let cloudHistory = {};
let blockedDates = [];
let customCleanings = [];
let suppressedCleanings = [];

// Idioma do Ajudante (Espanhol Default)
let workerLanguage = "es";
try {
    const savedWorkerLang = localStorage.getItem("al_worker_lang");
    if (savedWorkerLang === "pt" || savedWorkerLang === "es") {
        workerLanguage = savedWorkerLang;
    }
} catch(e) {}

window.setWorkerLanguage = function(lang) {
    workerLanguage = (lang === "pt") ? "pt" : "es";
    try {
        localStorage.setItem("al_worker_lang", workerLanguage);
    } catch(e) {}
    showWorkerView();
};

let showWorkerPaymentsHistory = false;
window.toggleWorkerPaymentsTab = function(historyMode) {
    showWorkerPaymentsHistory = !!historyMode;
    showWorkerView();
};

let showCheckInOptions = false;
let showCheckOutOptions = false;

window.toggleCheckInOptions = function(event) {
    if (event) event.stopPropagation();
    showCheckInOptions = !showCheckInOptions;
    showCheckOutOptions = false;
    showWorkerView();
};

window.toggleCheckOutOptions = function(event) {
    if (event) event.stopPropagation();
    showCheckOutOptions = !showCheckOutOptions;
    showCheckInOptions = false;
    showWorkerView();
};

// ── Modal bonito de confirmação ──
function workerConfirm({ icon, title, detail, okLabel, okColor, okShadow, cancelLabel }) {
    return new Promise(resolve => {
        const overlay = document.createElement('div');
        overlay.id = 'al-confirm-overlay';
        overlay.innerHTML = `
            <div id="al-confirm-box">
                <span id="al-confirm-icon">${icon}</span>
                <div id="al-confirm-title">${title}</div>
                ${detail ? `<div id="al-confirm-detail">${detail}</div>` : ''}
                <div class="al-confirm-btns">
                    <button id="al-confirm-cancel">${cancelLabel || '✖ Cancelar'}</button>
                    <button id="al-confirm-ok" style="background: ${okColor || 'linear-gradient(135deg,#10b981,#059669)'}; color: #fff; box-shadow: ${okShadow || '0 6px 20px rgba(16,185,129,0.4)'};">${okLabel || '✔ Confirmar'}</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        const cleanup = (result) => {
            overlay.style.animation = 'alOverlayIn 0.18s ease reverse';
            overlay.querySelector('#al-confirm-box').style.animation = 'alBoxIn 0.18s ease reverse';
            setTimeout(() => { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 180);
            resolve(result);
        };

        overlay.querySelector('#al-confirm-ok').addEventListener('click', () => cleanup(true));
        overlay.querySelector('#al-confirm-cancel').addEventListener('click', () => cleanup(false));
        overlay.addEventListener('click', (e) => { if (e.target === overlay) cleanup(false); });
    });
}

window.recordWorkerCheckIn = async function(minutesAgo) {
    const isEs = workerLanguage === "es";
    const targetMs = Date.now() - (minutesAgo * 60 * 1000);
    const targetDate = new Date(targetMs);
    const timeStr = targetDate.toLocaleTimeString(isEs ? "es-ES" : "pt-PT", { hour: "2-digit", minute: "2-digit" });

    const confirmed = await workerConfirm({
        icon: '🟢',
        title: isEs ? `¿Empezar el día a las <strong>${timeStr}</strong>?` : `Começar o dia às <strong>${timeStr}</strong>?`,
        detail: isEs ? 'Vas a marcar tu hora de entrada. Asegúrate de que la hora es correcta.' : 'Vais marcar a vossa hora de entrada. Confirma que a hora está certa.',
        okLabel: isEs ? '✔ Sim, Empezar' : '✔ Sim, Começar',
        okColor: 'linear-gradient(135deg, #10b981, #059669)',
        okShadow: '0 6px 20px rgba(16,185,129,0.45)',
        cancelLabel: isEs ? '✖ Cancelar' : '✖ Cancelar'
    });
    if (!confirmed) return;

    const today = new Date();
    today.setHours(0,0,0,0);
    const todayStr = formatDateKey(today);

    if (!cloudHistory["_timeclock"] || typeof cloudHistory["_timeclock"] !== 'object') {
        cloudHistory["_timeclock"] = {};
    }

    cloudHistory["_timeclock"][todayStr] = {
        status: "in_progress",
        inTime: timeStr,
        inTimestamp: targetMs,
        dateKey: todayStr
    };

    showCheckInOptions = false;
    try { localStorage.setItem("al_cloud_history_backup", JSON.stringify(cloudHistory)); } catch(e) {}
    showWorkerView();
    await saveToCloudHistory(cloudHistory);
};

window.recordWorkerCheckOut = async function(minutesAgo) {
    const isEs = workerLanguage === "es";
    const today = new Date();
    today.setHours(0,0,0,0);
    const todayStr = formatDateKey(today);

    const shift = (cloudHistory["_timeclock"] && cloudHistory["_timeclock"][todayStr]) ? cloudHistory["_timeclock"][todayStr] : null;
    if (!shift || !shift.inTimestamp) {
        alert(isEs ? "Error: No se encontró la hora de entrada." : "Erro: Não foi encontrada a hora de entrada.");
        return;
    }

    const outMs = Date.now() - (minutesAgo * 60 * 1000);
    const outDate = new Date(outMs);
    const outTimeStr = outDate.toLocaleTimeString(isEs ? "es-ES" : "pt-PT", { hour: "2-digit", minute: "2-digit" });

    const diffMs = outMs - shift.inTimestamp;
    if (diffMs <= 0) {
        alert(isEs ? "La hora de salida no puede ser anterior a la hora de entrada." : "A hora de saída não pode ser anterior à hora de entrada.");
        return;
    }

    const diffMinutes = Math.round(diffMs / (60 * 1000));
    let hours = Math.round((diffMinutes / 60) * 100) / 100;
    if (hours < 0.1) hours = 0.1;
    const hoursFormatted = hours.toString().replace('.', ',');
    const totalAmount = Math.round(hours * 11 * 100) / 100;
    const amountFormatted = totalAmount.toLocaleString(isEs ? 'es-ES' : 'pt-PT', { style: 'currency', currency: 'EUR' });

    const confirmed = await workerConfirm({
        icon: '🔴',
        title: isEs ? `¿Terminar el día a las <strong>${outTimeStr}</strong>?` : `Terminar o dia às <strong>${outTimeStr}</strong>?`,
        detail: isEs
            ? `Entrada: <strong>${shift.inTime}</strong> · Saída: <strong>${outTimeStr}</strong><br>⏱️ <strong>${hoursFormatted} horas</strong> · 💰 <strong>${amountFormatted}</strong>`
            : `Entrada: <strong>${shift.inTime}</strong> · Saída: <strong>${outTimeStr}</strong><br>⏱️ <strong>${hoursFormatted} horas</strong> · 💰 <strong>${amountFormatted}</strong>`,
        okLabel: isEs ? '✔ Sim, Terminar' : '✔ Sim, Terminar',
        okColor: 'linear-gradient(135deg, #ef4444, #dc2626)',
        okShadow: '0 6px 20px rgba(239,68,68,0.45)',
        cancelLabel: isEs ? '✖ Cancelar' : '✖ Cancelar'
    });
    if (!confirmed) return;

    const pData = getPayrollData();
    const newWorkId = "work_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7);
    const newWorkEntry = {
        id: newWorkId,
        dateKey: todayStr,
        hours: hours,
        extraMoney: 0,
        rate: 11,
        amount: totalAmount,
        note: isEs ? `Registrado por la ayudante (${shift.inTime} - ${outTimeStr})` : `Registado pela ajudante (${shift.inTime} - ${outTimeStr})`,
        byWorker: true,
        checkInTime: shift.inTime,
        checkOutTime: outTimeStr,
        createdAt: new Date().toISOString()
    };

    pData.pendingWork.push(newWorkEntry);
    pData.pendingWork.sort((a, b) => b.dateKey.localeCompare(a.dateKey));

    if (!cloudHistory["_timeclock"] || typeof cloudHistory["_timeclock"] !== 'object') {
        cloudHistory["_timeclock"] = {};
    }
    cloudHistory["_timeclock"][todayStr] = {
        status: "completed",
        inTime: shift.inTime,
        outTime: outTimeStr,
        hours: hours,
        amount: totalAmount,
        workId: newWorkId,
        dateKey: todayStr
    };

    cloudHistory["_payroll"] = pData;
    try { localStorage.setItem("al_payroll_backup", JSON.stringify(pData)); } catch(e) {}
    showCheckOutOptions = false;
    try { localStorage.setItem("al_cloud_history_backup", JSON.stringify(cloudHistory)); } catch(e) {}
    showWorkerView();
    await saveToCloudHistory(cloudHistory);
};

window.resetWorkerShift = async function() {
    const isEs = workerLanguage === "es";
    const today = new Date();
    today.setHours(0,0,0,0);
    const todayStr = formatDateKey(today);

    const confirmed = await workerConfirm({
        icon: '⚠️',
        title: isEs ? '¿Reiniciar el horario de hoy?' : 'Reiniciar o horário de hoje?',
        detail: isEs ? 'Esto borrará el registro de entrada de hoy. Tendrás que volver a marcar.' : 'Isto vai apagar o registo de entrada de hoje. Terás de marcar de novo.',
        okLabel: isEs ? '🗑️ Sim, Reiniciar' : '🗑️ Sim, Reiniciar',
        okColor: 'linear-gradient(135deg, #f59e0b, #d97706)',
        okShadow: '0 6px 20px rgba(245,158,11,0.45)',
        cancelLabel: isEs ? '✖ Cancelar' : '✖ Cancelar'
    });
    if (!confirmed) return;

    if (cloudHistory["_timeclock"] && cloudHistory["_timeclock"][todayStr]) {
        const shift = cloudHistory["_timeclock"][todayStr];
        if (shift.workId) {
            const pData = getPayrollData();
            pData.pendingWork = pData.pendingWork.filter(w => w.id !== shift.workId);
        }
        delete cloudHistory["_timeclock"][todayStr];
    }

    showCheckInOptions = false;
    showCheckOutOptions = false;
    try { localStorage.setItem("al_cloud_history_backup", JSON.stringify(cloudHistory)); } catch(e) {}
    showWorkerView();
    await saveToCloudHistory(cloudHistory);
};

// 4. Utilitários de Data e Calendário
function parseDate(d) {
    return new Date(Number(d.substring(0,4)), Number(d.substring(4,6))-1, Number(d.substring(6,8)));
}

function parseDateKey(key) {
    if (!key || typeof key !== 'string') return new Date();
    const parts = key.split("-");
    if (parts.length < 3) return new Date(key);
    return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
}

function sameDay(a, b) { return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate(); }
function addDays(date, days) { const d = new Date(date); d.setDate(d.getDate()+days); return d; }
function isSunday(date) { return date.getDay()===0; }

function formatDateKey(date) {
    return date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, '0') + "-" + date.getDate().toString().padStart(2, '0');
}

function parseICS(text, roomName) {
    const r = [];
    if (!text || !text.includes("BEGIN:VEVENT")) return r;
    for (const event of text.split("BEGIN:VEVENT")) {
        const summary = event.match(/SUMMARY:(.*)/i);
        if (summary && /not available|unavailable|blocked|indispon/i.test(summary[1].trim())) {
            continue;
        }
        const s = event.match(/DTSTART(?:;[^:]*)?:(\d{8})/);
        const e = event.match(/DTEND(?:;[^:]*)?:(\d{8})/);
        if (s && e) {
            const checkIn = parseDate(s[1]);
            const checkOut = parseDate(e[1]);
            if (checkOut > checkIn) {
                r.push({ room: roomName, checkIn, checkOut });
            }
        }
    }
    return r;
}

function getGarbageTasks(date) {
    const dayOfWeek = date.getDay();
    const tasks = [];
    if (dayOfWeek === 1) {
        tasks.push({ pt: "♻️ Colocar lixo reciclável (Impasse)", es: "♻️ Sacar basura reciclable (Impasse)" });
        tasks.push({ pt: "🗑️ Colocar lixo (Impasse)", es: "🗑️ Sacar basura (Impasse)" });
        tasks.push({ pt: "🗑️ Colocar lixo (Achada)", es: "🗑️ Sacar basura (Achada)" });
    } else if (dayOfWeek === 3) {
        tasks.push({ pt: "♻️ Colocar lixo reciclável (Achada)", es: "♻️ Sacar basura reciclable (Achada)" });
    } else if (dayOfWeek === 4) {
        tasks.push({ pt: "🗑️ Colocar lixo (Impasse)", es: "🗑️ Sacar basura (Impasse)" });
    } else if (dayOfWeek === 5) {
        tasks.push({ pt: "🗑️ Colocar lixo (Achada)", es: "🗑️ Sacar basura (Achada)" });
    }
    return tasks;
}

function isBlockedDate(date) {
    return blockedDates.includes(formatDateKey(date));
}

function isSuppressedCleaning(dateKey, room) {
    return suppressedCleanings.some(s => s.dateKey === dateKey && s.room === room);
}

function getCleaningInfo(reservation, allReservations) {
    const checkout = reservation.checkOut;
    const nextR = allReservations
        .filter(r => r.room === reservation.room && r.checkIn >= checkout && r !== reservation)
        .sort((a, b) => a.checkIn - b.checkIn)[0];

    const sameDayTurnaround = nextR && sameDay(checkout, nextR.checkIn);
    let bestDay = checkout;
    let isForcedSunday = false;

    if (sameDayTurnaround) {
        bestDay = checkout;
        if (isSunday(checkout)) isForcedSunday = true;
    } else {
        let candidate = isSunday(checkout) ? addDays(checkout, 1) : checkout;
        let safety = 0;
        while ((isSunday(candidate) || isBlockedDate(candidate)) && safety < 14) {
            candidate = addDays(candidate, 1);
            safety++;
        }
        bestDay = candidate;
    }

    const hasCheckout = sameDay(bestDay, checkout);
    const hasCheckin = nextR ? sameDay(bestDay, nextR.checkIn) : false;

    return {
        date: bestDay,
        sunday: isForcedSunday,
        urgent: nextR ? sameDay(bestDay, nextR.checkIn) : false,
        hasCheckout,
        hasCheckin
    };
}

function getAppSettings() {
    if (!cloudHistory["_settings"] || typeof cloudHistory["_settings"] !== 'object') {
        return { includeAddresses: true, showBedTypesOnScreen: true };
    }
    return cloudHistory["_settings"];
}

function getPayrollData() {
    if (!cloudHistory["_payroll"] || typeof cloudHistory["_payroll"] !== 'object' || Array.isArray(cloudHistory["_payroll"])) {
        try {
            cloudHistory["_payroll"] = JSON.parse(localStorage.getItem("al_payroll_backup") || 'null');
        } catch(e) {}
        if (!cloudHistory["_payroll"] || typeof cloudHistory["_payroll"] !== 'object' || Array.isArray(cloudHistory["_payroll"])) {
            cloudHistory["_payroll"] = { ratePerHour: 11, pendingWork: [], settlements: [] };
        }
    }
    if (typeof cloudHistory["_payroll"].ratePerHour !== 'number') cloudHistory["_payroll"].ratePerHour = 11;
    if (!Array.isArray(cloudHistory["_payroll"].pendingWork)) cloudHistory["_payroll"].pendingWork = [];
    if (!Array.isArray(cloudHistory["_payroll"].settlements)) cloudHistory["_payroll"].settlements = [];
    return cloudHistory["_payroll"];
}

function formatWorkItemLabelPT(item) {
    const h = parseFloat(item.hours) || 0;
    const m = parseFloat(item.extraMoney) || 0;
    const amt = parseFloat(item.amount) !== undefined && !isNaN(parseFloat(item.amount))
        ? parseFloat(item.amount)
        : ((h * 11) + m);
    const valStr = amt.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' });

    if (h !== 0 && m !== 0) {
        const hStr = h.toString().replace('.', ',');
        const mStr = (m > 0 ? `+${m.toString().replace('.', ',')}` : m.toString().replace('.', ',')) + ' €';
        return `${hStr}h (${mStr}) = ${valStr}`;
    } else if (h !== 0) {
        const hStr = h.toString().replace('.', ',');
        return `${hStr}h = ${valStr}`;
    } else {
        return `Ajuste = ${valStr}`;
    }
}

function formatWorkItemLabelES(item) {
    const h = parseFloat(item.hours) || 0;
    const m = parseFloat(item.extraMoney) || 0;
    const amt = parseFloat(item.amount) !== undefined && !isNaN(parseFloat(item.amount))
        ? parseFloat(item.amount)
        : ((h * 11) + m);
    const valStr = amt.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });

    if (h !== 0 && m !== 0) {
        const hStr = h.toString().replace('.', ',');
        const mStr = (m > 0 ? `+${m.toString().replace('.', ',')}` : m.toString().replace('.', ',')) + ' €';
        return `${hStr}h (${mStr}) = ${valStr}`;
    } else if (h !== 0) {
        const hStr = h.toString().replace('.', ',');
        return `${hStr}h = ${valStr}`;
    } else {
        return `Ajuste = ${valStr}`;
    }
}

async function fetchWithTimeout(resource, options = {}, timeout = 10000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const separator = resource.includes("?") ? "&" : "?";
    const noCacheUrl = `${resource}${separator}_t=${Date.now()}`;
    const noCacheOptions = { ...options, cache: 'no-store', signal: controller.signal };
    try { const response = await fetch(noCacheUrl, noCacheOptions); clearTimeout(id); return response; }
    catch (error) { clearTimeout(id); throw error; }
}

async function fetchCloudHistory() {
    try {
        const res = await fetchWithTimeout(`${WORKER_BASE_URL}?action=getHistory`, {}, 8000);
        let data = await res.json();
        cloudHistory = typeof data === 'string' ? JSON.parse(data) : data;
        if (typeof cloudHistory !== 'object' || cloudHistory === null || Array.isArray(cloudHistory)) cloudHistory = {};

        if (Array.isArray(cloudHistory["_blockedDates"])) blockedDates = cloudHistory["_blockedDates"];
        if (Array.isArray(cloudHistory["_customCleanings"])) customCleanings = cloudHistory["_customCleanings"];
        if (Array.isArray(cloudHistory["_suppressedCleanings"])) suppressedCleanings = cloudHistory["_suppressedCleanings"];

        if (cloudHistory["_payroll"] && typeof cloudHistory["_payroll"] === 'object') {
            try { localStorage.setItem("al_payroll_backup", JSON.stringify(cloudHistory["_payroll"])); } catch(e) {}
        } else {
            try {
                const localPayroll = JSON.parse(localStorage.getItem("al_payroll_backup") || 'null');
                if (localPayroll) cloudHistory["_payroll"] = localPayroll;
            } catch(e) {}
        }
    } catch (e) {
        console.warn("Aviso: Dados carregados em modo offline/cache.", e);
        try {
            cloudHistory = JSON.parse(localStorage.getItem("al_cloud_history_backup") || "{}");
            if (!cloudHistory["_payroll"]) {
                const localPayroll = JSON.parse(localStorage.getItem("al_payroll_backup") || 'null');
                if (localPayroll) cloudHistory["_payroll"] = localPayroll;
            }
        } catch(err) { cloudHistory = {}; }
    }
}

async function saveToCloudHistory(newEntries) {
    try {
        localStorage.setItem("al_cloud_history_backup", JSON.stringify(newEntries));
        await fetchWithTimeout(`${WORKER_BASE_URL}?action=saveHistory`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEntries)
        }, 8000);
    } catch (e) {
        console.error("Erro ao guardar na cloud:", e);
    }
}

// ══════════════════════════════════════════════════════════════════════
// VISTA DEDICADA DO AJUDANTE (ESPAÑOL / PORTUGUÊS)
// ══════════════════════════════════════════════════════════════════════
function showWorkerView() {
    const isEs = workerLanguage === "es";
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = formatDateKey(today);

    let grouped = {};
    const plan = cloudHistory["_plan"] || {};
    const planKeys = Object.keys(plan);

    if (planKeys.length > 0) {
        planKeys.forEach(key => {
            const entry = plan[key];
            if (!entry || !entry.cleaningKey) return;
            const d = parseDateKey(entry.cleaningKey);
            if (d >= today) {
                const dk = entry.cleaningKey;
                if (!grouped[dk]) grouped[dk] = { date: d, rooms: [] };
                if (!grouped[dk].rooms.some(r => r.room === entry.room)) {
                    grouped[dk].rooms.push({ room: entry.room, sunday: !!entry.sunday, urgent: !!entry.urgent, hasCheckout: entry.hasCheckout, hasCheckin: entry.hasCheckin });
                }
            }
        });
    } else {
        globalReservations.forEach(res => {
            const info = getCleaningInfo(res, globalReservations);
            if (info.date >= today) {
                const dk = formatDateKey(info.date);
                if (!grouped[dk]) grouped[dk] = { date: info.date, rooms: [] };
                if (!grouped[dk].rooms.some(r => r.room === res.room)) {
                    grouped[dk].rooms.push({ room: res.room, sunday: info.sunday, urgent: info.urgent, hasCheckout: info.hasCheckout, hasCheckin: info.hasCheckin });
                }
            }
        });
    }

    // Revisões ativas
    const reviews = cloudHistory["_reviews"] || {};
    Object.keys(reviews).forEach(k => {
        const rev = reviews[k];
        if (!rev || !rev.targetDateKey || !rev.room) return;
        const targetDate = parseDateKey(rev.targetDateKey);
        const cancelledDate = parseDateKey(rev.cancelledOn || todayStr);
        const checkinDate = rev.checkinKey ? parseDateKey(rev.checkinKey) : null;
        const checkoutDate = rev.originalCheckout ? parseDateKey(rev.originalCheckout) : null;

        if (targetDate >= today) {
            if (checkinDate && checkinDate > cancelledDate) return;
            if (checkoutDate && checkoutDate < cancelledDate) return;

            const dk = rev.targetDateKey;
            if (!grouped[dk]) grouped[dk] = { date: targetDate, rooms: [], reviews: [], customCleanings: [] };
            if (!grouped[dk].reviews) grouped[dk].reviews = [];
            if (!grouped[dk].reviews.some(r => r.room === rev.room)) {
                grouped[dk].reviews.push(rev);
            }
        }
    });

    // Limpezas específicas
    customCleanings.forEach(c => {
        if (!c || !c.dateKey || !c.room) return;
        const cDate = parseDateKey(c.dateKey);
        if (cDate >= today) {
            const dk = c.dateKey;
            if (!grouped[dk]) grouped[dk] = { date: cDate, rooms: [], reviews: [], customCleanings: [] };
            if (!grouped[dk].customCleanings) grouped[dk].customCleanings = [];
            if (!grouped[dk].customCleanings.some(existing => existing.id === c.id)) {
                grouped[dk].customCleanings.push(c);
            }
        }
    });

    // Filtra limpezas automáticas suprimidas/ignoradas
    Object.keys(grouped).forEach(dk => {
        if (grouped[dk] && Array.isArray(grouped[dk].rooms)) {
            grouped[dk].rooms = grouped[dk].rooms.filter(clean => !isSuppressedCleaning(dk, clean.room));
        }
    });

    const settings = getAppSettings();
    const themeEmoji = getThemeEmoji(currentTheme);

    // Barra de topo para o link do ajudante + Seletor de Idioma
    let html = `
        <div class="top-navbar-row" style="margin-bottom: 14px;">
            <div class="al-badge-title" style="cursor: default;" title="Casas do Martim">
                🏡 Casas do Martim
            </div>
            <div class="floating-menu-container">
                <button onclick="window.toggleFloatingSubMenu(event)" class="menu-trigger-btn" title="${isEs ? 'Opciones' : 'Opções'}">
                    <img src="icone2.jpeg" alt="Menu" class="menu-trigger-img" onerror="this.style.display='none'">
                </button>
                <div id="al-floating-sub-items" class="floating-sub-items ${showFloatingSubMenu ? 'menu-expanded' : 'menu-collapsed'}">
                    <div class="theme-popup-wrapper">
                        <button onclick="window.toggleThemePopup(event)" class="clock-btn" title="${isEs ? 'Cambiar Tema' : 'Mudar Tema'}">${themeEmoji}</button>
                        ${buildThemePopupHTML()}
                    </div>
                </div>
            </div>
        </div>

        <!-- Seletor de Idioma no Topo (Espanhol Default) -->
        <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 22px;">
            <div style="display: inline-flex; background: rgba(0,0,0,0.06); padding: 4px; border-radius: 12px; gap: 4px; border: 1px solid rgba(0,0,0,0.08); box-shadow: 0 2px 6px rgba(0,0,0,0.03);">
                <button onclick="window.setWorkerLanguage('es')"
                    style="padding: 8px 18px; font-size: 14px; font-weight: 800; cursor: pointer; border-radius: 9px; border: none; transition: all 0.2s ease; ${isEs ? 'background: #ffffff; color: #e11d48; box-shadow: 0 2px 8px rgba(0,0,0,0.12);' : 'background: transparent; color: #666;'}">
                    🇪🇸 Español
                </button>
                <button onclick="window.setWorkerLanguage('pt')"
                    style="padding: 8px 18px; font-size: 14px; font-weight: 800; cursor: pointer; border-radius: 9px; border: none; transition: all 0.2s ease; ${!isEs ? 'background: #ffffff; color: #0284c7; box-shadow: 0 2px 8px rgba(0,0,0,0.12);' : 'background: transparent; color: #666;'}">
                    🇵🇹 Português
                </button>
            </div>
        </div>
    `;

    // ══════════════════════════════════════════════════
    // 1. LIMPEZAS DE HOJE (Apenas o dia atual, sem cópia)
    // ══════════════════════════════════════════════════
    const todayData = grouped[todayStr] || { date: today, rooms: [], reviews: [], customCleanings: [] };
    const todayRooms = todayData.rooms || [];
    const todayReviews = todayData.reviews || [];
    const todayCustom = todayData.customCleanings || [];
    const hasTodayWork = todayRooms.length > 0 || todayReviews.length > 0 || todayCustom.length > 0;

    const rawDay = today.toLocaleDateString(isEs ? "es-ES" : "pt-PT", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    const capitalizedDay = rawDay.charAt(0).toUpperCase() + rawDay.slice(1);

    let todayBodyHtml = "";

    if (hasTodayWork) {
        // Tarefas de Lixo
        const gTasks = getGarbageTasks(today);
        gTasks.forEach(gt => {
            const taskText = isEs ? gt.es : gt.pt;
            todayBodyHtml += `<div style="margin-bottom: 6px; font-size: 15px; font-weight: 700; color: #0284c7;">${taskText}</div>`;
        });

        // Revisões
        if (todayReviews.length > 0) {
            todayReviews.forEach(rev => {
                todayBodyHtml += `
                    <div style="margin: 6px 0; padding: 8px 12px; background: rgba(245,158,11,0.08); border-left: 4px solid #f59e0b; border-radius: 6px; font-size: 14px;">
                        🔍 <b>${isEs ? 'Revisar limpieza:' : 'Rever limpeza:'} ${rev.room}</b> <span style="font-size: 12px; color: #666;">(${isEs ? 'estancia cancelada' : 'estadia cancelada'})</span>
                    </div>
                `;
            });
        }

        // Quartos regulares
        todayRooms.sort((a, b) => a.room.localeCompare(b.room)).forEach(clean => {
            let hCo = clean.hasCheckout;
            let hCi = clean.hasCheckin;
            let tH = "";
            if (hCo === undefined || hCi === undefined) {
                hCo = globalReservations.some(r => r.room === clean.room && sameDay(r.checkOut, today));
                hCi = clean.urgent || globalReservations.some(r => r.room === clean.room && sameDay(r.checkIn, today));
            }
            if (hCo && hCi) {
                tH = isEs ? " <b>(sale y entra)</b>" : " <b>(sai e entra)</b>";
            } else if (hCo) {
                tH = isEs ? " <b>(sale hoy)</b>" : " <b>(sai hoje)</b>";
            } else if (hCi) {
                tH = isEs ? " <b>(entrada hoy)</b>" : " <b>(entrada hoje)</b>";
            }

            const em = (clean.urgent || hCi) ? "⚠️" : "🧹";
            const bedConfig = ROOM_BEDS_INFO[clean.room];
            const bedText = bedConfig ? (isEs ? bedConfig.es : bedConfig.pt) : "";
            const bedHtml = bedText ? ` <span style="font-size: 13px; opacity: 0.8; font-weight: 600; color: #7c3aed;">(${bedText})</span>` : "";

            todayBodyHtml += `<div style="font-size: 15px; margin: 4px 0;">${em} <b>${clean.room}</b>${bedHtml}${tH}</div>`;
        });

        // Limpezas específicas
        todayCustom.forEach(c => {
            const bedConfig = ROOM_BEDS_INFO[c.room];
            const bedText = bedConfig ? (isEs ? bedConfig.es : bedConfig.pt) : "";
            const bedHtml = bedText ? ` <span style="font-size: 13px; opacity: 0.8; font-weight: 600; color: #7c3aed;">(${bedText})</span>` : "";

            todayBodyHtml += `
                <div style="font-size: 15px; margin: 4px 0;">
                    🧹 <b>${c.room}</b> <span style="background: rgba(139,92,246,0.12); color: #7c3aed; font-size: 11px; font-weight: bold; padding: 2px 7px; border-radius: 6px;">${isEs ? 'Específica' : 'Específica'}</span>${bedHtml}${c.note ? ` <i style="color: #666; font-size: 13px;">(${c.note})</i>` : ''}
                </div>
            `;
        });

        if (settings.includeAddresses) {
            todayBodyHtml += `
                <div style="margin-top: 14px; padding-top: 10px; border-top: 1px dashed rgba(0,0,0,0.1); font-size: 12px; color: #666; line-height: 1.5;">
                    <div>📍 <b>${isEs ? 'Dirección Impasse:' : 'Morada Impasse:'}</b> Impasse Romeiras 6</div>
                    <div>📍 <b>${isEs ? 'Dirección Funchal (Achada):' : 'Morada Funchal (Achada):'}</b> Beco da Achada 3</div>
                </div>
            `;
        }
    } else {
        todayBodyHtml = `
            <div style="padding: 14px 0; font-size: 15px; color: #059669; font-weight: 600; display: flex; align-items: center; gap: 8px;">
                <span>✨</span> <span>${isEs ? '¡No hay limpiezas programadas para hoy! Día libre.' : 'Sem limpezas programadas para hoje! Dia de folga.'}</span>
            </div>
        `;
    }

    html += `
        <!-- Secção 1: Limpezas de Hoje -->
        <div style="border: 1px solid #ddd; border-radius: 16px; padding: 20px; margin-bottom: 22px; background-color: #f8f9fa; border-left: 6px solid #007bff; box-shadow: 0 4px 14px rgba(0,123,255,0.08);">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: gap: 10px; margin-bottom: 12px;">
                <div>
                    <h2 style="margin: 0; font-size: 20px; color: #007bff;">${isEs ? '🧹 Limpiezas de Hoy' : '🧹 Limpezas de Hoje'}</h2>
                    <div style="font-size: 13px; opacity: 0.75; font-weight: 600; margin-top: 2px;">📅 ${capitalizedDay}</div>
                </div>
            </div>
            <div style="margin-top: 10px;">
                ${todayBodyHtml}
            </div>
        </div>
    `;

    // ══════════════════════════════════════════════════
    // 2. LIMPEZAS DE AMANHÃ (Dia Seguinte)
    // ══════════════════════════════════════════════════
    const tomorrow = addDays(today, 1);
    const tomorrowStr = formatDateKey(tomorrow);
    const tomorrowData = grouped[tomorrowStr] || { date: tomorrow, rooms: [], reviews: [], customCleanings: [] };
    const tomorrowRooms = tomorrowData.rooms || [];
    const tomorrowReviews = tomorrowData.reviews || [];
    const tomorrowCustom = tomorrowData.customCleanings || [];
    const hasTomorrowWork = tomorrowRooms.length > 0 || tomorrowReviews.length > 0 || tomorrowCustom.length > 0;

    const rawTomorrowDay = tomorrow.toLocaleDateString(isEs ? "es-ES" : "pt-PT", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    const capitalizedTomorrowDay = rawTomorrowDay.charAt(0).toUpperCase() + rawTomorrowDay.slice(1);

    let tomorrowBodyHtml = "";

    if (hasTomorrowWork) {
        // Tarefas de Lixo de amanhã
        const gTasksTomorrow = getGarbageTasks(tomorrow);
        gTasksTomorrow.forEach(gt => {
            const taskText = isEs ? gt.es : gt.pt;
            tomorrowBodyHtml += `<div style="margin-bottom: 6px; font-size: 15px; font-weight: 700; color: #0284c7;">${taskText}</div>`;
        });

        // Revisões de amanhã
        if (tomorrowReviews.length > 0) {
            tomorrowReviews.forEach(rev => {
                tomorrowBodyHtml += `
                    <div style="margin: 6px 0; padding: 8px 12px; background: rgba(245,158,11,0.08); border-left: 4px solid #f59e0b; border-radius: 6px; font-size: 14px;">
                        🔍 <b>${isEs ? 'Revisar limpieza:' : 'Rever limpeza:'} ${rev.room}</b> <span style="font-size: 12px; color: #666;">(${isEs ? 'estancia cancelada' : 'estadia cancelada'})</span>
                    </div>
                `;
            });
        }

        // Quartos regulares de amanhã
        tomorrowRooms.sort((a, b) => a.room.localeCompare(b.room)).forEach(clean => {
            let hCo = clean.hasCheckout;
            let hCi = clean.hasCheckin;
            let tH = "";
            if (hCo === undefined || hCi === undefined) {
                hCo = globalReservations.some(r => r.room === clean.room && sameDay(r.checkOut, tomorrow));
                hCi = clean.urgent || globalReservations.some(r => r.room === clean.room && sameDay(r.checkIn, tomorrow));
            }
            if (hCo && hCi) {
                tH = isEs ? " <b>(sale y entra)</b>" : " <b>(sai e entra)</b>";
            } else if (hCo) {
                tH = isEs ? " <b>(sale mañana)</b>" : " <b>(sai amanhã)</b>";
            } else if (hCi) {
                tH = isEs ? " <b>(entrada mañana)</b>" : " <b>(entrada amanhã)</b>";
            }

            const em = (clean.urgent || hCi) ? "⚠️" : "🧹";
            const bedConfig = ROOM_BEDS_INFO[clean.room];
            const bedText = bedConfig ? (isEs ? bedConfig.es : bedConfig.pt) : "";
            const bedHtml = bedText ? ` <span style="font-size: 13px; opacity: 0.8; font-weight: 600; color: #7c3aed;">(${bedText})</span>` : "";

            tomorrowBodyHtml += `<div style="font-size: 15px; margin: 4px 0;">${em} <b>${clean.room}</b>${bedHtml}${tH}</div>`;
        });

        // Limpezas específicas de amanhã
        tomorrowCustom.forEach(c => {
            const bedConfig = ROOM_BEDS_INFO[c.room];
            const bedText = bedConfig ? (isEs ? bedConfig.es : bedConfig.pt) : "";
            const bedHtml = bedText ? ` <span style="font-size: 13px; opacity: 0.8; font-weight: 600; color: #7c3aed;">(${bedText})</span>` : "";

            tomorrowBodyHtml += `
                <div style="font-size: 15px; margin: 4px 0;">
                    🧹 <b>${c.room}</b> <span style="background: rgba(139,92,246,0.12); color: #7c3aed; font-size: 11px; font-weight: bold; padding: 2px 7px; border-radius: 6px;">${isEs ? 'Específica' : 'Específica'}</span>${bedHtml}${c.note ? ` <i style="color: #666; font-size: 13px;">(${c.note})</i>` : ''}
                </div>
            `;
        });

        if (settings.includeAddresses) {
            tomorrowBodyHtml += `
                <div style="margin-top: 14px; padding-top: 10px; border-top: 1px dashed rgba(0,0,0,0.1); font-size: 12px; color: #666; line-height: 1.5;">
                    <div>📍 <b>${isEs ? 'Dirección Impasse:' : 'Morada Impasse:'}</b> Impasse Romeiras 6</div>
                    <div>📍 <b>${isEs ? 'Dirección Funchal (Achada):' : 'Morada Funchal (Achada):'}</b> Beco da Achada 3</div>
                </div>
            `;
        }
    } else {
        tomorrowBodyHtml = `
            <div style="padding: 14px 0; font-size: 15px; color: #059669; font-weight: 600; display: flex; align-items: center; gap: 8px;">
                <span>✨</span> <span>${isEs ? '¡No hay limpiezas programadas para mañana!' : 'Sem limpezas programadas para amanhã!'}</span>
            </div>
        `;
    }

    html += `
        <!-- Secção 2: Limpezas de Amanhã -->
        <div style="border: 1px solid #ddd; border-radius: 16px; padding: 20px; margin-bottom: 22px; background-color: #f8f9fa; border-left: 6px solid #6366f1; box-shadow: 0 4px 14px rgba(99,102,241,0.08);">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: gap: 10px; margin-bottom: 12px;">
                <div>
                    <h2 style="margin: 0; font-size: 20px; color: #4f46e5;">${isEs ? '📅 Limpiezas de Mañana' : '📅 Limpezas de Amanhã'}</h2>
                    <div style="font-size: 13px; opacity: 0.75; font-weight: 600; margin-top: 2px;">📅 ${capitalizedTomorrowDay}</div>
                </div>
            </div>
            <div style="margin-top: 10px;">
                ${tomorrowBodyHtml}
            </div>
        </div>
    `;

    // ══════════════════════════════════════════════════
    // 3. REGISTO DE PONTO / HORÁRIO DE HOJE
    // ══════════════════════════════════════════════════
    if (!cloudHistory["_timeclock"] || typeof cloudHistory["_timeclock"] !== 'object') {
        cloudHistory["_timeclock"] = {};
    }
    const currentShift = cloudHistory["_timeclock"][todayStr] || null;

    let timeclockBodyHtml = "";
    const now = new Date();
    const formatTimeOffset = (mins) => {
        const d = new Date(now.getTime() - mins * 60 * 1000);
        return d.toLocaleTimeString(isEs ? "es-ES" : "pt-PT", { hour: "2-digit", minute: "2-digit" });
    };

    if (!currentShift || currentShift.status === "not_started") {
        timeclockBodyHtml = `
            <div style="display: flex; flex-direction: column; gap: 12px;">
                <div style="font-size: 14px; opacity: 0.85; line-height: 1.4;">
                    ${isEs ? 'Marca la hora de entrada al empezar tu jornada de trabajo:' : 'Marca a hora de entrada ao começares a trabalhar hoje:'}
                </div>
                <div>
                    <button onclick="window.toggleCheckInOptions(event)"
                        style="padding: 12px 22px; font-size: 15px; font-weight: 800; cursor: pointer; border-radius: 12px; border: none; background: linear-gradient(135deg, #10b981, #059669); color: white; box-shadow: 0 4px 14px rgba(16,185,129,0.3); display: inline-flex; align-items: center; gap: 8px; transition: transform 0.15s ease;">
                        <span>🟢</span> <span>${isEs ? 'Empezar Día (Marcar Entrada)' : 'Começar Dia (Marcar Entrada)'}</span>
                    </button>
                </div>
                ${showCheckInOptions ? `
                    <div style="background: rgba(255,255,255,0.95); border: 2px solid #10b981; border-radius: 14px; padding: 14px; margin-top: 4px; box-shadow: 0 6px 20px rgba(0,0,0,0.08); animation: popupFadeIn 0.2s ease;">
                        <div style="font-size: 13px; font-weight: 700; color: #059669; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px;">
                            ${isEs ? 'Selecciona la hora de entrada:' : 'Seleciona a hora de entrada:'}
                        </div>
                        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                            <button onclick="window.recordWorkerCheckIn(0)"
                                style="padding: 10px 18px; font-size: 14px; font-weight: 800; cursor: pointer; border-radius: 10px; border: 1.5px solid #10b981; background: #ffffff; color: #059669; box-shadow: 0 2px 6px rgba(16,185,129,0.15);">
                                ⏱️ ${isEs ? 'Ahora' : 'Agora'} (${formatTimeOffset(0)})
                            </button>
                            <button onclick="window.recordWorkerCheckIn(15)"
                                style="padding: 10px 18px; font-size: 14px; font-weight: 800; cursor: pointer; border-radius: 10px; border: 1.5px solid #10b981; background: #ffffff; color: #059669; box-shadow: 0 2px 6px rgba(16,185,129,0.15);">
                                ⏱️ ${isEs ? 'Hace 15 min' : 'Há 15 min'} (${formatTimeOffset(15)})
                            </button>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    } else if (currentShift.status === "in_progress") {
        timeclockBodyHtml = `
            <div style="display: flex; flex-direction: column; gap: 12px;">
                <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; padding: 12px 16px; background: rgba(16,185,129,0.12); border-left: 5px solid #10b981; border-radius: 10px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 20px;">🟢</span>
                        <div>
                            <strong style="font-size: 15px; color: #065f46;">${isEs ? 'Jornada en curso' : 'Jornada em curso'}</strong>
                            <div style="font-size: 13px; color: #047857; margin-top: 1px;">
                                ${isEs ? 'Entrada marcada a las' : 'Entrada marcada às'} <b>${currentShift.inTime}</b>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <button onclick="window.toggleCheckOutOptions(event)"
                        style="padding: 12px 22px; font-size: 15px; font-weight: 800; cursor: pointer; border-radius: 12px; border: none; background: linear-gradient(135deg, #ef4444, #dc2626); color: white; box-shadow: 0 4px 14px rgba(239,68,68,0.3); display: inline-flex; align-items: center; gap: 8px; transition: transform 0.15s ease;">
                        <span>🔴</span> <span>${isEs ? 'Terminar Día (Marcar Salida)' : 'Acabar Dia (Marcar Saída)'}</span>
                    </button>
                </div>

                ${showCheckOutOptions ? `
                    <div style="background: rgba(255,255,255,0.95); border: 2px solid #ef4444; border-radius: 14px; padding: 14px; margin-top: 4px; box-shadow: 0 6px 20px rgba(0,0,0,0.08); animation: popupFadeIn 0.2s ease;">
                        <div style="font-size: 13px; font-weight: 700; color: #dc2626; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px;">
                            ${isEs ? 'Selecciona la hora de salida:' : 'Seleciona a hora de saída:'}
                        </div>
                        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                            <button onclick="window.recordWorkerCheckOut(0)"
                                style="padding: 9px 14px; font-size: 13px; font-weight: 800; cursor: pointer; border-radius: 9px; border: 1.5px solid #ef4444; background: #ffffff; color: #dc2626;">
                                ⏱️ ${isEs ? 'Ahora' : 'Agora'} (${formatTimeOffset(0)})
                            </button>
                            <button onclick="window.recordWorkerCheckOut(15)"
                                style="padding: 9px 14px; font-size: 13px; font-weight: 800; cursor: pointer; border-radius: 9px; border: 1.5px solid #ef4444; background: #ffffff; color: #dc2626;">
                                ⏱️ ${isEs ? 'Hace 15 min' : 'Há 15 min'} (${formatTimeOffset(15)})
                            </button>
                            <button onclick="window.recordWorkerCheckOut(30)"
                                style="padding: 9px 14px; font-size: 13px; font-weight: 800; cursor: pointer; border-radius: 9px; border: 1.5px solid #ef4444; background: #ffffff; color: #dc2626;">
                                ⏱️ ${isEs ? 'Hace 30 min' : 'Há 30 min'} (${formatTimeOffset(30)})
                            </button>
                            <button onclick="window.recordWorkerCheckOut(60)"
                                style="padding: 9px 14px; font-size: 13px; font-weight: 800; cursor: pointer; border-radius: 9px; border: 1.5px solid #ef4444; background: #ffffff; color: #dc2626;">
                                ⏱️ ${isEs ? 'Hace 1 hora' : 'Há 1 hora'} (${formatTimeOffset(60)})
                            </button>
                            <button onclick="window.recordWorkerCheckOut(120)"
                                style="padding: 9px 14px; font-size: 13px; font-weight: 800; cursor: pointer; border-radius: 9px; border: 1.5px solid #ef4444; background: #ffffff; color: #dc2626;">
                                ⏱️ ${isEs ? 'Hace 2 horas' : 'Há 2 horas'} (${formatTimeOffset(120)})
                            </button>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    } else if (currentShift.status === "completed") {
        const hoursFmt = (currentShift.hours || 0).toString().replace('.', ',');
        const amtVal = (currentShift.amount !== undefined && !isNaN(currentShift.amount)) ? currentShift.amount : ((currentShift.hours || 0) * 11);
        const amtFmt = amtVal.toLocaleString(isEs ? 'es-ES' : 'pt-PT', { style: 'currency', currency: 'EUR' });

        timeclockBodyHtml = `
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; padding: 14px 18px; background: rgba(16,185,129,0.1); border: 2px solid #10b981; border-radius: 12px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="font-size: 26px;">✅</span>
                    <div>
                        <div style="font-size: 15px; font-weight: 800; color: #065f46;">
                            ${isEs ? '¡Día de trabajo completado y registrado!' : 'Dia de trabalho concluído e registado!'}
                        </div>
                        <div style="font-size: 13px; color: #047857; margin-top: 2px;">
                            ${currentShift.inTime} – ${currentShift.outTime} • <strong>${hoursFmt} horas</strong> (${amtFmt})
                        </div>
                        <div style="font-size: 12px; color: #059669; margin-top: 2px; font-weight: 600;">
                            ${isEs ? '💰 Añadido a tus pagos pendientes abajo' : '💰 Adicionado aos teus pagamentos pendentes abaixo'}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    html += `
        <!-- Secção 3: Registo de Horário de Hoje (Ponto) -->
        <div style="border: 2px solid #10b981; border-radius: 16px; padding: 20px; margin-bottom: 22px; background: #f0fdf4; border-left: 6px solid #10b981; box-shadow: 0 4px 14px rgba(16,185,129,0.1);">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: gap: 10px; margin-bottom: 12px;">
                <div>
                    <h2 style="margin: 0; font-size: 20px; color: #047857;">${isEs ? '⏱️ Registro de Horario de Hoy' : '⏱️ Registo de Horário de Hoje'}</h2>
                    <div style="font-size: 13px; opacity: 0.75; font-weight: 600; margin-top: 2px;">Tarifa: 11,00 € / hora</div>
                </div>
            </div>
            <div style="margin-top: 10px;">
                ${timeclockBodyHtml}
            </div>
        </div>
    `;

    // ══════════════════════════════════════════════════
    // 4. PRÓXIMOS 10 DIAS DE TRABALHO (Sem cópia)
    // ══════════════════════════════════════════════════
    const pills = [];
    for (let i = 0; i < 10; i++) {
        const d = addDays(today, i);
        const dk = formatDateKey(d);
        const dayData = grouped[dk];
        const rooms = (dayData && dayData.rooms) ? dayData.rooms : [];
        const revs = (dayData && dayData.reviews) ? dayData.reviews : [];
        const customList = (dayData && dayData.customCleanings) ? dayData.customCleanings : [];
        const totalItems = rooms.length + revs.length + customList.length;
        const hasWork = totalItems > 0;

        const isToday = i === 0;
        const isSun = d.getDay() === 0;
        const weekdayShort = d.toLocaleDateString(isEs ? "es-ES" : "pt-PT", { weekday: "short" }).replace('.', '').toUpperCase();
        const dayNum = d.getDate();

        let pillBg = 'rgba(255,255,255,0.9)';
        let pillBorder = '1px solid rgba(255,255,255,0.5)';
        let pillColor = '#4b5563';
        let badgeEmoji = '😴';
        let badgeText = isEs ? 'Libre' : 'Folga';
        let badgeBg = 'rgba(0,0,0,0.06)';
        let badgeColor = '#666';

        if (hasWork) {
            const roomLabel = isEs ? (totalItems > 1 ? 'habs.' : 'hab.') : (totalItems > 1 ? 'qtos' : 'qto');
            if (isSun) {
                pillBg = '#ffffff';
                pillBorder = '2px solid #ef4444';
                pillColor = '#dc2626';
                badgeEmoji = '🔴';
                badgeText = `${totalItems} ${roomLabel}`;
                badgeBg = '#ef4444';
                badgeColor = '#ffffff';
            } else {
                pillBg = '#ffffff';
                pillBorder = '2px solid #10b981';
                pillColor = '#059669';
                badgeEmoji = '🧹';
                badgeText = `${totalItems} ${roomLabel}`;
                badgeBg = '#10b981';
                badgeColor = '#ffffff';
            }
        }

        const todayLabel = isEs ? 'HOY' : 'HOJE';

        pills.push(`
            <div style="flex: 1; min-width: 60px; max-width: 84px; text-align: center; padding: 10px 4px; border-radius: 12px; background: ${pillBg}; border: ${pillBorder}; font-size: 11px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; ${isToday ? 'box-shadow: 0 0 0 2px #facc15;' : ''}">
                <div style="font-weight: 800; font-size: 10px; opacity: 0.85; text-transform: uppercase; color: ${pillColor};">${isToday ? todayLabel : weekdayShort}</div>
                <div style="font-size: 16px; font-weight: 900; color: ${pillColor};">${dayNum}</div>
                <div style="font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 6px; background: ${badgeBg}; color: ${badgeColor}; white-space: nowrap; display: flex; align-items: center; gap: 2px;">
                    <span>${badgeEmoji}</span> <span>${badgeText}</span>
                </div>
            </div>
        `);
    }

    html += `
        <!-- Secção 2: Próximos 10 dias de trabalho -->
        <div style="margin: 14px 0 22px 0; padding: 16px 18px; border-radius: 16px; background: linear-gradient(135deg, #6366f1, #4f46e5); color: #ffffff; border: 2px solid #4338ca; box-shadow: 0 6px 20px rgba(99,102,241,0.25);">
            <div style="font-size: 16px; font-weight: 800; color: #ffffff; display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                <span>📅</span> <span>${isEs ? 'Próximos 10 días de trabajo' : 'Próximos 10 dias de trabalho'}</span>
            </div>
            <div style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; scrollbar-width: thin;">
                ${pills.join("")}
            </div>
        </div>
    `;

    // ══════════════════════════════════════════════════
    // 3. PAGAMENTOS & HISTÓRICO (Sem cópia)
    // ══════════════════════════════════════════════════
    const pData = getPayrollData();
    const pendingList = pData.pendingWork || [];
    const settlementsList = pData.settlements || [];
    const totalPendingHours = pendingList.reduce((sum, w) => sum + (parseFloat(w.hours) || 0), 0);
    const totalPendingAmount = pendingList.reduce((sum, w) => {
        const itemAmt = (w.amount !== undefined && !isNaN(parseFloat(w.amount)))
            ? parseFloat(w.amount)
            : (((parseFloat(w.hours) || 0) * (w.rate || 11)) + (parseFloat(w.extraMoney) || 0));
        return sum + itemAmt;
    }, 0);

    const formattedPendingAmount = totalPendingAmount.toLocaleString(isEs ? 'es-ES' : 'pt-PT', { style: 'currency', currency: 'EUR' });
    const formattedPendingHours = (Math.round(totalPendingHours * 100) / 100).toString().replace('.', ',');

    html += `
        <div style="border: 1px solid #ddd; border-radius: 16px; padding: 20px; margin-top: 22px; background-color: #f8f9fa; border-left: 6px solid #8b5cf6; box-shadow: 0 4px 14px rgba(139,92,246,0.08);">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 16px;">
                <div>
                    <h2 style="margin: 0; font-size: 20px; color: #7c3aed;">${isEs ? '💶 Pagos y Horas de Trabajo' : '💶 Pagamentos & Horas de Trabalho'}</h2>
                    <div style="font-size: 13px; opacity: 0.75; font-weight: 600; margin-top: 2px;">Tarifa: 11,00 € / hora</div>
                </div>
            </div>

            <!-- Separadores / Tabs de Pagamentos -->
            <div style="display: flex; gap: 8px; margin-bottom: 18px; border-bottom: 2px solid rgba(0,0,0,0.06); padding-bottom: 12px; flex-wrap: wrap;">
                <button onclick="window.toggleWorkerPaymentsTab(false)"
                    style="padding: 9px 16px; font-size: 13px; font-weight: bold; cursor: pointer; border-radius: 10px; border: none; transition: all 0.2s ease; ${!showWorkerPaymentsHistory ? 'background: #8b5cf6; color: white; box-shadow: 0 4px 12px rgba(139,92,246,0.35);' : 'background: rgba(0,0,0,0.05); color: #555;'}">
                    ${isEs ? '⏳ Horas por Pagar' : '⏳ Horas a Pagar'} (${pendingList.length})
                </button>
                <button onclick="window.toggleWorkerPaymentsTab(true)"
                    style="padding: 9px 16px; font-size: 13px; font-weight: bold; cursor: pointer; border-radius: 10px; border: none; transition: all 0.2s ease; ${showWorkerPaymentsHistory ? 'background: #8b5cf6; color: white; box-shadow: 0 4px 12px rgba(139,92,246,0.35);' : 'background: rgba(0,0,0,0.05); color: #555;'}">
                    ${isEs ? '📜 Historial de Pagos' : '📜 Histórico de Pagamentos'} (${settlementsList.length})
                </button>
            </div>
    `;

    if (!showWorkerPaymentsHistory) {
        // ── Tab 1: Horas / Pagamentos Pendentes ──
        const statusLabel = isEs
            ? (totalPendingAmount > 0 ? '⚠️ Total Pendiente de Pago' : '✅ Sin Pagos Pendientes')
            : (totalPendingAmount > 0 ? '⚠️ Total a Pagar Acumulado' : '✅ Sem Pagamentos Pendentes');

        const hoursDesc = isEs
            ? `<strong>${formattedPendingHours}</strong> horas de trabajo acumuladas (11,00 € / hora)`
            : `<strong>${formattedPendingHours}</strong> horas de trabalho acumuladas (11,00 € / hora)`;

        html += `
            <!-- Cartão do Total Pendente -->
            <div style="background: linear-gradient(135deg, rgba(239,68,68,0.08), rgba(245,158,11,0.08)); border: 2px solid ${totalPendingAmount > 0 ? '#ef4444' : '#10b981'}; border-radius: 14px; padding: 16px; margin-bottom: 18px;">
                <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: ${totalPendingAmount > 0 ? '#dc2626' : '#059669'};">
                    ${statusLabel}
                </div>
                <div style="font-size: 30px; font-weight: 900; color: ${totalPendingAmount > 0 ? '#dc2626' : '#059669'}; margin: 4px 0 2px 0;">
                    ${formattedPendingAmount}
                </div>
                <div style="font-size: 13px; opacity: 0.85;">
                    ${hoursDesc}
                </div>
            </div>

            <h3 style="font-size: 16px; margin: 0 0 12px 0; color: #333;">${isEs ? '📋 Detalle de Días Acumulados:' : '📋 Detalhe dos Dias Acumulados:'}</h3>
        `;

        if (pendingList.length === 0) {
            html += `
                <div style="padding: 16px; text-align: center; border: 1.5px dashed rgba(0,0,0,0.12); border-radius: 12px; color: #666; font-size: 14px;">
                    ${isEs ? '✨ No hay horas ni importes pendientes de pago.' : '✨ Não há horas nem valores pendentes de pagamento.'}
                </div>
            `;
        } else {
            html += `<div style="display: flex; flex-direction: column; gap: 10px;">`;
            pendingList.forEach(item => {
                const d = parseDateKey(item.dateKey);
                const dayLabel = d.toLocaleDateString(isEs ? "es-ES" : "pt-PT", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
                const capitalizedDayItem = dayLabel.charAt(0).toUpperCase() + dayLabel.slice(1);
                const detailStr = isEs ? formatWorkItemLabelES(item) : formatWorkItemLabelPT(item);
                const itemAmount = (item.amount !== undefined && !isNaN(parseFloat(item.amount)))
                    ? parseFloat(item.amount)
                    : (((parseFloat(item.hours) || 0) * (item.rate || 11)) + (parseFloat(item.extraMoney) || 0));
                const formattedItemAmount = itemAmount.toLocaleString(isEs ? 'es-ES' : 'pt-PT', { style: 'currency', currency: 'EUR' });

                const isByWorker = item.byWorker || (item.note && /ajudante/i.test(item.note));
                const cardBg = isByWorker ? '#f0fdf4' : 'rgba(255,255,255,0.7)';
                const cardBorder = isByWorker ? '2px solid #10b981' : '1px solid rgba(0,0,0,0.08)';
                const amountColor = isByWorker ? '#047857' : (itemAmount >= 0 ? '#111' : '#2563eb');
                const badgeHtml = isByWorker
                    ? `<span style="display: inline-block; font-size: 11px; font-weight: 800; padding: 2px 8px; border-radius: 6px; background: #10b981; color: white; margin-left: 6px; box-shadow: 0 2px 6px rgba(16,185,129,0.25);">⏱️ ${isEs ? 'Marcado por ti' : 'Marcado por ti'}</span>`
                    : '';

                html += `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 14px; background: ${cardBg}; border: ${cardBorder}; border-radius: 12px; flex-wrap: wrap; gap: 8px; ${isByWorker ? 'box-shadow: 0 3px 10px rgba(16,185,129,0.12);' : ''}">
                        <div>
                            <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 4px;">
                                <strong style="font-size: 14px; color: ${isByWorker ? '#065f46' : '#111'};">📅 ${capitalizedDayItem}</strong>
                                ${badgeHtml}
                            </div>
                            <div style="font-size: 12px; opacity: 0.85; margin-top: 3px; color: ${isByWorker ? '#047857' : '#555'};">
                                ${detailStr}${item.note ? ` • <i>${item.note}</i>` : ''}
                            </div>
                        </div>
                        <div style="font-size: 18px; font-weight: 900; color: ${amountColor};">
                            ${formattedItemAmount}
                        </div>
                    </div>
                `;
            });
            html += `</div>`;
        }
    } else {
        // ── Tab 2: Histórico de Pagamentos Liquidados ──
        html += `<h3 style="font-size: 17px; margin: 0 0 14px 0; color: #333;">${isEs ? '📜 Historial de Pagos Realizados' : '📜 Histórico de Pagamentos Realizados'}</h3>`;

        if (settlementsList.length === 0) {
            html += `
                <div style="text-align: center; padding: 35px 20px; border: 2px dashed rgba(0,0,0,0.1); border-radius: 14px; background: rgba(255,255,255,0.4);">
                    <span style="font-size: 38px;">📜</span>
                    <div style="font-size: 15px; font-weight: bold; margin-top: 8px; color: #333;">${isEs ? 'Aún no hay pagos liquidados en el historial.' : 'Ainda não há pagamentos liquidados no histórico.'}</div>
                </div>
            `;
        } else {
            html += `<div style="display: flex; flex-direction: column; gap: 16px;">`;
            settlementsList.forEach(settle => {
                const sDate = parseDateKey(settle.settledDate);
                const sDateLabel = sDate.toLocaleDateString(isEs ? "es-ES" : "pt-PT", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
                const sCapitalized = sDateLabel.charAt(0).toUpperCase() + sDateLabel.slice(1);
                const formattedSettleAmount = settle.totalAmount.toLocaleString(isEs ? 'es-ES' : 'pt-PT', { style: 'currency', currency: 'EUR' });
                const formattedSettleHours = settle.totalHours.toString().replace('.', ',');
                const items = settle.items || [];

                let itemsRowsHtml = '';
                items.forEach(it => {
                    const itDate = parseDateKey(it.dateKey);
                    const itDateLabel = itDate.toLocaleDateString(isEs ? "es-ES" : "pt-PT", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
                    const itHoursVal = parseFloat(it.hours) || 0;
                    const itMoneyVal = parseFloat(it.extraMoney) || 0;
                    const itAmountVal = it.amount !== undefined && !isNaN(it.amount)
                        ? it.amount
                        : ((itHoursVal * (settle.rate || 11)) + itMoneyVal);
                    const itAmount = itAmountVal.toLocaleString(isEs ? 'es-ES' : 'pt-PT', { style: 'currency', currency: 'EUR' });

                    let itDetailTag = '';
                    if (itHoursVal !== 0 && itMoneyVal !== 0) {
                        const hStr = itHoursVal.toString().replace('.', ',');
                        const mStr = (itMoneyVal > 0 ? `+` : ``) + itMoneyVal.toString().replace('.', ',') + ` €`;
                        itDetailTag = `<span style="font-weight: 600; color: #7c3aed;">${hStr} h (${mStr})</span>`;
                    } else if (itHoursVal !== 0) {
                        const hStr = itHoursVal.toString().replace('.', ',');
                        itDetailTag = `<span style="font-weight: 600; color: #7c3aed;">${hStr} h</span>`;
                    } else {
                        const mStr = (itMoneyVal > 0 ? `+` : ``) + itMoneyVal.toString().replace('.', ',') + ` €`;
                        itDetailTag = `<span style="font-weight: 600; color: #0284c7;">Ajuste (${mStr})</span>`;
                    }

                    itemsRowsHtml += `
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid rgba(0,0,0,0.05); font-size: 13px;">
                            <div>
                                <span>📅 ${itDateLabel}</span>
                                ${it.note ? `<span style="color: #666; font-size: 12px; margin-left: 8px;">(${it.note})</span>` : ''}
                            </div>
                            <div style="display: flex; gap: 14px; align-items: center;">
                                ${itDetailTag}
                                <strong style="color: ${itAmountVal >= 0 ? '#059669' : '#dc2626'};">${itAmount}</strong>
                            </div>
                        </div>
                    `;
                });

                const badgeText = isEs ? 'PAGADO' : 'PAGO';
                const sTitle = isEs ? `💰 Pago del ${sCapitalized}` : `💰 Pagamento de ${sCapitalized}`;
                const daysSuffix = isEs ? (items.length !== 1 ? 'días' : 'día') : (items.length !== 1 ? 'dias' : 'dia');
                const sSub = isEs
                    ? `Total pagado: <strong style="color: #059669; font-size: 15px;">${formattedSettleAmount}</strong> • <strong>${formattedSettleHours}</strong> horas (${items.length} ${daysSuffix})`
                    : `Total pago: <strong style="color: #059669; font-size: 15px;">${formattedSettleAmount}</strong> • <strong>${formattedSettleHours}</strong> horas (${items.length} ${daysSuffix})`;

                html += `
                    <div style="border: 1.5px solid rgba(16,185,129,0.4); border-radius: 16px; padding: 18px; background: rgba(255,255,255,0.9); box-shadow: 0 4px 14px rgba(16,185,129,0.06); border-left: 6px solid #10b981;">
                        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 12px;">
                            <div>
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <span style="background: #10b981; color: white; padding: 2px 8px; border-radius: 8px; font-size: 12px; font-weight: bold;">${badgeText}</span>
                                    <strong style="font-size: 16px; color: #111;">${sTitle}</strong>
                                </div>
                                <div style="font-size: 13px; color: #666; margin-top: 3px;">
                                    ${sSub}
                                </div>
                            </div>
                        </div>

                        <div style="background: rgba(0,0,0,0.02); border: 1px solid rgba(0,0,0,0.06); border-radius: 12px; padding: 12px 14px; margin-top: 10px;">
                            <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #555; margin-bottom: 6px; letter-spacing: 0.5px;">${isEs ? 'Días incluidos en este pago:' : 'Dias incluídos neste pagamento:'}</div>
                            ${itemsRowsHtml}
                        </div>
                    </div>
                `;
            });
            html += `</div>`;
        }
    }

    html += `</div>`;
    result.innerHTML = html;
}

// 5. Inicialização
async function loadCalendars() {
    const isEs = workerLanguage === "es";
    result.innerHTML = `
        <div style="display: flex; justify-content: flex-start; align-items: center; padding: 25px 0 20px 0;">
            <div style="display: inline-flex; align-items: center; gap: 10px; padding: 10px 18px; border-radius: 12px; background: rgba(0, 123, 255, 0.08); border: 1.5px solid rgba(0, 123, 255, 0.22); color: #007bff; font-size: 15px; font-weight: 700; box-shadow: 0 4px 12px rgba(0, 123, 255, 0.06); font-family: 'Plus Jakarta Sans', sans-serif;">
                <span style="font-size: 18px; line-height: 1;">⏳</span>
                <span>${isEs ? 'Cargando calendario y datos...' : 'A carregar calendário e dados...'}</span>
            </div>
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
                return [];
            }
        });

        const [_, results] = await Promise.all([historyPromise, Promise.all(calendarPromises)]);
        globalReservations = results.flat();
        showWorkerView();
    } catch (err) {
        result.innerHTML = `<p style="color: red; font-weight: bold;">Erro: ${err.message}</p>`;
    }
}

loadCalendars();
