// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// Allows for the sliding of the jump to month/year 
//$("#monthAndYear").click(function () {
//    $(".form-inline").slideToggle();
//});

// will be using this to assign the user's id which I need for api calls
var user;

// vars for creating and manipulating the calendar
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

export function getCurrentMonth() {
    return months[currentMonth];
}

export function getCurrentMonthDate() {
    return currentMonth;
}

export function getCurrentYear() {
    return currentYear;
}


let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear = document.getElementById("monthAndYear");
//showCalendar(currentMonth, currentYear);

// controls the next and previous button at the top of the calendar
export function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

export function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

// function for the jump that is hidden bu the sliding function at top of this file
function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

// html elements that will be used regularly.
var modal = document.querySelector(".modal");
var tds = document.querySelectorAll("td");
var title = document.getElementById("eventTitle");
var description = document.getElementById("eventDescription");
var start = document.getElementById("eventStart");
var end = document.getElementById("eventEnd");
var allDay = document.getElementById("allDayCheck");
//allDay.addEventListener("click", () => toggleTime());



// the event class. I may need to add the option of user but it might be unnecessary since you can just get the user id whenever does it need to be a part of the class?
class CalEvent {
    constructor(title, description, start, end, allDay, repeat) {
        this.title = title;
        this.description = description;
        this.start = start;
        this.end = end;
        this.allDay = allDay;
        this.repeat = repeat;
    }
}


// function for reseting the modal to empty when the user closes it.
//modal.querySelector(".btn-close").addEventListener("click", function () {
//    modal.style.display = "none";
//    title.value = "";
//    description.value = "";
//    start.value = "";
//    start.type = "date";
//    end.value = "";
//    end.type = "date";
//    allDay.checked = true;
//    //let repeat = null;
//});

//shows the create event modal does not actually create the event might change name of this function later.
function createEvent(date) {
    //console.log("create");
    modal.style.display = "block";
    modal.querySelector(".modal-title").innerHTML = "Create Event";
    //let stringDate = months[month] + " " + date + ", " + year;
    const startDate = new Date();
    startDate.setMonth(currentMonth);
    startDate.setFullYear(currentYear);
    let day = parseInt(date.wholeText);
    startDate.setDate(day);
    console.log(startDate);
    start.value = startDate.toISOString().substring(0, 10);
}

// incomplete function currently, I need to fix the fetch api call for the put before this will be functional anyways. I should still fix the general ui issues tho.
//function editEvent(eventVar) {
//    //console.log("create");
//    modal.style.display = "block";
//    modal.querySelector(".modal-title").innerHTML = "Edit Event";
//    //let stringDate = months[month] + " " + date + ", " + year;
//    const startDate = new Date();
//    startDate.setMonth(currentMonth);
//    startDate.setFullYear(currentYear);
//    let day = parseInt(date.wholeText);
//    startDate.setDate(day);
//    console.log(startDate);
//    start.value = startDate.toISOString().substring(0, 10);
//}

// this function is used in conjunction with the toggleDate(Time) and setDateTime functions in order to switch the fields on the form between date and datetime without data loss.
function setDate(date, field) {
    field.value = date.toISOString().substring(0, 10);
}

function setDateTime(date, field) {
    let str = date.toISOString().substring(0, 11) + "00:00";
    field.value = str;
}

function toggleTime() {

    const s = new Date(fixDate(start.value.substring(0, 10)));
    console.log("toggle: " + s);
    const e = new Date(fixDate(end.value.substring(0, 10)));
    console.log("toggle: " + e);

    if (allDay.checked) {
        start.type = "date";
        setDate(s, start);

        end.type = "date";
        if (!isNaN(e)) setDate(e, end);
    }
    else {
        start.type = "datetime-local";
        setDateTime(s, start);
        end.type = "datetime-local";
        if (!isNaN(e)) setDateTime(e, end);
    }
}


//event save function need to add a way to save the events to database and stuff
//modal.querySelector(".modal-footer").querySelector(".btn-primary").addEventListener("click", function () {

//    let repeat = null;
//    /*if (!allDay) addTime();*/
//    if (title.value != "" && end.value != "" && title.value != " ") {
//        let eventVar = new CalEvent(title.value, description.value, start.value, end.value, allDay.checked, repeat);

//        //saveIt(event);

//        showEvent(eventVar);
//        modal.style.display = "none";
//        title.value = "";
//        description.value = "";
//        start.value = "";
//        start.type = "date";
//        end.value = "";
//        end.type = "date";
//        allDay.checked = true;
//    }
//    else {
//        alert("Please fill in all required fields.")
//    }

//    //let repeat = null;
//});

//async function saveIt(eventVar) {
//    eventVar.start = new Date(start);
//    eventVar.end = new Date(end);
//    await fetch("https://localhost:44371/api/CalendarEvents", {
//        method: 'POST',
//        headers: {
//            'Content-Type' : 'application/json'
//        },
//        body: JSON.stringify(eventVar)
//    });
//}

//
//modal.querySelector(".modal-footer").querySelector(".btn-secondary").addEventListener("click", function () {
//    modal.style.display = "none";
//    title.value = "";
//    description.value = "";
//    start.value = "";
//    start.type = "date";
//    end.value = "";
//    end.type = "date";
//    allDay.checked = true;
//    //let repeat = null;
//});


function fixDate(date) {
    return date.replace(/-/g, "/");
}

// shows the events in the calendar
function showEvent(e) {

    //let date = fixDate(e.start);
    const startDate = new Date(fixDate(e.start.substring(0, 10)));

    //date = fixDate(e.end);
    const endDate = new Date(fixDate(e.end.substring(0, 10)));

    let startDay = startDate.getDate();
    let endDay = endDate.getDate();
    if (startDay > endDay) alert("End date must be after start date.");

    console.log(startDate.getMonth());
    if (startDate.getMonth() != currentMonth) return;

    for (var i = startDay; i <= endDay; i++) {
        let t = document.getElementById("td" + i);
        if (t.childElementCount == 4) continue;
        let div = document.createElement('div');
        div.className = "event";
        //let b = document.createElement('br');
        //p.classList = "badge bg-secondary";
        let p = document.createElement("p");
        p.textContent = e.title;

        div.appendChild(p);
        //div.addEventListener("dblclick", function () {
        //    editEvent(e);
        //})
        //t.appendChild(b);
        t.appendChild(div);
    }


}
async function getEvents() {
    await fetch('https://localhost:44371/api/CalendarEvents').then((response) => {
        return response.json();

    })
        .then((data) => {
            //let events = data;

            data.map(function (eventVar) {
                let e = new CalEvent(eventVar.title, eventVar.description, eventVar.start, eventVar.end, eventVar.allDay, eventVar.repeat);
                showEvent(e);
            });
        })

}
export function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    // body of the calendar
    let tbl = document.getElementById("calendar-body");
    console.log(tbl);
    // clearing all previous cells and setting height
    tbl.innerHTML = "";
    tbl.style.height = "75vh";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");
        row.style.height = "20%";

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                cell.style.width = "14%";
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
                let cell = document.createElement("td");
                let cellText = document.createTextNode(date);
                cell.setAttribute('id', 'td' + date);

                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.style.backgroundColor = "--bs-table-hover-bg";
                } // color today's date

                //cell.addEventListener("dblclick", createEvent);
                //function createEvent() {
                //    var p = document.createElement("p");
                //    p.innerHTML = "new event or whatever";
                //    cell.appendChild(p);
                //}
                //cell.addEventListener("dblclick", openModal(event));

                cell.style.width = "14%";
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.
    }
    console.log(currentMonth);

    var tds = document.querySelectorAll("td");
    for (var i = 0; i < tds.length; i++) {

        let t = tds[i];
        //console.log(t.firstChild);
        if (t.firstChild.wholeText != "") t.addEventListener("dblclick", () => createEvent(t.firstChild));

    }


    getEvents();
    //console.log(getUser());
}

// Fix Identity later
//var user;
//function setUser(u) {
//    user = u;
//}

//function getUser() {
//    return user;
//}

