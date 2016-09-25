/**
 * Master Controller
 */
angular.module('RDash')
    .controller('DashboardCtrl', ['$scope', '$cookieStore', '$uibModal', 'thingService', 'socket', 'lodash', 'widgetService', '$localStorage', '$timeout', DashboardCtrl]);

function DashboardCtrl($scope, $cookieStore, $uibModal, thingService, socket, lodash, widgetService, $localStorage, $timeout) {

    console.log('dashboard!');

    var ownerId = '';
    var userId = '';

    if ($localStorage.currentUser) {
      userId = $localStorage.currentUser.info.id;
    }

    $scope.size = 120;
    $scope.progress = 0.50;
    $scope.strokeWidth = 20;
    $scope.stroke = '#1abc9c';
    $scope.background="lightgrey"
    $scope.counterClockwise = '';

    $scope.roundProgressData = {
      label: 80,
      percentage: 0.11
    }
    // Here I synchronize the value of label and percentage in order to have a nice demo
    // $scope.$watch('roundProgressData', function (newValue, oldValue) {
    //   newValue.percentage = newValue.label / 100;
    // }, true);

    $scope.$on('$locationChangeStart', function(next, current) {
      console.log('next');
      // socket.disconnect();
    });

    $scope.alertShow = false;

    $scope.closeAlert = function(){
      $scope.alertShow = false;
    }

    function socketInit(){
      console.log('socket init!');
      socket.on('connect', function(){
        console.log('socket connect');
        // _getAll(true);
      });

      socket.on('server-to-client', function(data){
        var thingId = data.topic;
        thingId = thingId.split('/');
        thingId = thingId[2];

        var x = lodash.findIndex($scope.standardItems, function(o) {
          return o.thingId === thingId;
        });

        $scope.standardItems[x].inputValue = data.payload;

      });
    }

    function _getAll(socketSubscribe){
      widgetService.getWidgets(userId)
      .then(function(widgets) {
        $scope.standardItems = widgets;
        if(socketSubscribe){
          lodash.forEach(widgets, function(value, key) {
            socket.emit('subscribe',{topic:'sub/' + userId + '/' + value.thingId});
          });
        }
      },
      function(data) {

      });

      socketInit();
    };

    _getAll(true);

    $scope.gridsterOpts = {
      floating: false,
      resizable: {
        enabled: true,
        handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
        start: function(event, $element, widget) {}, // optional callback fired when resize is started,
        resize: function(event, $element, widget) {}, // optional callback fired when item is resized,
        stop: function(event, $element, widget) {
          console.log(widget);
          $scope.saveWidgets();
        } // optional callback fired when item is finished resizing
      },
      draggable: {
        enabled: true, // whether dragging items is supported
        handle: '.my-class', // optional selector for resize handle
        start: function(event, $element, widget) {}, // optional callback fired when drag is started,
        drag: function(event, $element, widget) {}, // optional callback fired when item is moved,
        stop: function(event, $element, widget) {
          console.log(widget);
          $scope.saveWidgets();
        } // optional callback fired when item is finished dragging
      }
    };

    $scope.customItemMap = {
      sizeX: 'item.widgetInfo.sizeX',
      sizeY: 'item.widgetInfo.sizeY',
      row: 'item.widgetInfo.row',
      col: 'item.widgetInfo.col',
      minSizeY: 'item.minSizeY',
      maxSizeY: 'item.maxSizeY'
    };

    $scope.standardItems2 = [
      {
        attributes:{
          name: 'box1',
          widgetInfo: {sizeX: 6, sizeY: 1, row: 0, col: 0}
        }

      },
      {
        attributes:{
          name: 'box2',
          widgetInfo: {sizeX: 2, sizeY: 2, row: 0, col: 2}
        }
      }
    ];

    $scope.executeButton = function(data){
      console.log(data);
      socket.emit('publish',{topic:'pub/' + userId + '/' + data.thingId, payload:data.payload});
    }

    $scope.saveWidgets = function(){
      angular.forEach($scope.standardItems, function(value, key) {
        console.log('save widgets');
        var widget = {
          widgetInfo : value.widgetInfo
        }
        widgetService.updateWidgetById(userId, value._id, widget)
        .then(function(widgets) {

        },
        function(data) {
        });
      });
      $scope.alertShow = true;
      $scope.alertMessage = {
        message : 'Successfully Saved!',
        type: 'success'
      }

      $timeout(function() {
        $scope.alertShow = false;
      }, 2000);
    }

    $scope.addThing = function (size) {
      var modalInstance = $uibModal.open({
        animation: false,
        templateUrl: 'templates/widgetModal.html',
        controller: 'WidgetModalCtrl',
        resolve: {
          items: function () {
            return false;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        createWidget(selectedItem);
      }, function () {
      });
    };

    $scope.openSettings = function(data){
      console.log(data);
      var modalInstance = $uibModal.open({
        animation: false,
        templateUrl: 'templates/widgetModal.html',
        controller: 'WidgetModalCtrl',
        resolve: {
          items: function () {
            return data;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        updateWidget(selectedItem);
      }, function () {
      });
    }

    function createWidget(data){

      var defaultWidget = {
        "sizeX":1,
        "sizeY":1
      }

      data.owner = userId;
      data.widgetInfo = defaultWidget;


      widgetService.createWidget(userId, data)
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

    function updateWidget(data){
      if(data.delete){
        console.log('delete!');
        console.log(data);
        widgetService.deleteWidgetById(userId, data.id, data).then(function(widgets) {
          _getAll();
        },
        function(data) {
          console.log('error');
        });
      } else {
        console.log(data);
        var id = data.id
        delete data.id;

        widgetService.updateWidgetById(userId, id, data)
        .then(function(widgets) {
          _getAll();
        },
        function(data) {
        });
      }
    }

}
