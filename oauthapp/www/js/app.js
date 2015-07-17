// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

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
.config(function($cordovaFacebookProvider) {
  var appID = 816824881767080;
  var version = "v2.4"; // or leave blank and default is v2.0
  // $cordovaFacebookProvider.browserInit(appID, version);
  if (window.cordova.platformId == "browser") {
    facebookConnectPlugin.browserInit(appID, version);
    // version is optional. It refers to the version of API you may want to use.
}
})
.controller('mycontroller', function($scope) {

  $scope.callfriends = function () {
    alert('pull!')
    setTimeout(function () {
      $scope.$broadcast('scroll.refreshComplete');
    }, 1500);
    // $scope.$broadcast('scroll.refreshComplete');
  }

    document.addEventListener('deviceready', function() {

      facebookConnectPlugin.login(
        ["public_profile", "email", "user_friends","read_custom_friendlists"],
        function(success) {
          $scope.$apply(function() {
            $scope.facebookdata = success
          });
          getFriends();
      },
      function(error) {
        alert("error login "+error)
      })

    }, false);

function getFriends() {
  // facebookConnectPlugin.api('/'+$scope.facebookdata.authResponse.userID+"/friendlists?fields=name",["read_custom_friendlists"], function(successfriends) {
  // facebookConnectPlugin.api('/me/friends',["read_custom_friendlists"], function(successfriends) {
  facebookConnectPlugin.api('/me/taggable_friends?&limit=50',["read_custom_friendlists"], function(successfriends) {
      $scope.$apply(function() {
        $scope.friendlist = successfriends.data
        $scope.friendlistpagin = successfriends
        // $scope.userdatafb = successfriends
      })
  }, function (errorfriends) {
    alert("error amigos "+errorfriends)
  })
}

})
