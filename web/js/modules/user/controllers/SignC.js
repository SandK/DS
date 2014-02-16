define(['modules/ds'], function(ds) {
	ds.controller('SignController', function ($scope, $http, userService) {
		$scope.templates = [{ 
			name: 'login.html', 
			url: 'views/user/login.html'
		}, { 
			name: 'regiest.html', 
			url: 'views/user/regiest.html'
		}];

	  	$('#userSign').on('show.bs.modal', function (e) {
			$scope.template = $scope.templates[0];
		})

		$scope.login = {
			"username": "",
			"password": ""
		}

		$scope.regiest = {
			"username": "",
			"password": ""
		}

		$scope.showLogin = function() {
			$scope.template = $scope.templates[0];
		}

		$scope.showRegiest = function() {
			$scope.template = $scope.templates[1];
		}

		$scope.doLogin = function() {
			userService.doLogin({
				username: $scope.login.username, 
				password: $scope.login.password
			});
		}

		$scope.doRegiest = function() {
			userService.doRegiest({
				username: $scope.login.username, 
				password: $scope.login.password
			});
		}
	});
});