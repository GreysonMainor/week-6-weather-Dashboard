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
            console.log(icon);
            $(currentTemp).html((response.main.temp) + "°F");
            $(currentHumidity).html((response.main.humidity) + "%");
            $(currentWind).html((response.wind.speed) + "MPH");
            currentUvIndex(response.coord.lat, response.coord.lon);
            getForecast(response.id);
        })
    }

    function currentUvIndex(lon, lat) {
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial",
            method: "GET"
        }).then(function (response) {
            $(currentUv).html(response.value)

            if (response.value < 4) {
                $("#uvBtn").addClass("btn-success");
            }
            else if (response.value < 10) {
                $("#uvBtn").addClass("btn-warning");
            }
            else {
                $("#uvBtn").addClass("btn-danger");
            }

        })
    }

    function getForecast(cityId) {
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?id=" + cityId + "&appid=" + apiKey + "&units=imperial",
            method: "GET"
        }).then(function (response) {
            console.log(response)
            $("#futureDate1").html(new Date(response.list[1].dt * 1000).toLocaleDateString());
            $("#futureDate2").html(new Date(response.list[8].dt * 1000).toLocaleDateString());
            $("#futureDate3").html(new Date(response.list[16].dt * 1000).toLocaleDateString());
            $("#futureDate4").html(new Date(response.list[24].dt * 1000).toLocaleDateString());
            $("#futureDate5").html(new Date(response.list[32].dt * 1000).toLocaleDateString());
            $("#futureTemp1").html(response.list[1].main.temp);
            $("#futureTemp2").html(response.list[8].main.temp);
            $("#futureTemp3").html(response.list[16].main.temp);
            $("#futureTemp4").html(response.list[24].main.temp);
            $("#futureTemp5").html(response.list[32].main.temp);
            $("#futureHumidity1").html((response.list[1].main.humidity) + "%");
            $("#futureHumidity2").html((response.list[8].main.humidity) + "%");
            $("#futureHumidity3").html((response.list[16].main.humidity) + "%");
            $("#futureHumidity4").html((response.list[24].main.humidity) + "%");
            $("#futureHumidity5").html((response.list[32].main.humidity) + "%");
            
        })
    }



});