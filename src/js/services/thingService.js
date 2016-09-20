angular.module('RDash').service('thingService', ['$q', '$http', '$window', function($q, $http) {
  var gateway = 'https://pipeero-rest-api.herokuapp.com';
	var getThings = function(id){
		var defer = $q.defer();
		var Thing = Parse.Object.extend("Thing");
		var query = new Parse.Query(Thing);

		query.find({
			success: function(results) {
				defer.resolve(results);
			},
			error: function(error) {
				defer.reject(error);
				alert("Error: " + error.code + " " + error.message);
			}
		});
		return defer.promise;
	};

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


	return {
		getThings: getThings,
		createThing : createThing
	};
}]);
