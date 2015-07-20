// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
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
    .state('movies',{
      url:'/',
      templateUrl:"templates/movies.html",
      controller:'moviesCtrl'
    })
    .state('moviedetail',{
      url:'/moviedetail',
      templateUrl:"templates/moviedetail.html",
      controller:'moviedetailCtrl'
    })

    $urlRouterProvider.otherwise('/');

})
.controller('moviesCtrl', function($scope, $http) {
  $http.get("http://api.themoviedb.org/3/discover/movie?api_key=74d99dff7456accfbf8585d063760134")
    .success(function(success) {
      $scope.movies = success.results
      // alert($scope.movies.length)
      for (var i = 0; i < $scope.movies.length; i++) {
          console.log($scope.movies[i].poster_path)
      }
    })
    .error(function(error) {
      alert(error)
    });

})
.controller('moviedetailCtrl', function($scope) {
  $scope.title = "titulo de la pelicula"
})
