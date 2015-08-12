var dashboardModule = angular.module('dashboardModule', ['templates']);

dashboardModule.controller('dashboardController', ['$scope', '$http', function($scope, $http) {

  $scope.widgetMarketplace = 'hide';
  $scope.widgetsDisplayed = [];

  // get widgets data from rails model/controller, saved as allWidgets object and display attribute set to false.
  $http.get('widgets.json')
    .success(function(data, status, headers, config) {
      $scope.allWidgets = data;
      angular.forEach($scope.allWidgets, function(w) {
        w.display = false;
      });
      $scope.widgetsOnMarket = $scope.allWidgets;
    })
    .error(function(data, status, headers, config) {
      console.log(status);
    });

  $scope.closeWidget = function(widget) {
    widget.display = false;
    $scope.widgetsOnMarket.push(widget);
    var index = $scope.widgetsDisplayed.indexOf(widget);
    $scope.widgetsDisplayed.splice(index,1);
  };

  $scope.showErrors = function() {
    if (
      $scope.addressMissing.length > 0 ||
      $scope.addressError.length > 0 ||
      $scope.addressMultipleMatches.length > 0 ) {
      return true
    };
  };
}]);

// button to add widgets
dashboardModule.directive('addWidgetButton', function() {
  return {
    restrict: 'E',
    templateUrl: 'add_widget_button.html'
  }
});

// sidepanel with available widgets
dashboardModule.directive('widgetMarketplace', function() {
  return {
    restrict: 'E',
    templateUrl: 'marketplace.html',
    controller: function($scope){

      // add to widgetsDisplayed array and remove from widgetsOnMarket array
      $scope.onWidgetSelect = function(widget) {
        $scope.widgetMarketplace = 'hide';
        widget.display = true;
        $scope.widgetsDisplayed.push(widget);
        var index = $scope.widgetsOnMarket.indexOf(widget);
        $scope.widgetsOnMarket.splice(index,1);
      }
    },
  }
});

// sidepanel with data errors
dashboardModule.directive('errorsFlash', function() {
  return {
    restrict: 'E',
    templateUrl: 'errors_flash.html',
  }
});
