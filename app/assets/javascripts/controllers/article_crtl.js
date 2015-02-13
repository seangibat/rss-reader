app.controller("ArticleCtrl", ["$scope", "Article", function($scope, Article) {
  $scope.createArticle = Article.save($scope.articleUrl);
}]);