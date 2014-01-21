define([
	'modules/user/user', 
	'modules/user/controllers/LoginC',
	'modules/user/controllers/LoginSuccessC',
	'modules/user/controllers/RegiestC',
	'modules/user/controllers/updateC'
], function(user) {
	user.config(['$routeProvider', function ($routeProvider) {
	 	$routeProvider.
	 		when('/', {
				templateUrl: 'views/user/login.html',
				controller: 'LoginController'
			}).
			when('/register', {
	      		templateUrl: 'views/user/register.html',
	      		controller: 'RegisterController'
	    	}).
	    	when('/loginSuccess', {
		      	templateUrl: 'views/user/loginSuccess.html',
		      	controller: 'LoginSuccessController'
		    }).
		    when('/user/updateUser', {
		      	templateUrl: 'views/user/update.html',
		      	controller: 'UpdateController'
		    }).
		    when('/success', { 
	    		templateUrl: 'views/user/regiestSuccess.html'
	   	 	}).
	   	 	otherwise({redirectTo: '/'})
	}]);
});