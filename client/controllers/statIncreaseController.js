chinchillaApp.controller('statIncreaseController', ['$scope', '$location', 'chinchillaService',
    function($scope, $location, chinchillaService){

  $scope.chins = [];

  chinchillaService.getChinchillas(false, function(chinchillas){
    var i = 0;
    chinchillas.forEach(function(c){
      if (c.inStuff){
        var filteredChin = angular.copy(c);
        var tmpChildren = chinchillas.filter(function(tmp){
          return (c.sex == 'Bak' && tmp.fatherID == c._id) ||
                  (c.sex == 'Nőstény' && tmp.motherID == c._id);
        });
        var bd = new Date(c.birthDate);
        var growDate = new Date(bd.getFullYear(), bd.getMonth(), bd.getDate(), 0, 0, 0, 0);
        bd.setMonth(bd.getMonth() + 8);
        var div = (new Date() - bd) / (1000 * 60 * 60 * 24 * 365 * 100);
        filteredChin.point = Math.round(tmpChildren.length / (div == 0 ? 1 : div)) / 100;
        $scope.chins.push(filteredChin);
      }
    });

    $scope.$applyAsync();

  });



}]);
