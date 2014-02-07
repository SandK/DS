require.config({
	baseUrl: '/js',
	paths: {
		'jQuery': 'libs/jquery/jquery',
		'angular': 'libs/angular/angular',
		'bootstrap': 'libs/bootstrap/dist/js/bootstrap',
		'angular-route': 'libs/angular-route/angular-route'
	},
	shim: {
		'angular': {
			exports: 'angular'
		},
		'angular-route': {
			deps: ['angular'],
			exports: 'angular-route'
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
	'angular-route',
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