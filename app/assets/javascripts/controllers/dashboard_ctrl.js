app.controller('DashboardCtrl', ['$scope', '$sce', 'Feeds', function($scope, $sce, Feeds){
  $scope.feeds = Feeds.query(function(){
    $scope.feeds.forEach(function(feed){
      feed.showing = false;
    });
  });
  $scope.reading = null;
  $scope.listening = null;
  $scope.paused = false;

  var voice = new SpeechSynthesisUtterance();

  $scope.sanitize = function(str){
    return $sce.trustAsHtml(str);
  }

  $scope.read = function(article){
    $scope.reading = article;
  };

  $scope.listen = function(article){
    $scope.paused = false;
    $scope.listening = article;
    $scope.reading = article;
    // voice.text = article.content.replace(/<[^>]+>/gm, '');
    voice.text = $(article.content).text();
    console.log(voice.text);
    speechUtteranceChunker(voice);
  };

  $scope.pausePlay = function(){
    if ($scope.paused)
      speechSynthesis.resume();
    else
      speechSynthesis.pause();
    
    $scope.paused = !$scope.paused;
  }
}]);