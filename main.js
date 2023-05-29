/////////////////////// For SELECT ELEMENTS//////////////////////////////////
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

////////////////////////// weather data/////////////////////////////////
const weather = {};

////////////////////////////////////// My First Line//////////////////////////////////////

weather.temperature = {
    unit: "celsius"
}

/////////////////////My API KEY//////////
const KELVIN = 273;
const key = "704fdde98dfe53aabe27f3c9ca3908d6";
///////////////////////////////////////////////

// /////////This Line For Check If Your browser Support a GeoLocation//////////////
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Your Browser Doesn't Support a Geolocation</p>";
}

//////////////////////// SET The Userlocation///////////////

function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

/////////////////show error if user not allow his location////////////////////
function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> Please Allow Your Location </p>`;
}

/////////////////////////// GET WEATHER FROM API Using Lat&Long/////////////////////////////
function getWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function () {
            displayWeather();
        });
}

/////////////////// DISPLAY WEATHER TO User interface//////////////////////
function displayWeather() {
    iconElement.innerHTML = `<img src="imge/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

////////////////////////////////////////////*Last Line*////////////////////////////////////////////////////////
