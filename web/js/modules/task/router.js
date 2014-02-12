define([
	'modules/task/task', 
	'modules/task/controllers/taskC',
], function(task) {
	task.config(function ($stateProvider, $urlRouterProvider) {
	 	$urlRouterProvider.otherwise("/");
		$stateProvider
			.state('index', {
				url: "/",
				views: {
					"mainPanel" : {
						templateUrl: 'views/task/task.html',
						controller: 'TaskController'
					}
				}
			});
	});
});