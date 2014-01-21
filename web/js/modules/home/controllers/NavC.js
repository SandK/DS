define(['modules/home/home'], function(home) {
	home.controller('NavController', function ($scope,$http) {
		$scope.title = "许愿树App";
		$http.get('/login').success(function(data) { $scope.user = data;});
	});
});
	