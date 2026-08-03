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
let failedCalendars = [];

// Estados da Aplicação
let currentView = "cleaning";
let showHistoryMode = false;
let selectedHouse = "achada";
let showOccupancyStats = false;
let viewPastMonths = false;

function getResultElem() {
    return document.getElementById("result");
}

async function fetchTextWithTimeout(url, timeoutMs = 25000) {
    try {
        return await Promise.race([
            fetch(url).then(async res => {
                if (!res.ok) throw new Error("Erro HTTP");
                return await res.text();
            }),
            new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), timeoutMs))
        ]);
    } catch (e) {
        console.error(`Falha ao carregar ${url}:`, e);
        return null;
    }
}

async function fetchJsonWithTimeout(url, timeoutMs = 15000) {
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
    cloudHistory = await fetchJsonWithTimeout(`${WORKER_BASE_URL}?action=getHistory`, 15000);
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
        resultElem.innerHTML = "<p style='font-size: 18px; font-weight: bold; color: #007bff;'>⏳ A ligar à Cloud e a carregar calendários (isto pode demorar uns segundos)...</p>";
    }

    try {
        failedCalendars = [];
        globalReservations = [];
        
        const historyPromise = fetchCloudHistory();

        const calendarPromises = calendars.map(async (calendar) => {
            const text = await fetchTextWithTimeout(calendar.url, 25000);
            if (text === null) {
                return { name: calendar.name, error: true, data: [] };
            }
            return { name: calendar.name, error: false, data: parseICS(text, calendar.name) };
        });

        const [_, results] = await Promise.all([historyPromise, Promise.all(calendarPromises)]);
        
        results.forEach(res => {
            if (res.error) {
                failedCalendars.push(res.name);
            } else {
                globalReservations.push(...res.data);
            }
        });

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

function isSunday(date) {
    return date.getDay() === 0;
}

function sameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
}

function addDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    d.setHours(0, 0, 0, 0);
    return d;
}

function getDaysBetween(dateA, dateB) {
    const diffTime = dateB.getTime() - dateA.getTime();
    return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

function renderNavigation() {
    let warnHTML = "";
    if (failedCalendars.length > 0) {
        warnHTML = `<div style="background-color: #f8d7da; color: #721c24; padding: 12px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #f5c6cb;">
            <strong>⚠️ Atenção:</strong> Alguns calendários demoraram a responder e estão temporariamente em falta.<br>
            Quartos afetados: <b>${failedCalendars.join(", ")}</b>.<br>
            <i>Dica: Recarrega a página se precisares de atualizar estes quartos específicos.</i>
        </div>`;
    }

    return `
        ${warnHTML}
        <div style="display: flex; gap: 10px; margin-bottom: 20px;">
            <button onclick="switchMainView('cleaning')" style="flex: 1; padding: 15px; font-size: 16px; border-radius: 8px; font-weight: bold; cursor: pointer; border: none; background-color: ${currentView === 'cleaning' ? '#007bff' : '#e0e0e0'}; color: ${currentView === 'cleaning' ? 'white' : 'black'};">
                🧹 Plano de Limpezas
            </button>
            <button onclick="switchMainView('occupancy')" style="flex: 1; padding: 15px; font-size: 16px; border-radius: 8px; font-weight: bold; cursor: pointer; border: none; background-color: ${currentView === 'occupancy' ? '#007bff' : '#e0e0e0'}; color: ${currentView === 'occupancy' ? 'white' : 'black'};">
                🏠 Plano de Ocupação
            </button>
        </div>
    `;
}

function getCleaningInfo(reservation, allReservations) {
    const checkout = reservation.checkOut;
    
    const sameDayArrival = allReservations.some(r => r.room === reservation.room && sameDay(r.checkIn, checkout));
    const nextReservation = allReservations
        .filter(r => r.room === reservation.room && r.checkIn >= checkout)
        .sort((a, b) => a.checkIn - b.checkIn)[0];

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
            const concurrentCount = allReservations.filter(r => r.room !== reservation.room && sameDay(r.checkOut, d)).length;
            const isEntryDay = nextReservation && sameDay(d, nextReservation.checkIn);
            let score = 0;
            if (concurrentCount === 0) score += 3;
            else if (concurrentCount === 1) score += 1;
            if (!isEntryDay) score += 5;

            if (score > bestScore) {
                bestScore = score;
                bestDay = d;
            }
        }
    }
    
    return { date: bestDay, sunday: isForcedSunday, urgent: sameDayArrival };
}

function updateCloudHistory() {
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    let needsSave = false;
    let mergedHistory = typeof cloudHistory === 'object' && cloudHistory !== null ? JSON.parse(JSON.stringify(cloudHistory)) : {};

    globalReservations.forEach(reservation => {
        const info = getCleaningInfo(reservation, globalReservations);
        if (info.date <= today) {
            const dateKey = info.date.getFullYear() + "-" + (info.date.getMonth() + 1).toString().padStart(2, '0') + "-" + info.date.getDate().toString().padStart(2, '0');
            
            if (!mergedHistory[dateKey]) mergedHistory[dateKey] = [];
            
            const existingRoom = mergedHistory[dateKey].find(r => r.room === reservation.room);
            if (!existingRoom) {
                mergedHistory[dateKey].push({ room: reservation.room, sunday: info.sunday, urgent: info.urgent });
                needsSave = true;
            }
        }
    });

    if (needsSave) {
        cloudHistory = mergedHistory;
        saveToCloudHistory(mergedHistory);
    }
}

function getBaseHouseRooms(houseKey) {
    if (houseKey === "achada") return ["Achada 1", "Achada 2", "Achada 3", "Achada 4", "Achada 5", "Achada 6"];
    if (houseKey === "impasse") return ["Impasse 2", "Impasse 3", "Impasse 4"];
    if (houseKey === "vizinho") return ["Vizinho 1", "Vizinho 2", "Vizinho 3"];
    return [];
}

function getMonthNamePT(monthIndex) {
    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    return months[monthIndex];
}

function calculateHouseStats(houseKey) {
    const baseRooms = getBaseHouseRooms(houseKey);
    const houseReservations = globalReservations.filter(r => baseRooms.includes(r.room));
    
    if (houseReservations.length === 0) return "<p>Sem dados suficientes para estatísticas.</p>";

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let minDate = new Date(Math.min(...houseReservations.map(r => r.checkIn.getTime())));
    let maxDate = new Date(Math.max(...houseReservations.map(r => r.checkOut.getTime())));
    
    if (minDate > today) minDate = new Date(today);

    const stats = [];

    let current = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
    current.setHours(0, 0, 0, 0);
    
    let end = new Date(maxDate.getFullYear(), maxDate.getMonth() + 1, 0);
    end.setHours(0, 0, 0, 0);

    while (current <= end) {
        const yr = current.getFullYear();
        const mo = current.getMonth();
        
        const isPastMonth = (yr < today.getFullYear()) || (yr === today.getFullYear() && mo < today.getMonth());
        
        let daysInMonth = new Date(yr, mo + 1, 0).getDate();
        let totalPossibleNights = daysInMonth * baseRooms.length;
        let occupiedNights = 0;

        let d = new Date(yr, mo, 1);
        d.setHours(0, 0, 0, 0);
        
        for (let i = 0; i < daysInMonth; i++) {
            baseRooms.forEach(room => {
                const isOccupied = houseReservations.some(r => {
                    if (r.room !== room) return false;
                    let cIn = new Date(r.checkIn); cIn.setHours(0, 0, 0, 0);
                    let cOut = new Date(r.checkOut); cOut.setHours(0, 0, 0, 0);
                    return d >= cIn && d < cOut;
                });
                if (isOccupied) occupiedNights++;
            });
            d = addDays(d, 1);
        }

        let occPercent = totalPossibleNights > 0 ? ((occupiedNights / totalPossibleNights) * 100).toFixed(1) : 0;
        stats.push({ yr, mo, occupiedNights, totalPossibleNights, occPercent, isPastMonth });

        current = new Date(yr, mo + 1, 1);
        current.setHours(0, 0, 0, 0);
    }

    let html = ``;
    let hasShownAny = false;

    stats.sort((a, b) => {
        if (a.yr !== b.yr) return b.yr - a.yr;
        return b.mo - a.mo;
    });

    stats.forEach(s => {
        if (s.isPastMonth && !viewPastMonths) return;
        
        hasShownAny = true;
        let barColor = s.occPercent > 70 ? "#28a745" : (s.occPercent > 40 ? "#ffc107" : "#dc3545");
        
        html += `
            <div style="background-color: #fff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <span style="font-size: 16px; font-weight: bold;">${getMonthNamePT(s.mo)} ${s.yr}</span>
                    <span style="font-size: 18px; font-weight: bold; color: ${barColor};">${s.occPercent}%</span>
                </div>
                <div style="background-color: #e9ecef; border-radius: 4px; height: 8px; width: 100%; overflow: hidden;">
                    <div style="height: 100%; width: ${s.occPercent}%; background-color: ${barColor};"></div>
                </div>
                <div style="font-size: 13px; color: #666; margin-top: 8px;">
                    Noites Ocupadas: <b>${s.occupiedNights}</b> / ${s.totalPossibleNights}
                </div>
            </div>
        `;
    });

    if (!hasShownAny) {
        html += `<p style="color: #666; font-style: italic; margin-top: 10px;">Não há estatísticas para apresentar com os filtros atuais.</p>`;
    }

    return html;
}

function showCleaningPlan() {
    const resultElem = getResultElem();
    if (!resultElem) return;

    let today = new Date();
    today.setHours(0, 0, 0, 0);

    let html = renderNavigation();

    html += `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h2 style="margin: 0; color: #333;">🧹 Plano de Limpezas</h2>
            <button onclick="toggleHistoryView()" style="padding: 8px 12px; font-size: 13px; border-radius: 6px; border: 1px solid #ccc; background: white; cursor: pointer;">
                ${showHistoryMode ? 'Esconder Histórico' : '📜 Mostrar Histórico'}
            </button>
        </div>
    `;

    let cleaningMap = {};

    if (showHistoryMode) {
        Object.keys(cloudHistory).forEach(dateStr => {
            if (!cleaningMap[dateStr]) cleaningMap[dateStr] = [];
            cloudHistory[dateStr].forEach(item => {
                cleaningMap[dateStr].push(item);
            });
        });
    }

    globalReservations.forEach(r => {
        const info = getCleaningInfo(r, globalReservations);
        const dateKey = info.date.getFullYear() + "-" + (info.date.getMonth() + 1).toString().padStart(2, '0') + "-" + info.date.getDate().toString().padStart(2, '0');
        
        if (!cleaningMap[dateKey]) cleaningMap[dateKey] = [];
        
        const exists = cleaningMap[dateKey].some(item => item.room === r.room);
        if (!exists) {
            cleaningMap[dateKey].push({
                room: r.room,
                sunday: info.sunday,
                urgent: info.urgent
            });
        }
    });

    let sortedDates = Object.keys(cleaningMap).sort();

    if (sortedDates.length === 0) {
        html += `<p style="color: #666; font-style: italic;">Sem limpezas agendadas.</p>`;
        resultElem.innerHTML = html;
        return;
    }

    sortedDates.forEach(dateStr => {
        const [y, m, d] = dateStr.split("-").map(Number);
        const cleanDate = new Date(y, m - 1, d);
        cleanDate.setHours(0, 0, 0, 0);

        if (!showHistoryMode && cleanDate < today) return;

        const isToday = sameDay(cleanDate, today);
        const dateFormatted = cleanDate.toLocaleDateString("pt-PT", { weekday: "long", day: "2-digit", month: "long" });

        let items = cleaningMap[dateStr];
        let copyTextList = items.map(i => i.room).join(", ");
        let encodedCopy = encodeURIComponent(`Limpezas (${dateFormatted}): ${copyTextList}`);

        html += `
            <div style="background-color: ${isToday ? '#e6f0ff' : '#fff'}; border: 1px solid ${isToday ? '#007bff' : '#ddd'}; border-radius: 8px; padding: 15px; margin-bottom: 15px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <span style="font-size: 16px; font-weight: bold; text-transform: capitalize;">${dateFormatted} ${isToday ? ' (HOJE)' : ''}</span>
                    <button onclick="copyFromData(this, '${encodedCopy}')" style="padding: 6px 10px; font-size: 12px; border-radius: 4px; border: 1px solid #007bff; background-color: #007bff; color: white; cursor: pointer;">📋 Copiar</button>
                </div>
                <ul style="margin: 0; padding-left: 20px;">
        `;

        items.forEach(item => {
            let badge = "";
            if (item.urgent) badge += ` <span style="background: #dc3545; color: white; padding: 2px 6px; border-radius: 4px; font-size: 11px;">⚠️ Entrada no mesmo dia</span>`;
            if (item.sunday) badge += ` <span style="background: #ffc107; color: black; padding: 2px 6px; border-radius: 4px; font-size: 11px;">Domingo OBRIGATÓRIO</span>`;

            html += `<li style="margin-bottom: 5px; font-size: 15px;"><b>${item.room}</b>${badge}</li>`;
        });

        html += `
                </ul>
            </div>
        `;
    });

    resultElem.innerHTML = html;
}

function showOccupancyPlan() {
    const resultElem = getResultElem();
    if (!resultElem) return;

    let today = new Date();
    today.setHours(0, 0, 0, 0);

    let html = renderNavigation();
    
    html += `
        <div style="display: flex; gap: 10px; margin-bottom: 20px;">
            <button onclick="selectHouse('achada')" style="flex: 1; padding: 10px; font-size: 14px; border-radius: 6px; font-weight: bold; border: none; background-color: ${selectedHouse === 'achada' ? '#333' : '#e0e0e0'}; color: ${selectedHouse === 'achada' ? 'white' : 'black'};">Achada</button>
            <button onclick="selectHouse('impasse')" style="flex: 1; padding: 10px; font-size: 14px; border-radius: 6px; font-weight: bold; border: none; background-color: ${selectedHouse === 'impasse' ? '#333' : '#e0e0e0'}; color: ${selectedHouse === 'impasse' ? 'white' : 'black'};">Impasse</button>
            <button onclick="selectHouse('vizinho')" style="flex: 1; padding: 10px; font-size: 14px; border-radius: 6px; font-weight: bold; border: none; background-color: ${selectedHouse === 'vizinho' ? '#333' : '#e0e0e0'}; color: ${selectedHouse === 'vizinho' ? 'white' : 'black'};">Vizinho</button>
        </div>
    `;

    const baseRooms = getBaseHouseRooms(selectedHouse);
    const totalRooms = baseRooms.length;
    
    let displayRooms = [...baseRooms];
    if (selectedHouse === "impasse") {
        displayRooms.push("Impasse Villa");
    }

    html += `
        <div style="display: flex; gap: 10px; margin-bottom: 20px;">
            <button onclick="switchMainView('occupancy')" style="flex: 1; padding: 10px; border-radius: 6px; font-weight: bold; border: 1px solid #333; background-color: ${!showOccupancyStats ? '#f8f9fa' : 'white'};">📅 Plano 60 Dias</button>
            <button onclick="toggleOccupancyStats()" style="flex: 1; padding: 10px; border-radius: 6px; font-weight: bold; border: 1px solid #333; background-color: ${showOccupancyStats ? '#f8f9fa' : 'white'};">📊 Estatísticas</button>
        </div>
    `;

    if (showOccupancyStats) {
        html += `<h3 style="margin-bottom: 15px; color: #333;">Estatísticas Mensais (${selectedHouse.toUpperCase()})</h3>`;
        html += `
            <div style="margin-bottom: 20px; text-align: right;">
                <button onclick="togglePastStats()" style="padding: 8px 12px; font-size: 12px; border-radius: 6px; border: 1px solid #ccc; background: white; cursor: pointer;">
                    ${viewPastMonths ? 'Esconder Meses Passados' : 'Mostrar Meses Passados'}
                </button>
            </div>
        `;
        html += calculateHouseStats(selectedHouse);
    } else {
        html += `<h3 style="margin-bottom: 15px; color: #333;">Próximos 60 Dias (${selectedHouse.toUpperCase()})</h3>`;
        
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
            const isToday = i === 0;

            const dayString = currentDate.toLocaleDateString("pt-PT", { weekday: "long", day: "2-digit", month: "long" });

            let occupiedCount = 0;
            let roomDetails = [];

            displayRooms.forEach(roomName => {
                const hasCheckout = globalReservations.some(r => r.room === roomName && sameDay(r.checkOut, currentDate));
                const hasCheckin = globalReservations.some(r => r.room === roomName && sameDay(r.checkIn, currentDate));
                
                const isOccupiedOvernight = globalReservations.some(r => {
                    if (r.room !== roomName) return false;
                    const checkIn = new Date(r.checkIn); checkIn.setHours(0, 0, 0, 0);
                    const checkOut = new Date(r.checkOut); checkOut.setHours(0, 0, 0, 0);
                    return currentDate >= checkIn && currentDate < checkOut;
                });

                if (baseRooms.includes(roomName) && isOccupiedOvernight) {
                    occupiedCount++;
                }

                if (isOccupiedOvernight || hasCheckout || hasCheckin) {
                    let tag = "";
                    if (hasCheckout && hasCheckin) tag = " <b>(sai e entra)</b>";
                    else if (hasCheckout) tag = " <b>(sai)</b>";
                    else if (hasCheckin) tag = " <b>(entra)</b>";
                    roomDetails.push(`${roomName}${tag}`);
                }
            });

            html += `
                <div style="background-color: ${isToday ? '#fffae6' : '#fff'}; border: 1px solid ${isToday ? '#ffc107' : '#ddd'}; border-radius: 8px; padding: 15px; margin-bottom: 10px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <span style="font-size: 16px; font-weight: bold; text-transform: capitalize;">${dayString} ${isToday ? ' (HOJE)' : ''}</span>
                        <span style="font-size: 14px; font-weight: bold; background: #e0e0e0; padding: 4px 8px; border-radius: 4px;">Ocupação: ${occupiedCount} / ${totalRooms}</span>
                    </div>
                    <div style="font-size: 14px; color: #444;">
                        ${roomDetails.length > 0 ? roomDetails.join(" • ") : "<i>Nenhum movimento ou ocupação neste dia.</i>"}
                    </div>
                </div>
            `;
        }
    }

    resultElem.innerHTML = html;
}

// Inicia o carregamento assim que o script é executado
loadCalendars();
