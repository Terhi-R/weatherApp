let apiKey = "e3dfb7191ef6138f7a6e690ea1f91607";

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[now.getDay()];
let time = now.getHours();
if (time < 10) {
  time = `0${time}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let setTime = document.querySelector("#currentTime");
setTime.innerHTML = `${day} ${time}:${minutes}`;

//setting chosen values

let cities = document.querySelector("#city-form");
cities.addEventListener("click", currentCity);

function currentCity(c) {
  c.preventDefault();
  let chosenCity = document.querySelector("#chosenCity");
  newLocation(chosenCity.value);
}

function newLocation(selection) {
  let apiKey = "e3dfb7191ef6138f7a6e690ea1f91607";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${selection}&units=metric&appid=${apiKey}`;
  axios.get(weatherUrl).then(localValues);
  axios.get(weatherUrl).then(emojis);
}


// Temperature and City 

function localValues(c) {
  let temperature = Math.round(c.data.main.temp);
  let changeTemp = document.querySelector("#temperatureToday");
  changeTemp.innerHTML = temperature;

  let city = c.data.name;
  let localCity = document.querySelector("#city");
  localCity.innerHTML = city;

  let sky = c.data.weather[0].description;
  sky = sky.charAt(0).toUpperCase() + sky.slice(1);
  let localSky = document.querySelector("#sky");
  localSky.innerHTML = sky;

  let humidity = c.data.main.humidity;
  let localHumidity = document.querySelector("#humidity");
  localHumidity.innerHTML = humidity;

  let wind = Math.round(c.data.wind.speed);
  let localWind = document.querySelector("#wind");
  localWind.innerHTML = wind;
}


//Current Button
let showLocal = document.querySelector("#local");
showLocal.addEventListener("click", localButton);

function localButton(click) {
  click.preventDefault();
  navigator.geolocation.getCurrentPosition(findTemp);
}


function findTemp(position) {
  let apiKey = "e3dfb7191ef6138f7a6e690ea1f91607";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(weatherUrl).then(localValues);
  axios.get(weatherUrl).then(emojis);
}

navigator.geolocation.getCurrentPosition(findTemp);

//Celsius button

let toC = document.querySelector("#c");
toC.addEventListener("click", changeToC);

function changeToC(c) {
  c.preventDefault();
  navigator.geolocation.getCurrentPosition(findTemp);
}

//convert to fahrenheit

let toF = document.querySelector("#f");
toF.addEventListener("click", changeToF);

function changeToF(f) {
  f.preventDefault();
  let fTemperature = document.querySelector("#temperatureToday");
  let convertingFToC = fTemperature.innerHTML;
  convertingFToC = Number(convertingFToC);
  fTemperature.innerHTML = Math.round(convertingFToC * 1.8 + 32);
}

// Emojis

function emojis(c) {
  let sky = c.data.weather[0].main;
  let skyNow = document.querySelector("#todayEmoji");
  if (sky === "Clear") {
    skyNow.innerHTML = "☀️"
  } else if (sky === "Clouds") {
    skyNow.innerHTML = "🌤"
  } else if (sky === "Drizzle") {
     skyNow.innerHTML = "🌨"
  } else if (sky === "Rain") {
    skyNow.innerHTML =  "🌧"
  } else if (sky === "Thunderstorm") {
    skyNow.innerHTML =  "⚡️"
  } else if (sky === "Snow") {
    skyNow.innerHTML =  "❄️"
  };
};



