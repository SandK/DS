define(['modules/user/user'], function(user) {
	user.controller('UpdateController', function ($scope,$http) {
		var serviceUrl = "/user/updateUser/";
		$http.get('/login').success(function(data) {
			$scope.user = data;
			serviceUrl += data._id;
		});
		// 保存用户信息
		$scope.save = function() {
			$http.post(serviceUrl, $scope.user).success(function (data) {
				console.log("------------ save succ ---------");
			});
		};
	});
});