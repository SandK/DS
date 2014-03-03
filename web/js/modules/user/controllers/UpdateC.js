define(['modules/ds'], function(ds) {
	ds.controller('UpdateController', function ($rootScope, $scope, $http, userService) {
		$scope.user = null;

		$scope.templates = [{ 
			name: 'update.html', 
			url: 'views/user/update.html'
		}];

		$('#userUpdate').on('show.bs.modal', function (e) {
			$scope.template = $scope.templates[0];
		});

		$scope.$on("showUpdateDialog", function(event, data) {
			$scope.user = data.user;
			$("#userUpdate").modal({
				show: true
			});
		});

		$scope.saveUser = function() {
			var form = new FormData();
			form.append("user", $scope.user);
			form.append("file", document.getElementById("head").files[0]);

			userService.updateUser({
				userId: $scope.user._id
			}, form, function(res) {
				if (res.success) {
					$rootScope.$broadcast("getUser", {
						callback: function() {
							$("#userUpdate").modal('hide');
						}
					});
				} else {
					alert("save error: " + res.msg);
				}
			}, function() {
				alert("save fail");
			});
		}

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