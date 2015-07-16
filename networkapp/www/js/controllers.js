angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $rootScope, $cordovaNetwork) {


  document.addEventListener("deviceready", function () {
        // alert("network "+$cordovaNetwork.getNetwork())
        // alert("state "+$cordovaNetwork.isOnLine())
         $scope.networktype = $cordovaNetwork.getNetwork();
         $scope.networkAv = $cordovaNetwork.isOnline()


         $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
           $scope.$apply(function() {
             $scope.networkstate = networkState;
           })
         })

         $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
           $scope.$apply(function() {
             $scope.networkstate = networkState;
           })
         })
 }, false);

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
