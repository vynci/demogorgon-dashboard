/**
 * Master Controller
 */
angular.module('RDash')
    .controller('LogCtrl', ['$scope', '$uibModal', 'logService', 'socket', 'lodash', 'widgetService', '$localStorage', '$timeout', '$state', LogCtrl]);

function LogCtrl($scope, $uibModal, logService, socket, lodash, widgetService, $localStorage, $timeout, $state) {
  var userId = '';

  $scope.thingId = $state.params.thingId;

  if ($localStorage.currentUser) {
    userId = $localStorage.currentUser.info.id;
  }

  _getAll();

  function _getAll(socketSubscribe){
    logService.getLogByThingId($scope.thingId)
    .then(function(logs) {
      $scope.logs = logs;
    },
    function(data) {

    });
  };

  $scope.formatDate = function(date){
    var output = new Date(date);
    output = output.toString();

    return output;
  }
}
