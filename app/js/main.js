'use strict';

var swapiWebApp = angular.module('swapiWebApp', [
  'ui.router',
]);

swapiWebApp.config(function($stateProvider) {
  var mainPage = {
    name: 'home',
    url: '/home',
  }
  
  var aboutPage = {
    name: 'about',
    url: '/about',
  }
  
  var logPage = {
    name: 'log',
    url: '/log',
  }
  
  $stateProvider.state(mainPage);
  $stateProvider.state(aboutPage);
  $stateProvider.state(logPage);
});
