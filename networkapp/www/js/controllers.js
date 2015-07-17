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
             $scope.networktype = $cordovaNetwork.getNetwork();
             $scope.networkAv = $cordovaNetwork.isOnline()
           })
         })

         $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
           $scope.$apply(function () {
             $scope.networkstate = networkState;
             $scope.networktype = $cordovaNetwork.getNetwork();
             $scope.networkAv = $cordovaNetwork.isOnline()
           })
         })
 }, false);

})

.controller('ChatsCtrl', function($scope, $http, $cordovaGeolocation) {

      $http.get('http://api.citybik.es/v2/networks/ecobici').success(function(response) {
      // $http.get('http://api.citybik.es/ecobici.json').success(function(response) {
          $scope.estaciones = response.network.stations
      }).error(function (error) {
        console.log("Error "+error)

      });

})

.controller('ChatDetailCtrl', function($scope, $stateParams) {
  $scope.lat = $stateParams.lat
  $scope.long = $stateParams.long
  $scope.name = $stateParams.name
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
