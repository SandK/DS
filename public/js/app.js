var rap = angular.module('DS-App', ['ngRoute']);

rap.config(function ($routeProvider) {
  $routeProvider.when('/',
    {
      templateUrl: 'partials/welcome.html',
      controller: 'WelcomeController'
    }).

    otherwise( { redirectTo: '/'})

});

rap.controller('NavController', function ($scope,$http) {
  $scope.title = "许愿树App";
});

rap.controller('WelcomeController', function ($scope,$http) {
  $scope.appName = "许愿树";
});