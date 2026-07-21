const calendars = [
    { name: "Achada 1", url: "https://al.tracosdeoutono.workers.dev?room=achada1" },
    { name: "Achada 2", url: "https://al.tracosdeoutono.workers.dev?room=achada2" },
    { name: "Achada 3", url: "https://al.tracosdeoutono.workers.dev?room=achada3" },
    { name: "Achada 4", url: "https://al.tracosdeoutono.workers.dev?room=achada4" },
    { name: "Achada 5", url: "https://al.tracosdeoutono.workers.dev?room=achada5" },
    { name: "Achada 6", url: "https://al.tracosdeoutono.workers.dev?room=achada6" },
    { name: "Impasse 2", url: "https://al.tracosdeoutono.workers.dev?room=impasse2" },
    { name: "Impasse 3", url: "https://al.tracosdeoutono.workers.dev?room=impasse3" },
    { name: "Impasse 4", url: "https://al.tracosdeoutono.workers.dev?room=impasse4" },
    { name: "Impasse Villa", url: "https://al.tracosdeoutono.workers.dev?room=impassevilla" },
    { name: "Vizinho 1", url: "https://al.tracosdeoutono.workers.dev?room=vizinho1" },
    { name: "Vizinho 2", url: "https://al.tracosdeoutono.workers.dev?room=vizinho2" },
    { name: "Vizinho 3", url: "https://al.tracosdeoutono.workers.dev?room=vizinho3" }
];

const result = document.getElementById("result");

// Variáveis de estado global para permitir a alternância de vistas
let globalReservations = [];
let showHistoryMode = false;

async function loadCalendars() {
    result.innerHTML = "A carregar...";

    try {
        let reservations = [];

        for (const calendar of calendars) {
            const response = await fetch(calendar.url);
            const text = await response.text();
            const events = parseICS(text, calendar.name);
            reservations.push(...events);
        }

        globalReservations = reservations;
        showCleaningPlan();

    } catch (err) {
        result.innerHTML = "Erro: " + err.message;
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
        const start = event.match(/DTSTART;VALUE=DATE:(\d{8})/);
        const end = event.match(/DTEND;VALUE=DATE:(\d{8})/);

        if (!start || !end) {
            continue;
        }

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
            if (gap <= 2) {
                endDay = nextReservation.checkIn;
            }
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

                    if (currentIsAchada && otherIsAchada) {
                        score += 10;
                    }
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

// Função para alternar a vista entre Próximas e Anteriores
function toggleView() {
    showHistoryMode = !showHistoryMode;
    showCleaningPlan();
}

function showCleaningPlan() {
    let cleanings = [];
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calcular datas de limpeza
    globalReservations.forEach(reservation => {
        const info = getCleaningInfo(reservation, globalReservations);

        // Filtra conforme o modo (Histórico ou Futuro)
        const isPast = info.date < today;

        if ((showHistoryMode && isPast) || (!showHistoryMode && !isPast)) {
            cleanings.push({
                room: reservation.room,
                date: info.date,
                sunday: info.sunday,
                urgent: info.urgent
            });
        }
    });

    let grouped = {};

    cleanings.forEach(clean => {
        const key = clean.date.getFullYear() + "-" +
            (clean.date.getMonth() + 1).toString().padStart(2, '0') + "-" +
            clean.date.getDate().toString().padStart(2, '0');

        if (!grouped[key]) {
            grouped[key] = { date: clean.date, rooms: [], sunday: false };
        }
        grouped[key].rooms.push(clean);
        if (clean.sunday) {
            grouped[key].sunday = true;
        }
    });

    // Ordenação das chaves de data:
    // Se for histórico: da mais recente para a mais antiga (descendente)
    // Se for futuro: da mais antiga para a mais recente (ascendente)
    let sortedKeys = Object.keys(grouped).sort();
    if (showHistoryMode) {
        sortedKeys.reverse();
    }

    // Botão de topo e Título
    let buttonText = showHistoryMode ? "📅 Ver Próximas Limpezas" : "📜 Ver Dias Anteriores";
    let mainTitle = showHistoryMode ? "📜 Histórico de Limpezas (Dias Anteriores)" : "🧹 Plano de Limpezas";

    let html = `
        <div style="margin-bottom: 20px;">
            <button onclick="toggleView()" style="padding: 10px 16px; font-size: 15px; cursor: pointer; border-radius: 8px; border: 1px solid #ccc; background-color: #f0f0f0; font-weight: bold;">
                ${buttonText}
            </button>
        </div>
        <h1>${mainTitle}</h1>
    `;

    if (sortedKeys.length === 0) {
        html += `<p>Não há limpezas registradas ${showHistoryMode ? 'anteriores a hoje' : 'agendadas'}.</p>`;
    }

    // Gerar a lista por dias
    sortedKeys.forEach(key => {
        const day = grouped[key];
        
        let title = day.date.toLocaleDateString("pt-PT", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });

        if (day.sunday) {
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
