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
    },
  }
}]);


widgetModule.directive('salesFlowWidget', [
  '$http',
  'mapOptions',
  'geocoder',
  'addressForGeocoding',
  '$timeout',
  function($http, mapOptions, geocoder, addressForGeocoding, $timeout ) {

  return {
    restrict: 'E',
    template: "<div class='map-canvas' id='sales-flow-widget'></div>",

    controller: function($scope) {
      var map = new google.maps.Map(document.getElementById('sales-flow-widget'), mapOptions);
      var url = 'widgets/' + $scope.widget.id + '.json';
      var heatmapData = [];
      var addressMissing = [];
      var addressError = [];
      var addressMultipleMatches = [];

      $http.get(url).
        success(function(data, status, headers, config) {
          angular.forEach( data, function(entity) {
            var addressString = addressForGeocoding.getAddress(entity);
            if (addressString == "") {
              addressMissing.push(entity);
            } else {
              geocoder.geocode( {address: addressString} , function(results, status) {
                if (status == "OK") {
                  var latlng = results[0].geometry.location;
                  addEntityToMap(latlng);
                } if ( status == "OVER_QUERY_LIMIT" ) {
                  addressMultipleMatches.push(entity);
                } if ( status == "ZERO_RESULTS") {
                  addressError.push(entity);
                };
              });
            }
          });

          $timeout(function() {
            var heatmap = new google.maps.visualization.HeatmapLayer({
              data: heatmapData,
              map: map,
            });
            console.log("heatmap");
          }, 1000);

        }).
        error(function(data, status, headers, config) {
          console.log(status);
        });

      function addEntityToMap(latlng) {
        var marker = new google.maps.Marker({
            map: map,
            position: latlng
        });
        console.log("adding to heatmap");
        heatmapData.push(latlng);
      };
    },
  }
}]);

widgetModule.directive('otherDemoWidget', function(){
  return {
    restrict: 'E',
    template: "<p class='text-center'> Nothing to see here - I'm just a demo widget </p>",
  }
});
