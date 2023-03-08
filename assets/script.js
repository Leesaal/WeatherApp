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
        .then((data) => console.log(data));
    },
    displayWeather: function(data) {
        var { name } = data;
        var { icon, description } = data.weather[0];
        var { temp, humidity } = data.main;
        var { speed } = data.wind;
        console.log(name, icon, description, temp, humidity, speed);
    }
};
