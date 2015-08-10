var mapModule = angular.module('mapModule', []);

mapModule.service('mapOptions', function() {

  var mapStyles = [
    {"featureType":"road","stylers":[{"visibility":"off"}]},
    {"featureType":"transit","stylers":[{"visibility":"off"}]},
    {"featureType": "administrative", "elementType":"labels",  "stylers": [{"visibility": "off"}]},
    {"featureType": "administrative.land_parcel", "stylers": [{ "visibility": "off"}]},
    {"featureType": "administrative", "elementType": "geometry.fill","stylers": [{ "visibility": "off"}]},
    {"featureType":"administrative.province","stylers":[{"visibility":"off"}]},
    {"featureType":"poi.park","elementType":"geometry","stylers":[{"visibility":"off"}]},
    {"featureType":"water","stylers":[{"color":"#004b76"}]},
    {"featureType":"landscape.natural","stylers":[{"visibility":"on"},{"color":"#fff6cb"}]},
    {"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#7f7d7a"},{"lightness":10},{"weight":1}]}
    ]

  var mapOptions = {
    center: new google.maps.LatLng(39, 155),
    zoom: 1,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    minZoom: 1,
    mapTypeControl: false,
    streetViewControl: false,
    panControl: false,
    zoomControl: false,
    scaleControl: false,
    styles: mapStyles
  };
  return mapOptions;
});



mapModule.service('addressService', function() {

  this.getAddress = function(entity) {
    if ( angular.isString(entity.address) ) {
      addressString = entity.address;
    } else {
      addressString = addressEnumerableToString(entity.address);
    }
    return addressString;
  };

  function addressEnumerableToString(addressEnumerable) {
    var addressString = "";
    angular.forEach(addressEnumerable, function(value, key) {
      if ( value != "-" ) {
        addressString += value + " ";
      }
    });
    return addressString;
  };

});


mapModule.service('geocodeService', ['addressService', function(addressService) {

  var addressMissing = [];
  var addToMap = [];
  var addressError = [];
  var addressMultipleMatches = [];

  this.addressMissing = function(){
    return addressMissing;
  }

  this.addToMap = function(){
    return addToMap;
  }

  this.addressError = function() {
    return addressError;
  };
  this.addressMultipleMatches = function() {
    return addressError;
  };

  var geocoder = new google.maps.Geocoder();

  this.geocodeAddresses = function(entity) {
    var addressString = addressService.getAddress(entity);
    if (addressString == "") {
      addressMissing.push(entity);
    } else {
      geocoder.geocode( {address: addressString} , function(results, status) {
        if (status == "OK") {
          var object = results[0];
          addToMap.push(object);
        }
        if ( status == "OVER_QUERY_LIMIT" ) {
          addressMultipleMatches.push(entity);
        } if ( status == "ZERO_RESULTS") {
          addressError.push(entity);
        };
      });
    }
  };
}]);

mapModule.service('mapLayers', function() {
  var infowindow = new google.maps.InfoWindow();

  this.createMarkers = function(object, map) {
    var latlng = object.geometry.location;
    var location = object.formatted_address;
    var marker = new google.maps.Marker({
        map: map,
        position: latlng,
        location: location,
    });
    google.maps.event.addListener(marker, 'mouseover', function() {
      var contentString = marker.location;
      infowindow.setContent( contentString );
      infowindow.open(map, marker);
    });

  };
  this.createHeatmap = function(map, heatmapData) {
    var heatmap = new google.maps.visualization.HeatmapLayer({
      data: heatmapData,
      map: map,
      opacity: 1,
      radius: 20,
    });
  };
  this.createInfoWindow = function(map) {
    google.maps.event.addListener(map, 'mouseover', function() {
      infowindow.close();
    });
    return infowindow;
  };
});

mapModule.service('dataService', ['$http', '$q', function($http, $q) {
  this.getData = function(url) {
    var request = $http.get(url);
    return( request.then( handleSuccess, handleError ) );
  };

  function handleSuccess( response ) {
    return( response.data );
  };

  function handleError( response ) {
    return( $q.reject( response.data.message ) );
  };
}]);
