angular.module('RDash').service('thingService', ['$q', '$http', '$window', function($q, $http) {
  var gateway = 'https://pipeero-rest-api.herokuapp.com';
    function getThingByUserId(userId) {
    var def = $q.defer();

    $http.get(gateway + "/pipe/" + userId + "/thing/")
    .success(function(data) {
        def.resolve(data);
    })
    .error(function() {
        def.reject("Failed to get the ");
    });
    return def.promise;
    }

    function createThing(data) {
        var def = $q.defer();

        $http.post( gateway + "/pipe/thing/", data )
        .success(function(data) {
            def.resolve(data);
        })
        .error(function() {
            def.reject("Failed to get the ");
        });
        return def.promise;
    }

	function updateThingById(userId, thingId, data) {
		var def = $q.defer();

		$http.put(gateway + "/pipe/" + userId + "/thing/" + thingId, data)
		.success(function(data) {
			def.resolve(data);
		})
		.error(function() {
			def.reject("Failed to get the ");
		});
		return def.promise;
	}

	function deleteThingById(userId, thingId, data) {
		var def = $q.defer();
		console.log('delete thing!');
		$http.delete(gateway +  "/pipe/" + userId + "/thing/" + thingId)
		.success(function(data) {
			def.resolve(data);
		})
		.error(function() {
			def.reject("Failed to get the ");
		});
		return def.promise;
	}


    return {
      getThingByUserId :getThingByUserId,
      createThing : createThing,
      updateThingById : updateThingById,
      deleteThingById : deleteThingById
    };
}]);
