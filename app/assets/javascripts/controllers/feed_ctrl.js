app.controller("FeedCtrl", ["$scope", "Feed", "$location", function($scope, Feed, $location) {
  $scope.createFeed = Feed.save($scope.feedUrl);
}]);