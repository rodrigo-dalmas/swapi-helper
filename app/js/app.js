var swapiApp = angular.module('swapiApp', ['ui.router']);

swapiApp.config(function($stateProvider) {
  $stateProvider
    .state('home', {
      url: '',
      templateUrl: "partials/home.html",
      controller: "home",
      resolve: {
        'ResourceList': function (SwapiService) {
          return SwapiService.promise;
        }
      }
    })
    .state('about', {
      url: '/about',
      templateUrl: "partials/about.html",
    })
    .state('404', {
      url: '/404',
      templateUrl: "partials/404.html",
    });
});
