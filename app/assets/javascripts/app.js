(function(){
  var app = angular.module('myApp',['templates','ngRoute','gridster']);

  app.config([ '$routeProvider', function($routeProvider) {
    $routeProvider
      .when("/",
        {
          templateUrl: "show.html",
          // controller: "WidgetCtrl"
        }
      );
  }]);

  app.directive('map', function(){
    return {
      restrict: 'A',

      template: "<div id='map-canvas'></div>",

      controller: function() {
        var mapOptions;
        var map;
        function initialize() {
          mapOptions = {
            zoom: 8,
            center: new google.maps.LatLng(-34.397, 150.644)
          };
          map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
        };
        initialize();
      },
      // controllerAs: 'WidgetCtrl'
    }
  });



  //
  // app.controller('WidgetCtrl',['$scope','$http', function($scope, $http) {
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

  // app.controller('WidgetController',['$scope','$http','$sce',function($scope, $http, $sce) {
  //    var url = 'Rails.application.secrets.API_url';
  //    $http.jsonp(url).success(function(data) {
  //     console.log(data);
  //     //  $scope.event = data;
  //     //   $scope.Area = {
  //     //               Name: "Melbourne",
  //     //               Latitude: data.event.latitude,
  //     //               Longitude: data.event.longitude
  //     //              };
  //     // $scope.latitude = data.event.latitude;
  //     // $scope.longitude = data.event.longitude;
  //   });
  //
  // }]);

})();
