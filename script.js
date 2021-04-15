const dt = new Date()
const currentDay = dt.getDate()
const currentMonth = dt.getMonth()
const currentYear = dt.getFullYear()

//Taking the DOM's Elements
const elToday = document.getElementById("today")
const elCalendar = document.getElementById("calendar")
const elMonth = document.getElementById("months");
const elYear = document.getElementById("years");
const elSearchBtn = document.getElementById("searchBtn");
const output = document.getElementById("output");

//Today is
let today = new Date(currentYear, currentMonth, currentDay)

today = today.toLocaleDateString("es-es", {
	weekday:"long",
	year:"numeric",
	month:"long",
	day: "numeric"
})
function formatStringDate(today) {
	let arr = today.split(" ")
	let output = arr[0].slice(0,1).toUpperCase() + arr[0].substring(1) + " " + arr[1] + " " + arr[2] + " " + arr[3].slice(0,1).toUpperCase() + arr[3].substring(1) + " " + arr[4] + " " + arr[5]
	return output
}

//Output current date
elToday.textContent = formatStringDate(today)

//Zeller's Algorithm
/*(0 = sábado, 1 = domingo, 2 = lunes, 3 = martes, 4 = miércoles, 5 = jueves, 6 = viernes).*/
function whichDay(date, month, year) {
	let day = 0 
	let q = date
	let m = month
	if (month === 1) { 
		m = 13
		year -= 1
	}
	if (month === 2) { 
		m = 14 
		year -= 1
	}
	let j = Math.floor(year/100)
	let k = year % 100
	day = ( q + Math.floor(13*(m + 1)/5) + k + Math.floor(k/4) + Math.floor(j/4) + 5*j ) % 7
	return day
}

//control to render dates within the calendar
let week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let selectedMonth = ""
let selectedYear = ""
let month = 0
let totalDatesToDisplay = 0 


function changeSelectedMonthToNumber (selectedMonth) {
	switch (selectedMonth) {
	  case "Enero":
		totalDatesToDisplay = 31
		return month = 1;
		break;
	  case "Febrero":
		totalDatesToDisplay = 28
		return month = 2;
		break;
	  case "Marzo":
		totalDatesToDisplay = 31
		return month = 3;
		break;
	  case "Abril":
		totalDatesToDisplay = 30
		return month = 4;
		break;
	  case "Mayo":
		totalDatesToDisplay = 31
		return month = 5;
		break;
	  case "Junio":
		totalDatesToDisplay = 30
		return month = 6;
		break;
	  case "Julio":
		totalDatesToDisplay = 31
		return month = 7;
		break;
		case "Agosto":
		totalDatesToDisplay = 31
		return month = 8;
		break;
	  case "Septiembre":
		totalDatesToDisplay = 30
		return month = 9;
		break;
	  case "Octubre":
		totalDatesToDisplay = 31
		 return month = 10;
		break;
	  case "Noviembre":
		totalDatesToDisplay = 30
		return month = 11;
		break;
	  case "Diciembre":
		totalDatesToDisplay = 31
		return month = 12;
		break;
	  default: 
		console.log("Selecciona un mes")
	}
}


function renderDates() {
//Zeller's Algorithm
/*(0 = sábado, 1 = domingo, 2 = lunes, 3 = martes, 4 = miércoles, 5 = jueves, 6 = viernes).*/
	let firstDay = whichDay(1, month, selectedYear) 
	let weekday = "";
	switch (firstDay) {
	  case 0:
		weekday = "Saturday";
		break;
	  case 1:
		weekday = "Sunday";
		break;
	  case 2:
		weekday = "Monday";
		break;
	  case 3:
		weekday = "Tuesday";
		break;
	  case 4:
		weekday = "Wednesday";
		break;
	  case 5:
		weekday = "Thursday";
		break;
	  case 6:
		weekday = "Friday";
	}
	
	let paddingDays = week.indexOf(weekday)
	if (selectedYear % 4 === 0 && selectedMonth == "Febrero") {
		totalDatesToDisplay = 29
	}
	for (let j = 1; j <= paddingDays + totalDatesToDisplay; j++) {
		let squareDates = document.createElement("div")
		squareDates.classList.add("date")
		
		if (j <= paddingDays) {
		   squareDates.style.visibility = "hidden"
		} else {
			squareDates.textContent = j - paddingDays
		}
		elCalendar.appendChild(squareDates)
	}
}

function showCurrentMonth() {
	let firstDayOf = new Date(currentYear, currentMonth, 1)
	let totalDaysOf = new Date(currentYear, currentMonth + 1, 0).getDate()  
	let theFirstDay = firstDayOf.toLocaleDateString("en-us", {weekday:"long"})
	
	let paddingDays = week.indexOf(theFirstDay)
	
	for (let i = 1; i <= paddingDays + totalDaysOf; i++) {
		let squareDates = document.createElement("div")
		squareDates.classList.add("date")
		
		if (i <= paddingDays) {
		   squareDates.style.visibility = "hidden"
		} else {
			squareDates.textContent = i - paddingDays
		}
		elCalendar.appendChild(squareDates)
	}
}

//Updating inputs
elMonth.addEventListener('click', function() {
	selectedMonth = elMonth.value
	changeSelectedMonthToNumber(selectedMonth)
})

elYear.addEventListener('change', function(){
	selectedYear = elYear.value
	selectedYear = Number(selectedYear)
})

elSearchBtn.addEventListener('click', function () {
	output.textContent = selectedMonth + ", " + selectedYear
	elCalendar.innerHTML = " "
	setTimeout( function() { renderDates() }, 400)
});

//Execute these functions
document.addEventListener('DOMContentLoaded', showCurrentMonth)














