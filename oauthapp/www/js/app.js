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
  var version = "v2.4"; // or leave blank and default is v2.0
  // $cordovaFacebookProvider.browserInit(appID, version);
  if (window.cordova.platformId == "browser") {
    facebookConnectPlugin.browserInit(appID, version);
    // version is optional. It refers to the version of API you may want to use.
}
})
.controller('mycontroller', function($scope) {

  $scope.friendlists = null
  $scope.cancelmore = false

  $scope.callfriends = function () {
    alert('pull!')
    setTimeout(function () {
      $scope.$broadcast('scroll.refreshComplete');
    }, 1500);
    $scope.$broadcast('scroll.refreshComplete');
  }

    document.addEventListener('deviceready', function() {
      facebookConnectPlugin.login(
        ["public_profile", "email", "user_friends","read_custom_friendlists"],
        function(success) {
          $scope.$apply(function() {
            $scope.facebookdata = success
          });
          $scope.$apply(function () {
            $scope.cancelmore = true
          })
          $scope.loadMore();
      },
      function(error) {
        alert("error login "+error)
      })
    }, false);

    $scope.cancelmore = function () {
      facebookConnectPlugin.getLoginStatus(function(succes) {
        if (succes.status == 'connected'){
          return true
        }else {
          return false
        }
      }, function (error) {
        alert('fallo login status')
      })
    }

    $scope.loadMore = function () {
      if ($scope.friendlist == null) {
        getFriends();
      } else {
        getMoreFriends($scope.friendlistpagin.paging.cursors.after);
      }

    }

      function getFriends() {
        // facebookConnectPlugin.api('/'+$scope.facebookdata.authResponse.userID+"/friendlists?fields=name",["read_custom_friendlists"], function(successfriends) {
        // facebookConnectPlugin.api('/me/friends',["read_custom_friendlists"], function(successfriends) {
        facebookConnectPlugin.api('/me/taggable_friends?&limit=50',["read_custom_friendlists"], function(successfriends) {
            $scope.$apply(function() {
              $scope.friendlist = successfriends.data
              $scope.friendlistpagin = successfriends
              $scope.$broadcast('scroll.infiniteScrollComplete');
            })
        }, function (errorfriends) {
          alert("error amigos "+errorfriends)
          $scope.$broadcast('scroll.infiniteScrollComplete');
        })
      }

      function getMoreFriends(afterUrl) {
        facebookConnectPlugin.api('/me/taggable_friends?&limit=50?after='+afterUrl,["read_custom_friendlists"], function(successfriends) {
            $scope.$apply(function() {
              $scope.friendlist = $scope.friendlist.concat(successfriends.data)
              $scope.$broadcast('scroll.infiniteScrollComplete');
            })
        }, function (errorfriends) {
          alert("error amigos "+errorfriends)
        })
      }
})
