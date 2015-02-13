app.controller("ArticleCtrl", ["$scope", "Article", "$location", function($scope, Article, $location) {
  $scope.createArticle = Article.save($scope.articleUrl);
}]);