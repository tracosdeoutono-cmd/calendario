const calendars = [

    {
        name: "Achada 1",
        url: "https://al.tracosdeoutono.workers.dev?room=1"
        url: "https://al.tracosdeoutono.workers.dev?room=achada1"
    },
    {
        name: "Achada 2",
        url: "https://al.tracosdeoutono.workers.dev?room=2"
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
    result.innerHTML = "A carregar...";


    try{


        let reservations = [];


        for(const calendar of calendars){


            const response = await fetch(calendar.url);


            const text = await response.text();


            const events = parseICS(text, calendar.name);
            const events = parseICS(
                text,
                calendar.name
            );


            reservations.push(...events);


        }


        showReservations(reservations);
        showCleaningPlan(reservations);


    }catch(error){
    }
    catch(err){

        result.innerHTML = error;
        result.innerHTML = err;

    }

@@ -53,34 +110,55 @@ async function loadCalendars(){
function parseDate(icsDate){

    const year = Number(icsDate.substring(0,4));

    const month = Number(icsDate.substring(4,6)) - 1;

    const day = Number(icsDate.substring(6,8));

    return new Date(year, month, day);

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

        const start = event.match(/DTSTART;VALUE=DATE:(\d{8})/);

        const end = event.match(/DTEND;VALUE=DATE:(\d{8})/);
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
@@ -91,11 +169,14 @@ function parseICS(text, roomName){

        });


    }



    return reservations;


}


@@ -111,11 +192,11 @@ function sameDay(a,b){



function addDays(date, amount){
function addDays(date,days){

    const d = new Date(date);

    d.setDate(d.getDate() + amount);
    d.setDate(d.getDate() + days);

    return d;

@@ -131,205 +212,283 @@ function isSunday(date){



function getCleaningDay(reservation, allReservations){

function hasSameDayArrival(reservation, reservations){


    return reservations.some(r =>

        r.room === reservation.room &&

        sameDay(r.checkIn, reservation.checkOut)

    );


}





function getCleaningInfo(reservation, reservations){


    const checkout = reservation.checkOut;


    // Se não for domingo, limpa nesse dia

    // Se não for domingo, limpa normalmente
    if(!isSunday(checkout)){

        return checkout;

        return {

            date: checkout,

            sunday: false,

            urgent: false

        };


    }


    // Verifica se existe entrada no mesmo quarto nesse domingo
    const sameDayArrival = allReservations.some(r =>

        r.room === reservation.room &&
        sameDay(r.checkIn, checkout)

    );

    // Se há entrada nesse domingo,
    // a limpeza tem de ser feita nesse dia

    if(hasSameDayArrival(reservation,reservations)){


        return {

    // Se há entrada no domingo, limpeza obrigatória no domingo
    if(sameDayArrival){
            date: checkout,

            sunday: true,

            urgent: true

        };

        return checkout;

    }


    // Caso contrário passa para segunda-feira
    return addDays(checkout,1);

}


function showReservations(reservations){
    // Caso contrário passa para segunda

    return {

    let html = "";
        date: addDays(checkout,1),

    const today = new Date();
        sunday: false,

    today.setHours(0,0,0,0);
        urgent: false

    };


    for(let i = 0; i < 30; i++){
}


        const day = addDays(today,i);
function showCleaningPlan(reservations){


    let cleanings = [];



    reservations.forEach(reservation => {

        const arrivals = reservations.filter(r => 
            sameDay(r.checkIn, day)
        );


        const departures = reservations.filter(r => 
            sameDay(r.checkOut, day)
        const info = getCleaningInfo(
            reservation,
            reservations
        );



        const cleanings = reservations.filter(r => {
        cleanings.push({

            const cleaningDay = getCleaningDay(r, reservations);
            room: reservation.room,

            return sameDay(cleaningDay, day);
            date: info.date,

            sunday: info.sunday,

            urgent: info.urgent

        });



        if(
            arrivals.length === 0 &&
            departures.length === 0 &&
            cleanings.length === 0
        ){
            continue;
        }
    });



        let title = day.toLocaleDateString(
            "pt-PT",
            {
                weekday:"long",
                day:"numeric",
                month:"long"
            }
        );


    cleanings.sort((a,b)=>a.date-b.date);

        // Domingo obrigatório fica vermelho
        const sundayRequired = cleanings.some(c =>
            isSunday(day) &&
            sameDay(getCleaningDay(c,reservations),day)
        );



        if(sundayRequired){

            title = "🔴 " + title;
    let grouped = {};

        }



        html += `<h2>${title}</h2>`;

    cleanings.forEach(clean => {


        html += "<b>⬇ Saídas</b><br>";

        const key = clean.date
            .toISOString()
            .split("T")[0];

        if(departures.length === 0){

            html += "Nenhuma<br>";

        }else{

            departures.forEach(r=>{
        if(!grouped[key]){

                html += "• " + r.room + "<br>";

            });
            grouped[key] = {

        }
                date: clean.date,

                rooms: [],

                sunday: false

            };


        }


        html += "<br><b>⬆ Entradas</b><br>";


        if(arrivals.length === 0){
        grouped[key].rooms.push(clean);

            html += "Nenhuma<br>";

        }else{

            arrivals.forEach(r=>{

                html += "• " + r.room + "<br>";
        if(clean.sunday){

            });
            grouped[key].sunday = true;

        }



        html += "<br><b>🧹 Limpezas</b><br>";
    });



        if(cleanings.length === 0){

            html += "Nenhuma<br>";

        }else{

            cleanings.forEach(r=>{
    let html = "<h1>🧹 Plano de Limpezas</h1>";


                const hasArrivalSameDay = reservations.some(a =>

                    a.room === r.room &&
                    sameDay(a.checkIn,day)

                );

    Object.values(grouped).forEach(day => {

                if(hasArrivalSameDay){

                    html += "• " + r.room + " (entrada hoje)<br>";

                }else{
        let title = day.date.toLocaleDateString(
            "pt-PT",
            {
                weekday:"long",
                day:"numeric",
                month:"long"
            }
        );

                    html += "• " + r.room + "<br>";

                }

        if(day.sunday){

            });
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

    }


    });




    result.innerHTML = html;


}

loadCalendars();
