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

	  	$scope.$on("doLogout", function() {
	  		_doLogout();
	  	});

	  	$scope.$on("getServerUser", function(event, data) {
			_getServerUser(event, data);
		});
		
		$scope.showLogin = function() {
			$scope.template = $scope.templates[0];
		};

		$scope.doLogin = function() {
			userService.resource.login({}, {
				username: $scope.login.username, 
				password: $scope.login.password,
			}, function(res) {
				if (res.success) {
					_getServerUser(null, {
						callback: function() {
							$("#userSign").modal('hide');
							$rootScope.$broadcast("loadNotAcceptTasks");
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
		};

		$scope.showRegiest = function() {
			$scope.template = $scope.templates[1];
		};

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
		};

		var doRegiestSuccess = function(username, password) {
			userService.resource.login({}, {
				username: username, 
				password: password,
			}, function(res) {
				if (res.success) {
					_getServerUser(null, {
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

		var _getServerUser = function(event, data) {
			userService.resource.getUser(function(res) {
				if (res.success) {
					$scope.user = res.data.user;
				} else {
					$scope.user = null;
					console.log("get user error: " + res.msg);
				}
				userService.setUser($scope.user);
				$rootScope.$broadcast("setUser", {
					user: $scope.user
				});
				data && data.callback && data.callback();
			}, function() {
				$scope.user = null;
				console.log("get user fail");
				data && data.callback && data.callback();
			});
		}

		var _doLogout = function() {
			userService.resource.logout(function(res) {
				if (res.success) {
					_getServerUser(null, {
						callback: function() {
							$rootScope.$broadcast("loadNotAcceptTasks");
						}
					});
				} else {
					console.log("logout error: " + res.msg);
				}
			},function() {
				console.log("logout fail");
			});
		};

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