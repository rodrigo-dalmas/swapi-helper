var app = angular.module('swapiWebApp');

app.controller('home', ['$scope', 'SwapiService', function($scope, SwapiService) {
  
  $scope.getItemList = function(item) {
    switch(item) {
      case 'people':
        SwapiService.getPeople();
        break;
      case 'films':
        SwapiService.getFilms();
        break;
      case 'planets':
        SwapiService.getPlanets();
        break;
      case 'starships':
        SwapiService.getStarships();
        break;
      case 'species':
        SwapiService.getSpecies();
        break;
      case 'vehicles':
        SwapiService.getVehicles();
        break;
    }
  }

}]);