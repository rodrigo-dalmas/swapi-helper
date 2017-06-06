var app = angular.module('swapiWebApp', [
  'ngRoute'
]);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when("/", {templateUrl: "partials/home.html", controller: "SwapiPageCtrl"})
    .when("/about", {templateUrl: "partials/about.html", controller: "SwapiPageCtrl"})
    .when("/log", {templateUrl: "partials/log.html", controller: "SwapiPageCtrl"})
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "SwapiPageCtrl"});
}]);

app.controller('SwapiPageCtrl', function ($scope, $location, $http) {
  app.factory('SwapiPeople', function ($http) {
    
    var swapiUrl = 'http://swapi.co/api/';
    var swapiImageUrl = '../src/img/swapi_api.png';
    $scope.swapiImageUrl = swapiImageUrl;
    
    var SwapiPeople = function (people) {
      this.name = people.name;
      this.height = people.height;
      this.mass = people.mass;
      this.hairColor = people.hair_color;
      this.skinColor = people.skin_color;
      this.eyeColor = people.eye_color;
    };
    
    SwapiPeople.prototype.getProfile = function () {
      var self = this;
      
      return $http.get(swapiUrl + 'people/').then(function (response) {
        self.profile = response.data
        return response;
      });
    };
    return SwapiPeople;
  })
});
