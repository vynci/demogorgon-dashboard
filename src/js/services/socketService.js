angular.module('RDash').factory('socket', ['socketFactory', '$window', function(socketFactory) {
	console.log(socketFactory);

	return socketFactory({
		prefix: 'foo~',
		ioSocket: io.connect('https://pipeero-mqtt-ws.herokuapp.com')
	});
}]);
