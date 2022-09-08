//Setting Date & time

//Setting forecast
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

function findWeekdays(timestamp) {
  let weekdays = new Date(timestamp * 1000);
  let weekday = weekdays.getDay();

  return days[weekday];
}

function showForecast(response) {
  let forecastData = response.data.daily;
  console.log(forecastData[2]);
  let getForecast = document.querySelector("#weeklyForecast");
  let forecastHTML = "";
  forecastData.forEach(function (currentForecast) {
    degreeMax = Math.round(currentForecast.temp.max) + "°";
    degreeMin = Math.round(currentForecast.temp.min) + "°";
    forecastHTML += `
      <div class="forecastDay">${findWeekdays(currentForecast.dt)}</div>
      <div class="dailyEmoji">${degreeMax}<img src="http://openweathermap.org/img/wn/${
      currentForecast.weather[0].icon
    }@2x.png" alt="" width="45"/>${degreeMin}</div>

      `;
  });
  getForecast.innerHTML = forecastHTML;
}

function findForecast(coordinates) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiURL).then(showForecast);
}

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
  findForecast(position.coords);
}

navigator.geolocation.getCurrentPosition(findTemp);

let changeTemperature = null;

let toC = document.querySelector("#c");
toC.addEventListener("click", changeToC);

let toF = document.querySelector("#f");
toF.addEventListener("click", changeToF);

function changeToC(click) {
  click.preventDefault();
  toC.style.color = "grey";
  toF.style.color = "blue";
  let temperature = document.querySelector("#temperatureToday");
  temperature.innerHTML = changeTemperature;
}

function changeToF(click) {
  click.preventDefault();
  toF.style.color = "grey";
  toC.style.color = "blue";
  let temperature = document.querySelector("#temperatureToday");
  let converting = temperature.innerHTML;
  converting = Number(converting);
  temperature.innerHTML = Math.round(changeTemperature * 1.8 + 32);
}

//Setting chosen values - OK button

let cities = document.querySelector("#okButton");
cities.addEventListener("click", newLocation);

function newLocation(click) {
  click.preventDefault();
  let chosenCity = document.querySelector("#chosenCity").value;
  let apiKey = "e3dfb7191ef6138f7a6e690ea1f91607";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${chosenCity}&units=metric&appid=${apiKey}`;
  axios.get(weatherUrl).then(localValues);
  axios.get(weatherUrl).then(emojis);
}

// Emojis

function emojis(c) {
  let sky = c.data.weather[0].main;
  let icon = c.data.weather[0].icon;
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

//Weekly forecast

function forecastValues(c) {
  console.log(c);
}

function forecast() {
  let apiKey = "e3dfb7191ef6138f7a6e690ea1f91607";
  let forecastURL = `https://bulk.openweathermap.org/snapshot/hourly_16.json.gz?appid=${apiKey}`;
  axios.get(forecastURL).then(forecastValues);
}
