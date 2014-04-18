define(['modules/ds'], function(ds) {
	ds.controller('WishController', function ($scope, $http, taskService) {
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
	  		taskService.wish({}, {
				taskName: $scope.task.title, 
				desc: $scope.task.desc,
				contactWay: $scope.task.contact,
				reward: $scope.task.reward
			}, function(res) {
				console.log(res);
				// if (res.success) {
				// 	$rootScope.$broadcast("getUser", {
				// 		callback: function() {
				// 			$("#userSign").modal('hide');
				// 		}
				// 	});
				// } else {
				// 	console.log("login error: " + res.msg);
				// }
			}, function(err) {
				console.log(err);
				// $("#userSign").modal('hide');
				// console.log("login fail");
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