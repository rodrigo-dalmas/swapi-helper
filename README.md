# SWAPI - Another AngularJS service to get data from Swapi
For more info on the SWAPI API, go to www.swapi.co.

The service is promise oriented at most and get data from [swapi.co](http://swapi.co) for AngularJS applications.

The `swapi` service comes with one angular constant `endpoints`, used internally and exposed by the main service `swapi`.

To use the service just download the [minified version](https://github.azc.ext.hp.com/rodrigo-dalmas/swapi-helper/blob/master/dist/services/swapi.min.js) file and import the service in your AngularJS controller.

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

For more information on how to use the service, please refer to the demo project (angular) to check out how it was fully implemented.

## Installation

downloading directly the [minified version](https://github.azc.ext.hp.com/rodrigo-dalmas/swapi-helper/blob/master/dist/services/swapi.min.js).

## Demo Web App

* download the zip project
* start the terminal
* type `gulp all` and wait the browser to be open
* ENJOY!
* ps.: don't miss the ABOUT page. :)

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

In your javascript:

```javascript
// include the 'resolve' option like this
$stateProvider
    .state('home', {
      url: '',
      templateUrl: "partials/home.html",
      controller: "home",
      resolve: {
        'ResourceList': function (SwapiService) {
          return SwapiService.promise;
        }
      }
    })
```

In your controller:

//just use the method provided by the service, assigning the list to a variable on scope
```javascript
$scope.uriList = SwapiService.getResourcesAsync();
```

* `getData(url)` get data from the given URL
* `getSpecificData(url, id)` get specific data from the given URL

About the demo page:

### MWM Framework
* Angular (https://angularjs.org/)

`WHY?`
* Performance, organization, great echosystem, quick to develop.

### Front End
* It was used FlexBoxGrid (http://flexboxgrid.com/) and Bootstrap (for the top bar only - css) to build the front end.

`WHY?`
* Flexboxgrid provides a subset of classes that transform your page and add superb compatibility for each viewport.
* Bootstrap can be used, as well as flexboxgrid, to responsiveness and to get components ready. In this case, it was used to get the topbar, which has a great design by the way.

### Directory organization
The approach of the directory organization was to separate controllers, directives, templates and so on, to allow the project to grow up.

```javascript
- App
    -> controllers
    -> directives
    -> js
    -> partials
    -> templates
    -> src (images)
    -> test
```

### Task runner
* Gulp (http://gulpjs.com/)

`WHY?`
* Gulp is the best way to automate and generate minified files, sprites, css and put all of this in a dist folder. It helps A LOT!
