chinchillaApp.controller('chinchillasController', ['$scope', '$http', '$location', 'sharedProperties', 'chinchillaService',
  function($scope, $http, $location, sharedProperties, chinchillaService){

  $scope.chinchillas = [];
  $scope.breeders = [];
  $scope.outsidersHided = true;

  chinchillaService.getChinchillas(false, function(chins){
    $scope.chinchillas = chins;
    $scope.$applyAsync();
  });

  $http.get('/chinchilla/breeders').then(function(response){
    $scope.breeders = response.data;
  });

  $scope.selectChin = function(chin){
    sharedProperties.setProperty(chin);
    $location.path('/newChinchilla');
  }

  $scope.criteriaMatch = function(criteria) {
    return function(chin) {
      var concatenated = chin.breeder.breederNumber + chin.birthYearChar + chin.yearCounter;
      return !criteria || concatenated.toLowerCase().indexOf(criteria.toLowerCase()) !== -1;
    }
  };

  $scope.inStuffFilter = function(criteria) {
    return function(chin) {
      return !criteria || criteria == chin.inStuff;
    }
  };

  $scope.navNewChinchilla = function() {
    sharedProperties.setProperty(null);
    $location.path('/newChinchilla');
  };

}]);
