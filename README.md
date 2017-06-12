# SWAPI - Another AngularJS service to get data from Swapi
For more info on the SWAPI API, go to www.swapi.co.

The service is promise oriented at most and get data from [swapi.co](http://swapi.co) for AngularJS applications.

The `swapi` service comes with one angular constant `endpoints`, used internally and exposed by the main service `swapi`.

To use the service just download the `swapi.js` file and import the service in your AngularJS controller.

In your javascript:

```javascript
// include the service
angular.module('myApp', ['$scope']).

controller('jediController', ['swapi',
  function($scope, SwapiService) {

    // To get all people from the service:
    #Option 1 - using global method 'getData':
    SwapiService.getData('http://resource/to/people/api/').
        then(function(allPeople){
          $scope.everybody = allPeople;
        });

    #Option 2 - using specific method 'getAllPeople':
    SwapiService.getAllPeople().
        then(function(allPeople){
          $scope.everybody = allPeople;
        });
  }
])
```

Inside your view template:

```html
<ul ng-repeat="person in everybody">
  <li>Name: {{person.name}}</li>
  <li>Eyes color: {{person.eye_color}}</li>
  <li>Skin color: {{person.skin_color}}</li>
</ul>
```

## Installation

downloading directly the [minified version](https://github.azc.ext.hp.com/rodrigo-dalmas/swapi-helper/blob/master/dist/services/swapi.min.js).

## Service API

Every resource exposed by **swapi.com** has 3 methods are available:

* get specific data by id
* get all data for a given resource
* get JSON Schema for a given resource

Complete API, all methods return a promise.

### film

* `getFilm(id)` return just the film for the given id.
* `getAllfilms()` return all films.
* `getFilmSchema()` return the JSON Schema for the `film` resource.

### people

* `getPerson(id)` return just the person for the given id.
* `getAllPeople()` return all people.
* `getPeopleSchema()` return the JSON Schema for the `people` resource

### planets

* `getPlanet(id)` return just the planet for the given id.
* `getAllPlanets()` return all planets paginated.
* `getPlanetSchema()` return the JSON Schema for the `planet` resource

### species

* `getSpecie(id)` return just the specie for the given id.
* `getAllSpecies()` return all species paginated.
* `getSpeciesSchema()` return the JSON Schema for the `species` resource

### starships

* `getStarship(id)` return just the starship for the given id.
* `getAllStarships()` return all starships paginated.
* `getStarshipSchema()` return the JSON Schema for the `starship` resource

### vehicles

* `getVehicle(id)` return just the vehicle for the given id.
* `getAllVehicles()` return all vehicles paginated.
* `getVehicleSchema()` return the JSON Schema for the `vehicle` resource

### additional methods

* `getUrlBase` return just the base URL of the Swapi base
* `getResources()` return the available REST resources
* `getResourcesAsync()` load all available REST resources async (please see instructions below)
* `getData(url)` get data from the given URL
* `getSpecificData(url, id)` get specific data from the given URL

