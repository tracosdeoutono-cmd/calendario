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

let globalReservations = [];
let cloudHistory = {};

// Estados da Aplicação
let currentView = "cleaning";
let showHistoryMode = false;
let selectedHouse = "achada";
let showOccupancyStats = false;
let viewPastMonths = false;

function getResultElem() {
    return document.getElementById("result");
}

// Requisições com Timeout Garantido (Evita Carregamento Infinito)
async function fetchTextWithTimeout(url, timeoutMs = 8000) {
    try {
        return await Promise.race([
            fetch(url).then(async res => {
                if (!res.ok) return "";
                return await res.text();
            }),
            new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), timeoutMs))
        ]);
    } catch (e) {
        return "";
    }
}

async function fetchJsonWithTimeout(url, timeoutMs = 8000) {
    try {
        return await Promise.race([
            fetch(url).then(async res => {
                if (!res.ok) return {};
                const data = await res.json();
                return typeof data === 'string' ? JSON.parse(data) : data;
            }),
            new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), timeoutMs))
        ]);
    } catch (e) {
        return {};
    }
}

window.copyFromData = function(btnElement, encodedText) {
    const text = decodeURIComponent(encodedText);
    navigator.clipboard.writeText(text).then(() => {
        const originalText = btnElement.innerText;
        btnElement.innerText = "Copiado! ✅";
        setTimeout(() => { btnElement.innerText = originalText; }, 1500);
    }).catch(err => console.error("Erro ao copiar:", err));
};

window.switchMainView = function(view) {
    currentView = view;
    if (currentView === "cleaning") showCleaningPlan();
    else showOccupancyPlan();
};

window.toggleHistoryView = function() {
    showHistoryMode = !showHistoryMode;
    showCleaningPlan();
};

window.toggleOccupancyStats = function() {
    showOccupancyStats = !showOccupancyStats;
    showOccupancyPlan();
};

window.togglePastStats = function() {
    viewPastMonths = !viewPastMonths;
    showOccupancyPlan();
};

window.selectHouse = function(house) {
    selectedHouse = house;
    showOccupancyPlan();
};

async function fetchCloudHistory() {
    cloudHistory = await fetchJsonWithTimeout(`${WORKER_BASE_URL}?action=getHistory`, 6000);
    if (typeof cloudHistory !== 'object' || cloudHistory === null || Array.isArray(cloudHistory)) {
        cloudHistory = {};
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
        console.error("Erro cloud:", e);
    }
}

async function loadCalendars() {
    const resultElem = getResultElem();
    if (resultElem) {
        resultElem.innerHTML = "<p style='font-size: 18px; font-weight: bold; color: #007bff;'>⏳ A ligar à Cloud e a carregar calendários (aguarda)...</p>";
    }

    try {
        const historyPromise = fetchCloudHistory();

        const calendarPromises = calendars.map(async (calendar) => {
            const text = await fetchTextWithTimeout(calendar.url, 8000);
            return parseICS(text, calendar.name);
        });

        const [_, results] = await Promise.all([historyPromise, Promise.all(calendarPromises)]);
        globalReservations = results.flat();

        updateCloudHistory();
        showCleaningPlan();

    } catch (err) {
        const resElem = getResultElem();
        if (resElem) {
            resElem.innerHTML = `<p style="color: red; font-weight: bold;">Erro geral ao carregar: ${err.message}</p>`;
        }
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
    if (!text || !text.includes("VEVENT")) return reservations;

    // Remove quebras de linha ICS (folding)
    const unfoldedText = text.replace(/\r?\n[ \t]/g, "");
    const events = unfoldedText.split(/BEGIN:VEVENT/i);

    for (let i = 1; i < events.length; i++) {
        const event = events[i];
        if (event.includes("STATUS:CANCELLED")) continue;

        const start = event.match(/DTSTART(?:;[^:]*)?:(\d{8})/);
        const end = event.match(/DTEND(?:;[^:]*)?:(\d{8})/);

        if (!start || !end) continue;

        const checkInDate = parseDate(start[1]);
        const checkOutDate = parseDate(end[1]);

        if (checkInDate.getTime() >= checkOutDate.getTime()) continue;

        reservations.push({
            room: roomName,
            checkIn: checkInDate,
            checkOut: checkOutDate
        });
    }
    return reservations;
}

function sameDay(a, b) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
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

    return {
        date: bestDay,
        sunday: isForcedSunday,
        urgent: nextReservation ? sameDay(bestDay, nextReservation.checkIn) : false
    };
}

function updateCloudHistory() {
    try {
        let hasChanges = false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let mergedHistory = typeof cloudHistory === 'object' && cloudHistory !== null ? JSON.parse(JSON.stringify(cloudHistory)) : {};

        globalReservations.forEach(reservation => {
            const info = getCleaningInfo(reservation, globalReservations);
            if (info.date <= today) {
                const dateKey = info.date.getFullYear() + "-" + (info.date.getMonth() + 1).toString().padStart(2, '0') + "-" + info.date.getDate().toString().padStart(2, '0');

                if (!mergedHistory[dateKey] || typeof mergedHistory[dateKey] !== 'object') {
                    mergedHistory[dateKey] = { dateIso: info.date.toISOString(), rooms: [] };
                    hasChanges = true;
                }

                if (!Array.isArray(mergedHistory[dateKey].rooms)) mergedHistory[dateKey].rooms = [];

                if (!mergedHistory[dateKey].rooms.some(r => r.room === reservation.room)) {
                    mergedHistory[dateKey].rooms.push({ room: reservation.room, sunday: info.sunday, urgent: info.urgent });
                    hasChanges = true;
                }
            }
        });

        if (hasChanges) {
            saveToCloudHistory(mergedHistory);
            cloudHistory = mergedHistory;
        }
    } catch (err) {
        console.error("Erro histórico:", err);
    }
}

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
            ">🧹 Plano de Limpezas</button>
            <button onclick="window.switchMainView('occupancy')" style="
                padding: 12px 18px; font-size: 15px; cursor: pointer; border-radius: 8px;
                border: 2px solid #28a745; background-color: ${isOccupancy ? '#28a745' : '#ffffff'};
                color: ${isOccupancy ? '#ffffff' : '#28a745'}; font-weight: bold;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            ">📊 Disponibilidade da Casa</button>
        </div>
    `;
}

function showCleaningPlan() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

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
                if (!grouped[dateKey].rooms.some(r => r.room === reservation.room)) {
                    grouped[dateKey].rooms.push({ room: reservation.room, sunday: info.sunday, urgent: info.urgent });
                }
            }
        });
    }

    let sortedKeys = Object.keys(grouped).sort();
    if (showHistoryMode) sortedKeys.reverse();

    let html = renderNavigation() + `
        <div style="margin-bottom: 25px;">
            <button onclick="window.toggleHistoryView()" style="
                padding: 10px 16px; font-size: 14px; cursor: pointer; border-radius: 6px;
                border: 1px solid #6c757d; background-color: #6c757d; color: white; font-weight: bold;
            ">${showHistoryMode ? "📅 Ver Próximas Limpezas" : "📜 Ver Dias Anteriores"}</button>
        </div>
        <h1>${showHistoryMode ? "📜 Histórico de Limpezas" : "🧹 Plano de Limpezas"}</h1>
    `;

    if (sortedKeys.length === 0) html += `<p>Não há limpezas registadas.</p>`;

    sortedKeys.forEach(key => {
        const day = grouped[key];
        let title = day.date.toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
        if (day.rooms.some(r => r.sunday)) title = "🔴 " + title;

        let ptTitle = title.replace("🔴 ", "");
        ptTitle = ptTitle.charAt(0).toUpperCase() + ptTitle.slice(1);
        let copyLinesPt = [`🧹 Limpezas - ${ptTitle}:`];

        let esTitle = day.date.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
        esTitle = esTitle.charAt(0).toUpperCase() + esTitle.slice(1);
        let copyLinesEs = [`🧹 Limpiezas - ${esTitle}:`];

        let roomsHtml = "";

        day.rooms.sort((a, b) => a.room.localeCompare(b.room)).forEach(clean => {
            const hasCheckout = globalReservations.some(r => r.room === clean.room && sameDay(r.checkOut, day.date));
            const hasCheckin = clean.urgent || globalReservations.some(r => r.room === clean.room && sameDay(r.checkIn, day.date));

            let tagPt = "", tagEs = "", tagHtml = "";
            if (hasCheckout && hasCheckin) { tagPt = " (sai e entra)"; tagEs = " (sale y entra)"; tagHtml = " <b>(sai e entra)</b>"; }
            else if (hasCheckout) { tagPt = " (sai hoje)"; tagEs = " (sale hoy)"; tagHtml = " <b>(sai hoje)</b>"; }
            else if (hasCheckin) { tagPt = " (entrada hoje)"; tagEs = " (entrada hoy)"; tagHtml = " <b>(entrada hoje)</b>"; }

            const emoji = hasCheckin ? "⚠️" : "🧹";
            copyLinesPt.push(`${emoji} ${clean.room}${tagPt}`);
            copyLinesEs.push(`${emoji} ${clean.room}${tagEs}`);
            roomsHtml += `${emoji} ${clean.room}${tagHtml}<br>`;
        });

        html += `
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-top: 15px;">
                <h2 style="margin: 0;">${title}</h2>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <button onclick="window.copyFromData(this, '${encodeURIComponent(copyLinesPt.join("\n"))}')" style="padding: 6px 12px; font-size: 13px; cursor: pointer; border-radius: 6px; border: 1px solid #28a745; background-color: #28a745; color: white; font-weight: bold;">🇵🇹 Copiar PT</button>
                    <button onclick="window.copyFromData(this, '${encodeURIComponent(copyLinesEs.join("\n"))}')" style="padding: 6px 12px; font-size: 13px; cursor: pointer; border-radius: 6px; border: 1px solid #17a2b8; background-color: #17a2b8; color: white; font-weight: bold;">🇪🇸 Copiar ES</button>
                </div>
            </div>
            <div style="margin-top: 8px;">${roomsHtml}</div><hr>
        `;
    });

    const resultElem = getResultElem();
    if (resultElem) resultElem.innerHTML = html;
}

// Retorna APENAS os quartos base (Impasse Villa NUNCA entra aqui)
function getBaseHouseRooms(houseKey) {
    if (houseKey === "achada") return ["Achada 1", "Achada 2", "Achada 3", "Achada 4", "Achada 5", "Achada 6"];
    if (houseKey === "impasse") return ["Impasse 2", "Impasse 3", "Impasse 4"];
    if (houseKey === "vizinho") return ["Vizinho 1", "Vizinho 2", "Vizinho 3"];
    return [];
}

function calculateHouseStats(houseKey) {
    const rooms = getBaseHouseRooms(houseKey);
    if (rooms.length === 0) return {};

    const houseReservations = globalReservations.filter(r => rooms.includes(r.room));
    if (houseReservations.length === 0) return {};

    let minDate = new Date();
    let maxDate = new Date();

    const cleanReservations = houseReservations.map(r => {
        const cIn = new Date(r.checkIn); cIn.setHours(0, 0, 0, 0);
        const cOut = new Date(r.checkOut); cOut.setHours(0, 0, 0, 0);

        if (cIn < minDate) minDate = new Date(cIn);
        if (cOut > maxDate) maxDate = new Date(cOut);

        return { room: r.room, checkInTime: cIn.getTime(), checkOutTime: cOut.getTime() };
    });

    let current = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
    let end = new Date(maxDate.getFullYear(), maxDate.getMonth() + 1, 0);

    const stats = {};

    while (current <= end) {
        const monthKey = current.getFullYear() + "-" + String(current.getMonth() + 1).padStart(2, '0');
        const monthLabel = current.toLocaleDateString("pt-PT", { month: "long", year: "numeric" });
        const currentTarget = current.getTime();

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
            let isOccupied = false;
            let hasCheckin = false;
            let hasCheckout = false;

            for (let i = 0; i < cleanReservations.length; i++) {
                const r = cleanReservations[i];
                if (r.room !== room) continue;

                if (currentTarget >= r.checkInTime && currentTarget < r.checkOutTime) isOccupied = true;
                if (currentTarget === r.checkInTime) hasCheckin = true;
                if (currentTarget === r.checkOutTime) hasCheckout = true;
            }

            if (isOccupied) {
                stats[monthKey].dormidas++;
                occupiedRoomsToday++;
            }
            if (hasCheckin) stats[monthKey].checkins++;
            if (hasCheckout) stats[monthKey].checkouts++;
        });

        if (occupiedRoomsToday === rooms.length) {
            stats[monthKey].diasEsgotados++;
        }

        current = addDays(current, 1);
    }

    return stats;
}

function showOccupancyPlan() {
    const baseRooms = getBaseHouseRooms(selectedHouse);
    const totalRooms = baseRooms.length; // Sempre 3 para a Impasse

    // Divisão visual: displayRooms inclui a Villa para renderizar o texto em baixo caso exista reserva
    let displayRooms = [...baseRooms];
    if (selectedHouse === "impasse") {
        displayRooms.push("Impasse Villa");
    }

    const houseLabels = {
        achada: "Achada (6 Quartos)",
        impasse: "Impasse (3 Quartos)",
        vizinho: "Vizinho (3 Quartos)"
    };

    let html = renderNavigation() + `
        <div style="margin-bottom: 25px; display: flex; gap: 8px; flex-wrap: wrap;">
            ${['achada', 'impasse', 'vizinho'].map(h => `
                <button onclick="window.selectHouse('${h}')" style="
                    padding: 10px 16px; font-size: 14px; cursor: pointer; border-radius: 6px;
                    border: 2px solid #17a2b8; background-color: ${selectedHouse === h ? '#17a2b8' : '#ffffff'};
                    color: ${selectedHouse === h ? '#ffffff' : '#17a2b8'}; font-weight: bold;
                ">🏡 ${h.charAt(0).toUpperCase() + h.slice(1)}</button>
            `).join("")}
        </div>
        <h1>📊 Ocupação - ${houseLabels[selectedHouse]}</h1>
        <div style="margin-bottom: 20px;">
            <button onclick="window.toggleOccupancyStats()" style="
                padding: 10px 16px; font-size: 14px; cursor: pointer; border-radius: 6px;
                border: 1px solid #ffc107; background-color: ${showOccupancyStats ? '#e0a800' : '#ffc107'}; color: #333; font-weight: bold;
            ">${showOccupancyStats ? '🔙 Ocultar Estatísticas' : '📈 Ver Estatísticas Mensais'}</button>
        </div>
    `;

    if (showOccupancyStats) {
        const stats = calculateHouseStats(selectedHouse);
        const allStatKeys = Object.keys(stats).sort();

        const todayDate = new Date();
        const currentMonthStr = todayDate.getFullYear() + "-" + String(todayDate.getMonth() + 1).padStart(2, '0');

        const pastKeys = allStatKeys.filter(key => key < currentMonthStr).sort((a, b) => b.localeCompare(a));
        const futureKeys = allStatKeys.filter(key => key >= currentMonthStr).sort();

        const hasPastMonths = pastKeys.length > 0;
        const visibleKeys = viewPastMonths ? pastKeys : futureKeys;

        if (allStatKeys.length === 0) {
            html += `<p>Sem dados suficientes para calcular estatísticas desta casa.</p><hr>`;
        } else {
            if (hasPastMonths) {
                html += `
                    <div style="margin-bottom: 15px;">
                        <button onclick="window.togglePastStats()" style="
                            padding: 8px 12px; font-size: 13px; cursor: pointer; border-radius: 6px;
                            border: 1px solid #6c757d; background-color: ${viewPastMonths ? '#5a6268' : '#f8f9fa'}; color: ${viewPastMonths ? '#fff' : '#333'}; font-weight: bold;
                        ">${viewPastMonths ? '🔙 Ver Meses Atuais e Futuros' : '🕰️ Ver Meses Passados'}</button>
                    </div>
                `;
            }

            if (visibleKeys.length === 0) {
                html += `<p style="color: #666; font-style: italic;">Não existem registos para esta vista.</p>`;
            } else {
                html += `<div style="display: flex; flex-wrap: wrap; gap: 15px; margin-bottom: 25px;">`;
                visibleKeys.forEach(key => {
                    const s = stats[key];
                    const taxa = s.totalCapacity > 0 ? Math.round((s.dormidas / s.totalCapacity) * 100) : 0;

                    html += `
                        <div style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; flex: 1; min-width: 260px; background-color: #f8f9fa; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                            <h3 style="margin-top: 0; color: #007bff; text-transform: capitalize; border-bottom: 1px solid #ccc; padding-bottom: 8px;">${s.label}</h3>
                            <p style="margin: 8px 0; font-size: 15px;"><strong>🛏️ Ocupação:</strong> ${taxa}%</p>
                            <p style="margin: 8px 0; font-size: 15px;"><strong>🌙 Dormidas:</strong> ${s.dormidas} <span style="font-size: 12px; color: #666;">(cap: ${s.totalCapacity})</span></p>
                            <p style="margin: 8px 0; font-size: 15px;"><strong>🧳 Entradas:</strong> ${s.checkins} | <strong>🛫 Saídas:</strong> ${s.checkouts}</p>
                            <p style="margin: 8px 0; font-size: 15px;"><strong>🔥 Dias 100% cheios:</strong> ${s.diasEsgotados}</p>
                        </div>
                    `;
                });
                html += `</div>`;
            }
        }
    }

    html += `<hr>`;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let maxDate = addDays(today, 60);
    globalReservations.forEach(r => {
        if (displayRooms.includes(r.room)) {
            const outDate = new Date(r.checkOut);
            outDate.setHours(0, 0, 0, 0);
            if (outDate > maxDate) maxDate = outDate;
        }
    });

    const totalDays = getDaysBetween(today, maxDate) + 1;

    for (let i = 0; i < totalDays; i++) {
        const currentDate = addDays(today, i);
        let roomDetails = [];
        let occupiedCount = 0;

        displayRooms.forEach(roomName => {
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
                if (hasCheckout && hasCheckin) tag = " <b>(sai e entra)</b>";
                else if (hasCheckout) tag = " <b>(sai)</b>";
                else if (hasCheckin) tag = " <b>(entra)</b>";

                roomDetails.push(`${roomName}${tag}`);

                // Soma APENAS para os quartos normais (Impasse 2, 3, 4). Ignora a Villa na fração.
                if (baseRooms.includes(roomName)) {
                    occupiedCount++;
                }
            }
        });

        const dateFormatted = currentDate.toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

        html += `<h2>${dateFormatted}</h2>`;

        if (occupiedCount === 0 && roomDetails.length === 0) {
            html += `<div style="font-size: 18px; font-weight: bold; color: #28a745; margin-bottom: 5px;">0 🟢</div>`;
        } else {
            html += `<div style="font-size: 18px; font-weight: bold; color: #dc3545; margin-bottom: 5px;">${occupiedCount} / ${totalRooms} 🔴</div>
                     <div style="font-size: 14px; color: #333;">Ocupados: ${roomDetails.join(", ")}</div>`;
        }
        html += "<hr>";
    }

    const resultElem = getResultElem();
    if (resultElem) resultElem.innerHTML = html;
}

// Inicia assim que o HTML estiver pronto para evitar erros de renderização
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadCalendars);
} else {
    loadCalendars();
}
