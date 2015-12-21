var friends_app = angular.module("friends_app");


friends_app.controller('singleFriendController', function($scope, $routeParams, FriendFactory) {
  FriendFactory.getOneFriend($routeParams.id, function(data) {
    $scope.friend = data;
  });
});
