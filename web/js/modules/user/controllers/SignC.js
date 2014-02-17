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

		$scope.showLogin = function() {
			$scope.template = $scope.templates[0];
		}

		$scope.showRegiest = function() {
			$scope.template = $scope.templates[1];
		}

		$scope.doLogin = function() {
			userService.login({
				params: {
					username: $scope.login.username, 
					password: $scope.login.password,
				},
				callback: {
					success: function(res) {
						if (res.success) {
							$rootScope.$broadcast("getUser", {
								callback: function() {
									$("#userSign").modal('hide');
								}
							});
						} else {
							console.log("login error: " + res.msg);
						}
					},
					fail: function() {
						$("#userSign").modal('hide');
						console.log("login fail");
					}
				}
			});
		}

		$scope.doRegiest = function() {
			userService.regiest({
				params: {
					username: $scope.regiest.username, 
					password: $scope.regiest.password,
				},
				callback: {
					success: function(res) {
						if (res.success) {
							doRegiestSuccess($scope.regiest.username, $scope.regiest.password);
						} else {
							console.log("regiest error: " + res.msg);
						}
					},
					fail: function() {
						$("#userSign").modal('hide');
						console.log("regiest fail");
					}
				}
			});
		}

		var doRegiestSuccess = function(username, password) {
			userService.login({
				params: {
					username: username, 
					password: password,
				},
				callback: {
					success: function() {
						$rootScope.$broadcast("getUser", {
							callback: function() {
								$("#userSign").modal('hide');
							}
						});
					},
					fail: function() {
						$("#userSign").modal('hide');
						console.log("login fail");
					}
				}
			});
		}

		var reset = function() {
			$scope.login = {
				"username": "",
				"password": ""
			}
			$scope.regiest = {
				"username": "",
				"password": ""
			}
		}

		reset();
	});
});