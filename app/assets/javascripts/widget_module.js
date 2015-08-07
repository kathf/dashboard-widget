var widgetModule = angular.module('widgetModule', ['templates', 'mapModule']);


widgetModule.directive('showWidget', function() {
  return {
    restrict: 'E',
    templateUrl: 'show_widget.html',
  }
});

widgetModule.directive('employeeLocationsWidget', [ '$timeout', '$http', 'initializeMap' , function($timeout, $http, initializeMap) {
  return {
    restrict: 'E',
    template: "<div class='map-canvas' id='employee-locations-map'></div>",
    controller: function($scope) {

      $timeout(function() {
        $scope.map = initializeMap;

        $timeout(function(){
          console.log($scope.map);
        });

      });

      var url = 'widgets/' + $scope.widget.id + '.json';

      $http.get(url).
        success(function(data, status, headers, config) {
          $scope.data = data;

          $.each( $scope.data, function() {
            $scope.map.geocode(this, $scope.map.map);
          });

        }).
        error(function(data, status, headers, config) {
          console.log(status);
        });
    },
  }
}]);

// widgetModule.directive('salesFlowWidget', function() {
//
// });
