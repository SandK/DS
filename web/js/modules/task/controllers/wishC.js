define(['modules/ds'], function(ds) {
	ds.controller('WishController', function ($scope, $http, taskService, userService) {
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