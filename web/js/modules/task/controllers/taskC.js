define([
	'common/config',
	'modules/ds'
], function(config, ds) {
	ds.controller('TaskController', function ($rootScope, $scope, $http, taskService, userService) {
		$scope.visible = "dis-visible";

		$scope.$on("loadTaskData", function(e, data) {
	  		loadData(data);
	  	});

		$scope.$on("loadNotAcceptTasks", function(e) {
	  		loadNotAcceptTasks();
	  	});

		$scope.$on("loadAcceptTasks", function(e) {
	  		loadAcceptTasks();
	  	});

	  	$scope.$on("loadDoneTasks", function(e) {
	  		loadDoneTasks();
	  	});

		$scope.addTasks = function() {
			loadData({
				uid: $scope.uid,
				pageNo: $scope.pageNo,
				startFrom: $scope.currentIndex,
				count: config.TASK_LIST.COUNT,
				status: $scope.status,
				type: $scope.type
			});
		};

		$scope.acceptTask = function(taskId) {
			if (userService.getUser() == null) {
				$rootScope.$broadcast("showUserDialog");
				return ;
			}
			taskService.acceptTask({
				id: taskId,
				user: userService.getUser()
			}, {
				taskId: taskId
			}, function(res) {
				if (res.success) {
					loadNotAcceptTasks();
				} else {
					console.log("accept fail");
				}
			}, function(err) {
				console.log("accept error", err);
			})
		};

		$scope.taskDone = function(taskId) {
			taskService.taskDone({
				id: taskId,
				user: userService.getUser()
			}, {
				taskId: taskId
			}, function(res) {
				if (res.success) {
					loadAcceptTasks();
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
		var loadNotAcceptTasks = function() {
			reset();
			loadData({
				uid: '',
				pageNo: 1,
				startFrom: 0,
				count: config.TASK_LIST.COUNT,
				status: config.TASK_LIST.STATUS.NOT_ACCEPT,
				type: config.TASK_LIST.TYPE.DEFAULT
			});
		};

		/**
	     * 加载自己已领取任务数据
	     * @method loadAcceptTasks
	     */
		var loadAcceptTasks = function() {
			reset();
			loadData({
				uid: userService.getUser()._id,
				pageNo: 1,
				startFrom: 0,
				count: config.TASK_LIST.COUNT,
				status: config.TASK_LIST.STATUS.ACCEPT,
				type: config.TASK_LIST.TYPE.DEFAULT
			});
		};

		/**
	     * 加载自己已完成任务数据
	     * @method loadDoneTasks
	     */
		var loadDoneTasks = function() {
			reset();
			loadData({
				uid: userService.getUser()._id,
				pageNo: 1,
				startFrom: 0,
				count: config.TASK_LIST.COUNT,
				status: config.TASK_LIST.STATUS.DONE,
				type: config.TASK_LIST.TYPE.DEFAULT
			});
		};

		var loadData = function(loadConfig) {
			$scope.visible = "dis-visible";
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

			taskService.getList({
				id: loadConfig.uid,
				pageNo: loadConfig.pageNo,
				pageSize: config.TASK_LIST.PAGE_SIZE,
				startFrom: loadConfig.startFrom,
				count: loadConfig.count,
				status: loadConfig.status,
				type: loadConfig.type 
			}, function(res) {
				if (res.success) {
					$rootScope.$broadcast("hideLoading");
					if (res.data && res.data.length >= loadConfig.count) {
						$scope.currentIndex += res.data.length;
						$scope.visible = "visible";
					}
					buildTaskList(res.data);
				} else {
					console.log("get tasklist fail");
				}
			}, function(err) {
				$rootScope.$broadcast("hideLoading");
				$scope.visible = "visible";
				console.log("get tasklist error", err);
			})
		};

		var buildTaskList = function(list) {
			var tempList = [$scope.first, $scope.second, $scope.third];
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
					console.log(userService.getUser()._id, item.creator._id);
					if (userService.getUser() && item.creator._id == userService.getUser()._id) {
						item.disabled = "disabled";
					}
				})
				for (var i = 0, len = list.length; i < len; i += 3) {
					list[i]? tempList[0].push(list[i]) : "";
					list[i + 1]? tempList[1].push(list[i + 1]) : "";
					list[i + 2]? tempList[2].push(list[i + 2]) : "";
				}
			}
			$scope.tasklist = [];
			$scope.tasklist.push($scope.first);
			$scope.tasklist.push($scope.second);
			$scope.tasklist.push($scope.third);
		}

		var reset = function() {
			$scope.tasklist = [];
			$scope.first = [];
			$scope.second = [];
			$scope.third = [];

			$scope.pageNo = null;
			$scope.status = null;
			$scope.type = null;
			$scope.currentIndex = 0;
		};

		reset();
	});
});