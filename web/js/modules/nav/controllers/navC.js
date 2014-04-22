define(['modules/ds'], function(ds) {
	ds.controller('NavController', function ($rootScope, $scope, $http, userService, taskService) {
		$scope.title = "许愿树App";
		$scope.user = null;

		$scope.$on("getServerUser", function(event, data) {
			userService.resource.getUser(function(res) {
				if (res.success) {
					$scope.user = res.data.user;
					userService.setUser($scope.user);
					$rootScope.$broadcast("loadTaskData");
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

		$scope.showSingDialog = function() {
			$rootScope.$broadcast("showUserDialog");
		}

		$scope.showUpdateUserDialog = function() {
			$rootScope.$broadcast("showUpdateDialog", {
				user: $scope.user
			});
		}

		$scope.logout = function() {
			userService.resource.logout(function(res) {
				if (res.success) {
					$rootScope.$broadcast("getServerUser");
				} else {
					console.log("logout error: " + res.msg);
				}
			},function() {
				console.log("logout fail");
			});
		}

		$scope.wishing = function() {
			$rootScope.$broadcast("showWishDialog");
		}

		$rootScope.$broadcast("getServerUser");
	});
});