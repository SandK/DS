define(['modules/ds'], function(ds) {	
	ds.controller('LoadingController', function ($scope, $http) {
		$scope.$on("showLoading", function() {
			$("#loading").css("display", "block");
	  	});
	  	$scope.$on("hideLoading", function() {
			$("#loading").css("display", "none");
	  	});
	});
});