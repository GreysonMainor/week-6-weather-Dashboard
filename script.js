$(document).ready(function () {
    var searchButton = $("#search-button");
    var searchCity = $("#search-city");
    var currentTemp = $("#temp");
    var currentWind = $("#wind");
    var currentHumidity = $("#humidity");
    var currentUv = $("#uv");
    var currentCity = $("#current-city");
    var city = "";
    var history = [];
    var apiKey = "3d94d734329ac2e25782373114d9c091";


    $(searchButton).on("click", getWeather)


    function getWeather(event) {
       event.preventDefault();
        city = searchCity.val();
        currentWeather(city);
        // renderButtons();
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
        });
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
            $("#futureDate1").html(new Date(response.list[5].dt * 1000).toLocaleDateString());
            $("#futureDate2").html(new Date(response.list[13].dt * 1000).toLocaleDateString());
            $("#futureDate3").html(new Date(response.list[21].dt * 1000).toLocaleDateString());
            $("#futureDate4").html(new Date(response.list[29].dt * 1000).toLocaleDateString());
            $("#futureDate5").html(new Date(response.list[37].dt * 1000).toLocaleDateString());
            $("#futureImg1").html("<img src=" + "https://openweathermap.org/img/wn/" + response.list[5].weather[0].icon + "@2x.png" + ">");
            $("#futureImg2").html("<img src=" + "https://openweathermap.org/img/wn/" + response.list[13].weather[0].icon + "@2x.png" + ">");
            $("#futureImg3").html("<img src=" + "https://openweathermap.org/img/wn/" + response.list[21].weather[0].icon + "@2x.png" + ">");
            $("#futureImg4").html("<img src=" + "https://openweathermap.org/img/wn/" + response.list[29].weather[0].icon + "@2x.png" + ">");
            $("#futureImg5").html("<img src=" + "https://openweathermap.org/img/wn/" + response.list[37].weather[0].icon + "@2x.png" + ">");
            $("#futureTemp1").html(response.list[5].main.temp);
            $("#futureTemp2").html(response.list[13].main.temp);
            $("#futureTemp3").html(response.list[21].main.temp);
            $("#futureTemp4").html(response.list[29].main.temp);
            $("#futureTemp5").html(response.list[37].main.temp);
            $("#futureHumidity1").html((response.list[5].main.humidity) + "%");
            $("#futureHumidity2").html((response.list[13].main.humidity) + "%");
            $("#futureHumidity3").html((response.list[21].main.humidity) + "%");
            $("#futureHumidity4").html((response.list[29].main.humidity) + "%");
            $("#futureHumidity5").html((response.list[37].main.humidity) + "%");
        })
    }


    var history = [];
    function renderButtons() {

        $("#historyView").empty();

        for (var i = 0; i < history.length; i++) {

            var a = $("<button>");
            a.addClass("history");
            a.attr("data-name", history[i]);
            a.text(history[i]);
            $("#historyView").append(a);
        }
    }

    $(searchButton).on("click", function (event) {
        

        var past = $(searchCity).val().trim();
        history.push(past);

        renderButtons();
    });

    renderButtons();



    $(document).on("click", ".history", function(){
        getWeather();
    })


});