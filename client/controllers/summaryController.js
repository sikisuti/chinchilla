chinchillaApp.controller('summaryController', ['$scope', '$location', 'chinchillaService',
    function($scope, $location, chinchillaService){

  chinchillaService.getChinchillas(false, function(chins){
    $scope.chinchillas = chins;

    $scope.countFilter = function(criteria){
      return $scope.chinchillas.filter(function(chin){
        return (!criteria.ageType || chin.ageType == criteria.ageType) &&
                (!criteria.sex || chin.sex == criteria.sex) &&
                !chin.leave;
      }).length;
    };

    $scope.$applyAsync();
  });


}]);
