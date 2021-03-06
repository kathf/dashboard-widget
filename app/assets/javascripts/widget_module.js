var widgetModule = angular.module('widgetModule', ['templates', 'mapModule', 'dataModule']);


widgetModule.directive('showWidget', function() {
  return {
    restrict: 'E',
    templateUrl: 'show_widget.html'
  }
});

widgetModule.directive('employeeLocationsWidget', [ '$http', 'mapOptions', 'geocodeService', '$timeout', 'dataService', 'mapLayers', function($http, mapOptions, geocodeService, $timeout, dataService, mapLayers ) {

  return {
    restrict: 'E',
    template: "<div class='map-canvas' id='employee-locations-map'></div>",
    controller: function($scope) {

      var empLocationMap = new google.maps.Map(document.getElementById('employee-locations-map'), mapOptions);
      var heatmapData = [];

      var url = 'widgets/' + $scope.widget.id + '.json';
      var response = dataService.getData(url);

      response
      .then(function(data){
        angular.forEach( data, function(entity) {
          geocodeService.geocodeAddresses(entity);
        });
      });

      $timeout(function(){
        angular.forEach(geocodeService.addToMap, function(object) {
          heatmapData.push(object.geometry.location);
          mapLayers.createMarkers(object, empLocationMap);
          mapLayers.createHeatmap(empLocationMap, heatmapData);
        });
        $scope.addressMissing = geocodeService.addressMissing;
        $scope.addressError = geocodeService.addressError;
        $scope.addressMultipleMatches = geocodeService.addressMultipleMatches;
      },2000);
    },
    controllerAs: 'employeeLocationsCtrl',
  }
}]);


widgetModule.directive('salesFlowWidget', ['$http', 'mapOptions', 'geocodeService', '$timeout', 'dataService', 'mapLayers', function( $http, mapOptions, geocodeService, $timeout, dataService, mapLayers ) {

  return {
    restrict: 'E',
    template: "<div class='map-canvas' id='sales-flow-widget'></div>",
    controller: function($scope) {

      var salesFlowMap = new google.maps.Map(document.getElementById('sales-flow-widget'), mapOptions);
      var heatmapData = [];

      url = 'widgets/' + $scope.widget.id + '.json';
      var response = dataService.getData(url);

      response.then(function(data){
        angular.forEach( data, function(entity) {
          geocodeService.geocodeAddresses(entity);
        });
      });

      $timeout(function(){
        angular.forEach(geocodeService.addToMap, function(object) {
          heatmapData.push(object.geometry.location);
          mapLayers.createMarkers(object, salesFlowMap);
          mapLayers.createHeatmap(salesFlowMap, heatmapData);
        });
        $scope.addressMissing = geocodeService.addressMissing;
        $scope.addressError = geocodeService.addressError;
        $scope.addressMultipleMatches = geocodeService.addressMultipleMatches;
      },3000);
    },
    controllerAs: 'salesFlowCtrl',
  }
}]);


widgetModule.directive('otherDemoWidget', function(){
  return {
    restrict: 'E',
    template: "<p class='text-center'> Nothing to see here - I'm just a demo widget </p>",
  };
});
