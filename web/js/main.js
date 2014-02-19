require.config({
	baseUrl: '/js',
	paths: {
		'jQuery': 'libs/jquery/jquery',
		'angular': 'libs/angular/angular',
		'bootstrap': 'libs/bootstrap/dist/js/bootstrap',
		'angular-resource': 'libs/angular-resource/angular-resource',
		'angular-route': 'libs/angular-route/angular-route',
		'angular-ui-route': 'vendors/angular-ui-route/angular-ui-route'
	},
	shim: {
		'angular': {
			exports: 'angular'
		},
		'angular-resource': {
			deps: ['angular'],
			exports: 'angular-resource'
		},
		'angular-route': {
			deps: ['angular'],
			exports: 'angular-route'
		},
		'angular-ui-route': {
			deps: ['angular'],
			exports: 'angular-ui-route'
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
	'angular-resource',
	'angular-ui-route',
	'bootstrap',
	'modules/ds',
	'modules/router'
] , function($, angular) {
	$(function () {
		angular.bootstrap(document, ['ds']);
	});
});