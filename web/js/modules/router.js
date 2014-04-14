define([
	'modules/ds',
	'modules/nav/controllers/NavC',
	'modules/task/controllers/taskC',
	'modules/task/controllers/wishC',
	'modules/user/services/userS',
	'modules/user/controllers/SignC',
	'modules/user/controllers/UpdateC'
], function(ds) {
	ds.config(function ($stateProvider, $urlRouterProvider) {
	 	$urlRouterProvider.otherwise("");
		$stateProvider
			.state('index', {
				url: "",
				views: {
					"mainPanel": {
						templateUrl: 'views/task/task.html',
						controller: 'TaskController'
					}
				}
			})
	});
});