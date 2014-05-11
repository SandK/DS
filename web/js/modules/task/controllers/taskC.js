define([
	'common/config',
	'modules/ds'
], function(config, ds) {
	ds.controller('TaskController', function ($rootScope, $scope, $http, taskService, userService) {
		$scope.loadingVisible = "dis-visible"; // 任务加载动画 显示/隐藏 属性。

		// 监听系统事件
		$scope.$on("loadNotAcceptTasks", function(e) {
	  		_loadNotAcceptTasks();
	  	});
		$scope.$on("loadAcceptTasks", function(e) {
	  		_loadAcceptTasks();
	  	});
	  	$scope.$on("loadDoingTasks", function(e) {
	  		_loadDoingTasks();
	  	});
	  	$scope.$on("loadDoneTasks", function(e) {
	  		_loadDoneTasks();
	  	});

	  	/**
	     * 继续加载任务
	     * @method addTasks
	     */
		$scope.addTasks = function() {
			_loadData({
				uid: $scope.uid,
				pageNo: $scope.pageNo,
				startFrom: $scope.currentIndex,
				count: config.TASK_LIST.COUNT,
				status: $scope.status,
				type: $scope.type
			});
		};

		/**
	     * 领取任务
	     * @method acceptTask
	     */
		$scope.acceptTask = function(taskId) {
			if (userService.getUser() == null) {
				$rootScope.$broadcast("showUserDialog");
				return ;
			}
			taskService.resource.acceptTask({
				id: taskId,
				user: userService.getUser()
			}, {
				taskId: taskId
			}, function(res) {
				if (res.success) {
					_loadNotAcceptTasks();
				} else {
					console.log("accept fail");
				}
			}, function(err) {
				console.log("accept error", err);
			})
		};

		/**
	     * 完成任务
	     * @method taskDone
	     */
		$scope.taskDone = function(taskId) {
			taskService.resource.taskDone({
				id: taskId,
				user: userService.getUser()
			}, {
				taskId: taskId
			}, function(res) {
				if (res.success) {
					_loadAcceptTasks();
				} else {
					console.log("accept fail");
				}
			}, function(err) {
				console.log("accept error", err);
			});
		};

		/**
	     * 加载未领取任务数据
	     * @method loadNotAcceptTasks
	     */
		var _loadNotAcceptTasks = function() {
			reset();
			_loadData({
				uid: '',
				pageNo: 1,
				startFrom: 0,
				count: config.TASK_LIST.COUNT,
				status: config.TASK_LIST.STATUS.NOT_ACCEPT,
				type: config.TASK_LIST.TYPE.DEFAULT,
				acceptorId: null
			});
		};

		/**
	     * 加载自己已领取任务数据
	     * @method loadAcceptTasks
	     */
		var _loadAcceptTasks = function() {
			reset();
			_loadData({
				uid: '',
				pageNo: 1,
				startFrom: 0,
				count: config.TASK_LIST.COUNT,
				status: config.TASK_LIST.STATUS.ACCEPT,
				type: config.TASK_LIST.TYPE.DEFAULT,
				acceptorId: userService.getUser()._id
			});
		};

		/**
	     * 加载正在被实现的任务数据
	     * @method _loadDoingTasks
	     */
		var _loadDoingTasks = function() {
			reset();
			_loadData({
				uid: userService.getUser()._id,
				pageNo: 1,
				startFrom: 0,
				count: config.TASK_LIST.COUNT,
				status: config.TASK_LIST.STATUS.ACCEPT,
				type: config.TASK_LIST.TYPE.DEFAULT,
				acceptorId: null
			});
		};

		/**
	     * 加载自己已完成任务数据
	     * @method loadDoneTasks
	     */
		var _loadDoneTasks = function() {
			reset();
			_loadData({
				uid: userService.getUser()._id,
				pageNo: 1,
				startFrom: 0,
				count: config.TASK_LIST.COUNT,
				status: config.TASK_LIST.STATUS.DONE,
				type: config.TASK_LIST.TYPE.DEFAULT,
				acceptorId: null
			});
		};

		/**
	     * 加载任务
	     * @method _loadData
	     * @private
	     */
		var _loadData = function(loadConfig) {
			$scope.loadingVisible = "dis-visible";
			$rootScope.$broadcast("showLoading");

			if (loadConfig.pageNo != $scope.pageNo 
				|| loadConfig.status != $scope.status
				|| loadConfig.type != $scope.type) {
				reset();
				$scope.pageNo = loadConfig.pageNo;
				$scope.status = loadConfig.status;
				$scope.type = loadConfig.type;
				$scope.uid = loadConfig.uid;
			}

			taskService.resource.getList({
				id: loadConfig.uid,
				pageNo: loadConfig.pageNo,
				pageSize: config.TASK_LIST.PAGE_SIZE,
				startFrom: loadConfig.startFrom,
				count: loadConfig.count,
				status: loadConfig.status,
				type: loadConfig.type,
				acceptorId: loadConfig.acceptorId
			}, function(res) {
				if (res.success) {
					$rootScope.$broadcast("hideLoading");
					if (res.data && res.data.length >= loadConfig.count) {
						$scope.currentIndex += res.data.length;
						$scope.loadingVisible = "visible";
					}
					_buildTaskList(res.data);
				} else {
					console.log("get tasklist fail");
				}
			}, function(err) {
				$rootScope.$broadcast("hideLoading");
				$scope.loadingVisible = "visible";
				console.log("get tasklist error", err);
			})
		};

		/**
	     * 构建任务列表
	     * @method _buildTaskList
	     * @private
	     */
		var _buildTaskList = function(list) {
			var tempList = [$scope.first, $scope.second, $scope.third, $scope.forth];
			for (var i = 0, len = tempList.length; i < len; ++i) {
				for (var j = i, len = tempList.length; j < len; ++j) {
					if (tempList[i].length > tempList[j].length) {
						var temp = tempList[i];
						tempList[i] = tempList[j];
						tempList[j] = temp;
					}
				}
			}
			if (list) {
				list.map(function(item) {
					var date = new Date(item.createTime);
					item.createTime = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate() + "/" + " " + date.getHours() + ":" + (date.getMinutes() > 9? date.getMinutes() : "0" + date.getMinutes());
					if ($scope.status == 1) {
						item.btnStyle = "btn-primary";
						item.btnName = "摘取愿望";
						item.btnType = "accept";
						if (userService.getUser() && item.creator._id == userService.getUser()._id) {
							item.disabled = "disabled";
						} else {
							item.disabled = "";
						}
					} else if ($scope.status == 2) {
						item.btnStyle = "btn-success";
						item.btnType = "done";
						if (item.creator._id == userService.getUser()._id) {
							item.btnName = "等待实现";
							item.disabled = "disabled";
						} else {
							item.btnName = "实现愿望";
							item.disabled = "";
						}
					}
				})
				for (var i = 0, len = list.length; i < len; i += 3) {
					list[i]? tempList[0].push(list[i]) : "";
					list[i + 1]? tempList[1].push(list[i + 1]) : "";
					list[i + 2]? tempList[2].push(list[i + 2]) : "";
					list[i + 3]? tempList[3].push(list[i + 3]) : "";
				}
			}
			$scope.tasklist = [];
			$scope.tasklist.push($scope.first);
			$scope.tasklist.push($scope.second);
			$scope.tasklist.push($scope.third);
			$scope.tasklist.push($scope.forth);
		}

		/**
	     * 重置信息
	     * @method reset
	     * @private
	     */
		var reset = function() {
			$scope.tasklist = [];
			$scope.first = [];
			$scope.second = [];
			$scope.third = [];
			$scope.forth = [];

			$scope.pageNo = null;
			$scope.status = null;
			$scope.type = null;
			$scope.currentIndex = 0;
		};

		reset();
	});
});