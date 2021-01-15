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
      '&cnt=40&appid=028602858d743697584eeaea63071afd';

    $.when(
      $.ajax({
        url: queryURL,
        method: 'GET',
        dataType: 'JSON',
      }).then(function (data) {
        console.log(data);
        let cityLat = data.coord.lat;
        let cityLon = data.coord.lon;
        let tempF = Math.ceil((data.main.temp - 273.15) * 1.8 + 32);
        let tempHigh = Math.ceil((data.main.temp_max - 273.15) * 1.8 + 32);
        let tempLow = Math.ceil((data.main.temp_min - 273.15) * 1.8 + 32);
        let icon =
          'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
        let today = new Date().toLocaleDateString();
        let uvIndexURL =
          'https://api.openweathermap.org/data/2.5/onecall?lat=' +
          cityLat +
          '&lon=' +
          cityLon +
          '&appid=028602858d743697584eeaea63071afd';

        $.ajax({
          url: uvIndexURL,
          method: 'GET',
          dataType: 'JSON',
        }).then(function (uvData) {
          console.log(uvData);
          
        
        //Transfer Content to HTML
        $('#cc').text(
          'It is currently ' + tempF + '°F in ' + data.name + ' on ' + today);
        $('#current-icon').attr('src', icon);
        $('#high').text("Today's high will be " + tempHigh + '°F');
        $('#low').text("Tonight's low will be " + tempLow + '°F');
        $('#humid').text('Current Humidity: ' + data.main.humidity + '%');
        $('#speed').text('Wind Speed: ' + data.wind.speed + ' MPH ');
        $('#uv').text('UV Index: ' + uvData.current.uvi);
      });
        

    //Five Day Forecast Begins
    $.ajax({
      url: futureForecastURL,
      method: 'GET',
      dataType: 'JSON',
    }).then(function (response) {
      console.log(response);
      let fiveTempOne = Math.ceil(
        (response.list[3].main.temp_max - 273.15) * 1.8 + 32
      );
      let fiveTempTwo = Math.ceil(
        (response.list[11].main.temp_max - 273.15) * 1.8 + 32
      );
      let fiveTempThree = Math.ceil(
        (response.list[19].main.temp_max - 273.15) * 1.8 + 32
      );
      let fiveTempFour = Math.ceil(
        (response.list[27].main.temp_max - 273.15) * 1.8 + 32
      );
      let fiveTempFive = Math.ceil(
        (response.list[35].main.temp_max - 273.15) * 1.8 + 32
      );
      let fiveIconOne =
        'http://openweathermap.org/img/w/' +
        response.list[0].weather[0].icon +
        '.png';
      let fiveIconTwo =
        'http://openweathermap.org/img/w/' +
        response.list[8].weather[0].icon +
        '.png';
      let fiveIconThree =
        'http://openweathermap.org/img/w/' +
        response.list[16].weather[0].icon +
        '.png';
      let fiveIconFour =
        'http://openweathermap.org/img/w/' +
        response.list[24].weather[0].icon +
        '.png';
      let fiveIconFive =
        'http://openweathermap.org/img/w/' +
        response.list[32].weather[0].icon +
        '.png';

      //HTML 5 Day
      $('#five-date-one').text(response.list[0].dt_txt.split(' ')[0]);
      $('#five-icon-one').attr('src', fiveIconOne);
      $('#five-high-one').text('Temp: ' + fiveTempOne + '°F');
      $('#humid-one').text('Humidity: ' + response.list[0].main.humidity + '%');

      $('#five-date-two').text(response.list[8].dt_txt.split(' ')[0]);
      $('#five-icon-two').attr('src', fiveIconTwo);
      $('#five-high-two').text('Temp: ' + fiveTempTwo + '°F');
      $('#humid-two').text('Humidity: ' + response.list[1].main.humidity + '%');

      $('#five-date-three').text(response.list[16].dt_txt.split(' ')[0]);
      $('#five-icon-three').attr('src', fiveIconThree);
      $('#five-high-three').text('Temp: ' + fiveTempThree + '°F');
      $('#humid-three').text('Humidity: ' + response.list[2].main.humidity + '%');

      $('#five-date-four').text(response.list[24].dt_txt.split(' ')[0]);
      $('#five-icon-four').attr('src', fiveIconFour);
      $('#five-high-four').text('Temp: ' + fiveTempFour + '°F');
      $('#humid-four').text('Humidity: ' + response.list[3].main.humidity + '%');

      $('#five-date-five').text(response.list[32].dt_txt.split(' ')[0]);
      $('#five-icon-five').attr('src', fiveIconFive);
      $('#five-high-five').text('Temp: ' + fiveTempFive + '°F');
      $('#humid-five').text('Humidity: ' + response.list[4].main.humidity + '%');
    });
    // Local Storage

  }));
});
};

displayWeather();
