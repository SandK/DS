define([
	'common/config',
	'modules/ds'
], function(config, ds) {
	ds.controller('NavController', function ($rootScope, $scope, $http, userService, taskService) {
		$scope.title = "许愿树App";
		$scope.user = null;

		$scope.$on("setUser", function(event, data) {
			$scope.user = data.user;
		});

		$scope.showIndex = function() {
			$rootScope.$broadcast("loadNotAcceptTasks");
		};

		$scope.showSingDialog = function() {
			$rootScope.$broadcast("showUserDialog");
		};

		$scope.loadAccepTasks = function() {
			$rootScope.$broadcast("loadAcceptTasks");
		};	

		$scope.loadDoneTasks = function() {
			$rootScope.$broadcast("loadDoneTasks");
		};	

		$scope.showUpdateUserDialog = function() {
			$rootScope.$broadcast("showUpdateDialog", {
				user: $scope.user
			});
		};

		$scope.logout = function() {
			$rootScope.$broadcast("doLogout");
		};

		$scope.wishing = function() {
			$rootScope.$broadcast("showWishDialog");
		};

		$rootScope.$broadcast("getServerUser");
		$rootScope.$broadcast("loadNotAcceptTasks");
	});
});