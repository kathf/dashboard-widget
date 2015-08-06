var mapModule = angular.module('mapModule', []);

mapModule.factory('MapService', function() {
  var map;
  var markers;
  return {
    initialize: function() {
      mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(-34.397, 150.644)
      };
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
