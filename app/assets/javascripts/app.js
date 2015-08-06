(function(){
  var app = angular.module('myApp', [
    'templates',
    'ngRoute',
    'ngResource',
  ])

  app.controller('DashboardController', [ '$scope', '$http', function($scope, $http) {
    console.log("inside dashboard controller");

    $(".gridster").gridster({
        widget_selector: "div.panel",
        widget_margins: [10, 10],
        widget_base_dimensions: [350, 300]
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

  app.controller('WidgetController', [ '$scope', '$http', function($scope, $http) {
    console.log("inside widget controller");

    var url = 'widgets/' + $scope.widget.id + '.json';

    $http.get(url).
      success(function(data, status, headers, config) {
        $scope.employees = data;
        console.log(data);
        console.log($scope.employees);
      }).
      error(function(data, status, headers, config) {
        console.log(status);
      });
  }]);
  //
  // app.directive('showWidget', [ '$scope', '$http', function($scope, $http) {
  //   return {
  //     restrict: 'E',
  //     templateUrl: 'widgets/' + this.widget.id,
  //     controller: function() {
  //       console.log("inside show-widget directive");
  //
  //       $http.get('widgets/' + this.widget.id + '.json').
  //         success(function(data, status, headers, config) {
  //           $scope.employees = data;
  //         }).
  //         error(function(data, status, headers, config) {
  //           console.log(status);
  //         });
  //
  //     },
  //     controllerAs: 'widgets'
  //   };
  // }]);

})();
