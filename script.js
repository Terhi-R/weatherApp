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

function runTime(sunTime) {
  sunHour = sunTime.getHours();
  if (sunHour < 10) {
    sunHour = `0${sunHour}`;
  }

  sunMinute = sunTime.getMinutes();
  if (sunMinute < 10) {
    sunMinute = `0${sunMinute}`;
  }

  return `${sunHour}:${sunMinute}`;
}

let takeTime = runTime(now);

let setTime = document.querySelector("#currentTime");
setTime.innerHTML = `${day} ${takeTime}`;

//Setting forecast

function findWeekdays(timestamp) {
  let weekdays = new Date(timestamp * 1000);
  let weekday = weekdays.getDay();

  return days[weekday];
}

function showForecast(response) {
  let forecastData = response.data.daily;
  let getForecast = document.querySelector("#weeklyForecast");
  let forecastHTML = "";
  forecastData.forEach(function (currentForecast, index) {
    /*let sunrise = newDate(currentForecast.sunrise * 1000);
    let sunset = newDate(currentForecast.sunset * 1000);
    sunrise = runTime(sunrise);
    sunset = runTime(sunset);*/
    let forecastEmojis = currentForecast.weather[0].icon;
    if (forecastEmojis === "01d") {
      forecastEmojis = "☀️";
    } else if (forecastEmojis === "02d") {
      forecastEmojis = "🌤";
    } else if (forecastEmojis === "03d") {
      forecastEmojis = "☁️";
    } else if (forecastEmojis === "04d") {
      forecastEmojis = "🌥";
    } else if (forecastEmojis === "09d") {
      forecastEmojis = "🌧";
    } else if (forecastEmojis === "10d") {
      forecastEmojis = "🌦";
    } else if (forecastEmojis === "11d") {
      forecastEmojis = "🌩";
    } else if (forecastEmojis === "13d") {
      forecastEmojis = "❄️";
    } else if (forecastEmojis === "50d") {
      forecastEmojis = `<img src="http://openweathermap.org/img/wn/${currentForecast.weather[0].icon}@2x.png" alt="" width="45"/>`;
    }
    /*title="Sunrise at ${sunrise} / Sunset at ${sunset}"*/
    degreeMax = Math.round(currentForecast.temp.max) + "°";
    degreeMin = Math.round(currentForecast.temp.min) + "°";
    if (index > 0 && index < 6) {
      forecastHTML += `
        <div class="forecastDay">${findWeekdays(currentForecast.dt)}</div>
        <div class="dailyForecast">
${degreeMax} / ${degreeMin} <span class="forecastEmoji"> ${forecastEmojis}
        </span></div>
        `;
    }
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

//Setting chosen values - OK button

let cities = document.querySelector("#okButton");
cities.addEventListener("click", newLocation);

function newCityForecast(position) {
  let lat = position.data.coord.lat;
  let lon = position.data.coord.lon;
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiURL).then(showForecast);
}

function newLocation(click) {
  click.preventDefault();
  let chosenCity = document.querySelector("#chosenCity").value;
  let apiKey = "e3dfb7191ef6138f7a6e690ea1f91607";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${chosenCity}&units=metric&appid=${apiKey}`;
  axios.get(weatherUrl).then(localValues);
  axios.get(weatherUrl).then(emojis);
  axios.get(weatherUrl).then(newCityForecast);
}

// Emojis

https: function emojis(c) {
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
