
let days = document.getElementById('days');
let month = document.getElementById('month');
let year = document.getElementById('year');
let prevMonth = document.getElementById('previousMonth');
let nextMonth = document.getElementById('nextMonth');
let first = document.getElementById('firstDayOfMonth');
let day29 = document.getElementById('day29');
let day30 = document.getElementById('day30');
let day31 = document.getElementById('day31');

let selectedDay = "";
let selectedDate = "";


const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let date = new Date();

function daysInMonth () {
    return new Date(date.getMonth(), date.getMonth() + 1, 0).getDate();
}

function getFirstDayInMonthName () {
    return new Date(date.getFullYear(),date.getMonth(), 1).getDay();
}

function generateMonth () {
    // Set month and year
    month.innerHTML = monthNames[date.getMonth()];
    year.innerHTML = date.getFullYear();

    // Start of month needs to be pushed over: 13.6% * (1st of month dayName)
    // 14% actually works better
    let margin = 14 * getFirstDayInMonthName();
    first.style.marginLeft = margin+"%";

    // Sets the amount of days in the month
    if(daysInMonth() === 28){
        day29.style.visibility = "hidden";
        day30.style.visibility = "hidden";
        day31.style.visibility = "hidden";
    } else if(daysInMonth() === 29){
        day29.style.visibility = "visible";
        day30.style.visibility = "hidden";
        day31.style.visibility = "hidden";
    } else if(daysInMonth() === 30){
        day29.style.visibility = "visible";
        day30.style.visibility = "visible";
        day31.style.visibility = "hidden";
    }else if(daysInMonth() === 31){
        day29.style.visibility = "visible";
        day30.style.visibility = "visible";
        day31.style.visibility = "visible";
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

days.addEventListener('click', function(e){
    selectedDay = e.target.innerText;
    selectedDate = new Date(date.getFullYear(), date.getMonth(), selectedDay);
});


// This is used to initialize the first month
(function() {
    generateMonth();
})();