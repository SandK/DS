var rap = angular.module('DS-App', ['ngRoute']);

rap.config(function ($routeProvider) {
  $routeProvider
  	// 欢迎页面
	.when('/',
	{
      templateUrl: 'partials/welcome.html',
      controller: 'WelcomeController'
    })

	// 注册页面
	.when('/register',
	{
      templateUrl: 'partials/register.html',
      controller: 'RegisterController'
    })

    // 用户页面
	.when('/user',
	{
      templateUrl: 'partials/user.html',
      controller: 'UserController'
    })

	// 修改用户信息
	.when('/user/updateUser',
	{
      templateUrl: 'partials/updateUser.html',
      controller: 'UpdateUserController'
    })


    .otherwise( { redirectTo: '/'})

});

// 首页Controller
rap.controller('NavController', function ($scope,$http) {
  $scope.title = "许愿树App";
  $http.get('/login').success(function(data) { $scope.user = data;});
});

// 欢迎页面Controller
rap.controller('WelcomeController', function ($scope,$http) {
  $scope.appName = "许愿树";
  $http.get('/login').success(function(data) { $scope.user = data;});
});

// 用户页面Controller
rap.controller('UserController', function ($scope,$http) {
  $http.get('/login').success(function(data) { $scope.user = data;});
});

// 注册页面Controller
rap.controller('RegisterController', function ($scope,$http) {

});

// 修改用户信息Controller
rap.controller('UpdateUserController', function ($scope,$http) {
	var serviceUrl = "/user/updateUser/";
	$http.get('/login').success(function(data) {
		$scope.user = data;
		serviceUrl += data._id;
	});
	// 保存用户信息
	$scope.save = function() {
		$http.post(serviceUrl, $scope.user)
			.success(function (data) {
				//console.log("------------ save succ ---------");
			});
	};
});