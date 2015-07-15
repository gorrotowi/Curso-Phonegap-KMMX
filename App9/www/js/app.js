angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
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
    });

  $urlRouterProvider.otherwise('/tab/home');

});
