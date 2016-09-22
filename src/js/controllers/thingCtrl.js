/**
 * Master Controller
 */
angular.module('RDash')
    .controller('ThingCtrl', ['$scope', '$uibModal', 'thingService', 'socket', 'lodash', 'widgetService', '$localStorage', '$timeout', ThingCtrl]);

function ThingCtrl($scope, $uibModal, thingService, socket, lodash, widgetService, $localStorage, $timeout) {
  console.log('thing!');
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

}
