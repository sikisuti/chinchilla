chinchillaApp.controller('cagesController', ['$scope', '$location', '$http', function($scope, $location, $http){

  $scope.selectedGroup = {};

  $http.get('/cage/cages').then(function(cages){
    $scope.cages = cages.data;
  });

  $http.get('/chinchilla/chinchillas').then(function(chins){
    $scope.chins = chins.data;
  });

  $scope.filterCagesByGroupAndType = function(group){
    return function(cage){
      return cage.groupNumber == group.groupNumber && cage.type == group.type;
    };
  };

  $scope.filterChinchillasByCage = function(cageId, ageTypes, sexes){
    return function(chin){
      if (chin.cageIds != undefined){
        return ageTypes.includes(chin.ageType) && sexes.includes(chin.sex) && chin.cageIds.includes(cageId);
      }
    };
  };

  $scope.saveCage = function(cage){
    console.log(cage);
    console.log(angular.toJson(cage));
    $http.post('/cage/cage', cage, {headers:{'Content-Type':'application/json'}})
      .then(function(response){

      }, function(err){console.log(err);});
  };

  $scope.selectGroup = function(cage){
    $scope.selectedGroup = cage;
  };
}]);
