function searchWeather(searchTerm) {
    fetch(`${baseURL}forecast?q=${searchTerm}&appid=${apiKey}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}

function init(resultFromServer) {
    let cityName = document.getElementById("cityHeader");
    let temperatureElement = document.getElementById("temperature");
    let weatherDescription = document.getElementById("weatherDescriptionHeader");
    let resultWeatherDescription = resultFromServer.list[0].weather[0].description;
    let windSpeed = document.getElementById("windSpeed");
    let humidityElement = document.getElementById("humidity");

    cityName.innerHTML = '<span class="fa fa-map-marker"></span>' + resultFromServer.city.name;
    temperatureElement.innerHTML = Math.floor(resultFromServer.list[0].main.temp) + "&#176";
    weatherDescription.innerHTML = resultWeatherDescription.charAt(0).toUpperCase() + resultWeatherDescription.slice(1);
    windSpeed.innerHTML = "Winds at " + "<strong>" + resultFromServer.list[0].wind.speed + "m/s</strong>";
    humidityElement.innerHTML = "Humidity: " + "<strong>" + resultFromServer.list[0].main.humidity + "%</strong>";

    switch(resultFromServer.list[0].weather[0].main) {
        case "Clear":
            document.body.classList.value = "clear";
            break;

        case "Clouds":
            document.body.classList.value = "clouds";
            break;

        case "Rain":
        case "Drizzle":
        case "Mist":
            document.body.classList.value = "rainy-weather";
            break;

        case "Thunderstorm":
            document.body.classList.value = "storm";
            break;

        case "Snow":
            document.body.classList.value = "snowy";
            break;

        default:
            document.body.classList.value = "default";
            break;
    }

    let forecastList = document.getElementById("forecastList");

    for (let i = 1; i < 11; i++) {
        console.log(resultFromServer.list[i]);

        let li = document.createElement("li");
        let liTime = resultFromServer.list[i].dt_txt.substring(11, 13) + "h";
        let liTemp = Math.floor(resultFromServer.list[i].main.temp) + "&#176";
        let liDesc = resultFromServer.list[i].weather[0].description;
        let weatherIconSrc = `${iconBaseURL}${resultFromServer.list[i].weather[0].icon}.png`;

        li.innerHTML = "<p>" + liTime + "</p>" + "<p>" + "<img src=" + weatherIconSrc + ">" + liTemp + "</p>" + "<p>" + liDesc + "</p>";

        forecastList.appendChild(li);
    }
}

function clearWeatherItems() {
    forecastList.innerHTML = "";
}

let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", () => {
    let searchTerm = document.getElementById("searchInput").value;
    if (searchTerm) {
        clearWeatherItems();
        searchWeather(searchTerm);
    }
})

document.getElementById("searchInput").onkeydown = function(e) {
    if(e.keyCode == 13) {
        searchBtn.click();
    }
}