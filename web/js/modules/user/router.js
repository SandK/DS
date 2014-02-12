define([
	'modules/user/user', 
	'modules/user/controllers/LoginC',
	'modules/user/controllers/RegiestC',
	'modules/user/controllers/LoginSuccessC',
	'modules/user/controllers/updateC'
], function(user) {
	user.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('showLogin', {
				url: "/showLogin",
		        views: {
					"signDialog" : {
						templateUrl: 'views/user/login.html',
						controller: 'LoginController'
					}
			  	}
			})
			.state('showRegiest', {
				url: "/showRegiest",
		        views: {
					"signDialog" : {
						templateUrl: 'views/user/regiest.html',
						controller: 'RegiestController'
					}
			  	}
			})
		    .state('loginSuccess', {
		        url: "/loginSuccess",
		        views: {
					"mainPanel" : {
						templateUrl: 'views/user/loginSuccess.html',
						controller: 'LoginSuccessController'
					}
			  	}
		    })
		    .state('updateUser', {
				url: "/user/updateUser",
				views: {
					"mainPanel" : {
						templateUrl: 'views/user/update.html',
						controller: 'UpdateController'
					}
				}
			})
		    .state('success', {				
		    	url: "/success",
				views: {
					"mainPanel" : {
						templateUrl: 'views/user/regiestSuccess.html'
					}
				}
		    });
	});
});