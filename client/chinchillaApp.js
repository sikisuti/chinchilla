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
    });
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
