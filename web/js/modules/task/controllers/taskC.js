define(['modules/ds'], function(ds) {
	ds.controller('TaskController', function ($rootScope, $scope, $http, taskService, userService) {
		$scope.tasklist = [];

		$scope.visible = "visible";

		$scope.$on("loadTaskData", function() {
	  		$scope.loadData();
	  	});

		var tip = [
			" onec id Donec id Donec id Donec id Donec id Donec id Donec id Donec id Donec id Donec id Donec id Donec id Donec id Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. ",
			"onec id Donec id Donec id Donec id Don",
			"onec id Donec id Donec id Donec id Dononec id Donec id Donec id Donec id Dononec id Donec id Donec id Donec id Dononec id Donec id Donec id Donec id Dononec id Donec id Donec id Donec id Don"
		]

		for (var i = 0; i < 12; ++i) {
			$scope.tasklist.push({
				title: "title",
				tip: tip[Math.floor(Math.random() * 3)],
				reward: "dasdasdasd"
			});
		}

		$scope.loadData = function() {
			$scope.visible = "dis-visible";
			$rootScope.$broadcast("showLoading");
			var uid = userService.getUser()._id;
			taskService.getList({
				userId: uid,
				pageNo: 1,
				pageSize: 999999999999999999,
				startFrom: 0,
				count: 20,
				status: 1,
				type: 0 
			}, function(res) {
				$rootScope.$broadcast("hideLoading");
				$scope.visible = "visible";
				buildTaskList(res.data);
			}, function(err) {
				$rootScope.$broadcast("hideLoading");
				$scope.visible = "visible";
				console.log(err);
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