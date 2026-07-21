JavaScript
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
        result.innerHTML = error;
    }
}
Parte 2: Leitura de Datas e ICS (Mantém-se igual)
JavaScript
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
        const start = event.match(/DTSTART;VALUE=DATE:(\d{8})/);
        const end = event.match(/DTEND;VALUE=DATE:(\d{8})/);

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
Parte 3: Nova Lógica de Limpeza Otimizada
JavaScript
function getCleaningDay(reservation, allReservations){
    const checkout = reservation.checkOut;

    // Procurar a próxima reserva no mesmo quarto
    const nextReservation = allReservations
        .filter(r => r.room === reservation.room && r.checkIn >= checkout)
        .sort((a, b) => a.checkIn - b.checkIn)[0];

    // Se não houver próxima reserva, limpa logo no checkout
    if(!nextReservation){
        return isSunday(checkout) ? addDays(checkout, 1) : checkout;
    }

    const gapDays = getDaysBetween(checkout, nextReservation.checkIn);

    // Regra: Se o intervalo for de 3 dias ou mais, limpa logo no checkout (respeitando domingo)
    if(gapDays >= 3){
        return isSunday(checkout) ? addDays(checkout, 1) : checkout;
    }

    // Regra: Se o intervalo for 2 dias ou menos, escolhe o dia ideal entre o checkout e o checkIn
    // Vamos testar todos os dias possíveis no intervalo e ver qual deles acumula mais limpezas globais
    let bestDay = checkout;
    let maxCleaningsOnDay = -1;

    for(let d = new Date(checkout); d < nextReservation.checkIn; d = addDays(d, 1)){
        // Evitar limpar aos domingos, exceto se houver entrada estrita nesse domingo
        if(isSunday(d)){
            const hasArrivalOnSunday = allReservations.some(r => r.room === reservation.room && sameDay(r.checkIn, d));
            if(!hasArrivalOnSunday){
                continue; 
            }
        }

        // Contar quantas reservas dariam para limpar neste dia 'd'
        let count = 0;
        allReservations.forEach(r => {
            const rCheckout = r.checkOut;
            const rNext = allReservations
                .filter(sub => sub.room === r.room && sub.checkIn >= rCheckout)
                .sort((a, b) => a.checkIn - b.checkIn)[0];
            
            if(rNext){
                const rGap = getDaysBetween(rCheckout, rNext.checkIn);
                let suggested = rCheckout;
                if(rGap < 3){
                    // Se for intervalo curto, qual seria o dia ideal simulado? 
                    // Para simplificar a escolha de maior concorrência, verificamos se 'd' cai no intervalo dela
                    if(d >= rCheckout && d < rNext.checkIn){
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
Parte 4: Exibição e Execução (Mantém-se igual)
JavaScript
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

    result.innerHTML = html;
}

loadCalendars();
