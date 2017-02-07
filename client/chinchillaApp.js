var chinchillaApp = angular.module('chinchillaApp', ['ngRoute']);

chinchillaApp.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: '/views/home.html',
      controller: 'homeController'
    })
    .when('/chinchillas', {
      templateUrl: '/views/chinchillas.html',
      controller: 'chinchillasController'
    });
});
