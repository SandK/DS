define(['modules/ds'], function(ds) {
	ds.controller('UpdateController', function ($rootScope, $scope, $http, userService) {
		$scope.serviceUrl = "";

		$scope.user = null;

		$scope.templates = [{ 
			name: 'update.html', 
			url: 'views/user/update.html'
		}];

		$('#userUpdate').on('show.bs.modal', function (e) {
			$scope.template = $scope.templates[0];
		});

		$scope.$on("showUpdateDialog", function(event, data) {
			reset();
			$scope.user = data.user;
			$scope.serviceUrl += data.user._id;
			$("#userUpdate").modal({
				show: true
			});
		});

		$scope.saveUser = function() {
			userService.updateUser({
				params: {
					url: $scope.serviceUrl,
					user: $scope.user
				},
				callback: {
					success: function(res) {
						if (res.success) {
							$rootScope.$broadcast("getUser", {
								callback: function() {
									$("#userUpdate").modal('hide');
								}
							});
						} else {
							console.log("save error: " + res.msg);
						}
					},
					error: function() {
						console.log("save fail");
					}
				}
			})
		}

		var reset = function() {
			$scope.serviceUrl = "/user/updateUser/";
		}

		reset();

		// var serviceUrl = "/user/updateUser/";
		// $http.get('/login').success(function(data) {
		// 	$scope.user = data;
		// 	serviceUrl += data._id;
		// });
		// // 保存用户信息
		// $scope.save = function() {
		// 	$http.post(serviceUrl, $scope.user).success(function (data) {
		// 		console.log("------------ save succ ---------");
		// 	});
		// };
	});
});