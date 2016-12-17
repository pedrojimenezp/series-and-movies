(() => {

  "use strict";

  angular
    .module('SAM', ['ngMaterial', 'ui.router', 'infinite-scroll'])
    .config(($mdThemingProvider, $stateProvider, $urlRouterProvider) => {

      $mdThemingProvider.theme('default')
        .primaryPalette('indigo')
        .accentPalette('cyan');

      $urlRouterProvider.otherwise('/home');

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

