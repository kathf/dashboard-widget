(function(){
  var app = angular.module('myApp', [
    'templates',
    'ngRoute',
    'ngResource',
    'mapModule',
  ])

  app.controller('DashboardController', [ '$scope', '$http', function($scope, $http) {
    console.log("inside dashboard controller");

    $(".gridster").gridster({
        widget_selector: "div.panel",
        widget_margins: [10, 10],
        widget_base_dimensions: [500, 200]
    });

    $http.get('widgets.json').
      success(function(data, status, headers, config) {
        $scope.allWidgets = data;
      }).
      error(function(data, status, headers, config) {
        console.log(status);
      });

    $scope.getInclude = function(widget){
      if(widget.display){
          return "widgets/" + widget.id;
      }
    return "";
    }
  }]);

  app.controller('WidgetController', [ '$scope', '$http', 'initializeMap', function($scope, $http, initializeMap) {
    console.log("inside widget controller");

    $scope.map = initializeMap;

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

  }]);

})();
