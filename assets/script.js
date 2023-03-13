// create variables to select elements

var searchCity = document.getElementById("searchButton");
var city = document.getElementById("cityName");
var clear = document.getElementById("clear");
var search1 = document.getElementById("search1");
var ul = document.querySelector(".searchList"); 
var todayEl = document.getElementById("today");
var fiveDayContainerEl = document.querySelector(".fiveDayContainer");
var searchHistory = [];

// create var and function for dates

var now = dayjs();

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var time = date + ' ' + month + ' ' + year;
  return time;
}


// Access to open weather API

var APIKey = "e95b7c930467798b718473602a6561c5";


var weather = {

 
// fetch current data and display on webpage

    fetchWeather: function(city) {
        todayEl.classList.remove("hide");
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&appid=" 
        + APIKey
        + "&units=metric"
    )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
        
    },

    displayWeather: function(data) {
        var { name } = data;
        var { icon, description } = data.weather[0];
        var { temp, humidity } = data.main;
        var { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"
        + icon
        + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
        document.querySelector(".date").innerText = now.format("DD MMM YYYY");
    },


// fetch future data and display on webpage

    futureWeather: function(city) {
        fiveDayContainerEl.classList.remove("hide");
        fetch("https://api.openweathermap.org/geo/1.0/direct?q="
        + city
        + "&limit=5&appid=" 
        + APIKey
        + "&units=metric"
    )
        .then((response) => response.json())
        .then((data) => this.fetchLatLon(data));
    },

    fetchLatLon: function(data) {
        var { lat } = data[0];
        var { lon } = data[0];

        fetch("https://api.openweathermap.org/data/3.0/onecall?lat="
        + lat
        + "&lon="
        + lon
        + "&exclude=current,hourly,minutely&appid="
        + APIKey
        + "&units=metric"
    ) 
        .then((response) => response.json())
        .then((data) => this.displayFutureWeather(data));

    },

    displayFutureWeather: function(data) {
        for (var i = 1; i < 6; i++) {
// set date
        var { dt } = data.daily[i];
        dt = timeConverter(dt);
        var day = "day-" + (i);
        document.querySelector("." + day).innerText = dt;

// set temp
        var { day } = data.daily[i].temp;
        var temp = "temp-" + (i);
        document.querySelector("." + temp).innerText = "Temp: " + day + "°C";

// set icon
        var { icon } = data.daily[i].weather[0];
        var iconTag = "icon-" + (i);
        document.querySelector("." + iconTag).src = "https://openweathermap.org/img/wn/"
        + icon
        + ".png";

// set humidity
        var { humidity } = data.daily[i];
        var humid = "humidity-" + (i);
        document.querySelector("." + humid).innerText = "Humidity: " + humidity + "%";

// set wind speed
        var { wind_speed } = data.daily[i];
        var speed = "wind-" + (i);
        document.querySelector("." + speed).innerText = "Wind speed: " + wind_speed + "km/h";
    }
}
};

// create function to save to local storage and clear local storage

function saveLocal(city) {
    searchHistory.push(city.toLowerCase());
    // save to local storage
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    var searchNum = document.createElement("li");
    ul.append(searchNum);
    var searchItem = document.createElement("button");
    searchItem.classList.add("historicalButton");
    searchItem.addEventListener("click", function() {
        weather.fetchWeather(city);
        weather.futureWeather(city);

    });
    searchItem.innerHTML = city.toLowerCase();
    searchNum.append(searchItem);
    
}

function clearLocal() {
    localStorage.clear();
    ul.innerHTML = "";
}

// create event listener for search button

searchCity.addEventListener('click', e => {
    e.preventDefault();
    if (city.value != "") {
    weather.fetchWeather(city.value);
    weather.futureWeather(city.value);
    saveLocal(city.value);
    } else {
        alert("Please enter the name of a city");
    }
})


// clear localStorage using event listener

clear.addEventListener('click', e => {
    localStorage.clear();
    ul.innerHTML = "";
    searchHistory = [];
    window.location.reload();
});


// get localStorage on load

window.onload = function() {
    var searchHistory = localStorage.getItem("searchHistory");
  if (searchHistory.length > 0) {
    for (var i = 0; i < searchHistory.length; i++) {
        var searchNum = document.createElement("li");
        ul.append(searchNum);
        var searchItem = document.createElement("button");
        searchItem.classList.add("historicalButton");
        searchItem.value = searchHistory[i];
        searchItem.addEventListener("click", function(e) {
            weather.fetchWeather(e.target.value);
            weather.futureWeather(e.target.value);
            
    });
    }
       searchItem.innerHTML = searchHistory[i];
        searchNum.append(searchItem); 
    }
    
}

