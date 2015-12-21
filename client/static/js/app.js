var friends_app = angular.module("friends_app", ["ngRoute" ,"ngMessages"]);

friends_app.config(function($routeProvider, $locationProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'static/partials/dashboard.html',
    controller: "FriendsController"
  })
  .when('/friend/:id', {
    templateUrl: 'static/partials/friend.html',
    controller: "singleFriendController"
  });
});
