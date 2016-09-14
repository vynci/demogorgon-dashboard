/**
 * Master Controller
 */

angular.module('RDash')
    .controller('ThingModalCtrl', ['$scope', '$uibModalInstance', 'items','thingService', ThingModalCtrl]);

function ThingModalCtrl($scope, $uibModalInstance, items, thingService) {

  console.log(thingService);
  var modalUserId = '57d6d72d7ee52c0300f3e8c6';

  if(typeof items !== 'object'){
    $scope.showDeleteButton = true;
    console.log('hey');
  }


  $scope.data = {
    availableOptions: [
      {id: '1', name: 'Input'},
      {id: '2', name: 'Output'},
      {id: '3', name: 'Graph'}
    ],
    selectedOption: {id: '2', name: 'Output'} //This sets the default value of the select in the ui
  };

  if(items){
    $scope.form = {
      id : items._id,
      name : items.name,
      description : items.description,
      thingId : items.thingId,
      buttonLabel : items.buttonLabel,
      payload : items.payload,
      thingType : items.thingType
    };
  } else {
    $scope.form = {};
  }

  angular.forEach($scope.data.availableOptions, function(option){
    if(option.name === items.thingType){
      $scope.data.selectedOption = option;
    }
  });

  $scope.generateThing = function(){
    var data = {
      name: 'default',
      owner: modalUserId,
      value: 'default'
    }

    thingService.createThing(data).then(function(thing) {
      console.log(thing);
      $scope.form.thingId = thing._id;
    },
    function(data) {
      console.log('error');
    });
  }

  $scope.remove = function () {
    $uibModalInstance.close($scope.form);
    $scope.form.delete = true;
  };

  $scope.save = function () {
    console.log($scope.data.selectedOption.name);
    $scope.form.thingType = $scope.data.selectedOption.name;
    $uibModalInstance.close($scope.form);
    $scope.form.delete = false;
  };

  $scope.dismiss = function () {
    $uibModalInstance.dismiss('cancel');
  };
}
