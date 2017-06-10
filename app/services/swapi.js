var app = angular.module('swapiWebApp');

app.service('SwapiService', function($http) {

  const urlBase = "http://swapi.co/api/";
  
  function getPeople() {
    var result;
    $http.get(urlBase + 'people')
      .then(function(response){
        result = response.data;
        return result;
      }, function errorCallback(message) {
        console.log("Error getting PEOPLE: " + message);
      });
  }
  
  function getPlanets() {
    var result;
    $http.get(urlBase + 'planets')
      .then(function(response){
        result = response.data;
        return result;
      }, function errorCallback(message) {
        console.log("Error getting PLANETS: " + message);
      });
  }
  
  function getStarships() {
    var result;
    $http.get(urlBase + 'starships')
      .then(function(response){
        result = response.data;
        return result;
      }, function errorCallback(message) {
        console.log("Error getting STARSHIPS: " + message);
      });
  }
  
  function getVehicles() {
    var result;
    $http.get(urlBase + 'vehicles')
      .then(function(response){
        result = response.data;
        return result;
      }, function errorCallback(message) {
        console.log("Error getting VEHICLES: " + message);
      });
  }
  
  function getFilms() {
    var result;
    $http.get(urlBase + 'films')
      .then(function(response){
        result = response.data;
        return result;
      }, function errorCallback(message) {
        console.log("Error getting FILMS: " + message);
      });
  }
  
  function getSpecies() {
    var result;
    $http.get(urlBase + 'species')
      .then(function(response){
        result = response.data;
        return result;
      }, function errorCallback(message) {
        console.log("Error getting SPECIES: " + message);
      });
  }
  
});
