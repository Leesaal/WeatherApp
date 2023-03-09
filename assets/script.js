// create variables to select
var searchButton = $(".searchButton");
var searchedCities = [];
var city = $("#city");

// Access to open weather API
var APIKey = "e95b7c930467798b718473602a6561c5";


// create event listeners
searchButton.click(function () {

    var searchCity = $(".searchCity").val();
    searchedCities.push(searchCity);
// set Items by identifying a key to set the search city to
    

})


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
        console.log(name, icon, description, temp, humidity, speed);
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
        .then((data) => this.fetchFutureWeather(data));
    },

    fetchFutureWeather: function(data) {
        var { lon } = data[0];
        var { lat } = data[0];
        console.log(lon + ", " + lat);
    }
};
