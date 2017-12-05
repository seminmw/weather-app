var DarkSky = {

  apiKey : null,

  getIconMapping: function() {
    return {
       'clear-day'            :'wi wi-day-sunny'
    ,  'clear-night'          :'wi wi-night-clear'
    ,  'rain'                 :'wi wi-day-rain'
    ,  'snow'                 :'wi wi-day-snow'
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

  getUrl: function(position) {
    var coords = position.coords.latitude + "," + position.coords.longitude;
    return "https://api.darksky.net/forecast/" + this.apiKey + "/" + coords;
  },

  parseResponseToInfo: function(data) {
    return {
      temp: data.currently.temperature,
      isFar: true,
      dscr: data.currently.summary,
      icon: data.currently.icon
    }
  }
}