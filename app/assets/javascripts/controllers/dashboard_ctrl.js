app.controller('DashboardCtrl', ['$scope', '$route', '$sce', 'Feed', 'Article', function($scope, $route, $sce, Feed, Article){
  $('.dropdown-toggle').dropdown();
  $scope.listening = null;
  $scope.reading = null;
  $scope.articlesShowing = false;


  // Query for articles if not found in sessionStorage
  var sessionArticles = sessionStorage.getItem('articles');
  if(sessionArticles) {
    $scope.articles = JSON.parse(sessionArticles)
  } else {
    $scope.articles = Article.query();
  }


  // Query for feeds if not found in sessionStorage 
  var sessionFeeds = sessionStorage.getItem('feeds');
  if(sessionFeeds){
    $scope.feeds = JSON.parse(sessionFeeds);
  } else {
    $scope.feeds = Feed.query();
  }

  $scope.saveArticle = function() {
    var url = $scope.reading.url;
    Article.save(url, function() {
      $route.reload();
    })
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