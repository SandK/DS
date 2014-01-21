define(['modules/user/user'], function(user) {
	user.controller('LoginSuccessController', function ($scope,$http) {
	  	$scope.appName = "许愿树";
	  	$http.get('/login').success(function(data) { $scope.user = data;});
	});
});