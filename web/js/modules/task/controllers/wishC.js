define(['modules/ds'], function(ds) {
	ds.controller('WishController', function ($scope, $http) {
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

	  	var reset = function() {
			
		}
	});
});