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


    .otherwise( { redirectTo: '/'})

});

// 首页Controller
rap.controller('NavController', function ($scope,$http) {
  $scope.title = "许愿树App";
  $http.get('http://localhost:3000/login').success(function(data) { $scope.user = data;});
});

// 欢迎页面Controller
rap.controller('WelcomeController', function ($scope,$http) {
  $scope.appName = "许愿树";
  $http.get('http://localhost:3000/login').success(function(data) { $scope.user = data;});
});

// 注册页面Controller
rap.controller('RegisterController', function ($scope,$http) {

});