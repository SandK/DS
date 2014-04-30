define([
	'common/config',
	'modules/ds'
], function(config, ds) {
	ds.controller('NavController', function ($rootScope, $scope, $http, userService, taskService) {
		$scope.title = "许愿树App"; // 应用名称
		$scope.user = null; // 当前用户对象

		// 监听系统事件
		$scope.$on("setUser", function(event, data) {
			_setUser(event, data);
		});

		/**
	     * 显示首页，首页按钮绑定事件
	     * @method showIndex
	     */
		$scope.showIndex = function() {
			$rootScope.$broadcast("loadNotAcceptTasks");
		};

		/**
	     * 弹出登陆框
	     * @method showSingDialog
	     */
		$scope.showSingDialog = function() {
			$rootScope.$broadcast("showUserDialog");
		};

		/**
	     * 弹出更新用户信息框
	     * @method showUpdateUserDialog
	     */
		$scope.showUpdateUserDialog = function() {
			$rootScope.$broadcast("showUpdateDialog", {
				user: $scope.user
			});
		};

		/**
	     * 弹出许愿框
	     * @method wishing
	     */
		$scope.wishing = function() {
			$rootScope.$broadcast("showWishDialog");
		};

		/**
	     * 加载被实现中的愿望
	     * @method loadDoingTasks
	     */
		$scope.loadDoingTasks = function() {
			$rootScope.$broadcast("loadDoingTasks");
		};

		/**
	     * 加载已领取任务列表
	     * @method loadAccepTasks
	     */
		$scope.loadAccepTasks = function() {
			$rootScope.$broadcast("loadAcceptTasks");
		};	

		/**
	     * 加载完成任务列表
	     * @method loadDoneTasks
	     */
		$scope.loadDoneTasks = function() {
			$rootScope.$broadcast("loadDoneTasks");
		};	

		/**
	     * 登出
	     * @method logout
	     */
		$scope.logout = function() {
			$rootScope.$broadcast("doLogout");
		};

		/**
	     * 设置当前用户
	     * @method _setUser
	     * @private
	     */
		var _setUser = function(event, data) {
			$scope.user = data.user;
		};

		$rootScope.$broadcast("getServerUser");
		$rootScope.$broadcast("loadNotAcceptTasks");
	});
});