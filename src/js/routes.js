'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider) {
        // For unmatched routes
        $urlRouterProvider.otherwise('/dashboard');

        // Application routes
        $stateProvider
            .state('index', {
                url: '/dashboard',
                templateUrl: 'templates/dashboard.html',
                controller: 'DashboardCtrl'
            })
            .state('discover', {
              url: '/discover',
              templateUrl: 'templates/discover.html',
            })
            .state('about', {
              url: '/about',
              templateUrl: 'templates/about.html',
            })
            .state('support', {
              url: '/support',
              templateUrl: 'templates/support.html',
            })
            .state('things', {
                url: '/things',
                templateUrl: 'templates/things.html',
                controller: 'ThingCtrl'
            })
            .state('thingsData', {
              url: '/things/:thingId',
              templateUrl: 'templates/thingsData.html',
              controller: 'LogCtrl'
            })
            .state('settings', {
                url: '/settings',
                templateUrl: 'templates/settings.html',
                controller: 'SettingCtrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html'
            });
    }
]).run(['$rootScope', '$http', '$location', '$localStorage', function($rootScope, $http, $location, $localStorage){
  console.log('run');
  if ($localStorage.currentUser) {
    $http.defaults.headers.common['x-access-token'] = $localStorage.currentUser.token;
  }

  // redirect to login page if not logged in and trying to access a restricted page
  $rootScope.$on('$locationChangeStart', function (event, next, current) {
    var publicPages = ['/login', '/about', '/support', '/discover'];
    var restrictedPage = publicPages.indexOf($location.path()) === -1;
    if (restrictedPage && !$localStorage.currentUser) {
      $location.path('/login');
    }
  });
}]);
