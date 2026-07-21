const calendars = [

    {
        name: "Achada 1",
        url: "https://al.tracosdeoutono.workers.dev?room=achada1"
    },
    {
        name: "Achada 2",
        url: "https://al.tracosdeoutono.workers.dev?room=achada2"
    },
    {
        name: "Achada 3",
        url: "https://al.tracosdeoutono.workers.dev?room=achada3"
    },
    {
        name: "Achada 4",
        url: "https://al.tracosdeoutono.workers.dev?room=achada4"
    },
    {
        name: "Achada 5",
        url: "https://al.tracosdeoutono.workers.dev?room=achada5"
    },
    {
        name: "Achada 6",
        url: "https://al.tracosdeoutono.workers.dev?room=achada6"
    },

    {
        name: "Impasse 2",
        url: "https://al.tracosdeoutono.workers.dev?room=impasse2"
    },
    {
        name: "Impasse 3",
        url: "https://al.tracosdeoutono.workers.dev?room=impasse3"
    },
    {
        name: "Impasse 4",
        url: "https://al.tracosdeoutono.workers.dev?room=impasse4"
    },
    {
        name: "Impasse Villa",
        url: "https://al.tracosdeoutono.workers.dev?room=impassevilla"
    },

    {
        name: "Vizinho 1",
        url: "https://al.tracosdeoutono.workers.dev?room=vizinho1"
    },
    {
        name: "Vizinho 2",
        url: "https://al.tracosdeoutono.workers.dev?room=vizinho2"
    },
    {
        name: "Vizinho 3",
        url: "https://al.tracosdeoutono.workers.dev?room=vizinho3"
    }

];


const result = document.getElementById("result");



async function loadCalendars(){

    result.innerHTML = "A carregar...";


    try{


        let reservations = [];


        for(const calendar of calendars){


            const response = await fetch(calendar.url);


            const text = await response.text();


            const events = parseICS(
                text,
                calendar.name
            );


            reservations.push(...events);


        }


        showCleaningPlan(reservations);


    }
    catch(err){

        result.innerHTML = err;

    }

}


function parseDate(icsDate){

    const year = Number(icsDate.substring(0,4));

    const month = Number(icsDate.substring(4,6)) - 1;

    const day = Number(icsDate.substring(6,8));


    return new Date(
        year,
        month,
        day
    );

}




function parseICS(text, roomName){


    const reservations = [];


    const events = text.split("BEGIN:VEVENT");



    for(const event of events){


        const start = event.match(
            /DTSTART;VALUE=DATE:(\d{8})/
        );


        const end = event.match(
            /DTEND;VALUE=DATE:(\d{8})/
        );



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



function addDays(date,days){

    const d = new Date(date);

    d.setDate(d.getDate() + days);

    return d;

}



function isSunday(date){

    return date.getDay() === 0;

}




function hasSameDayArrival(reservation, reservations){


    return reservations.some(r =>

        r.room === reservation.room &&

        sameDay(r.checkIn, reservation.checkOut)

    );


}





function getCleaningInfo(reservation, reservations){


    const checkout = reservation.checkOut;



    // Se não for domingo, limpa normalmente
    if(!isSunday(checkout)){


        return {

            date: checkout,

            sunday: false,

            urgent: false

        };


    }





    // Se há entrada nesse domingo,
    // a limpeza tem de ser feita nesse dia

    if(hasSameDayArrival(reservation,reservations)){


        return {

            date: checkout,

            sunday: true,

            urgent: true

        };


    }





    // Caso contrário passa para segunda

    return {

        date: addDays(checkout,1),

        sunday: false,

        urgent: false

    };


}

function showCleaningPlan(reservations){


    let cleanings = [];



    reservations.forEach(reservation => {



        const info = getCleaningInfo(
            reservation,
            reservations
        );



        cleanings.push({

            room: reservation.room,

            date: info.date,

            sunday: info.sunday,

            urgent: info.urgent

        });



    });





    cleanings.sort((a,b)=>a.date-b.date);





    let grouped = {};





    cleanings.forEach(clean => {



        const key = clean.date
            .toISOString()
            .split("T")[0];




        if(!grouped[key]){


            grouped[key] = {

                date: clean.date,

                rooms: [],

                sunday: false

            };


        }




        grouped[key].rooms.push(clean);




        if(clean.sunday){

            grouped[key].sunday = true;

        }



    });






    let html = "<h1>🧹 Plano de Limpezas</h1>";





    Object.values(grouped).forEach(day => {



        let title = day.date.toLocaleDateString(
            "pt-PT",
            {
                weekday:"long",
                day:"numeric",
                month:"long"
            }
        );



        if(day.sunday){

            title = "🔴 " + title;

        }




        html += `

        <h2>${title}</h2>

        `;




        day.rooms.forEach(clean => {



            let extra = "";



            const hasArrival = reservations.some(r =>

                r.room === clean.room &&

                sameDay(r.checkIn, clean.date)

            );



            if(hasArrival){

                extra = " (entrada hoje)";

            }




            html += `

            🧹 ${clean.room}${extra}<br>

            `;



        });




        html += "<hr>";



    });




    result.innerHTML = html;


}



loadCalendars();
