require.config({
	baseUrl: '/js',
	paths: {
		'jQuery': 'libs/jquery',
		'angular': 'libs/angular',
		'bootstrap': 'libs/bootstrap/dist/js/bootstrap'
	},
	shim: {
		'angular': {
			exports: 'angular'
		},
		'jQuery': {
			exports: 'jQuery'
		},
		'bootstrap': {
			deps: ['jQuery'],
			exports: 'bootstrap'
		}
	}
});

require([
	'jQuery', 
	'angular', 
	'bootstrap',
	'modules/home/home',
	'modules/home/router',
	'modules/user/user',
	'modules/user/router',
	'modules/task/task',
	'modules/task/router'
] , function($, angular) {
	$(function () {
		angular.bootstrap(document, [
			'home',
			'user',
			'task'
		]);
	});
});