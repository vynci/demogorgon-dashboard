angular.module('RDash').service('authenticationService', ['$q', '$http', '$localStorage', function($q, $http, $localStorage) {
  var gateway = 'https://pipeero-rest-api.herokuapp.com';
    var service = {};

    function login(data) {
      var def = $q.defer();
      $http.post( gateway + '/pipe/authenticate', data )
      .success(function(data) {
        def.resolve(data);
      })
      .error(function() {
        def.reject("Failed to get the ");
      });
      return def.promise;
    }

    function signup(data) {
      var def = $q.defer();
      $http.post( gateway + '/pipe/user', data )
      .success(function(data) {
        def.resolve(data);
      })
      .error(function() {
        def.reject("Failed to get the ");
      });
      return def.promise;
    }

    function updateUserById(userId, data) {
      var def = $q.defer();

      $http.put(gateway + "/pipe/user/" + userId, data)
      .success(function(data) {
        def.resolve(data);
      })
      .error(function() {
        def.reject("Failed to get the ");
      });
      return def.promise;
    }

    getUsers = function(id){
      var def = $q.defer();

      $http.get(gateway + "/pipe/" + 'user')
      .success(function(data) {
        def.resolve(data);
      })
      .error(function() {
        def.reject("Failed to get Widgets");
      });
      return def.promise;
    };

    function Logout() {
      // remove user from local storage and clear http auth header
      delete $localStorage.currentUser;
      $http.defaults.headers.common.Authorization = '';
    }

    service.login = login;
    service.signup = signup;
    service.getUsers = getUsers;
    service.updateUserById = updateUserById;
    service.Logout = Logout;

    return service;
}]);
