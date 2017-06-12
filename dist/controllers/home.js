var app = angular.module('swapiApp');

app.controller('home', function($scope, SwapiService) {
  $scope.uriList = SwapiService.getResourcesAsync();
  
  var uriArray = Object.values($scope.uriList);
  $scope.resourceList = uriArray.map(function(elem) {
    return elem.substr(0, elem.length - 1).split('/').pop();
  });

  $scope.data;
  
  $scope.getData = function(resource, id) {
    if (angular.isDefined(id) && id !== "") {
      SwapiService.getSpecificData(resource, id).then(function (resp) {
        $scope.data = resp;
      });
    } else {
      SwapiService.getData(resource).then(function (resp) {
        $scope.data = resp;
      });
    }
  };
  
  $scope.id = undefined;
});
