chinchillaApp.controller('newChinchillaController', ['$scope', '$http', '$location', 'sharedProperties', '$mdDialog',
  function($scope, $http, $location, sharedProperties, $mdDialog){

  $scope.sexes = ['Nem eldönthető', 'Nőstény', 'Bak'];
  $scope.colors = [
    {
      colorDenomination: 'Standard',
      colorShortName: 'St'
    },
    {
      colorDenomination: 'Black',
      colorShortName: 'Bl'
    }
  ];
  $http.get('/chinchilla/chinchillas').then(function(chins){
    $scope.chins = chins.data;
  });

  if (sharedProperties.getProperty() != null){
    $scope.chin = sharedProperties.getProperty();
    var colorIndex = $scope.colors.map(function(e){return e.colorShortName}).indexOf($scope.chin.color.colorShortName);
    $scope.chin.color = $scope.colors[colorIndex];
    $scope.chin.birthDate = new Date($scope.chin.birthDate);
    if ($scope.chin.separateDate != undefined){
      $scope.chin.separateDate = new Date($scope.chin.separateDate);
    }
    sharedProperties.setProperty(null);
  } else {
    $scope.chin = {
      color: $scope.colors[0]
    };
  }

  $http.get('/chinchilla/breeders').then(function(breeders){
    $scope.breeders = breeders.data;
    if ($scope.chin.breederId == undefined){
      $scope.chin.breederId = breeders.data[0]._id;
    }

    $http.get('/config/actualYearChar').then(function(yearChar){
      if ($scope.chin.birthYearChar == undefined){
        $scope.chin.birthYearChar = yearChar.data;
      }

      if ($scope.chin.yearCounter == undefined){
        refreshYearCounter();
      }
    });
  });

  $http.get('/cage/cages').then(function(cages){
    $scope.cages = cages.data;
  });

  var refreshYearCounter = function(){
    $http.get('/chinchilla/nextYearCounter?breederId=' + $scope.chin.breederId + '&yearChar=' + $scope.chin.birthYearChar)
      .then(function(yearCounter){
        $scope.chin.yearCounter = yearCounter.data.counter;
      });
  }

  $scope.breederChanged = function(){
    refreshYearCounter();
  };

  $scope.yearCharChanged = function(){
    refreshYearCounter();
  };

  $scope.submit = function(ev){
    $http.post('/chinchilla/chinchilla', angular.toJson($scope.chin), {headers:{'Content-Type':'application/json'}})
      .then(function(response){
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title(($scope.chin._id == undefined ? 'Létrehozás' : 'Módosítás') + ' sikeres!')
            .textContent()
            .ariaLabel('Alert Dialog Demo')
            .ok('Ok')
            .targetEvent(ev)
        ).finally(function(){$location.path('/chinchillas');});

      }, function(err){
        console.log(err);
      });
  };

  $scope.cancel = function(){
    $location.path('/chinchillas');
  };

  $scope.outOfStuffChanged = function(ev){
    if (!$scope.chin.inStuff){
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'views/getOutOfStuff.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:false,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(function(answer) {
        console.log(answer);
      }, function() {
        console.log('You cancelled the dialog.');
      });
    }
  };

  function DialogController($scope, $mdDialog, staticData) {

    $scope.bodyParts = staticData.getBodyParts();
    $scope.failTypes = staticData.getFailTypes();
    $scope.leave = {};
    $scope.leave.fails = [];

    $scope.addFail = function(fail){
      if ($scope.fail && $scope.fail.bodyPart && $scope.fail.failType) {
        $scope.leave.fails.push(angular.copy(fail));
        $scope.fail = undefined;
      }
    };

    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(leave) {
      $mdDialog.hide(leave);
    };
  }

}]);
