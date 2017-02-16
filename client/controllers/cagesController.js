chinchillaApp.controller('cagesController', ['$scope', '$location', '$http', function($scope, $location, $http){

  $scope.selectedGroup = {};

  $http.get('/cage/cages').then(function(cages){
    $scope.cages = cages.data;
  });

  $scope.filterCagesByGroupAndType = function(group){
    return function(cage){
      return cage.groupNumber == group.groupNumber && cage.type == group.type;
    };
  };

  $scope.selectGroup = function(cage){
    $scope.selectedGroup = cage;
  };
}]);
