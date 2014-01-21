define(['modules/user/user'], function(user) {
	user.controller('LoginController', function ($scope, $http) {
		$http.get('/login').success(function(data) { 
			$scope.user = data;
		});
	});
});