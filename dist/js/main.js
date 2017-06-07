var app = angular.module('swapiWebApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl : 'partials/home.html',
      controller  : 'mainController'
    })
    .when('/about', {
      templateUrl : 'partials/about.html',
      controller  : 'aboutController'
    })
    .when('/contact', {
      templateUrl : 'partials/log.html',
      controller  : 'logController'
    })
    .otherwise({
      redirectTo: '/404'
    });
});

app.controller('mainController', function($scope) {
  $scope.message = 'Everyone come and see how good I look!';
});

app.controller('aboutController', function($scope) {
  $scope.message = 'Look! I am an about page.';
});

app.controller('logController', function($scope) {
  $scope.message = 'Contact us! JK. This is just a demo.';
});