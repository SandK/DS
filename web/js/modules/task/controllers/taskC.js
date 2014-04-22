define(['modules/ds'], function(ds) {
	ds.controller('TaskController', function ($rootScope, $scope, $http, taskService, userService) {
		$scope.tasklist = [];

		$scope.visible = "visible";

		$scope.$on("loadTaskData", function() {
	  		$scope.loadData();
	  	});

		$scope.loadData = function() {
			$scope.visible = "dis-visible";
			$rootScope.$broadcast("showLoading");
			var uid = userService.getUser()._id;
			taskService.getList({
				id: uid,
				pageNo: 1,
				pageSize: 999999999999999999,
				startFrom: 0,
				count: 20,
				status: 3,
				type: 0 
			}, function(res) {
				if (res.success) {
					$rootScope.$broadcast("hideLoading");
					$scope.visible = "visible";
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

		$scope.acceptTask = function(taskId) {
			taskService.acceptTask({
				id: taskId,
				user: userService.getUser()
			}, {
				taskId: taskId
			}, function(res) {
				if (res.success) {
					console.log("accept success");
				} else {
					console.log("accept fail");
				}
			}, function(err) {
				console.log("accept error", err);
			})
		};

		var buildTaskList = function(list) {
			var first = [];
			var second = [];
			var third = [];

			if (list) {
				for (var i = list.length - 1; i > 0; i -= 3) {
					list[i]? first.push(list[i]) : "";
					list[i - 1]? second.push(list[i - 1]) : "";
					list[i - 2]? third.push(list[i - 2]) : "";
				}
			}

			$scope.tasklist = [];
			$scope.tasklist.push(first);
			$scope.tasklist.push(second);
			$scope.tasklist.push(third);
		}

		var reset = function() {
			$scope.tasklist = [];
		};

		reset();
	});
});