var app = angular.module('swapiWebApp');

app.service('SwapiService', function($http) {

  const urlBase = "http://swapi.co/api/";
  var result = {};
  
  function request(path) {
    return $http.get(path)
      .then(function(resp) {
        result = resp;
        return resp.data;
      }, function error(message) {
      console.log("Error getting data at: " + path + "/n Check the error message: " + message);
    });
  }
  
  return {
    getPeople: function() {
      request(urlBase + 'people');
    },
    getPlanets: function() {
      request(urlBase + 'planets');
    },
    getStarships: function() {
      request(urlBase + 'starships');
    },
    getVehicles: function() {
      request(urlBase + 'vehicles');
    },
    getFilms: function() {
      request(urlBase + 'films');
    },
    getSpecies: function() {
      request(urlBase + 'species');
    },
  };
});
