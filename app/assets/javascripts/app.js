(function(){
  var app = angular.module('myApp',['templates','ngRoute']);

  // app.config([ '$routeProvider', function($routeProvider) {
  //   $routeProvider
  //     .when("",
  //       {
  //         templateUrl: "index.html",
  //         controller: "DashboardCtrl"
  //       }
  //     );
  //     .when("/")
  // }]);

  app.controller('DashboardCtrl', [ '$scope', '$http', function($scope, $http) {
    console.log("inside dashboard controller");

    $(".gridster").gridster({
        widget_selector: "div.panel",
        widget_margins: [10, 10],
        widget_base_dimensions: [350, 300],
        autogenerate_stylesheet: true,
        draggable: {
          handle: "h4"
        }
    });

    $http.get('widgets.json').
      success(function(data, status, headers, config) {
        $scope.allWidgets = data;
      }).
      error(function(data, status, headers, config) {
        console.log(status);
      });
  }]);

  app.controller('WidgetCtrl', function(){
    console.log("inside widget controller");
  });


  // app.controller('MapController', [ '$http', '$scope', function($http, $scope) {
  //
  // var apiURL = Rails.application.secrets.API_url;
  // console.log(apiURL);

  // $scope.employees = [ ];
  // var employee_array = [ ];
  //
  // //call api and build sorted movie array to display on page
  // $http({ method: 'GET', url: apiURL })
  //     .success(function(data) {
  //
  //         for(var i = 0; i < data.results.length; i++) {
  //             var movieObj = {
  //                 title: '',
  //                 poster: '',
  //                 release_date: ''
  //             };
  //
  //             //assign title
  //             movieObj.title = data.results[i].title;
  //
  //             //assign poster image
  //             //no image available for the movie so we use a default image
  //             if (data.results[i].poster_path == null) {
  //                 movieObj.poster = "/assets/no-image.png";
  //             }
  //             else {
  //                 movieObj.poster = poster_directory + data.results[i].poster_path;
  //             }
  //
  //             //assign release date
  //             movieObj.release_date = data.results[i].release_date;
  //
  //             //call youtub api search function here
  //             search();
  //
  //             sorted_movie_array.push(movieObj);
  //         }
  //
  //          //sort by newest date
  //         sorted_movie_array.sort(function(a, b){
  //                 var dateA = new Date(a.release_date);
  //                 var dateB = new Date(b.release_date);
  //                 return dateA - dateB;
  //         });
  //
  //         $scope.movies = sorted_movie_array;
  //
  //     })
  //     .error(function(data, status) {
  //         console.log(status);
  //     });
  // youtube api code
  //
  // function search() {
  //     console.log("inside search function");
  //     onClientLoad();
  //     var query = "john wick trailer";
  //     // Use the JavaScript client library to create a search.list() API call.
  //     var request = gapi.client.youtube.search.list({
  //         part: 'snippet',
  //         q: query
  //     });
  //     // Send the request to the API server,
  //     // and invoke onSearchRepsonse() with the response.
  //     request.execute(onSearchResponse);
  // }
  //
  // // Called automatically with the response of the YouTube API request.
  // function onSearchResponse(response) {
  //     showResponse(response);
  // }
  //
  // // Helper function to display JavaScript value on HTML page.
  // function showResponse(response) {
  //     var yData = response;
  //     var imageURL, title, link;
  //
  //     for (var i = 0; i < yData.items.length; i++) {
  //         imageURL = yData.items[i].snippet.thumbnails.default.url;
  //         title = yData.items[i].snippet.title;
  //         link = yData.items[i].id.videoId;
  //         console.log(link);
  //         //$('#images').append('<li><img src=' + imageURL + '><p><a href="http://www.youtube.com/watch?v=' + link + '">' + title + '</a></p></li>');
  //     }
  // }





  // app.directive('map', function(){
  //   return {
  //     restrict: 'A',
  //
  //     template: "<div id='map-canvas'></div>",
  //
  //     controller: function() {
  //       var mapOptions;
  //       var map;
  //       function initialize() {
  //         mapOptions = {
  //           zoom: 8,
  //           center: new google.maps.LatLng(-34.397, 150.644)
  //         };
  //         map = new google.maps.Map(document.getElementById('map-canvas'),
  //           mapOptions);
  //       };
  //       initialize();
  //     },
  //     // controllerAs: 'WidgetCtrl'
  //   }
  // });



  //
  // app.controller('WidgetCtrl',['$scope','$http', function($scope, $http) {
  //   var mapOptions;
  //   var map;
  //   function initialize() {
  //     mapOptions = {
  //       zoom: 8,
  //       center: new google.maps.LatLng(-34.397, 150.644)
  //     };
  //     map = new google.maps.Map(document.getElementById('map-canvas'),
  //       mapOptions);
  //   };
  //   initialize();
  // }]);

  // app.controller('WidgetController',['$scope','$http','$sce',function($scope, $http, $sce) {
  //    var url = 'Rails.application.secrets.API_url';
  //    $http.jsonp(url).success(function(data) {
  //     console.log(data);
  //     //  $scope.event = data;
  //     //   $scope.Area = {
  //     //               Name: "Melbourne",
  //     //               Latitude: data.event.latitude,
  //     //               Longitude: data.event.longitude
  //     //              };
  //     // $scope.latitude = data.event.latitude;
  //     // $scope.longitude = data.event.longitude;
  //   });
  //
  // }]);

})();
