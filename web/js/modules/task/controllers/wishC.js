define(['modules/ds'], function(ds) {
	ds.controller('WishController', function ($rootScope, $scope, $http, taskService, userService) {
		$scope.templates = [{ 
			name: 'wish.html',
			url: 'views/task/wish.html'
		}];

		$('#wishing').on('show.bs.modal', function (e) {
	  		reset();
			$scope.template = $scope.templates[0];
		});

		$scope.$on("showWishDialog", function() {
	  		$("#wishing").modal({
				show: true
			});
	  	});

	  	$scope.doWish = function() {
	  		if ($scope.task.title.length > 6) {
	  			alert("愿望标题太长了亲");
	  			return ;
	  		}

	  		taskService.wish({
	  			user: userService.getUser()
	  		}, {
				taskName: $scope.task.title, 
				desc: $scope.task.desc,
				contactWay: $scope.task.contact,
				reward: $scope.task.reward
			}, function(res) {
				if (res.success) {
					$("#wishing").modal('hide');
					$rootScope.$broadcast("loadNotAcceptTasks");	
				} else {
					console.log("wish error: " + res.msg);
				}
			}, function(err) {
				$("#wishing").modal('hide');
				console.log("wish fail ", err);
			});
	  	}

	  	var reset = function() {
			$scope.task = {
				"title": "",
				"desc": "",
				"contact": "",
				"reward": ""
			}
		}

	  	reset();
	});
});