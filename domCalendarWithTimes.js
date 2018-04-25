let calendarContainer = document.getElementById("calendarContainer");
let hoursContainer = document.getElementById("hoursContainer");

let days = document.getElementById('days');
let month = document.getElementById('month');
let year = document.getElementById('year');

let prevMonth = document.getElementById('previousMonth');
let nextMonth = document.getElementById('nextMonth');

let first = document.getElementById('firstDayOfMonth');
let day29 = document.getElementById('day29');
let day30 = document.getElementById('day30');
let day31 = document.getElementById('day31');

let hours = document.getElementById("hours");
let message = document.getElementById("message");
let selectedDateElement = document.getElementById("selectedDate");
let allHours = ["time10AM", "time11AM", "time12PM", "time1PM", "time2PM", "time3PM", "time4PM", "time5PM", "time6PM", "time7PM", "time8PM"];

let chooseAnotherDay = document.getElementById("chooseAnotherDay");

let selectedDay = "";
let selectedDate = "";

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

let date = new Date();

function daysInMonth() {
    return new Date(date.getMonth(), date.getMonth() + 1, 0).getDate();
}

function getFirstDayInMonthName() {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}

function hideElements(elementIds) {
    for (let i = 0; i < elementIds.length; i++) {
        // document.getElementById(elementIds[i]).style.visibility = "hidden";
        document.getElementById(elementIds[i]).style.display = "none";
    }
}

function showElements(elementIds) {
    for (let i = 0; i < elementIds.length; i++) {
        // document.getElementById(elementIds[i]).style.visibility = "visible";
        document.getElementById(elementIds[i]).style.display = "block";
    }
}

function strikeElements(elementIds){
    for (let i = 0; i < elementIds.length; i++) {
        document.getElementById(elementIds[i]).style.textDecoration = "line-through";
    }
}

function unstrikeElements(elementIds){
    for (let i = 0; i < elementIds.length; i++) {
        document.getElementById(elementIds[i]).style.textDecoration = "none";
    }
}

function generateMonth() {
    // Set month and year
    month.innerHTML = monthNames[date.getMonth()];
    year.innerHTML = date.getFullYear();

    // Start of month needs to be pushed over: 13.6% * (1st of month dayName)
    // 14% actually works better
    let margin = 14 * getFirstDayInMonthName();
    first.style.marginLeft = margin + "%";

    // Sets the amount of days in the month
    if (daysInMonth() === 28) {
        day29.style.visibility = "hidden";
        day30.style.visibility = "hidden";
        day31.style.visibility = "hidden";
    } else if (daysInMonth() === 29) {
        day29.style.visibility = "visible";
        day30.style.visibility = "hidden";
        day31.style.visibility = "hidden";
    } else if (daysInMonth() === 30) {
        day29.style.visibility = "visible";
        day30.style.visibility = "visible";
        day31.style.visibility = "hidden";
    } else if (daysInMonth() === 31) {
        day29.style.visibility = "visible";
        day30.style.visibility = "visible";
        day31.style.visibility = "visible";
    }
}

function generateHours() {
    if (selectedDate.getDay() === 6) {
        // Saturday Hours
        showElements(allHours);
        message.innerHTML = "";
    } else {
        hideElements(["time10AM", "time11AM", "time12PM", "time1PM", "time2PM", "time3PM", "time4PM"]);
        showElements(["time5PM", "time6PM", "time7PM", "time8PM"]);
        message.innerHTML = "";
    }
}

prevMonth.addEventListener('click', function () {
    if (date.getMonth() === 0) {
        date.setMonth(11);
        date.setFullYear(date.getFullYear() - 1);
    }
    else {
        date.setMonth(date.getMonth() - 1);
    }
    generateMonth();
});

nextMonth.addEventListener('click', function () {
    if (date.getMonth() === 11) {
        date.setMonth(0);
        date.setFullYear(date.getFullYear() + 1);
    }
    else {
        date.setMonth(date.getMonth() + 1);
    }
    generateMonth();
});

days.addEventListener('click', function (e) {
    selectedDay = e.target.innerText;
    selectedDate = new Date(date.getFullYear(), date.getMonth(), selectedDay);

    if(selectedDate.getDay() === 0){
        message.innerHTML = "Sorry we are closed Sundays";
        return;
    }

    generateHours();
    calendarContainer.style.display = "none";
    hoursContainer.style.display = "block";
    selectedDateElement.innerHTML = dayNames[selectedDate.getDay()] + ", " + monthNames[selectedDate.getMonth()] + " " + selectedDate.getDate();
});

chooseAnotherDay.addEventListener('click', function(){
    calendarContainer.style.display = "block";
    hoursContainer.style.display = "none";
});

hours.addEventListener('click', function(e){
    selectedDate.setHours(e.target.getAttribute("data-hour"));
    console.log(selectedDate);
});


// This is used to initialize the first month
(function () {
    generateMonth();
    hoursContainer.style.display = "none";
})();