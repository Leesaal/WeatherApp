# WeatherApp


## Description

This project was created using HTML, CSS and Javascript and uses APIs to showcase the weather for the current day as well as the future 5 day weather forecast.  

This project saves the searched cities so the user can see what cities they have searched in the past as well as clear the local storage search history.

Two API's were used to showcase fetching from multiple APIs in one webpage.

## Installation

N/A

## Usage

This code can be used to show the current and 5 day future forecast for a searched city.

## Credits

APIs from OpenWeatherMap.

## License

Please refer to the LICENSE in the repo.

## Features

This code features:
1. Save searched cities into local storage
2. Use of APIs to gather weather data from OpenWeatherMap
3. Display weather data based on input city

## Tests

There are no tests currently.

## Limitations

Currently I have used a work around in order to clear all data from the page by pushing for the page to reload and automatically delete the data.  This would need to be fixed in a future development.
Previous search history cannot yet be clicked to rerun the API functions.

## Future improvements

1. Remove li elements rather than reloading page to remove added search history items
2. Use one API to make more efficient coding
3. Change the CSS styling depending on screensize
4. Limit the local storage to 5 items
5. Show a consistent data layout for the current and future forecasts
6. Add event listener for the search history buttons to trigger the functions to run based on the city clicked

## Link to page

https://leesaal.github.io/WeatherApp/

## Image of webpage

<img width="1440" alt="WeatherApp" src="https://user-images.githubusercontent.com/118930290/224107786-cdfe3662-49e1-4ecc-84ae-318da321f9f5.png">

