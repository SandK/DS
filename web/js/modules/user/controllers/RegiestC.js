define(['modules/user/user'], function(user) {
	user.controller('RegiestController', function ($scope, $http) {
		// $http.get('/login').success(function(data) { 
		// 	$scope.user = data;
		// });
		$scope.doRegiest = function() {
			$http({
				method:'POST', 
				url: '/register',
				params: {
					username: $("#regiestUsername").val(),
					password: $("#regiestPassword").val()
				}
			}).success(function() {
				$("#userSign").modal('hide');
			}).error(function(data, status, headers, config) {
				console.log("regiest error");
			});
		}
	});
});