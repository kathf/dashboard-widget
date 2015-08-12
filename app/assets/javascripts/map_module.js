var mapModule = angular.module('mapModule', []);

// config for google map
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
  ];

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
