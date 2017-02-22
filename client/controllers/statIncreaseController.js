chinchillaApp.controller('statIncreaseController', ['$scope', '$location', 'chinchillaService',
    function($scope, $location, chinchillaService){

  var chins = [];

  chinchillaService.getChinchillas(false, function(chinchillas){

    chinchillas.forEach(function(chin){
      if (chin.inStuff && chin.ageType.includes('Tenyész')){
        var parent = angular.copy(chin);
        parent.pairs = [];

        // fill pairs in the same cage
        var cageSharers = chinchillas.filter(function(tmp){
          return (parent.sex == 'Bak' && tmp.sex == 'Nőstény' && tmp.cageIds != undefined && parent.cageIds.includes(tmp.cageIds[0])) ||
                  (parent.sex == 'Nőstény' && tmp.sex == 'Bak' && tmp.cageIds != undefined && tmp.cageIds.includes(parent.cageIds[0]));
        });
        cageSharers.forEach(function(tmp){
          tmp.children = [];
          parent.pairs.push(angular.copy(tmp));
        });

        // find children
        var children = chinchillas.filter(function(tmp){
          return (chin.sex == 'Bak' && tmp.fatherID == chin._id) ||
                  (chin.sex == 'Nőstény' && tmp.motherID == chin._id);
        });

        // find children other parent
        for (var j = 0; j < children.length; j++){
          var otherParent = chinchillas.find(function(tmp){
            return (parent.sex == 'Bak' && tmp._id == children[j].motherID) ||
                  (parent.sex == 'Nőstény' && tmp._id == children[j].fatherID)
          });
          var existingOtherParent = parent.pairs.find(function(tmp){return tmp._id == otherParent._id});
          if (existingOtherParent != undefined){
            existingOtherParent.children.push(children[j]);
          } else {
            otherParent.children = [];
            otherParent.children.push(children[j]);
            parent.pairs.push(angular.copy(otherParent));
          }
        };

        // calculate other parents' points
        parent.pairs.forEach(function(otherParent){
          var otherParentBirthDate = new Date(otherParent.birthDate);
          var otherDiv = (new Date() - (otherParentBirthDate.setMonth(otherParentBirthDate.getMonth() + 8))) / (1000 * 60 * 60 * 24 * 365 * 100);
          otherParent.point = Math.round(otherParent.children.length / (otherDiv == 0 ? 1 : otherDiv)) / 100;
        });

        // calculate parent's point
        var parentBirthDate = new Date(parent.birthDate);
        var div = (new Date() - (parentBirthDate.setMonth(parentBirthDate.getMonth() + 8))) / (1000 * 60 * 60 * 24 * 365 * 100);
        parent.point = Math.round(children.length / (div == 0 ? 1 : div)) / 100;
        chins.push(parent);
      }
    });

    console.log(chins);
    $scope.chins = chins;

    $scope.$applyAsync();

  });



}]);
