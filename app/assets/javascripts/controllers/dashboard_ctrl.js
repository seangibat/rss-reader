app.controller('DashboardCtrl', ['$scope', '$route', '$sce', 'Feed', 'Article', 'Speaker', 'flash', '$timeout', function($scope, $route, $sce, Feed, Article, Speaker, flash, $timeout){
  $('.dropdown-toggle').dropdown();
  $scope.Speaker = Speaker;
  $scope.reading = null;
  $scope.articlesShowing = false;
  $scope.flash = flash;
  var loaded = 0;


  Article.query(function(data){
    ++loaded;
    $scope.articles = data;
  });

  Feed.query(function(data){
    ++loaded;
    $scope.feeds = data;
  });

  $scope.dataIsLoading = function() {
    return loaded < 2;
  };

  $scope.saveArticle = function() {
    var url = $scope.reading.url;
    $scope.processingSave = true;
    $scope.flashDisplay = true;
    Article.save(url, function(sessionArticles) {
      $timeout($scope.resetFlashTimeout, 1000);
      $scope.articles = sessionArticles;
    });
  };

  $scope.resetFlashTimeout = function() {
    $scope.flashDisplay = false;
  }

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

}]);