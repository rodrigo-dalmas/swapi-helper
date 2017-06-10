var app = angular.module('swapiWebApp');

app.service('SwapiService', function($http) {

  const urlBase = "http://swapi.co/api/";
  var result = {};
  
  return {
    getPeople: function() {
      $http.get(urlBase + 'people')
        .then(function(response){
          result = response.data;
          return result;
        }, function errorCallback(message) {
          console.log("Error getting PEOPLE: " + message);
        });
    },
    getPlanets: function() {
      $http.get(urlBase + 'planets')
        .then(function(response){
          result = response.data;
          return result;
        }, function errorCallback(message) {
          console.log("Error getting PLANETS: " + message);
        });
    },
    getStarships: function() {
      $http.get(urlBase + 'starships')
        .then(function(response){
          result = response.data;
          return result;
        }, function errorCallback(message) {
          console.log("Error getting STARSHIPS: " + message);
        });
    },
    getVehicles: function() {
      $http.get(urlBase + 'vehicles')
        .then(function(response){
          result = response.data;
          return result;
        }, function errorCallback(message) {
          console.log("Error getting VEHICLES: " + message);
        });
    },
    getFilms: function() {
      $http.get(urlBase + 'films')
        .then(function(response){
          result = response.data;
          return result;
        }, function errorCallback(message) {
          console.log("Error getting FILMS: " + message);
        });
    },
    getSpecies: function() {
      $http.get(urlBase + 'species')
        .then(function (response) {
          result = response.data;
          return result;
        }, function errorCallback(message) {
          console.log("Error getting SPECIES: " + message);
        });
    },
  };
});
