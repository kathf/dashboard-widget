var mapModule = angular.module('mapModule', []);

mapModule.service('initializeMap', function(){

  var myStyles = [
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
    zoomControl: true,
    scaleControl: false,
    styles: myStyles
  };

  this.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var geocoder = new google.maps.Geocoder();

  this.geocode = function( data, map ) {
    var addressString = data.address;

    geocoder.geocode( {address: addressString} , function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
      }
    });
  };

});
