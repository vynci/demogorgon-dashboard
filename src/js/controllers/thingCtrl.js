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

  _getAll();

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
      updateThing(selectedItem);
      console.log(selectedItem)
    }, function () {
    });
  }

  $scope.deleteThing = function(thing){
    widgetService.getWidgetByThingId(userId, thing._id)
    .then(function(widgets) {

      var isWarning = false;
      var data = {
        id : thing._id,
        delete : true
      }
      if(widgets.length > 0){
        isWarning = true;
      }

      var modalInstance = $uibModal.open({
        animation: false,
        templateUrl: 'templates/confirmationModal.html',
        controller: 'ConfirmationModalCtrl',
        resolve: {
          items: function () {
            return isWarning;
          }
        }
      });

      modalInstance.result.then(function (result) {
        if(result.confirmation){
          updateThing(data);
        }
      }, function () {
      });

    },
    function(data) {

    });
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
      createThing(selectedItem);
    }, function () {
    });
  }

  function createThing(data){
    delete data.delete;
    console.log(data);
    data.owner = userId;
    thingService.createThing(data)
    .then(function(widgets) {
      $scope.alertMessage = {
        message : 'Successfully Added a Widget',
        type: 'success'
      }
      _getAll();
    },
    function(data) {
    });

  }

  function updateThing(data){
    if(data.delete){
      console.log('delete!');
      console.log(data);
      thingService.deleteThingById(userId, data.id, data).then(function(widgets) {
        _getAll();
      },
      function(data) {
        console.log('error');
      });
    } else {
      console.log(data);
      var id = data.id
      delete data.id;

      thingService.updateThingById(userId, id, data)
      .then(function(widgets) {
        _getAll();
      },
      function(data) {
      });
    }
  }

  function _getAll(socketSubscribe){
    thingService.getThingByUserId(userId)
    .then(function(things) {
      console.log(things);
      $scope.things = things;
    },
    function(data) {

    });
  };
}
