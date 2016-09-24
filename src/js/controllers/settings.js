/**
 * Master Controller
 */

angular.module('RDash')
    .controller('SettingCtrl', ['$scope','thingService','$localStorage', 'authenticationService', '$window', SettingCtrl]);

function SettingCtrl($scope, thingService, $localStorage, authenticationService, $window) {
    console.log('settings!');
    $scope.form = {};
    if ($localStorage.currentUser) {
        $scope.form.name = $localStorage.currentUser.info.name;
        $scope.form.userId = $localStorage.currentUser.info.id;
        $scope.form.email = $localStorage.currentUser.info.email;
        $scope.form.password = 'as72419xc0592';
        $scope.form.password2 = 'as72419xc0592';
    }

    $scope.updateUser = function(){
      var data = {
        name : $scope.form.name,
        email : $scope.form.email
      };

      if($scope.form.password !== 'as72419xc0592'){
        if($scope.form.password === $scope.form.password2){
          data.password = $scope.form.password;
          authenticationService.updateUserById($localStorage.currentUser.info.id, data)
          .then(function(user) {
            $scope.form.name = user.name;
            $scope.form.email = user.email;

            $localStorage.currentUser.info.name = user.name;
            $localStorage.currentUser.info.email = user.email;

            $window.location.reload();
          },
          function(data) {
          });          
        }
        else{
          $scope.settingsToaster = true;
          $scope.settingsToasterMsg = {
            msg : 'Password did not match.'
          }
        }
      }else{
        authenticationService.updateUserById($localStorage.currentUser.info.id, data)
        .then(function(user) {
          $scope.form.name = user.name;
          $scope.form.email = user.email;

          $localStorage.currentUser.info.name = user.name;
          $localStorage.currentUser.info.email = user.email;

          $window.location.reload();
        },
        function(data) {
        });
      }


    }

    $scope.closeSettingsToaster = function(){
      $scope.settingsToaster = false;
    }
}
