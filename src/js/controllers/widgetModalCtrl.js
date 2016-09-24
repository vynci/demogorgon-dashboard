/**
 * Master Controller
 */

angular.module('RDash')
    .controller('WidgetModalCtrl', ['$scope', '$uibModalInstance', 'items','thingService','$localStorage', WidgetModalCtrl]);

function WidgetModalCtrl($scope, $uibModalInstance, items, thingService, $localStorage) {

  var modalUserId = $localStorage.currentUser.info.id;

  thingService.getThingByUserId(modalUserId)
  .then(function(things) {
    console.log(things);
    $scope.things = things;
  },
  function(data) {

  });

  if(typeof items !== 'object'){
    $scope.showDeleteButton = true;
    console.log('hey');
  }


  $scope.data = {
    availableOptions: [
      {id: '1', name: 'Input'},
      {id: '2', name: 'Output'}
    ],
    selectedOption: {id: '1', name: 'Input'} //This sets the default value of the select in the ui
  };

  $scope.ngModelOptionsSelected = function(value) {
    if (arguments.length) {
      _selected = value;
    } else {
      return _selected;
    }
  };


  if(items){
    $scope.form = {
      id : items._id,
      name : items.name,
      description : items.description,
      thingId : items.thingId,
      buttonLabel : items.buttonLabel,
      payload : items.payload,
      thingType : items.thingType,
      inputUnit : items.inputUnit
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
    console.log($scope.form);
    if($scope.form.name){
      $scope.form.thingType = $scope.data.selectedOption.name;
      $uibModalInstance.close($scope.form);
      $scope.form.delete = false;
    }

  };

  $scope.dismiss = function () {
    $uibModalInstance.dismiss('cancel');
  };
}
