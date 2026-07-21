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

            const events = parseICS(text, calendar.name);

            reservations.push(...events);

        }

        showCleaningPlan(reservations);

    }catch(err){

        result.innerHTML = err;

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


function addDays(date,days){

    const d = new Date(date);

    d.setDate(d.getDate()+days);

    return d;

}


function isSunday(date){

    return date.getDay() === 0;

}


function moveIfSunday(date){

    const d = new Date(date);

    while(isSunday(d)){

        d.setDate(d.getDate()+1);

    }

    return d;

}


function showCleaningPlan(reservations){

    let cleanings = [];


    reservations.forEach(room => {

        let cleanDate = new Date(room.checkOut);


        // nunca limpar domingo
        cleanDate = moveIfSunday(cleanDate);


        cleanings.push({

            room: room.room,

            date: cleanDate

        });

    });



    // ordenar por data

    cleanings.sort((a,b)=>a.date-b.date);



    // juntar quartos no mesmo dia

    let grouped = {};


    cleanings.forEach(clean=>{

        const key = clean.date.toISOString().split("T")[0];


        if(!grouped[key]){

            grouped[key] = {

                date: clean.date,

                rooms: []

            };

        }


        grouped[key].rooms.push(clean.room);


    });



    let html = "<h1>🧹 Plano de Limpezas</h1>";



    Object.values(grouped).forEach(day=>{


        html += `

        <h2>

        ${day.date.toLocaleDateString("pt-PT")}

        </h2>

        `;


        day.rooms.forEach(room=>{

            html += `

            🧹 ${room}<br>

            `;

        });


        html += "<hr>";


    });



    result.innerHTML = html;

}



loadCalendars();
