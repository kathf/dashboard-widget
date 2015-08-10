var widgetModule = angular.module('widgetModule', ['templates', 'mapModule']);


widgetModule.directive('showWidget', function() {
  return {
    restrict: 'E',
    templateUrl: 'show_widget.html'
  }
});


widgetModule.directive('employeeLocationsWidget', [ '$http', 'mapOptions', 'geocoder', function($http, mapOptions, geocoder) {
  return {
    restrict: 'E',
    template: "<div class='map-canvas' id='employee-locations-map'></div>",
    controller: function($scope) {

      var map = new google.maps.Map(document.getElementById('employee-locations-map'), mapOptions);

      var url = 'widgets/' + $scope.widget.id + '.json';

      $http.get(url).
        success(function(data, status, headers, config) {
          $.each( data, function() {
            geocodeFunction(this);
          });

        }).
        error(function(data, status, headers, config) {
          console.log(status);
        });

      var heatmapData = [];

      function geocodeFunction(data) {
        var addressString = data.address;

        geocoder.geocode( {address: addressString} , function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            var latlng = results[0].geometry.location;
            var marker = new google.maps.Marker({
                map: map,
                position: latlng
            });
            heatmapData.push(latlng);
          };
        });
      };

      var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        map: map,
      });

      console.log(heatmap);

    },
  }
}]);


widgetModule.directive('salesFlowWidget', [ '$http', 'mapOptions', 'geocoder', function($http, mapOptions, geocoder) {
  return {
    restrict: 'E',
    template: "<div class='map-canvas' id='sales-flow-widget'></div>",
    controller: function($scope) {

      var map = new google.maps.Map(document.getElementById('sales-flow-widget'), mapOptions);

      var url = 'widgets/' + $scope.widget.id + '.json';

      $http.get(url).
        success(function(data, status, headers, config) {
          $.each( data, function() {
            geocodeFunction(this);
          });

        }).
        error(function(data, status, headers, config) {
          console.log(status);
        });

      var heatmapData = [];

      function geocodeFunction(data) {
        var addressString = data.address;

        geocoder.geocode( {address: addressString} , function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            var latlng = results[0].geometry.location;
            var marker = new google.maps.Marker({
                map: map,
                position: latlng
            });
            heatmapData.push(latlng);
          };
        });
      };

      var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        map: map,
      });

      console.log(heatmap);

    },
  }
}]);


widgetModule.directive('otherDemoWidget', function(){
  return {
    restrict: 'E',
    template: "<p class='text-center'> Nothing to see here - I'm just a demo widget </p>",
  }
})
