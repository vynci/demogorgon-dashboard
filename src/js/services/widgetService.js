angular.module('RDash').service('widgetService', ['$http', '$q', function($http, $q) {
  var gateway = 'https://pipeero-rest-api.herokuapp.com';

	function getWidgets(userId) {
		var def = $q.defer();
		$http.get(gateway + "/pipe/" + userId + "/widget")
		.success(function(data) {
			def.resolve(data);
		})
		.error(function() {
			def.reject("Failed to get Widgets");
		});
		return def.promise;
	}

	function getWidgetById(userId, widgetId) {
		var def = $q.defer();

		$http.get(gateway + "/pipe/" + userId + "/widget/" + widgetId)
		.success(function(data) {
			def.resolve(data);
		})
		.error(function() {
			def.reject("Failed to get the ");
		});
		return def.promise;
	}

  function getWidgetByThingId(userId, thingId) {
    var def = $q.defer();

    $http.get(gateway + "/pipe/" + userId + "/widgetByThing/" + thingId)
    .success(function(data) {
      def.resolve(data);
    })
    .error(function() {
      def.reject("Failed to get the ");
    });
    return def.promise;
  }


	function updateWidgetById(userId, widgetId, data) {
		var def = $q.defer();

		$http.put(gateway + "/pipe/" + userId + "/widget/" + widgetId, data)
		.success(function(data) {
			def.resolve(data);
		})
		.error(function() {
			def.reject("Failed to get the ");
		});
		return def.promise;
	}

	function deleteWidgetById(userId, widgetId, data) {
		var def = $q.defer();
		console.log('delete widget!');
		$http.delete(gateway +  "/pipe/" + userId + "/widget/" + widgetId)
		.success(function(data) {
			def.resolve(data);
		})
		.error(function() {
			def.reject("Failed to get the ");
		});
		return def.promise;
	}

	function createWidget(userId, data) {
		var def = $q.defer();

		$http.post(gateway +  "/pipe/widget/", data)
		.success(function(data) {
			def.resolve(data);
		})
		.error(function() {
			def.reject("Failed to get the ");
		});
		return def.promise;
	}


	var service = {
		getWidgets: getWidgets,
		updateWidgetById : updateWidgetById,
		createWidget : createWidget,
		deleteWidgetById : deleteWidgetById,
    getWidgetByThingId : getWidgetByThingId
	};

	return service;
}]);
