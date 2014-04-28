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
			userService.resource.login({}, {
				username: $scope.login.username, 
				password: $scope.login.password,
			}, function(res) {
				if (res.success) {
					$rootScope.$broadcast("getServerUser", {
						callback: function() {
							$("#userSign").modal('hide');
						}
					});
				} else {
					alert("登陆失败");
					console.log("login error: " + res.msg);
				}
			}, function() {
				alert("登陆失败");
				console.log("login fail");
			});
		}

		$scope.doRegiest = function() {
			if ($scope.regiest.passwordAg != $scope.regiest.password) {
				alert("2次密码输入不一致");
				return ;
			}
			userService.resource.regiest({}, {
				username: $scope.regiest.username, 
				password: $scope.regiest.password,
			}, function(res) {
				if (res.success) {
					doRegiestSuccess($scope.regiest.username, $scope.regiest.password);
				} else {
					alert("regiest error: " + res.msg);
				}
			}, function() {
				alert("regiest fail");
			});
		}

		var doRegiestSuccess = function(username, password) {
			userService.resource.login({}, {
				username: username, 
				password: password,
			}, function(res) {
				if (res.success) {
					$rootScope.$broadcast("getServerUser", {
						callback: function() {
							$("#userSign").modal('hide');
						}
					});
				} else {
					alert("login error: " + res.msg);
				}
			}, function() {
				alert("login fail");
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