define(['modules/user/user'], function(user) {
	user.controller('LoginController', function ($scope, $http) {
		$scope.showRegiest = function() {
			window.location.hash = "#/showRegiest";
		}

		$scope.doLogin = function() {
			$http({
				method:'POST', 
				url: '/login',
				params: {
					username: $("#loginUsername").val(),
					password: $("#loginPassword").val()
				}
			}).success(function() {
				$("#userSign").modal('hide');
			}).error(function(data, status, headers, config) {
				console.log("login error");
			});
		}
	});
});