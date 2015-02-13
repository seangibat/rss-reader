app.controller("FeedCtrl", ["$scope", "Feed", function($scope, Feed) {
  $scope.createFeed = Feed.save($scope.feedUrl);
}]);