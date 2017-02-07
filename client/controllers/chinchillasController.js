chinchillaApp.controller('chinchillasController', ['$scope', '$http', function($scope, $http){

  $scope.chinchillas = [];
  $scope.breeders = [];
  $scope.selectedChin = {
    breeder: {
      breederNumber: ''
    },
    birthYearChar: '',
    yearCounter: ''
  };

  $http.get('/chinchilla/chinchillas').then(function(response){
    $scope.chinchillas = response.data;
  });

  $http.get('/chinchilla/breeders').then(function(response){
    $scope.breeders = response.data;
  });

  $scope.selectChin = function(chin){
    $scope.selectedChin = chin;
    $http.get('/chinchilla/chinchilla/' + chin.motherID).then(function(response){
      $scope.selectedChin.mother = response.data;
    });
    $http.get('/chinchilla/chinchilla/' + chin.fatherID).then(function(response){
      $scope.selectedChin.father = response.data;
    });
    $http.get('/chinchilla/chinchilla/' + chin.nannyID).then(function(response){
      $scope.selectedChin.nanny = response.data;
    });
  }

  $scope.criteriaMatch = function(criteria) {
    return function(chin) {
      var concatenated = chin.breeder.breederNumber + chin.birthYearChar + chin.yearCounter;
      return !criteria || concatenated.toLowerCase().indexOf(criteria.toLowerCase()) !== -1;
    }
  };

}]);
