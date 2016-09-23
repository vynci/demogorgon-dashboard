/**
 * Master Controller
 */
angular.module('RDash')
    .controller('ThingCtrl', ['$scope', '$uibModal', 'thingService', 'socket', 'lodash', 'widgetService', '$localStorage', '$timeout', ThingCtrl]);

function ThingCtrl($scope, $uibModal, thingService, socket, lodash, widgetService, $localStorage, $timeout) {
  var userId = '';
  if ($localStorage.currentUser) {
    userId = $localStorage.currentUser.info.id;
  }

  thingService.getThingByUserId(userId)
  .then(function(things) {
    console.log(things);
    $scope.things = things;
  },
  function(data) {

  });
  
  $scope.editThing = function(thing){
    var modalInstance = $uibModal.open({
    animation: false,
    templateUrl: 'templates/thingModal.html',
    controller: 'ThingModalCtrl',
    resolve: {
        items: function () {
            return thing;
        }
    }
    });

    modalInstance.result.then(function (selectedItem) {
    // createWidget(selectedItem);
    }, function () {
    });    
  }
  
  $scope.deleteThing = function(thing){
    console.log(thing);  
  }
  
  $scope.addThing = function(){
    var modalInstance = $uibModal.open({
    animation: false,
    templateUrl: 'templates/thingModal.html',
    controller: 'ThingModalCtrl',
    resolve: {
        items: function () {
        return false;
        }
    }
    });

    modalInstance.result.then(function (selectedItem) {
    // createWidget(selectedItem);
    }, function () {
    });      
  }
}
