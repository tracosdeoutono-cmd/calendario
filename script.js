
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



function sameDay(a, b){

    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );

}

function addDays(date, days){

    const d = new Date(date);

    d.setDate(d.getDate() + days);

    return d;

}

function showReservations(reservations){

    reservations.sort((a,b)=>a.checkIn-b.checkIn);

    let html = "";

    const today = new Date();

    today.setHours(0,0,0,0);

    for(let i=0;i<30;i++){

        const day = addDays(today,i);

        const arrivals = reservations.filter(r=>sameDay(r.checkIn,day));

        const departures = reservations.filter(r=>sameDay(r.checkOut,day));

        if(arrivals.length===0 && departures.length===0){
            continue;
        }

        html += `<h2>${day.toLocaleDateString()}</h2>`;

        html += "<b>⬇ Check-outs</b><br>";

        if(departures.length===0){

            html += "None<br>";

        }else{

            departures.forEach(r=>{

                html += "• " + r.room + "<br>";

            });

        }

        html += "<br>";

        html += "<b>⬆ Check-ins</b><br>";

        if(arrivals.length===0){

            html += "None<br>";

        }else{

            arrivals.forEach(r=>{

                html += "• " + r.room + "<br>";

            });

        }

        html += "<hr>";

    }

    result.innerHTML = html;

}


loadCalendars();
