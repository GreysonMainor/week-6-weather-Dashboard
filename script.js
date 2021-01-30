$(document).ready(function(){
var searchButton = $("#search-button");
var searchCity = $("#search-city");
var currentTemp = $("#temp");
var currentWind = $("#wind");
var currentHumidity = $("#humidity");
var currentUv = $("#uv");
var currentCity = $("#current-city");
var city = "";

var apiKey = "3d94d734329ac2e25782373114d9c091";

$("#search-button").on("click",getWeather)

function getWeather(event){
    event.preventDefault();
city = searchCity.val();
currentWeather(city);
}

function currentWeather(city){
    var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apiKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response)
    })
}



});