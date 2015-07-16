angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    Parse.initialize("W50XVPDzbi8YiCZTYPPuzBAOrWfQJA6BfTc7BcxP","i6MMAG4GceHNuanQl3YKgynAMFvSum3C5DVD9P3u");
  });
})
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('tab',{
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
    .state('tab.home',{
      url:'/home',
      views:{
        'tab-home':{
          templateUrl:'templates/home.html',
          controller:'homectrl'
        }
      }
    }).state('tab.about',{
      url:'/about',
      views:{
        'tab-about':{
          templateUrl:'templates/about.html',
          controller:'aboutctrl'
        }
      }
    })
    .state('tab.detaillist',{
      url:'/home/:id',
      views:{
        'tab-home':{
          templateUrl:'templates/detail.html',
          controller:'detailctrl'
        }
      }
    })
    .state('tab.persona',{
      url:'/persona',
      views:{
        'tab-persona':{
          templateUrl:'templates/persona.html',
          controller:'personactrl'
        }
      }
    });

  $urlRouterProvider.otherwise('/tab/home');

});
