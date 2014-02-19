define(['modules/ds'], function(ds) {
	ds.controller('NavController', function ($rootScope, $scope, $http, userService) {
		$scope.title = "许愿树App";
		$scope.user = null;

		$scope.$on("getUser", function(event, data) {
			userService.getUser(function(res) {
				if (res.success) {
					$scope.user = res.data.user;	
				} else {
					$scope.user = null;
					console.log("get user error: " + res.msg);
				}
				data && data.callback && data.callback();
			}, function() {
				$scope.user = null;
				console.log("get user fail");
				data && data.callback && data.callback();
			});
		});

		$rootScope.$broadcast("getUser");

		$scope.showSingDialog = function() {
			$rootScope.$broadcast("showUserDialog");
		}

		$scope.showUpdateUserDialog = function() {
			$rootScope.$broadcast("showUpdateDialog", {
				user: $scope.user
			});
		}

		$scope.logout = function() {
			userService.logout(function(res) {
				if (res.success) {
					$rootScope.$broadcast("getUser");
				} else {
					console.log("logout error: " + res.msg);
				}
			},function() {
				console.log("logout fail");
			});
		}
	});
});