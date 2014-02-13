define(['modules/ds'], function(ds) {
	ds.controller('SignController', function ($scope, $http, userService) {
		$scope.templates = [{ 
			name: 'login.html', 
			url: 'views/user/login.html'
		}, { 
			name: 'regiest.html', 
			url: 'views/user/regiest.html'
		}];

	  	$scope.template = $scope.templates[0];

	  	$('#userSign').on('show.bs.modal', function (e) {
			$scope.template = $scope.templates[0];
		})

		$scope.showLogin = function() {
			$scope.template = $scope.templates[0];
		}

		$scope.showRegiest = function() {
			$scope.template = $scope.templates[1];
		}

		$scope.doLogin = function() {
			userService.doLogin();
		}
	});
});