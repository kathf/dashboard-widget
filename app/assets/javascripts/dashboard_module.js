var dashboardModule = angular.module('dashboardModule', ['templates']);

dashboardModule.controller('dashboardController', ['$scope', '$http', function($scope, $http) {

  $scope.widgetMarketplace = 'hide';
  $scope.widgetsDisplayed = [];

  $http.get('widgets.json')
    .success(function(data, status, headers, config) {
      var widgets = data;
      $.each(widgets, function(w) {
        w.display = false;
      });
      $scope.allWidgets = widgets;
      $scope.widgetsOnMarket = widgets;
    })
    .error(function(data, status, headers, config) {
      console.log(status);
    });

    $scope.closeWidget = function(widget) {
      console.log("close function");
      widget.display = false;
      $scope.widgetsOnMarket.push(widget);
      var index = $scope.widgetsOnMarket.indexOf(widget);
      $scope.widgetsDisplayed.splice(index,1);
    };
}]);

dashboardModule.directive('addWidgetButton', function() {
  return {
    restrict: 'E',
    templateUrl: 'add_widget_button.html'
  }
});

dashboardModule.directive('widgetMarketplace', function() {
  return {
    restrict: 'E',
    templateUrl: 'marketplace.html',
    controller: function($scope){

      $scope.onWidgetSelect = function(widget) {
        $scope.widgetMarketplace = 'hide';

        // add to widgetsDisplayed array and remove from widgetsOnMarket array
        $scope.widgetsDisplayed.push(widget);
        var index = $scope.widgetsOnMarket.indexOf(widget);
        $scope.widgetsOnMarket.splice(index,1);
      }
    },
  }
});
