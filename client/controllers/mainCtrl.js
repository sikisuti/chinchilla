chinchillaApp.controller('mainCtrl', ['$scope', '$location', '$http', function($scope, $location, $http){

  $scope.nav = function(path){
    $location.path(path);
  };

}]);
