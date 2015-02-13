app.controller('DashboardCtrl', ['$scope', '$route', '$sce', 'Feed', 'Article', 'Speaker', function($scope, $route, $sce, Feed, Article, Speaker){
  $('.dropdown-toggle').dropdown();
  $scope.Speaker = Speaker;
  $scope.reading = null;
  $scope.articlesShowing = false;

  $scope.showLoading = function() {
    return !$scope.feeds.length || !$scope.articles.length;
  };
  
  // Query for articles if not found in sessionStorage
  Article.query(function(data){
    $scope.articles = data;
  });

  // Query for feeds if not found in sessionStorage 
  Feed.query(function(data){
    $scope.feeds = data;
  });

  $scope.saveArticle = function() {
    var url = $scope.reading.url;
    Article.save(url, function() {
      $route.reload();
    });
  };

  // Allow Angular to display content text as html
  $scope.sanitize = function(str){
    return $sce.trustAsHtml(str);
  }

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

}]);