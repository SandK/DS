define(['modules/ds'], function(ds) {
	ds.factory('userService', function ($http) {
		return {
			doRegiest: function(params) {
				$http({
					method:'POST', 
					url: '/register',
					params: {
						username: params.username,
						password: params.password
					}
				}).success(function() {
					$("#userSign").modal('hide');
					console.log("regiest success");
				}).error(function(data, status, headers, config) {
					console.log("regiest error");
				});
			},

			doLogin: function(params) {
				$http({
					method:'POST', 
					url: '/login',
					params: {
						username: params.username,
						password: params.password
					}
				}).success(function() {
					$("#userSign").modal('hide');
					console.log("login success");
				}).error(function(data, status, headers, config) {
					console.log("login error");
				});
			},

			// getUser: function($scope) {
			// 	$http.get('/login').success(function(data) {
			// 		$scope.user = data;
			// 	});
			// }
		};
	});
});