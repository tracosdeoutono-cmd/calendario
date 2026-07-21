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

        showCleaningPlan(reservations);

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

// O CORAÇÃO DA OTIMIZAÇÃO
function getCleaningInfo(reservation, allReservations) {
    const checkout = reservation.checkOut;

    // Encontrar a próxima reserva para este quarto específico
    const nextReservation = allReservations
        .filter(r => r.room === reservation.room && r.checkIn >= checkout)
        .sort((a, b) => a.checkIn - b.checkIn)[0];

    // Verifica se entra alguém no preciso dia em que o hóspede atual sai
    const sameDayArrival = nextReservation && sameDay(checkout, nextReservation.checkIn);

    let bestDay = checkout;
    let isForcedSunday = false;

    // REGRA 1: Domingo obrigatório APENAS se checkout e checkin forem no mesmo domingo
    if (isSunday(checkout) && sameDayArrival) {
        bestDay = checkout;
        isForcedSunday = true;
    } else {
        // Se checkout for ao domingo (sem entrada), a janela de procura começa logo na 2ª feira
        let startDay = isSunday(checkout) ? addDays(checkout, 1) : checkout;
        let endDay = startDay;

        // Se houver próxima reserva, vemos se está a 1 ou 2 dias de distância
        if (nextReservation) {
            const gap = getDaysBetween(checkout, nextReservation.checkIn);
            if (gap <= 2) {
                endDay = nextReservation.checkIn;
            }
        }

        let maxOtherCheckouts = -1;

        // REGRA 2: Procurar o melhor dia na janela temporal
        for (let d = new Date(startDay); d <= endDay; d = addDays(d, 1)) {
            // NUNCA escolhe um domingo durante esta procura (só cai aqui se não for forçado)
            if (isSunday(d)) continue;

            // Conta os checkouts (ou limpezas concorrentes) noutros quartos neste dia
            let checkoutsToday = allReservations.filter(r => sameDay(r.checkOut, d)).length;

            // O >= garante que agrupa, e em caso de empate, empurra para a frente, rentabilizando idas
            if (checkoutsToday >= maxOtherCheckouts) {
                maxOtherCheckouts = checkoutsToday;
                bestDay = new Date(d);
            }
        }
    }

    // A limpeza é "urgente" se calhar exatamente no dia em que o próximo hóspede entra
    const urgent = nextReservation ? sameDay(bestDay, nextReservation.checkIn) : false;

    return {
        date: bestDay,
        sunday: isForcedSunday,
        urgent: urgent
    };
}

function showCleaningPlan(reservations) {
    let cleanings = [];
    
    // Configura o "hoje" à meia noite para não mostrar limpezas antigas
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calcular o dia ótimo de limpeza para cada reserva
    reservations.forEach(reservation => {
        const info = getCleaningInfo(reservation, reservations);

        // Só queremos guardar limpezas que sejam hoje ou no futuro
        if (info.date >= today) {
            cleanings.push({
                room: reservation.room,
                date: info.date,
                sunday: info.sunday,
                urgent: info.urgent
            });
        }
    });

    let grouped = {};

    // Ordenar cronologicamente e agrupar por data
    cleanings.sort((a, b) => a.date - b.date).forEach(clean => {
        // Criar chave à prova de fusos horários (YYYY-MM-DD)
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

    let html = "<h1>🧹 Plano de Limpezas</h1>";

    const sortedKeys = Object.keys(grouped).sort();

    if (sortedKeys.length === 0) {
        html += "<p>Não há limpezas agendadas.</p>";
    }

    // Gerar o HTML agrupado por dias
    sortedKeys.forEach(key => {
        const day = grouped[key];
        
        let title = day.date.toLocaleDateString("pt-PT", {
            weekday: "long",
            day: "numeric",
            month: "long"
        });

        if (day.sunday) {
            title = "🔴 " + title;
        }

        html += `<h2>${title}</h2>`;

        day.rooms.forEach(clean => {
            let extra = clean.urgent ? " <b>(entrada hoje)</b>" : "";
            html += `🧹 ${clean.room}${extra}<br>`;
        });

        html += "<hr>";
    });

    result.innerHTML = html;
}

loadCalendars();
