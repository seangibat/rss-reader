app.controller('DashboardCtrl', ['$scope', '$route', '$sce', 'Feed', 'Article', function($scope, $route, $sce, Feed, Article){
  $('.dropdown-toggle').dropdown();
  $scope.listening = null;
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
    $scope.listening = article;
    $scope.listeningSourceTitle = feedTitle;
    $scope.reading = article;

    speaker.text($(article.content).text());
    speaker.speak();
  };


  // speechSynthesis controls
  $scope.pausePlay = function(){
    if ($scope.paused)
      speaker.resume();
    else
      speaker.pause();
    
    $scope.paused = !$scope.paused;
  }

  $scope.stop = function(){
    $scope.listening = null;
    speaker.stop();
  }

  $scope.increaseRate = function() {
    speaker.increaseRate();
  };

  $scope.decreaseRate = function() {
    speaker.decreaseRate();
  };


}]);