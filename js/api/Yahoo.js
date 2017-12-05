var Yahoo = {

  apiKey : null,

  getIconMapping: function() {
    return {
      'cloudy'    :'wi wi-cloudy',
      'breezy'     :'wi wi-day-light-wind'
    }
  },

  getUrl: function( position) {
    var coords = position.coords.latitude + "," + position.coords.longitude;
    var searchText = `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="(${coords})")`;


    return `https://query.yahooapis.com/v1/public/yql?q= + ${encodeURI(searchText)} + &format=json`;
  },

  parseResponseToInfo: function(data) {
    return {
      temp: data.query.results.channel.item.condition.temp,
      isFar: true,
      dscr: data.query.results.channel.item.condition.text,
      icon: data.query.results.channel.item.condition.text.toLowerCase()
    };
  }
};