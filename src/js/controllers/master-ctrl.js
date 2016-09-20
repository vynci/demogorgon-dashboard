/**
 * Master Controller
 */

angular.module('RDash')
    .controller('MasterCtrl', ['$scope', '$cookieStore', 'authenticationService', '$localStorage', '$http', '$location', MasterCtrl]);

function MasterCtrl($scope, $cookieStore, authenticationService, $localStorage, $http, $location) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;

    $scope.user = {
      email: '',
      password: ''
    }

    $scope.isLoggedIn = false;
    if ($localStorage.currentUser) {
      $scope.isLoggedIn = true;
    }

    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.doLogin = function(){
      $scope.isLoading = true;
      authenticationService.login($scope.user)
      .then(function(result) {
        if (result.success) {
          $localStorage.currentUser = { info : result.data, token: result.token };
          $http.defaults.headers.common['x-access-token'] = result.token;
          $location.path('/dashboard');
          $scope.isLoggedIn = true;
          $scope.isLoading = false;
        } else {

          $scope.invalidLoginToaster = true;
          $scope.loginAlertMessage = {
            message : result.message
          }
          $scope.isLoading = false;
        }
      },
      function(data) {
        console.log(data);
      });
    }
    $scope.doLogout = function(){
      console.log('logout');
      delete $localStorage.currentUser;
      console.log($localStorage);
      $http.defaults.headers.common['x-access-token'] = '';
      $scope.isLoggedIn = false;
      $location.path('/login');
    }

    $scope.closeLoginAlert = function(){
      $scope.invalidLoginToaster = false;
    }

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function() {
        $scope.$apply();
    };
}
