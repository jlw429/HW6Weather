function displayWeather() {
  $('#search-button').click(function (event) {
    event.preventDefault();
    let citySearch = $('#city-search').val();
    let queryURL =
      'https://api.openweathermap.org/data/2.5/weather?q=' +
      citySearch +
      '&appid=028602858d743697584eeaea63071afd';
    let futureForecastURL =
      'https://api.openweathermap.org/data/2.5/forecast?q=' +
      citySearch +
      '&cnt=10&appid=028602858d743697584eeaea63071afd';
//Five Day Forecast Begins
    $.ajax({
      url: queryURL,
      method: 'GET',
      dataType: 'JSON',
    }).then(function (data) {
      console.log(data);
      let tempF = Math.ceil((data.main.temp - 273.15) * 1.8 + 32);
      let tempHigh = Math.ceil((data.main.temp_max - 273.15) * 1.8 + 32);
      let tempLow = Math.ceil((data.main.temp_min - 273.15) * 1.8 + 32);
      let icon =
        'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
      let today = new Date().toLocaleDateString();
      console.log(today);

      //Transfer Content to HTML
      $('#cc').text(
        'It is currently ' + tempF + '°F in ' + data.name + ' on ' + today
      );
      $('#current-icon').attr('src', icon);
      $('#high').text("Today's high will be " + tempHigh + '°F');
      $('#low').text("Tonight's low will be " + tempLow + '°F');
      $('#humid').text('Current Humidity: ' + data.main.humidity + '%');
      $('#speed').text('Wind Speed: ' + data.wind.speed + ' MPH ');
    });

    $.ajax({
      url: futureForecastURL,
      method: 'GET',
      dataType: 'JSON',
    }).then(function (response) {
      console.log(response);
      let fiveTempOne = Math.ceil(
        (response.list[0].main.temp_max - 273.15) * 1.8 + 32
      );
      let fiveTempTwo = Math.ceil(
        (response.list[1].main.temp_max - 273.15) * 1.8 + 32
      );
      let fiveTempThree = Math.ceil(
        (response.list[2].main.temp_max - 273.15) * 1.8 + 32
      );
      let fiveTempFour = Math.ceil(
        (response.list[3].main.temp_max - 273.15) * 1.8 + 32
      );
      let fiveTempFive = Math.ceil(
        (response.list[4].main.temp_max - 273.15) * 1.8 + 32
      );
      let fiveTempLowOne = Math.ceil(
        (response.list[0].main.temp_min - 273.15) * 1.8 + 32
      );
      let fiveTempLowTwo = Math.ceil(
        (response.list[0].main.temp_min - 273.15) * 1.8 + 32
      );
      let fiveTempLowThree = Math.ceil(
        (response.list[0].main.temp_min - 273.15) * 1.8 + 32
      );
      let fiveTempLowFour = Math.ceil(
        (response.list[0].main.temp_min - 273.15) * 1.8 + 32
      );
      let fiveTempLowFive = Math.ceil(
        (response.list[0].main.temp_min - 273.15) * 1.8 + 32
      );
      let fiveIconOne =
        'http://openweathermap.org/img/w/' +
        response.list[0].weather[0].icon +
        '.png';
      let fiveIconTwo =
        'http://openweathermap.org/img/w/' +
        response.list[1].weather[0].icon +
        '.png';
      let fiveIconThree =
        'http://openweathermap.org/img/w/' +
        response.list[2].weather[0].icon +
        '.png';
      let fiveIconFour =
        'http://openweathermap.org/img/w/' +
        response.list[3].weather[0].icon +
        '.png';
      let fiveIconFive =
        'http://openweathermap.org/img/w/' +
        response.list[4].weather[0].icon +
        '.png';
      let today = new Date().toLocaleDateString();

      //HTML 5 Day
      $('#five-date-one').text(today);
      $('#five-icon-one').attr('src', fiveIconOne);
      $('#five-high-one').text('High:' + fiveTempOne + '°F');
      $('#five-low-one').text('Low:' + fiveTempLowOne + '°F');
      $('#humid-one').text('Humidity:' + response.list[0].main.humidity + '%');

      $('#five-date-two').text(today);
      $('#five-icon-two').attr('src', fiveIconTwo);
      $('#five-high-two').text('High:' + fiveTempTwo + '°F');
      $('#five-low-two').text('Low:' + fiveTempLowTwo + '°F');
      $('#humid-two').text('Humidity:' + response.list[1].main.humidity + '%');

      $('#five-date-three').text(today);
      $('#five-icon-three').attr('src', fiveIconThree);
      $('#five-high-three').text('High:' + fiveTempThree + '°F');
      $('#five-low-three').text('Low:' + fiveTempLowThree + '°F');
      $('#humid-three').text(
        'Humidity:' + response.list[2].main.humidity + '%'
      );

      $('#five-date-four').text(today);
      $('#five-icon-four').attr('src', fiveIconFour);
      $('#five-high-four').text('High:' + fiveTempFour + '°F');
      $('#five-low-four').text('Low:' + fiveTempLowFour + '°F');
      $('#humid-four').text('Humidity:' + response.list[3].main.humidity + '%');

      $('#five-date-five').text(today);
      $('#five-icon-five').attr('src', fiveIconFive);
      $('#five-high-five').text('High:' + fiveTempFive + '°F');
      $('#five-low-five').text('Low:' + fiveTempLowFive + '°F');
      $('#humid-five').text('Humidity:' + response.list[4].main.humidity + '%');
    });




  });
}
displayWeather();
