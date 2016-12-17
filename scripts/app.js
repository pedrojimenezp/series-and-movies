(() => {

  "use strict";

  angular
    // Se crea el modulo SAM (Search And Movies) y
    //Se inyectan Angular-Material y infinite-scroll
    .module('SAM', ['ngMaterial', 'ui.router', 'infinite-scroll'])
    .config(($mdThemingProvider, $stateProvider, $urlRouterProvider) => {

      //Se configura el tema por defecto de angular material
      $mdThemingProvider.theme('default')
        .primaryPalette('indigo')
        .accentPalette('cyan');

      $urlRouterProvider.otherwise('/home');

      // Solo hay 2 vistas, home que es donde se va a buscar las peliculas y details que es donde se ven los detalles
      $stateProvider
        .state('home', {
          url: '/home?q',
          templateUrl: 'components/home/home.tpl.html',
          controller: 'homeController as vm'
        })
        .state('details', {
          url: '/details/:postId?q',
          templateUrl: 'components/details/details.tpl.html',
          controller: 'detailsController as vm'
        })
    });

})();

