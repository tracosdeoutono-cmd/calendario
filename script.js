const calendars = [
    {
        name: "Achada 1",
        url: "https://al.tracosdeoutono.workers.dev?room=1"
    },
    {
        name: "Achada 2",
        url: "https://al.tracosdeoutono.workers.dev?room=2"
    }
];

const result = document.getElementById("result");

async function loadCalendars(){
    result.innerHTML = "Loading...";

    try{
        let reservations = [];

        for(const calendar of calendars){
            const response = await fetch(calendar.url);
            const text = await response.text();
            const events = parseICS(text, calendar.name);
            reservations.push(...events);
        }

        showReservations(reservations);

    }catch(error){
        result.innerHTML = "Erro ao carregar calendários: " + error;
    }
}

function parseDate(icsDate){
    const year = Number(icsDate.substring(0,4));
    const month = Number(icsDate.substring(4,6)) - 1;
    const day = Number(icsDate.substring(6,8));

    return new Date(year, month, day);
}

function parseICS(text, roomName){
    const reservations = [];
    const events = text.split("BEGIN:VEVENT");

    for(const event of events){
        // Regex flexível para capturar DTSTART e DTEND em vários formatos de iCal
        const start = event.match(/DTSTART.*?:(\d{8})/);
        const end = event.match(/DTEND.*?:(\d{8})/);

        if(!start || !end){
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

function sameDay(a,b){
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

function addDays(date, amount){
    const d = new Date(date);
    d.setDate(d.getDate() + amount);
    return d;
}

function isSunday(date){
    return date.getDay() === 0;
}

function getDaysBetween(dateA, dateB){
    const diffTime = dateB.getTime() - dateA.getTime();
    return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

function getCleaningDay(reservation, allReservations){
    const checkout = reservation.checkOut;

    // Procurar a próxima reserva no mesmo quarto
    const nextReservation = allReservations
        .filter(r => r.room === reservation.room && r.checkIn >= checkout)
        .sort((a, b) => a.checkIn - b.checkIn)[0];

    // Se não houver próxima reserva, limpa no checkout (respeitando domingo)
    if(!nextReservation){
        return isSunday(checkout) ? addDays(checkout, 1) : checkout;
    }

    const gapDays = getDaysBetween(checkout, nextReservation.checkIn);

    // Regra 1: Intervalo de 3 dias ou mais -> limpa logo no checkout
    if(gapDays >= 3){
        return isSunday(checkout) ? addDays(checkout, 1) : checkout;
    }

    // Regra 2: Intervalo de 2 dias ou menos -> testar do checkout até ao checkIn (inclusive)
    let bestDay = checkout;
    let maxCleaningsOnDay = -1;

    for(let d = new Date(checkout); d <= nextReservation.checkIn; d = addDays(d, 1)){
        // Evitar domingos, exceto se houver entrada no próprio domingo
        if(isSunday(d)){
            const hasArrivalOnSunday = allReservations.some(r => r.room === reservation.room && sameDay(r.checkIn, d));
            if(!hasArrivalOnSunday){
                continue; 
            }
        }

        // Contar quantas limpezas coincidem neste dia 'd'
        let count = 0;
        allReservations.forEach(r => {
            const rCheckout = r.checkOut;
            const rNext = allReservations
                .filter(sub => sub.room === r.room && sub.checkIn >= rCheckout)
                .sort((a, b) => a.checkIn - b.checkIn)[0];

            if(rNext){
                const rGap = getDaysBetween(rCheckout, rNext.checkIn);
                if(rGap <= 2){
                    if(d >= rCheckout && d <= rNext.checkIn){
                        count++;
                        return;
                    }
                }
            }
            if(sameDay(rCheckout, d)){
                count++;
            }
        });

        if(count > maxCleaningsOnDay){
            maxCleaningsOnDay = count;
            bestDay = new Date(d);
        }
    }

    return bestDay;
}

function showReservations(reservations){
    let html = "";
    const today = new Date();
    today.setHours(0,0,0,0);

    for(let i = 0; i < 30; i++){
        const day = addDays(today,i);

        const arrivals = reservations.filter(r => 
            sameDay(r.checkIn, day)
        );

        const departures = reservations.filter(r => 
            sameDay(r.checkOut, day)
        );

        const cleanings = reservations.filter(r => {
            const cleaningDay = getCleaningDay(r, reservations);
            return sameDay(cleaningDay, day);
        });

        if(
            arrivals.length === 0 &&
            departures.length === 0 &&
            cleanings.length === 0
        ){
            continue;
        }

        let title = day.toLocaleDateString(
            "pt-PT",
            {
                weekday:"long",
                day:"numeric",
                month:"long"
            }
        );

        const sundayRequired = cleanings.some(c =>
            isSunday(day) &&
            sameDay(getCleaningDay(c,reservations),day)
        );

        if(sundayRequired){
            title = "🔴 " + title;
        }

        html += `<h2>${title}</h2>`;

        html += "<b>⬇ Saídas</b><br>";
        if(departures.length === 0){
            html += "Nenhuma<br>";
        }else{
            departures.forEach(r=>{
                html += "• " + r.room + "<br>";
            });
        }

        html += "<br><b>⬆ Entradas</b><br>";
        if(arrivals.length === 0){
            html += "Nenhuma<br>";
        }else{
            arrivals.forEach(r=>{
                html += "• " + r.room + "<br>";
            });
        }

        html += "<br><b>🧹 Limpezas</b><br>";

        if(cleanings.length === 0){
            html += "Nenhuma<br>";
        }else{
            cleanings.forEach(r=>{
                const hasArrivalSameDay = reservations.some(a =>
                    a.room === r.room &&
                    sameDay(a.checkIn,day)
                );

                if(hasArrivalSameDay){
                    html += "• " + r.room + " (entrada hoje)<br>";
                }else{
                    html += "• " + r.room + "<br>";
                }
            });
        }

        html += "<hr>";
    }

    if(html === ""){
        result.innerHTML = "Nenhuma reserva encontrada para os próximos 30 dias.";
    }else{
        result.innerHTML = html;
    }
}

loadCalendars();
