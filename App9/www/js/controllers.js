// var $http = angular.injector(['ng']).get('$http');
angular.module('starter.controllers',[])
.controller('homectrl', function($scope, $http, $ionicPopup, $rootScope) {
  $scope.pagina = "Vista HOME"
  $scope.data = []

  // $httpProvider.defaults.headers.common.Accept = "application/json, text/plain, * / *"
  $http.get("http://jsonplaceholder.typicode.com/posts").success(function (data) {
    // console.log(data)
    $scope.posts = data
  }).error(function (error) {
    console.log(error)
  });

  $scope.getdata = function(position) {
    $rootScope.title = $scope.posts[position].title
    $rootScope.body = $scope.posts[position].body
  }

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
.controller('aboutctrl', function($scope, $cordovaCamera) {
  $scope.pagina = "Vista ABOUT"
  $rootScope.nombre = "pepito"
  $scope.takePhoto = function () {
    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType:Camera.PictureSourceType.CAMERA,
      targetWidth: 200,
      targetHeight:200,
      saveToPhotoAlbum:true
    };

    $cordovaCamera.getPicture(options).then(function(photo) {
        $scope.imgPhoto = "data:image/jpeg;base64,"+photo;
        $scope.imgPhoto.$apply();
    }, function(error) {
      alert("Error camara "+error);
    });
  }

})
.controller('detailctrl', function($scope, $stateParams, $http, $rootScope) {
  // $scope.postdetail = $stateParams.id
  // $http.get("http://jsonplaceholder.typicode.com/posts/"+$stateParams.id).success(function (data) {
   // console.log(data)
   $scope.name = $rootScope.title
   $scope.postdetail = $rootScope.body
 // }).error(function (error) {
  //  console.log(error)
 // });
})
.controller('personactrl', function($scope, $ionicPopup, $cordovaCamera) {

  $scope.data = [];
  var userid = "";
  var img64bits = ""

  $scope.photouser = function () {
    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType:Camera.PictureSourceType.CAMERA,
      targetWidth: 200,
      targetHeight:200,
      saveToPhotoAlbum:true
    };

    $cordovaCamera.getPicture(options).then(function(photo) {
        img64bits = photo;
    }, function(error) {
      alert("Error camara "+error);
    });
  }

  $scope.addUserData = function() {
    var popup = $ionicPopup.show({
      template: '<b>Nombre</b><input type="text" ng-model="data.username"><br/><b>Sexo</b><input type="text" ng-model="data.usersex"><br/><b>Edad</b><input type="number" ng-model="data.userage"><button class="button" ng-click="photouser()">FOTO</button>',
      title: "Ingrese su informacion",
      scope:$scope,
      buttons: [
        {text:'Cancelar'},
        {text:'<b>Subir</b>',
        type:'button-positive',
        onTap: function(respuesta) {
            //console.log(respuesta);
            // $scope.username = $scope.data.username
            // $scope.userage = $scope.data.userage
            // $scope.usersex = $scope.data.usersex
            var Perfiles = Parse.Object.extend('Perfiles');
            var persona = new Perfiles();
            persona.set("username", $scope.data.username);
            persona.set("usersex", $scope.data.usersex);
            persona.set("userage", $scope.data.userage);
            var imagen64 = new Parse.File("avatar.jpg", { base64: img64bits }, "image/jpg")
            persona.set("imagen", imagen64);
            persona.save(null, {success: function (persona) {
                      // $scope.$apply(function() {
                      //       $scope.username = $scope.data.username
                      //       $scope.userage = $scope.data.userage
                      //       $scope.usersex = $scope.data.usersex
                      // })
                      // alert("El id de la persona es "+persona.id);
                      userid = persona.id
                      var query = new Parse.Query(Perfiles);
                      query.get(userid,{
                        success:function (result) {
                          $scope.$apply(function() {
                                $scope.username = result.get('username')
                                $scope.userage = result.get('userage')
                                $scope.usersex = result.get('usersex')
                                $scope.userimage = result.get('imagen').url()
                          })
                        },
                        error: function (object, error) {
                          alert('error ' + error.message)
                        }
                      });
            }, error: function(persona, error) {
                      alert(error.message);
            }
          });
          }
        }
      ]
    });
  }
})
