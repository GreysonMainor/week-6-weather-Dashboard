$(document).ready(function () {
    var searchButton = $("#search-button");
    var searchCity = $("#search-city");
    var currentTemp = $("#temp");
    var currentWind = $("#wind");
    var currentHumidity = $("#humidity");
    var currentUv = $("#uv");
    var currentCity = $("#current-city");
    var city = "";

    var apiKey = "3d94d734329ac2e25782373114d9c091";

    $("#search-button").on("click", getWeather)

    function getWeather(event) {
        event.preventDefault();
        city = searchCity.val();
        currentWeather(city);
    }

    function currentWeather(city) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apiKey + "&units=imperial";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            var icon = response.weather[0].icon;
            var iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            var date = new Date(response.dt * 1000).toLocaleDateString();
            $(currentCity).html(response.name + "(" + date + ")" + "<img src=" + iconUrl + ">");
            console.log(icon)
            $(currentTemp).html((response.main.temp) + "°F")
            $(currentHumidity).html((response.main.humidity) + "%")
            $(currentWind).html((response.wind.speed) + "MPH")   
            currentUvIndex(response.coord.lat,response.coord.lon) 
        })
    }

    function currentUvIndex(lon,lat){
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey,
            method: "GET"
        }).then(function(response){
            $(currentUv).html(response.value)

            if (response.value < 4){
                $("#uvBtn").addClass("btn-success");
            }
            else if (response.value < 10){
            $("#uvBtn").addClass("btn-warning");
            }
            else {
                $("#uvBtn").addClass("btn-danger");
            }

        })
    }




});