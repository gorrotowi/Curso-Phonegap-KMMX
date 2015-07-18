angular.module('starter', ['ionic', 'ngCordova'])

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
.config(function($cordovaFacebookProvider) {
  var appID = 816824881767080;
  var version = "v2.4";
  if (window.cordova.platformId == "browser") {
    facebookConnectPlugin.browserInit(appID, version);
  }
})
.controller('fbshareController', function($scope, $cordovaFile) {

  $scope.status = "Desconectado"

  document.addEventListener('deviceready', function() {

    $scope.$apply(function () {
      $scope.baseurl = cordova.file.applicationDirectory;
    })

    $scope.loginFB = function(){
        facebookConnectPlugin.login(['public_profile','user_friends','read_custom_friendlists'], function(success) {
          $scope.$apply(function() {
            $scope.status = success.status;
          })
        }, function(error) {
          alert(error)
        })
    }

    $scope.shareFB = function(){
      if ($scope.status == "connected") {
            facebookConnectPlugin.showDialog({
              method:'feed',
              // picture: $scope.baseurl+"www/"+document.getElementById('imgionic').src,
              name:'Post ionic',
              message:'Imagen desde ionic',
              caption: 'Prueba desde ionic con fb',
              description: 'Primer post con ionic a fb'
            }, function(success) {
              alert(JSON.stringify(success))
            }, function(error) {
              alert(JSON.stringify(error))
            });
      } else {
        alert('Logeate en FB primero')
      }
    }
  },false);

})
