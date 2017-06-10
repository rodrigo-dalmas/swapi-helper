var swapiWebApp = angular.module('swapiWebApp', ['ui.router']);

swapiWebApp.config(function($stateProvider) {
  $stateProvider
    .state('home', {
      url: '',
      templateUrl: "partials/home.html",
      controller: "home",
    })
    .state('about', {
      url: '/about',
      templateUrl: "partials/about.html",
      controller: "about",
    })
    .state('log', {
      url: '/log',
      templateUrl: "partials/log.html",
      controller: "log",
    })
    .state('404', {
      url: '/404',
      templateUrl: "partials/404.html",
    });
});
