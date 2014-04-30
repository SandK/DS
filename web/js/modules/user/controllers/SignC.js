define(['modules/ds'], function(ds) {
	ds.controller('SignController', function ($rootScope, $scope, $http, userService) {		
		/**
		 * 当前模板。
		 * @property templates
		 * @type {Object}
		 */
		$scope.templates = [{ 
			name: 'login.html', 
			url: 'views/user/login.html'
		}, { 
			name: 'regiest.html', 
			url: 'views/user/regiest.html'
		}];

		// 监听 bootstrap 事件
	  	$('#userSign').on('show.bs.modal', function (e) {
	  		_signShownCallback();
		});

	  	// 监听系统事件
	  	$scope.$on("showUserDialog", function() {
	  		_showSign();
	  	});
	  	$scope.$on("doLogout", function() {
	  		_doLogout();
	  	});
	  	$scope.$on("getServerUser", function(event, data) {
			_getServerUser(event, data);
		});
		
		/**
	     * 弹出登陆框
	     * @method showLogin
	     */
		$scope.showLogin = function() {
			$scope.template = $scope.templates[0];
		};

		/**
	     * 登陆操作
	     * @method doLogin
	     */
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

		/**
	     * 弹出注册框
	     * @method showRegiest
	     */
		$scope.showRegiest = function() {
			$scope.template = $scope.templates[1];
		};

		/**
	     * 注册操作
	     * @method doRegiest
	     */
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

		/**
	     * 注册成功回调
	     * @method doRegiestSuccess
	     */
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

		/**
	     * 登出操作
	     * @method _getServerUser
	     * @private
	     */
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

		/**
	     * 向服务器获取当前用户
	     * @method _getServerUser
	     * @private
	     */
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

		/**
	     * 打开登陆窗口回调信息
	     * @method _signShownCallback
	     * @private
	     */
		var _signShownCallback =function() {
			reset();
			$scope.template = $scope.templates[0];
		};

		/**
	     * 弹出登陆、注册底框
	     * @method _signShownCallback
	     * @private
	     */
		var _showSign = function() {
			$("#userSign").modal({
				show: true
			});
		};

		/**
	     * 重置信息
	     * @method reset
	     * @private
	     */
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
		};

		reset();
	});
});