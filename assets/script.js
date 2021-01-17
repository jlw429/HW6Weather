$(document).ready(function () {
  init();
});

function init() {
  addClickEvent();
  dispData();
}

// Makes ajax call to get current weather from API. Returns ajax promise.
function getCurrentWeatherData(city) {
  let currentWeatherURL =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    city +
    '&appid=028602858d743697584eeaea63071afd';

  return $.ajax({
    url: currentWeatherURL,
    method: 'GET',
    dataType: 'JSON',
  });
}

// Makes ajax call to get forecast weather from API. Returns ajax promise.
function getForecastWeatherData(city) {
  let futureForecastURL =
    'https://api.openweathermap.org/data/2.5/forecast?q=' +
    city +
    '&cnt=40&appid=028602858d743697584eeaea63071afd';

  return $.ajax({
    url: futureForecastURL,
    method: 'GET',
    dataType: 'JSON',
  });
}

// Displays current weather on page
function displayCurrentWeather(weatherData) {
  let today = new Date().toLocaleDateString();
  $('#cc').text(
    'It is currently ' +
      weatherData.current.tempF +
      '°F in ' +
      weatherData.name +
      ' on ' +
      today
  );
  $('#current-icon').attr('src', weatherData.current.icon);
  $('#high').text(
    "Today's high will be " + weatherData.current.tempHigh + '°F'
  );
  $('#low').text("Tonight's low will be " + weatherData.current.tempLow + '°F');
  $('#humid').text('Current Humidity: ' + weatherData.current.humidity + '%');
  $('#speed').text('Wind Speed: ' + weatherData.current.windspeed + ' MPH ');
  $('#uv').text('UV Index: ' + weatherData.current.uvi);
  $('#uv').removeClass();

  /* UV Scale from NWS: https://www.weather.gov/rah/uv */
  switch (Math.floor(weatherData.current.uvi)) {
    case 0:
    case 1:
    case 2:
      $('#uv').addClass('uv0_2');
      break;
    case 3:
    case 4:
    case 5:
      $('#uv').addClass('uv3_5');
      break;
    case 6:
    case 7:
      $('#uv').addClass('uv6_7');
      break;
    case 8:
    case 9:
    case 10:
      $('#uv').addClass('uv8_10');
      break;
    case 11:
    default:
      $('#uv').addClass('uv11_20');
      break;
  }
}

// Displays forecasted weather on page
function displayForecastWeather(weatherData) {
  $('#five-date-one').text(weatherData.forecast.fiveDateOne);
  $('#five-icon-one').attr('src', weatherData.forecast.fiveIconOne);
  $('#five-high-one').text('Temp: ' + weatherData.forecast.fiveTempOne + '°F');
  $('#humid-one').text(
    'Humidity: ' + weatherData.forecast.fiveHumidityOne + '%'
  );
  $('#five-date-two').text(weatherData.forecast.fiveDateTwo);
  $('#five-icon-two').attr('src', weatherData.forecast.fiveIconTwo);
  $('#five-high-two').text('Temp: ' + weatherData.forecast.fiveTempTwo + '°F');
  $('#humid-two').text(
    'Humidity: ' + weatherData.forecast.fiveHumidityTwo + '%'
  );
  $('#five-date-three').text(weatherData.forecast.fiveDateThree);
  $('#five-icon-three').attr('src', weatherData.forecast.fiveIconThree);
  $('#five-high-three').text(
    'Temp: ' + weatherData.forecast.fiveTempThree + '°F'
  );
  $('#humid-three').text(
    'Humidity: ' + weatherData.forecast.fiveHumidityThree + '%'
  );
  $('#five-date-four').text(weatherData.forecast.fiveDateFour);
  $('#five-icon-four').attr('src', weatherData.forecast.fiveIconFour);
  $('#five-high-four').text(
    'Temp: ' + weatherData.forecast.fiveTempFour + '°F'
  );
  $('#humid-four').text(
    'Humidity: ' + weatherData.forecast.fiveHumidityFour + '%'
  );
  $('#five-date-five').text(weatherData.forecast.fiveDateFive);
  $('#five-icon-five').attr('src', weatherData.forecast.fiveIconFive);
  $('#five-high-five').text(
    'Temp: ' + weatherData.forecast.fiveTempFive + '°F'
  );
  $('#humid-five').text(
    'Humidity: ' + weatherData.forecast.fiveHumidityFive + '%'
  );
}

function weather(city) {
  let weatherData = {};
  getCurrentWeatherData(city).then(function (data) {
    weatherData.name = data.name;
    weatherData.cityLat = data.coord.lat;
    weatherData.cityLon = data.coord.lon;

    weatherData.current = {};
    weatherData.current.tempF = Math.ceil((data.main.temp - 273.15) * 1.8 + 32);
    weatherData.current.tempHigh = Math.ceil(
      (data.main.temp_max - 273.15) * 1.8 + 32
    );
    weatherData.current.tempLow = Math.ceil(
      (data.main.temp_min - 273.15) * 1.8 + 32
    );
    weatherData.current.icon =
      'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
    weatherData.current.humidity = data.main.humidity;
    weatherData.current.windspeed = data.wind.speed;
    // Get UV Index
    let uvIndexURL =
      'https://api.openweathermap.org/data/2.5/onecall?lat=' +
      weatherData.cityLat +
      '&lon=' +
      weatherData.cityLon +
      '&appid=028602858d743697584eeaea63071afd';

    // Get UV Index
    $.ajax({
      url: uvIndexURL,
      method: 'GET',
      dataType: 'JSON',
    }).then(function (uvData) {
      weatherData.current.uvi = uvData.current.uvi;
      displayCurrentWeather(weatherData);
    });
  });

  getForecastWeatherData(city).then(function (data) {
    weatherData.forecast = {};
    // Forecast Date
    weatherData.forecast.fiveDateOne = data.list[0].dt_txt.split(' ')[0];
    weatherData.forecast.fiveDateTwo = data.list[8].dt_txt.split(' ')[0];
    weatherData.forecast.fiveDateThree = data.list[16].dt_txt.split(' ')[0];
    weatherData.forecast.fiveDateFour = data.list[24].dt_txt.split(' ')[0];
    weatherData.forecast.fiveDateFive = data.list[32].dt_txt.split(' ')[0];
    // Forecast Humidity
    weatherData.forecast.fiveHumidityOne = data.list[0].main.humidity;
    weatherData.forecast.fiveHumidityTwo = data.list[8].main.humidity;
    weatherData.forecast.fiveHumidityThree = data.list[16].main.humidity;
    weatherData.forecast.fiveHumidityFour = data.list[24].main.humidity;
    weatherData.forecast.fiveHumidityFive = data.list[32].main.humidity;
    // Forecast Max Temp
    weatherData.forecast.fiveTempOne = Math.ceil(
      (data.list[0].main.temp_max - 273.15) * 1.8 + 32
    );
    weatherData.forecast.fiveTempTwo = Math.ceil(
      (data.list[8].main.temp_max - 273.15) * 1.8 + 32
    );
    weatherData.forecast.fiveTempThree = Math.ceil(
      (data.list[16].main.temp_max - 273.15) * 1.8 + 32
    );
    weatherData.forecast.fiveTempFour = Math.ceil(
      (data.list[24].main.temp_max - 273.15) * 1.8 + 32
    );
    weatherData.forecast.fiveTempFive = Math.ceil(
      (data.list[32].main.temp_max - 273.15) * 1.8 + 32
    );
    // Forecast Icons
    weatherData.forecast.fiveIconOne =
      'http://openweathermap.org/img/w/' +
      data.list[0].weather[0].icon +
      '.png';
    weatherData.forecast.fiveIconTwo =
      'http://openweathermap.org/img/w/' +
      data.list[8].weather[0].icon +
      '.png';
    weatherData.forecast.fiveIconThree =
      'http://openweathermap.org/img/w/' +
      data.list[16].weather[0].icon +
      '.png';
    weatherData.forecast.fiveIconFour =
      'http://openweathermap.org/img/w/' +
      data.list[24].weather[0].icon +
      '.png';
    weatherData.forecast.fiveIconFive =
      'http://openweathermap.org/img/w/' +
      data.list[32].weather[0].icon +
      '.png';

    displayForecastWeather(weatherData);
  });
}

function addClickEvent() {
  $('#search-button').click(function (event) {
    event.preventDefault();
    let city = $('#city-search').val();

    storeCity(city);
    weather(city);
  });
}

function storeCity(city) {
  // Local Storage
  let dataStorage = JSON.parse(localStorage.getItem('city')) || [];
  let c = {
    city,
  };
  while (dataStorage.length > 9) {
    dataStorage.shift();
  }
  dataStorage.push(c);
  localStorage.setItem('city', JSON.stringify(dataStorage));
  dispData();
}

function dispData() {
  $('#prev-city-display').html('');
  let dataStorage = JSON.parse(localStorage.getItem('city')) || [];

  // Preload page with last city
  if (dataStorage.length) {
    $('#city-search').val(dataStorage[dataStorage.length - 1].city);
    weather(dataStorage[dataStorage.length - 1].city);
  }

  // Populate previous cities
  for (let i = dataStorage.length - 1; i >= 0; i--) {
    $('#prev-city-display').append(
      '<li id=city_' + i + ' class=listCity>' + dataStorage[i].city + '</li>'
    );

    $('#city_' + i).click(function (event) {
      event.preventDefault();
      $('#city-search').val(dataStorage[i].city);
      weather(dataStorage[i].city);
    });
  }
}

$('#clear-search-button').on('click', function (event) {
  event.preventDefault();
  localStorage.clear();
  dispData();
});
