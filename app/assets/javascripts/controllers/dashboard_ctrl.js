app.controller('DashboardCtrl', ['$scope', '$route', '$sce', 'Feed', 'Article', 'Speaker', function($scope, $route, $sce, Feed, Article, Speaker){
  $('.dropdown-toggle').dropdown();
  $scope.Speaker = Speaker;
  $scope.reading = null;
  $scope.articlesShowing = false;
  var loaded = 0;

  $scope.showLoading = function() {
    return loaded < 2;
  };
  
  Article.query(function(data){
    $scope.articles = data;
    loaded++;
  });

  Feed.query(function(data){
    $scope.feeds = data;
    loaded++;
  });

  $scope.saveArticle = function() {
    var url = $scope.reading.url;
    Article.save(url, function(sessionArticles) {
      $scope.articles = sessionArticles;
    });
  };

  // Allow Angular to display content text as html
  $scope.sanitize = function(str){
    return $sce.trustAsHtml(str);
  };

  // User Controls
  $scope.read = function(article, feedTitle){
    $scope.reading = article;
    $scope.readingSourceTitle = feedTitle;
  };

  $scope.listen = function(article, feedTitle){
    $scope.Speaker.play(article);
    $scope.listeningSourceTitle = feedTitle;
    $scope.reading = article;
  };

  $scope.archiveArticle = function() {
    Article.update($scope.reading, function(sessionArticles) {
      $scope.articles = sessionArticles;
    });
  };

}]);