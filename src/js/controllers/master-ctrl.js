/**
 * Master Controller
 */

angular.module('RDash')
    .controller('MasterCtrl', ['$scope', '$cookieStore', 'authenticationService', '$localStorage', '$http', '$location', '$window', MasterCtrl]);

function MasterCtrl($scope, $cookieStore, authenticationService, $localStorage, $http, $location, $window) {
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
      $scope.username = $localStorage.currentUser.info.name;
    } else{
      $scope.username = 'pipeero';
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
      $scope.isLoginLoading = true;
      authenticationService.login($scope.user)
      .then(function(result) {
        $scope.isLoginLoading = false;
        if (result.success) {
          $localStorage.currentUser = { info : result.data, token: result.token };
          $http.defaults.headers.common['x-access-token'] = result.token;
          $scope.username = $localStorage.currentUser.info.name;
          $location.path('/dashboard');
          $scope.isLoggedIn = true;
        } else {

          $scope.invalidLoginToaster = true;
          $scope.loginAlertMessage = {
            message : result.message
          }
        }
      },
      function(data) {
        console.log(data);
      });
    }

    $scope.doRegister = function(){
      $scope.isRegisterLoading = true;
      authenticationService.signup($scope.user)
      .then(function(result) {
        $scope.isRegisterLoading = false;
        if(result.errors){
          $scope.invalidLoginToaster = true;
          var errMsg= '';
          if(result.errors.password){
            errMsg = 'Invalid Password';
          }else{
            errMsg = 'Email address already taken, or might be invalid.';
          }

          $scope.loginAlertMessage = {
            message : errMsg
          }
        }else{
          var credentials = {
            email : result.email,
            password : result.password
          }

          $scope.isRegisterLoading = false;
          authenticationService.login(credentials)
          .then(function(result) {
            if (result.success) {
              $localStorage.currentUser = { info : result.data, token: result.token };
              $http.defaults.headers.common['x-access-token'] = result.token;
              $location.path('/dashboard');
              $scope.isLoggedIn = true;
              $scope.isLoginLoading = false;
            } else {

              $scope.invalidLoginToaster = true;
              $scope.loginAlertMessage = {
                message : result.message
              }
              $scope.isLoginLoading = false;
            }
          },
          function(data) {
            console.log(data);
          });
        }
      },
      function(data) {
        console.log(data);
        $scope.isRegisterLoading = false;
      });
    }

    $scope.doLogout = function(){
      console.log('logout');
      delete $localStorage.currentUser;
      console.log($localStorage);
      $http.defaults.headers.common['x-access-token'] = '';
      $scope.isLoggedIn = false;
      $location.path('/login');
      $scope.username = 'pipeero';
      $window.location.reload();
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
