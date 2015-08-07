var widgetModule = angular.module('widgetModule', ['templates']);


widgetModule.directive('showWidget', function() {
  return {
    restrict: 'E',
    templateUrl: 'show_widget.html',
  }
});

widgetModule.directive('employeeLocationWidget', ['$timeout', function($timeout) {
  return {
    restrict: 'E',
    template: "<div class='map-canvas'></div>",
    controller: function() {

      $timeout(function() {
        $scope.map = initializeMap;
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
    }
  }
}]);

// widgetModule.directive('salesFlowWidget', function() {
//
// });
