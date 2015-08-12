var dataModule = angular.module('dataModule', []);

// requests data from API
dataModule.service('dataService', ['$http', '$q', function($http, $q) {
  this.getData = function(url) {
    var request = $http.get(url)
    return( request.then( handleSuccess, handleError ) );
  };

  function handleSuccess( response ) {
    return( response.data );
  };

  function handleError( response ) {
    if ( ! angular.isObject( response.data ) || ! response.data.message ) {
      return( $q.reject( "An unknown error occurred." ) );
    }
    return( $q.reject( response.data.message ) );
  };
}]);


// check if address is a string, if not convert from enumerable to string
dataModule.service('addressToString', function() {

  this.getAddress = function(entity) {
    if ( angular.isString(entity.address) ) {
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

// geocode address string and add returned location to "addToMap" array.
dataModule.service('geocodeService', [ 'addressToString', function(addressToString) {

  var addressMissing = [];
  var addToMap = [];
  var addressError = [];
  var addressMultipleMatches = [];

  var geocoder = new google.maps.Geocoder();

  this.geocodeAddresses = function(entity) {
    var addressString = addressToString.getAddress(entity);
    if (addressString == "") {
      addressMissing.push(entity);
      entity.addressStatus = 'missing';
    } else {
      geocoder.geocode( {address: addressString} , function(results, status) {
        if (status == "OK") {
          var object = results[0];
          addToMap.push(object);
        }
        if ( status == "OVER_QUERY_LIMIT" ) {
          addressMultipleMatches.push(entity);
        } if ( status == "ZERO_RESULTS") {
          addressError.push(entity);
        };
      });
    }
  };
  this.addToMap = addToMap;
  this.addressMissing = addressMissing;
  this.addressError = addressError;
  this.addressMultipleMatches = addressMultipleMatches;
}]);
