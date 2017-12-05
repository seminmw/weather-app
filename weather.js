$( document ).ready( function() {

  function convertCelToFar( cel ){
    return ( ( cel * 1.8  ) + 32 ).toFixed( 2 );
  }

  function convertFarToCel( far ){
    return ( ( far - 32 ) / 1.8 ).toFixed( 2 );
  }

  var WeatherApp = {

    position : null,

    settings : null,

    service : null,

    services : {
      "DarkSky" : DarkSky,
      "Yahoo" : Yahoo,
      "OpenWeatherMap" : OpenWeatherMap,
      "WorldWeatherOnline" : WorldWeatherOnline
    },

    init: function() {
      this.showLoading();

      this.asyncGetGeoLocation();
      this.asyncGetSettings();

      this.checkCanRequestWeatherInfo();

      $('#reload').click(function() {
        WeatherApp.init();
      });
    },

    asyncGetSettings: function() {
      var that = this;

      that._log('settings started...');

      chrome.storage.sync.get({
        api: 'Yahoo',
        apiKey: ''
      }, function(items) {
          that._log('settings loaded...');
          that.settings = items;
      });
    },

    asyncGetGeoLocation: function() {
      this._getGeoLocation();
    },

    asyncLoadWeatherInfo: function() {
      var that = this;

      $.ajax({
        url : that.service.getUrl(that.position),
        dataType : "jsonp"
      }).done( function( data ){
        that.showWeather( that.service.parseResponseToInfo(data) );
      }).fail( function ( err ){
        that.showError("Failed load temperature");
      });
    },

    checkCanRequestWeatherInfo: function() {
      var that = this;

      if ( ! that.position || ! that.settings ) {
        that._log('retry to check if we can request weather info...');
        that._log(that.position);
        that._log(that.settings);

        setTimeout(function() {
          that.checkCanRequestWeatherInfo();
        }, 1000);
        return false;
      }

      that._log('can request weather info...');

      if ( ! that.settings.api || ! that.services[that.settings.api] ) {
        that.showError("Please check options!");
        return false;
      }

      that._log('can load service...');

      that.service = that.services[that.settings.api];
      that.service.apiKey = that.settings.apiKey;

      that.asyncLoadWeatherInfo();
    },

    showLoading: function() {
      $('.page').hide();
      $('#loadingPage').show();
    },

    showError: function(msg) {
      $('.page').hide();
      $('#errorPage').show();
      $('#errorMessage').html(msg);
    },

    showWeather: function(info) {
      $('.page').hide();
      $('#weatherPage').show();

      $("#text").text( info.temp + "  °F" );
      $("#description").text( info.dscr );
      this._uiRegisterConvertButtonClicks( info.temp, info.isFar );
      this._uiAddClassInTag( info.icon );
    },


    // ---
    _log : function( msg ) {
      console.log( msg );
    },

    // ---

    _getGeoLocation : function() {
      var that = this;
      if ( navigator.geolocation ) {
        this._log("navigator is ok...");
        navigator.geolocation.getCurrentPosition( function(position){
          that._saveGeoLocation(position);
        }, function(error) {
          that._showGeoLocationError(error);
        });
      } else {
        this.showError( "Geolocation is not supported by this browser." );
      }
    },

    _showGeoLocationError: function(error) {
      this._log("Error on GeoLocation");
      switch( error.code ) {
        case error.PERMISSION_DENIED:
          this.showError("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          this.showError("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          this.showError("The request to get user location timed out." );
          break;
        case error.UNKNOWN_ERROR:
          this.showError("An unknown error occurred.");
          break;
        default:
          this.showError("Unknown error");
          break;
      }
    },

    _saveGeoLocation: function(position) {
      this.position = position;
    },

    // ---

    _uiAddClassInTag: function( key ){
      var weather = this.service.getIconMapping();
      var $icon = $("i");

      $icon.removeClass();

      if( weather.hasOwnProperty( key ) ) {
        $icon.addClass(weather[key]);
      }
    },

    _uiRegisterConvertButtonClicks : function( temp, isFar ) {
      var that = this;
      var tempCel = ( ! isFar ) ? temp : convertFarToCel( temp );
      var tempFar = ( isFar ) ? temp : convertCelToFar( temp );

      $( "#cel" ).bind('click', function ( e ) {
        if ( isFar ){
          $( "#text" ).text( tempCel + "  °C" );
          isFar = false;
          $("#cel").removeClass();
          $("#cel").addClass("btn btn-primary");
          $("#far").addClass("btn btn-outline-light");
        }
      });


      $( "#far" ).bind( 'click', function( e ) {
        if ( isFar == false ) {
          $( "#text" ).text( tempFar + "  °F" );
          isFar = true;
          $("#far").removeClass();
          $("#far").addClass("btn btn-primary");
          $("#cel").addClass("btn btn-outline-light");
        }
      });
    }

  };

  WeatherApp.init();

});