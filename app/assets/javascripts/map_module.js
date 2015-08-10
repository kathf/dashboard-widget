var mapModule = angular.module('mapModule', []);

mapModule.factory('mapOptions', function() {

  var mapStyles = [
    {"featureType":"road","stylers":[{"visibility":"off"}]},
    {"featureType":"transit","stylers":[{"visibility":"off"}]},
    {"featureType": "administrative", "elementType":"labels",  "stylers": [{"visibility": "off"}]},
    {"featureType": "administrative.land_parcel", "stylers": [{ "visibility": "off"}]},
    {"featureType": "administrative", "elementType": "geometry.fill","stylers": [{ "visibility": "off"}]},
    {"featureType":"administrative.province","stylers":[{"visibility":"off"}]},
    {"featureType":"poi.park","elementType":"geometry","stylers":[{"visibility":"off"}]},
    {"featureType":"water","stylers":[{"color":"#004b76"}]},
    {"featureType":"landscape.natural","stylers":[{"visibility":"on"},{"color":"#fff6cb"}]},
    {"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#7f7d7a"},{"lightness":10},{"weight":1}]}
    ]

  var mapOptions = {
    center: new google.maps.LatLng(39, 155),
    zoom: 1,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    minZoom: 1,
    mapTypeControl: false,
    streetViewControl: false,
    panControl: false,
    zoomControl: false,
    scaleControl: false,
    styles: mapStyles
  };
  return mapOptions;
});

mapModule.service('geocoder', function() {
  return geocoder = new google.maps.Geocoder();
});


mapModule.service('addressForGeocoding', function() {

  this.getAddress = function(entity) {
    var addressString;
    if ( angular.isString(entity) ) {
      addressString = entity.address;
    } else {
      addressString = addressEnumerableToString(entity.address);
    }
    return addressString;
  };

  function addressEnumerableToString(addressEnumerable) {
    var addressString = "";
    angular.forEach(addressEnumerable, function(value, key) {
      if ( value != "-" ) {
        addressString += value + " ";
      }
    });
    return addressString;
  };
});



//
//   this.geocodeHashAddress = function(data) {
//     console.log(data);
//     var addressHash = data.address;
//     var addressString = "";
//
//     angular.forEach(addressHash, function(value, key) {
//       if ( value != "-" ) {
//         addressString = addressString + value;
//       }
//     });
//
//     return addressString;
//   });
//
//   this.geocodeHashString = function(data) {
//
//     return addressString;
//   });
//
//
//   geocoder.geocode( {address: addressString} , function(results, status) {
//     console.log(status);
//     if (status == google.maps.GeocoderStatus.OK) {
//       var latlng = results[0].geometry.location;
//       var marker = new google.maps.Marker({
//           map: map,
//           position: latlng
//       });
//       heatmapData.push(latlng);
//     }
//     if ( status == google.maps.GeocoderStatus.ZERORESULTS ) {
//       console.log("zero results");
//     }
//   });
//   return
// };







// var heatmap = new google.maps.visualization.HeatmapLayer({
//   data: heatmapData,
//   map: map,
// });


//
//
//
//
//
// widgetModule.service('geocodeFunction', ['geocoder', function(geocoder) {
//     var addressHash = this.address;
//     var addressString = "";
//     var heatmapData = [];
//
//     angular.forEach(addressHash, function(value, key) {
//       if ( value != "-" ) {
//         addressString = addressString + value;
//       }
//     });
//
//     this.geocoder = function
//       geocode( {address: addressString} , function(results, status) {
//       console.log(status);
//       if (status == google.maps.GeocoderStatus.OK) {
//         var latlng = results[0].geometry.location;
//         var marker = new google.maps.Marker({
//             map: map,
//             position: latlng
//         });
//         heatmapData.push(latlng);
//       }
//       if ( status == google.maps.GeocoderStatus.ZERORESULTS ) {
//         console.log("zero results");
//       }
//     });
//
//     var heatmap = new google.maps.visualization.HeatmapLayer({
//       data: heatmapData,
//       map: map,
//     });
// }]);
