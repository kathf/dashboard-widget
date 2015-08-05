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

  app.controller('WidgetController', [ '$scope', function( $scope ) {
    console.log("inside widget controller");

  }]);

  // app.directive('showWidget', ['$scope', function( $scope ) {
  //   console.log($scope.widget);
  //   return {
  //     restrict: 'E',
  //     templateUrl: 'widgets/' + this.widget.id,
  //     // controller: function() {
  //     //   console.log("something else");
  //     // },
  //     // controllerAs: 'WidgetController',
  //   };
  // }]);

})();
