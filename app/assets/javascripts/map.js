var mapModule = angular.module('mapModule', []);

mapModule.service('MapService', function() {
  var map;
  var markers;
  return {
    initialize: function() {

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
        maxZoom: 6,
        mapTypeControl: false,
        streetViewControl: false,
        panControl: false,
        zoomControl: true,
        scaleControl: false,
        styles: myStyles
      };

      // geocoder = new google.maps.Geocoder();

      map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      return map;
    },
    map_object: function(){
      return map;
    }
  };
});


// mapModule.controller('MapController', [ '$scope', '$http', function($scope, $http) {
//   console.log("inside map controller");
//
//   var mapOptions;
//   var map;
//   function initialize() {
//     mapOptions = {
//       zoom: 8,
//       center: new google.maps.LatLng(-34.397, 150.644)
//     };
//     map = new google.maps.Map(document.getElementById('map-canvas'),
//       mapOptions);
//   };
//   initialize();
//
// }]);

// mapModule.directive('map', function(){
//   return {
//     restrict: 'A',
//
//     template: "<div id='map-canvas'></div>",
//
//     controller: function() {
//       var mapOptions;
//       var map;
//       function initialize() {
//         mapOptions = {
//           zoom: 8,
//           center: new google.maps.LatLng(-34.397, 150.644)
//         };
//         map = new google.maps.Map(document.getElementById('map-canvas'),
//           mapOptions);
//       };
//       initialize();
//     },
//   }
// });

//
// app.controller('MapController',['$scope','$http', function($scope, $http) {
//   var mapOptions;
//   var map;
//   function initialize() {
//     mapOptions = {
//       zoom: 8,
//       center: new google.maps.LatLng(-34.397, 150.644)
//     };
//     map = new google.maps.Map(document.getElementById('map-canvas'),
//       mapOptions);
//   };
//   initialize();
// }]);
