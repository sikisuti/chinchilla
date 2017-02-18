chinchillaApp.controller('mainCtrl', ['$scope', '$location', 'chinchillaService', function($scope, $location, chinchillaService){

  var chinchillas;
  $scope.actions = [];

  chinchillaService.getChinchillas(function(chins){
    chinchillas = chins;
    $scope.actions = $scope.actions.concat(gainSeparateActions());
  });

  $scope.nav = function(path){
    $location.path(path);
  };

  var gainSeparateActions = function(){

    var rtnList = [];

    var inStuffAndHasMotherList = chinchillas.filter(function(chin){
      return  chin.motherCageIds != undefined &&
              chin.leave == undefined &&
              chin.cageIds[0] == chin.motherCageIds[0];
    });

    inStuffAndHasMotherList.forEach(function(chin){
      var actionDate = new Date(chin.birthDate);
      actionDate.setDate(actionDate.getDate() + 50);
      var inDays = Math.floor((actionDate - new Date()) / (1000 * 60 * 60 * 24))
      rtnList.push({
        inDays: inDays,
        description: '(' + inDays + 'nap) ' + chin.idNumber + ' leválasztása. Ketrec: ' + chin.cages[0].groupNumber + '/' + chin.cages[0].cageNumber
      });
    });

    console.log(rtnList);
    return rtnList;
  };

}]);
