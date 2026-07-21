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



function getCleaningDay(reservation, allReservations){

    const checkout = reservation.checkOut;


    // Se não for domingo, limpa nesse dia
    if(!isSunday(checkout)){

        return checkout;

    }


    // Verifica se existe entrada no mesmo quarto nesse domingo
    const sameDayArrival = allReservations.some(r =>

        r.room === reservation.room &&
        sameDay(r.checkIn, checkout)

    );


    // Se há entrada no domingo, limpeza obrigatória no domingo
    if(sameDayArrival){

        return checkout;

    }


    // Caso contrário passa para segunda-feira
    return addDays(checkout,1);

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



        // Domingo obrigatório fica vermelho
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
