// create variables to select
var searchCity = document.getElementById("searchButton");
var city = document.getElementById("cityName");
var searchedCities = [];

// Access to open weather API
var APIKey = "e95b7c930467798b718473602a6561c5";

var weather = {
 
    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&appid=" 
        + APIKey
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
    },

    futureWeather: function(city) {
        fetch("http://api.openweathermap.org/geo/1.0/direct?q="
        + city
        + "&limit=5&appid=" 
        + APIKey
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
    )
        .then((response) => response.json())
        .then((data) => this.displayFutureWeather(data));
    },

    displayFutureWeather: function(data) {
        for (var i = 0; i < 5; i++) {
// set date
        var { dt } = data.daily[i];
        var day = "day-" + (i+1);
        document.querySelector("." + day).innerText = dt;

// set temp
        var { day } = data.daily[i].temp;
        var temp = "temp-" + (i+1);
        document.querySelector("." + temp).innerText = "Temp:" + day + "°C";

// set icon
        var { icon } = data.daily[i].weather[0];
        var iconTag = "icon-" + (i+1);
        document.querySelector("." + iconTag).src = "https://openweathermap.org/img/wn/"
        + icon
        + ".png";

// set humidity
        var { humidity } = data.daily[i];
        var humid = "humidity-" + (i+1);
        document.querySelector("." + humid).innerText = "Humidity: " + humidity + "%";

// set wind speed
        var { wind_speed } = data.daily[i];
        var speed = "wind-" + (i+1);
        document.querySelector("." + speed).innerText = "Wind speed: " + wind_speed + "km/h";
    }
}
};


// create event listener for search button
searchCity.addEventListener('click', e => {
    weather.fetchWeather(city.value);
    weather.futureWeather(city.value)
})
