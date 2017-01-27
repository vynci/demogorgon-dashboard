/**
 * Master Controller
 */
angular.module('RDash')
    .controller('LogCtrl', ['$scope', '$uibModal', 'logService', 'socket', 'lodash', 'widgetService', '$localStorage', '$timeout', '$state', LogCtrl]);

function LogCtrl($scope, $uibModal, logService, socket, lodash, widgetService, $localStorage, $timeout, $state) {
  var userId = '';

  $scope.thingId = $state.params.thingId;
  $scope.data = [];
  $scope.labels = [];

  if ($localStorage.currentUser) {
    userId = $localStorage.currentUser.info.id;
  }

  _getAll();

  function _getAll(socketSubscribe){
    logService.getLogByThingId($scope.thingId)
    .then(function(logs) {
      $scope.logs = logs;
      angular.forEach(logs, function(value, key) {
        console.log(value.value);
        $scope.data.push(value.value)
      });

      angular.forEach(logs, function(value, key) {
        console.log(value.value);
        var x = new Date(value.createDate);
        x = x.toString();
        x = x.split(" ");

        $scope.labels.push(x[4])
      });
    },
    function(data) {

    });
  };

  $scope.formatDate = function(date){
    var output = new Date(date);
    output = output.toString();

    return output;
  }

  $scope.series = ['Series A'];

  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
  $scope.options = {
    scales: {
      yAxes: [
    {
      id: 'y-axis-1',
      type: 'linear',
      display: true,
      position: 'right'
    }
  ]
}
};
}
