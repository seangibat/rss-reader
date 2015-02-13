app.controller("FeedCtrl", ["$scope", "$location", "Feed", function($scope, $location, Feed) {
  $scope.createFeed = function() {
    Feed.save($scope.feedUrl, function(sessionFeeds) {
      $scope.feeds = sessionFeeds;
      $location.path('/');
    });
  }
}]);
