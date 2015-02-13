app.controller("ArticleCtrl", ["$scope", "$location", "Article", function($scope, $location, Article) {
  $scope.createArticle = function() {
    Article.save($scope.articleUrl, function() {
      $location.path('/');
    });
  }
}]);