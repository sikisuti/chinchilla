chinchillaApp.controller('mainCtrl', ['$scope', '$location', '$http', function($scope, $location, $http){

  $scope.navChinchillas = function(){
    $location.path('/chinchillas');
  };

}]);
