define(['modules/ds'], function(ds) {
	ds.controller('TaskController', function ($rootScope, $scope, $http, taskService) {
		$scope.tasklist = [];

		$scope.visible = "visible";

		var tip = [
			" onec id Donec id Donec id Donec id Donec id Donec id Donec id Donec id Donec id Donec id Donec id Donec id Donec id Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. ",
			"onec id Donec id Donec id Donec id Don",
			"onec id Donec id Donec id Donec id Dononec id Donec id Donec id Donec id Dononec id Donec id Donec id Donec id Dononec id Donec id Donec id Donec id Dononec id Donec id Donec id Donec id Don"
		]

		for (var i = 0; i < 3; ++i) {
			$scope.tasklist.push([{
				title: "title",
				tip: tip[Math.floor(Math.random() * 3)],
				reward: "dasdasdasd"
			}, {
				title: "title",
				tip: tip[Math.floor(Math.random() * 3)],
				reward: "dasdasdasd"
			}, {
				title: "title",
				tip: tip[Math.floor(Math.random() * 3)],
				reward: "dasdasdasd"
			}, {
				title: "title",
				tip: tip[Math.floor(Math.random() * 3)],
				reward: "dasdasdasd"
			}, {
				title: "title",
				tip: tip[Math.floor(Math.random() * 3)],
				reward: "dasdasdasd"
			}, {
				title: "title",
				tip: tip[Math.floor(Math.random() * 3)],
				reward: "dasdasdasd"
			}, {
				title: "title",
				tip: tip[Math.floor(Math.random() * 3)],
				reward: "dasdasdasd"
			}, {
				title: "title",
				tip: tip[Math.floor(Math.random() * 3)],
				reward: "dasdasdasd"
			}, {
				title: "title",
				tip: tip[Math.floor(Math.random() * 3)],
				reward: "dasdasdasd"
			}, {
				title: "title",
				tip: tip[Math.floor(Math.random() * 3)],
				reward: "dasdasdasd"
			}, {
				title: "title",
				tip: tip[Math.floor(Math.random() * 3)],
				reward: "dasdasdasd"
			}, {
				title: "title",
				tip: tip[Math.floor(Math.random() * 3)],
				reward: "dasdasdasd"
			}]);
		}

	  	var reset = function() {
			
		};

		$scope.loadData = function() {
			$scope.visible = "dis-visible";
			$rootScope.$broadcast("showLoading");
			taskService.getList({
				userId: 1
			}, {
				pageNo: 1,
				pageSize: 20,
				startFrom: 20,
				count: 20,
				status: 1,
				type: 0 
			}, function(res) {
				$rootScope.$broadcast("hideLoading");
				$scope.visible = "visible";
				console.log(res);
			}, function(err) {
				$rootScope.$broadcast("hideLoading");
				$scope.visible = "visible";
				console.log(err);
			})
		};
	});
});