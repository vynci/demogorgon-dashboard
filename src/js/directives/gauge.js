angular
.module('RDash')
.directive('justGage', ['$timeout', justGage]);

function justGage($timeout) {
	return {
		restrict: 'EA',
		scope: {
			id: '@',
			class: '@',
			min: '=',
			max: '=',
			title: '@',
			value: '=',
			options: '='
		},
		template: '<div id="{{id}}-justgage" class="{{class}}"></div>',
		link: function (scope, element, attrs) {
			$timeout(function () {
				var options = {
					id: scope.id + '-justgage',
					min: scope.min,
					max: scope.max,
					title: scope.title,
					value: scope.value
				}
				if (scope.options) {
					for (var key in scope.options) {
						options[key] = scope.options[key];
					}
				}
				var graph = new JustGage(options);

				scope.$watch('max', function (updatedMax) {
					if (updatedMax !== undefined) {
						graph.refresh(scope.value, updatedMax);
					}
				}, true);

				scope.$watch('value', function (updatedValue) {
					if (updatedValue !== undefined) {
						graph.refresh(updatedValue);
					}
				}, true);
			}, 1000);
		}
	};
};
