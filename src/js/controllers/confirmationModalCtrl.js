/**
 * Master Controller
 */

angular.module('RDash')
    .controller('ConfirmationModalCtrl', ['$scope', '$uibModalInstance', 'items','thingService','$localStorage', ConfirmationModalCtrl]);

function ConfirmationModalCtrl($scope, $uibModalInstance, items, thingService, $localStorage) {
  console.log(items);

  $scope.warningMessage = items;

  $scope.delete = function () {
    $uibModalInstance.close({confirmation : true});
  };

  $scope.dismiss = function () {
    $uibModalInstance.dismiss('cancel');
  };
}
