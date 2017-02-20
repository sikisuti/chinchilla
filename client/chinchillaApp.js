var chinchillaApp = angular.module('chinchillaApp', ['ngRoute', 'ui.bootstrap', 'ngMaterial']);

chinchillaApp.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: '/views/summary.html',
      controller: 'summaryController'
    })
    .when('/chinchillas', {
      templateUrl: '/views/chinchillas.html',
      controller: 'chinchillasController'
    })
    .when('/newChinchilla', {
      templateUrl: '/views/newChinchilla.html',
      controller: 'newChinchillaController'
    })
    .when('/cages', {
      templateUrl: '/views/cages.html',
      controller: 'cagesController'
    })
    .when('/stat/summary', {
      templateUrl: '/views/summary.html',
      controller: 'summaryController'
    })
    .when('/stat/increase', {
      templateUrl: '/views/statIncrease.html',
      controller: 'statIncreaseController'
    });
});

chinchillaApp.filter('distinctCageGroupsFilter', function(){
  return function(items){
    if (items == undefined) {return;}
    var filteredList = [];
    items.forEach(function(item){
      var found = false;
      for (var i = 0; i < filteredList.length; i++) {
        if (item.groupNumber == filteredList[i].groupNumber && item.type == filteredList[i].type){
          found = true;
          break;
        }
      }

      if (!found){
        filteredList.push(item);
      }
    });

    return filteredList;
  };
});

chinchillaApp.service('sharedProperties', function () {
    var property = 'First';

    return {
        getProperty: function () {
            return property;
        },
        setProperty: function(value) {
            property = value;
        }
    };
});

chinchillaApp.service('chinchillaService', ['$http', function($http){
  var chinchillas;
  var queryInProgress = false;

  return {
    getChinchillas: function(force, callback) {
      if (queryInProgress){
        var retry = setInterval(function(){
          if (!queryInProgress){
            clearInterval(retry);
            callback(chinchillas);
          }
        }, 1000);
      } else {
        if (force || chinchillas == undefined) {
          queryInProgress = true;
          $http.get('/chinchilla/chinchillas').then(function(chins){
            queryInProgress = false;
            chinchillas = chins.data;
            callback(chinchillas);
          }, function(err){console.log(err)});
        } else {
          callback(chinchillas);
        }
      }
    },

    insertChinchilla: function(chin, callback) {
      $http.post('/chinchilla/chinchilla', chin, {headers:{'Content-Type':'application/json'}})
        .then(function(response){
          queryInProgress = true;
          $http.get('/chinchilla/chinchillas').then(function(chins){
            queryInProgress = false;
            chinchillas = chins.data;
            callback(chin);
          }, function(err){console.log(err)});
        }, function(err){console.log(err);});
    }
  };
}]);

chinchillaApp.service('staticData', function(){
  this.getBodyParts = function(){
    return [
      {bodyPart: "Fej", partSign: "fe"},
      {bodyPart: "Hát", partSign: "h"},
      {bodyPart: "Far", partSign: "fa"},
      {bodyPart: "Nyak", partSign: "ny"},
      {bodyPart: "Oldal", partSign: "o"},
      {bodyPart: "Több helyen", partSign: "th"},
      {bodyPart: "Minőségi osztály", partSign: "cl"}
    ]
  };

  this.getFailTypes = function(){
    return [
      {failType: "Avas", failSign: "A"},
      {failType: "Barna", failSign: "B"},
      {failType: "Csúszott", failSign: "Cs"},
      {failType: "Éretlen", failSign: "É"},
      {failType: "Filces", failSign: "F"},
      {failType: "Hártyás", failSign: "H"},
      {failType: "Kicsi", failSign: "Ki"},
      {failType: "Kopott", failSign: "K"},
      {failType: "Lépcsős", failSign: "L"},
      {failType: "Öreg", failSign: "Ö"},
      {failType: "Penészes", failSign: "P"},
      {failType: "Rágott", failSign: "R"},
      {failType: "Ritka", failSign: "Ri"},
      {failType: "Sárga", failSign: "Sg"},
      {failType: "Szakadt", failSign: "Sz"},
      {failType: "Szőrforgós", failSign: "Szf"},
      {failType: "Szőrlyukas", failSign: "J"},
      {failType: "Szürke has", failSign: "Szü"},
      {failType: "Tépett", failSign: "T"},
      {failType: "Utánnövés", failSign: "U"},
      {failType: "Vadzsíros", failSign: "Vd"},
      { failType: "Világos", failSign: "Vi"},
      {failType: "Vörös", failSign: "Vö"},
      {failType: "Zsíros", failSign: "Zs"}
    ]
  };
});
