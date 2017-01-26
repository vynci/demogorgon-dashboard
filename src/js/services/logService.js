angular.module('RDash').service('logService', ['$q', '$http', '$window', function($q, $http) {
  var gateway = 'https://pipeero-rest-api.herokuapp.com';
    function getLogByThingId(thingId) {
    var def = $q.defer();

    $http.get(gateway + "/pipe/log/" + thingId)
    .success(function(data) {
        def.resolve(data);
    })
    .error(function() {
        def.reject("Failed to get the ");
    });
    return def.promise;
    }

    return {
      getLogByThingId :getLogByThingId
    };
}]);
