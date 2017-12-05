var WorldWeatherOnline = {

  apiKey : null,

  getIconMapping: function() {
    return {

    }
  },

  getUrl: function( position) {
    var coords = position.coords.latitude + "," + position.coords.longitude;
    return "https://api.worldweatheronline.com/premium/v1/marine.ashx?key=" + this.apiKey + "&format=json&q=" + coords;
  },

  parseResponseToInfo: function(data) {
    console.log(data);
    return {
      temp: data.data.weather[0].maxtempF,
      isFar: true,
      dscr: "",
      icon: ''
    };
  }
}