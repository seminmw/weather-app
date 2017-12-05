var OpenWeatherMap = {

  apiKey : null,

  getIconMapping: function() {
    return {
        'clear-day'            :'wi wi-day-sunny'
    ,  'clear-night'          :'wi wi-night-clear'
    ,  'rain'                 :'wi wi-day-rain'
    ,  '13n'                 :'wi wi-day-snow'
    ,  'sleet'                :'wi wi-day-sleet'
    ,  'wind'                 :'wi wi-day-light-wind'
    ,  'fog'                  :'wi wi-fog'
    ,  'cloudy'               :'wi wi-cloudy'
    ,  'partly-cloudy-day'    :'wi wi-day-cloudy'
    ,  'partly-cloudy-night'  :'wi wi-night-alt-cloudy'
    ,  'hail'                 :'wi wi-hail'
    ,  'tornado'              :'wi wi-tornado'
    }
  },

  getUrl: function( position) {
    var coords = "lat=" + position.coords.latitude + "&" + "lon=" + position.coords.longitude;
    var fahrenheit = "units=imperial";
    return "https://api.openweathermap.org/data/2.5/weather?APPID=" + this.apiKey + "&" + fahrenheit + "&" + coords;
  },

  parseResponseToInfo: function(data) {
    return {
      temp: data.main.temp,
      isFar: true,
      dscr: data.weather[0].description,
      icon: data.weather[0].icon
    };
  }
}