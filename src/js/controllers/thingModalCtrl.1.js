/**
 * Master Controller
 */

angular.module('RDash')
    .controller('ThingModalCtrl', ['$scope', '$uibModalInstance', 'items','thingService','$localStorage', ThingModalCtrl]);

function ThingModalCtrl($scope, $uibModalInstance, items, thingService, $localStorage) {
  console.log(items);
  
  if(items){
    $scope.form = {
      id : items._id,
      name : items.name
    };
  } else {
    $scope.form = {};
  }
  
  $scope.dismiss = function () {
    $uibModalInstance.dismiss('cancel');
  };
}
