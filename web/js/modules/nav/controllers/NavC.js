define(['modules/ds'], function(ds) {
	ds.controller('NavController', function ($scope, $http) {
		$scope.title = "许愿树App";
		$scope.user = null;

		$http.get('/login').success(function(data) { 
			$scope.user = data;
		});

		$scope.showSingDialog = function() {
			$("#userSign").modal({
				show: true
			});
		}
	});
});