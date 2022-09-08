//Setting Date & time

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
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

//Setting forecast

function showForecast() {
  let getForecast = document.querySelector("#weeklyForecast");
  let forecastHTML = "";
  let forecastDays = ["1st day", "2nd day", "3rd day", "4th day", "5th day"];
  forecastDays.forEach(function (day, image) {
    image = "🌚";
    degreeMax = "X°";
    degreeMin = "X°";
    forecastHTML =
      forecastHTML +
      `<div class="forecastDay">${day}</div>
      <div class="dailyEmoji">${degreeMax} ${image} ${degreeMin}</div>
      `;
  });
  getForecast.innerHTML = forecastHTML;
}

showForecast();

// Setting values

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

  changeTemperature = Math.round(c.data.main.temp);
}

//Setting Current button & default when entering the page

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
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(weatherUrl).then(localValues);
  axios.get(weatherUrl).then(emojis);
}

navigator.geolocation.getCurrentPosition(findTemp);

let changeTemperature = null;

//Setting chosen values - OK button

let cities = document.querySelector("#okButton");
cities.addEventListener("click", newLocation);

function newLocation(click) {
  click.preventDefault();
  toC.style.color = "grey";
  toF.style.color = "blue";
  let chosenCity = document.querySelector("#chosenCity").value;
  let apiKey = "e3dfb7191ef6138f7a6e690ea1f91607";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${chosenCity}&units=metric&appid=${apiKey}`;
  axios.get(weatherUrl).then(localValues);
  axios.get(weatherUrl).then(emojis);
}

//convert to celsius -button

let toC = document.querySelector("#c");
toC.addEventListener("click", changeToC);

function changeToC(c) {
  c.preventDefault();
  toC.style.color = "grey";
  toF.style.color = "blue";
  toC.style.textDecoration = "none";
  let temperature = document.querySelector("#temperatureToday");
  temperature.innerHTML = changeTemperature;
}

//convert to fahrenheit -button

let toF = document.querySelector("#f");
toF.addEventListener("click", changeToF);

function changeToF(f) {
  f.preventDefault();
  toF.style.color = "grey";
  toC.style.color = "blue";
  toF.style.textDecoration = "none";
  let temperature = document.querySelector("#temperatureToday");
  let convertingFToC = temperature.innerHTML;
  convertingFToC = Number(convertingFToC);
  temperature.innerHTML = Math.round(changeTemperature * 1.8 + 32);
}

// Emojis

function emojis(c) {
  let sky = c.data.weather[0].main;
  let skyNow = document.querySelector("#todayEmoji");
  if (sky === "Clear") {
    skyNow.innerHTML = "☀️";
  } else if (sky === "Clouds") {
    skyNow.innerHTML = "🌤";
  } else if (sky === "Drizzle") {
    skyNow.innerHTML = "🌨";
  } else if (sky === "Rain") {
    skyNow.innerHTML = "🌧";
  } else if (sky === "Thunderstorm") {
    skyNow.innerHTML = "⚡️";
  } else if (sky === "Snow") {
    skyNow.innerHTML = "❄️";
  }
}
