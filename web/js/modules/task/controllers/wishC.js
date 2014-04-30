define(['modules/ds'], function(ds) {
	ds.controller('WishController', function ($rootScope, $scope, $http, taskService, userService) {
		/**
		 * 当前模板。
		 * @property templates
		 * @type {Object}
		 */
		$scope.templates = [{ 
			name: 'wish.html',
			url: 'views/task/wish.html'
		}];

		// 监听 bootstrap 事件
		$('#wishing').on('show.bs.modal', function (e) {
	  		_wishShownCallback();
		});

		// 监听系统事件
		$scope.$on("showWishDialog", function() {
	  		_showWish();
	  	});

		/**
	     * 确认许愿
	     * @method doWish
	     */
	  	$scope.doWish = function() {
	  		if ($scope.task.title.length > 6) {
	  			alert("亲，愿望标题太长了！");
	  			return ;
	  		}
	  		taskService.resource.wish({
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
	  	};

		/**
	     * 打开许愿窗口回调信息
	     * @method _wishShownCallback
	     * @private
	     */
		var _wishShownCallback = function() {
			reset();
			$scope.template = $scope.templates[0];
		};

		/**
	     * 弹出许愿窗口
	     * @method _showWish
	     * @private
	     */
		var _showWish = function() {
			$("#wishing").modal({
				show: true
			});
		};

		/**
	     * 重置信息
	     * @method reset
	     * @private
	     */
	  	var reset = function() {
			$scope.task = {
				"title": "",
				"desc": "",
				"contact": "",
				"reward": ""
			}
		};

		reset();
	});
});