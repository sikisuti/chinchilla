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
    var tmpCageIds = [];

    var inStuffAndHasMotherList = chinchillas.filter(function(chin){
      return  chin.motherCageIds != undefined &&
              chin.leave == undefined &&
              chin.cageIds[0] == chin.motherCageIds[0];
    });

    inStuffAndHasMotherList.forEach(function(chin){
      if (!chin.cages[0].isClosed && tmpCageIds.indexOf(chin.cages[0]._id == -1)){
        var closeDate = new Date(chin.birthDate);
        closeDate.setDate(closeDate.getDate() + 5);
        var closeInDays = Math.floor((closeDate - new Date()) / (1000 * 60 * 60 * 24))
        tmpCageIds.push(chin.cages[0]._id);
        rtnList.push({
          inDays: closeInDays,
          description: '(' + closeInDays + 'nap) ' + chin.cages[0].groupNumber + '/' + chin.cages[0].cageNumber + ' ketrecet zárd le.'
        });
      }
      var separateDate = new Date(chin.birthDate);
      separateDate.setDate(separateDate.getDate() + 50);
      var separateInDays = Math.floor((separateDate - new Date()) / (1000 * 60 * 60 * 24))
      rtnList.push({
        inDays: separateInDays,
        description: '(' + separateInDays + 'nap) ' + chin.idNumber + ' leválasztása. Ketrec: ' + chin.cages[0].groupNumber + '/' + chin.cages[0].cageNumber
      });
    });

    console.log(rtnList);
    return rtnList;
  };

}]);
