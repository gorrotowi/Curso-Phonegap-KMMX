// var $http = angular.injector(['ng']).get('$http');
angular.module('starter.controllers',[])
.controller('homectrl', function($scope, $http, $ionicPopup ) {
  $scope.pagina = "Vista HOME"
  $scope.data = []
   $http.get("http://jsonplaceholder.typicode.com/posts").success(function (data) {
    // console.log(data)
    $scope.posts = data
  }).error(function (error) {
    console.log(error)
  });

  $scope.addPost = function() {
    var popup = $ionicPopup.show({
      template: '<input type="text" ng-model="data.newtitle"><br/><input type="text" ng-model="data.newcontent">',
      title: "Ingresa un nuevo post",
      scope:$scope,
      buttons: [
        {text:'Cancelar'},
        {text:'<b>Subir</b>',
        type:'button-positive',
        onTap: function(respuesta) {
              console.log($scope.data.newtitle + " " + $scope.data.newcontent)//return $scope.popPost
              $http.post("http://jsonplaceholder.typicode.com/posts",
                          {title:$scope.data.newtitle,body:$scope.data.newcontent,userId:1})
                          .success(function(response) {
                            console.log(response);
                            // $scope.posts = response
                            $scope.posts.push(response)
                          })
                          .error(function(error) {
                            console.log(error)
                          });
          }
        }
      ]
    });
  }

})
.controller('aboutctrl', function($scope) {
  $scope.pagina = "Vista ABOUT"
})
.controller('detailctrl', function($scope, $stateParams, $http) {
  // $scope.postdetail = $stateParams.id
  $http.get("http://jsonplaceholder.typicode.com/posts/"+$stateParams.id).success(function (data) {
   // console.log(data)
   $scope.name = data.title
   $scope.postdetail = data.body
 }).error(function (error) {
   console.log(error)
 });
})
