var friends_app = angular.module("friends_app");

friends_app.factory('FriendFactory', function($http) {
  var factory = {};
  var friendId;

  factory.getFriends = function(callback) {
    $http.get('/friends').success(function(response) {
      callback(response);
    });
  };

  factory.addFriend = function(friend, callback) {
    $http.post('/add-friend', friend).success(function(response) {
      callback(response);
    });
  };

  factory.delete = function(friendId, callback){
    $http.delete('/delete-friend/'+friendId).success(function(response){
      callback(response);
    });
  };

  factory.update = function(friend, callback){
    $http.put('/update-friend', friend).success(function(response){
      callback(response);
    });
  };

  factory.getOneFriend = function(friendId, callback){
    $http.get('/get-one/'+friendId).success(function(response){
      console.log(friendId);
      callback(response);
    });
  };

  return factory;
});


friends_app.controller('FriendsController', function($scope, FriendFactory) {
  FriendFactory.getFriends(function(data) {
    $scope.friends = data;
  });


  $scope.addFriend = function(){
    for(var i = 0; i<$scope.friends.length;i++){
        $scope.edit[i] = false;
    }

    var new_friend = $scope.new_friend;

    $scope.submitted = true;
    if(!new_friend ||
       !new_friend.name ||
       !new_friend.age){
      return;
    }

    FriendFactory.addFriend(new_friend, function(response){

      if(response.status === "success"){
        FriendFactory.getFriends(function(data) {
          $scope.friends = data;
          $scope.new_friend = '';
          $scope.submitted = false;
        });
      }
      else if(response.status === "error"){
        $scope.warning = "Something went wrong...";
      }
    });
  };

  $scope.delete = function(friendId){
    FriendFactory.delete(friendId, function(response){
      for(var i = 0; i<$scope.friends.length;i++){
          $scope.edit[i] = false;
      }
      if(response.status === "success"){
        FriendFactory.getFriends(function(data) {
          $scope.friends = data;
        });
      }
      else if(response.status === "error"){
        $scope.warning = "Something went wrong...";
      }
    });
  };

  $scope.update = function(friend, index){
    FriendFactory.update(friend, function(response){
      if(response.status === "success"){
          $scope.edit[index] = false;

        FriendFactory.getFriends(function(data) {
          $scope.friends = data;
        });
      }
    });
  };

  $scope.edit = function(index){
    var length = $scope.friends.length;
    $scope.master= angular.copy($scope.friends[index]);
    console.log($scope.master);

    for(var i = 0; i<length;i++){
      if(i != index){
        $scope.edit[i] = false;
      }
    }
    $scope.edit[index] = true;
  };

  $scope.cancelEdit = function(index){
    angular.copy($scope.master, $scope.friend);
    $scope.edit[index] = false;
  };

});
