/**
 * Master Controller
 */

angular.module('RDash')
    .controller('SettingCtrl', ['$scope','thingService','$localStorage', SettingCtrl]);

function SettingCtrl($scope, thingService, $localStorage) {
    console.log('settings!');
    $scope.form = {};
    if ($localStorage.currentUser) {
        $scope.form.name = $localStorage.currentUser.info.name;
        $scope.form.userId = $localStorage.currentUser.info.id;
        $scope.form.email = $localStorage.currentUser.info.email;
    }
}
