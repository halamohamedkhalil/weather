var weatherContainer = document.getElementById("weatherContainer");
var searchInput = document.getElementById("search");
async function getWeather(city) {
  var res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=6c43e0586fa84e79823151555233012&q=${city}&days=3`
  );
  if (res.ok && res.status != 400) {
    var finalRes = await res.json();
    return finalRes;
  }
  return false;
}
var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
function getDateWithFormat(date) {
  return new Date(date.replace(" ", "T"));
}
getWeather("cairo");
function currentDay(city, data) {
  var date = getDateWithFormat(data.last_updated);
  return `                    <div class="col-md-4 px-0">
    <div class="header-news d-flex justify-content-between px-2 py-2 ">
        <div class="day">${days[date.getDay()]}</div>
        <div class="date">${date.getDate() + monthNames[date.getMonth()]}</div>
    </div>
    <div class="content-news px-3 py-3 d-flex flex-column gap-3">
        <div class="location fs-5" id="location-name">${city}</div>
        <div class="degree d-flex justify-content-between align-items-center">
            <div class="number text-white fw-bold">${
              data.temp_c
            }<sup>o</sup>C</div>
            <div class="news-icon ">
                <img src="https://${
                  data.condition.icon
                }" alt="degree" id="img-degree">
            </div>
        </div>
        <div class="custom fs-6" id="custom">${data.condition.text}</div>
        <div class="details d-flex justify-content-start gap-4 ">
            <span class="details-item">
                <img src="images/icon-umberella.png" alt="icon-umberella" class="img-fluid"> ${
                  data.wind_degree
                }
            </span>
            <span class="details-item">
                <img src="images/icon-wind.png" alt="icon-wind" class="img-fluid"> ${
                  data.wind_kph
                }km/h
            </span>
            <span class="details-item">
                <img src="images/icon-compass.png" alt="icon-compass" class="img-fluid"> ${
                  data.wind_dir
                }
            </span>
        </div>
    </div>
</div>
`;
}
function othersDay(data) {
  var date = getDateWithFormat(data.date);
  return `                    <div class="col-md-4 px-0">
    <div class="header1 text-center py-2 " id="next-day">
    ${days[date.getDay()]}
    </div>
    <div class="content1 py-5 d-flex flex-column align-items-center justify-content-center gap-3">
        <div class="weather-img">
            <img src="https://${data.day.condition.icon}" alt="176" id="">
        </div>
        <div class="degree d-flex flex-column align-items-center gap-1">
            <div class="fs-4 text-white fw-bold">${
              data.day.maxtemp_c
            }<sup>o</sup>C</div>
            <div class="clec">${data.day.mintemp_c}<sup>o</sup></div>
        </div>
        <div class="custom fs-6">${data.day.condition.text}</div>
        
    </div>
</div>
    `;
}
function handleSearch(weatherData) {
  if (weatherData != false) {
    html = "";
    html += currentDay(weatherData.location.name, weatherData.current);
    for (var i = 1; i < weatherData.forecast.forecastday.length; i++) {
      html += othersDay(weatherData.forecast.forecastday[i]);
    }
    weatherContainer.innerHTML = html;
  }
}
function Search() {
  var defaultVal = searchInput.getAttribute("data-defaultValue");
  var search = searchInput.value ?? defaultVal ?? "cairo";
  getWeather(search).then((v) => {
    handleSearch(v);
  });
}

Search();
