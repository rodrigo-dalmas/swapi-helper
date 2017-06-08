app.controller('mainController', function($scope, Restangular) {
  var people = Restangular.all('people');
  var planets = Restangular.all('planets');
  var species = Restangular.all('species');
  var starships = Restangular.all('starships');
  var vehicles = Restangular.all('vehicles');
  
  people.getList().then(function(people) {
    $scope.allPeople = people;
  });
});