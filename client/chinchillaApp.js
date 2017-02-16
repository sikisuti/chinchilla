var chinchillaApp = angular.module('chinchillaApp', ['ngRoute', 'ui.bootstrap', 'ngMaterial']);

chinchillaApp.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: '/views/home.html',
      controller: 'homeController'
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
