var app = angular.module('swapiApp');

app.service('SwapiService', function($http, $q, swapiResources) {

  const urlBase = "http://swapi.co/api/";
  const separator = '/';
  const schema = 'schema'
  var resources = {};

  function generateUrl(resource, id) {
    if (angular.isDefined(id)) {
      return urlBase + resource + separator + id;
    } else {
      return urlBase + resource;
    }
  }

  var resourceList = $http.get(urlBase).then(function (list) {
    resources = list.data;
  });
  
  function generateUrlSchema(resource) {
    return urlBase + resource + separator + schema;
  }

  function request(path) {
    return $http.get(path);
  }
  
  function requestSpecific(path, id) {
    var specificPath = path + id + separator;
    return $http.get(specificPath);
  }
  
  return {
    promise: resourceList,
    getResourcesAsync: function() {
      return resources;
    },
    getUrlBase: function() {
      return urlBase;
    },
    getResources: function() {
      return request(urlBase);
    },
    getData: function(url) {
      return request(url);
    },
    getSpecificData: function(url, id) {
      return requestSpecific(url, id);
    },
    getAllPeople: function() {
      return request(generateUrl(swapiResources.PEOPLE));
    },
    getPerson: function(id) {
      return request(generateUrl(swapiResources.PEOPLE, id));
    },
    getPeopleSchema: function() {
      return request(generateUrlSchema(swapiResources.PEOPLE));
    },
    getAllPlanets: function() {
      return request(generateUrl(swapiResources.PLANETS));
    },
    getPlanet: function(id) {
      return request(generateUrl(swapiResources.PLANETS, id));
    },
    getPlanetSchema: function() {
      return request(generateUrlSchema(swapiResources.PLANETS));
    },
    getAllStarships: function() {
      return request(generateUrl(swapiResources.STARSHIPS));
    },
    getStarship: function(id) {
      return request(generateUrl(swapiResources.STARSHIPS, id));
    },
    getStarshipSchema: function() {
      return request(generateUrlSchema(swapiResources.STARSHIPS));
    },
    getAllVehicles: function() {
      return request(generateUrl(swapiResources.VEHICLES));
    },
    getVehicle: function(id) {
      return request(generateUrl(swapiResources.VEHICLES, id));
    },
    getVehicleSchema: function() {
      return request(generateUrlSchema(swapiResources.VEHICLES));
    },
    getAllFilms: function() {
      return request(generateUrl(swapiResources.FILMS));
    },
    getFilm: function(id) {
      return request(generateUrl(swapiResources.FILMS, id));
    },
    getFilmSchema: function() {
      return request(generateUrlSchema(swapiResources.FILMS));
    },
    getAllSpecies: function() {
      return request(generateUrl(swapiResources.SPECIES));
    },
    getSpecie: function(id) {
      return request(generateUrl(swapiResources.SPECIES, id));
    },
    getSpecieSchema: function() {
      return request(generateUrlSchema(swapiResources.SPECIES));
    },
  };
});
