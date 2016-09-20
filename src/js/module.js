Parse.initialize("pipeeroAppId", "pipeeroJavascriptKey");
Parse.serverURL = 'http://localhost:1337/parse';

angular.module('RDash', ['ui.bootstrap', 'ui.router', 'ngCookies', 'gridster', 'ui.bootstrap.modal', 'btford.socket-io', 'ngLodash', 'angular-progress-arc', 'angular.directives-round-progress', 'ngStorage']);
