var mapModule = angular.module('mapModule', []);

mapModule.factory('mapOptions', function() {

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

mapModule.factory('geocoder', function() {
  var geocoder = new google.maps.Geocoder();
  return geocoder;
});
