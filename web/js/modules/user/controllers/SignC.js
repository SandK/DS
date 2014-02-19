define(['modules/ds'], function(ds) {
	ds.controller('SignController', function ($rootScope, $scope, $http, userService) {
		$scope.templates = [{ 
			name: 'login.html', 
			url: 'views/user/login.html'
		}, { 
			name: 'regiest.html', 
			url: 'views/user/regiest.html'
		}];

	  	$('#userSign').on('show.bs.modal', function (e) {
	  		reset();
			$scope.template = $scope.templates[0];
		});

	  	$scope.$on("showUserDialog", function() {
	  		$("#userSign").modal({
				show: true
			});
	  	});
		
		$scope.showLogin = function() {
			$scope.template = $scope.templates[0];
		}

		$scope.showRegiest = function() {
			$scope.template = $scope.templates[1];
		}

		$scope.doLogin = function() {
			userService.login({}, {
				username: $scope.login.username, 
				password: $scope.login.password,
			}, function(res) {
				if (res.success) {
					$rootScope.$broadcast("getUser", {
						callback: function() {
							$("#userSign").modal('hide');
						}
					});
				} else {
					console.log("login error: " + res.msg);
				}
			}, function() {
				$("#userSign").modal('hide');
				console.log("login fail");
			});
		}

		$scope.doRegiest = function() {
			if ($scope.regiest.passwordAg != $scope.regiest.password) {
				alert("2次密码输入不一致");
				return ;
			}
			userService.regiest({}, {
				username: $scope.regiest.username, 
				password: $scope.regiest.password,
			}, function(res) {
				console.log(res);
				if (res.success) {
					doRegiestSuccess($scope.regiest.username, $scope.regiest.password);
				} else {
					console.log("regiest error: " + res.msg);
				}
			}, function() {
				$("#userSign").modal('hide');
				console.log("regiest fail");
			});
		}

		var doRegiestSuccess = function(username, password) {
			userService.login({}, {
				username: username, 
				password: password,
			}, function(res) {
				if (res.success) {
					$rootScope.$broadcast("getUser", {
						callback: function() {
							$("#userSign").modal('hide');
						}
					});
				} else {
					console.log("login error: " + res.msg);
				}
			}, function() {
				$("#userSign").modal('hide');
				console.log("login fail");
			});
		}

		var reset = function() {
			$scope.login = {
				"username": "",
				"password": ""
			}
			$scope.regiest = {
				"username": "",
				"password": "",
				"passwordAg": ""
			}
		}

		reset();
	});
});