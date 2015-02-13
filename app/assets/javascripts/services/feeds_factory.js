app.factory('Feed', ['$resource', function ($resource) {
  var Feed = $resource('/feeds/:id', {id: '@id'});

  var query = function() {
    var feeds = Feed.query(function(feeds) {
      feeds.forEach(function(feed) {
        feed.showing = false;
      });
      sessionStorage.setItem('feeds', JSON.stringify(feeds));
    });
    return feeds;
  }

  var save = function(feedUrl, callback) {
    var feed = new Feed({url: feedUrl});
    feed.$save(function(savedFeed){
      var savedFeedId = savedFeed.id;
      Feed.get({id: savedFeedId}, function(foundFeed) {
        var sessionFeeds = sessionStorage.getItem('feeds');
        sessionFeeds = JSON.parse(sessionFeeds);
        sessionFeeds.push(foundFeed);
        sessionFeeds = JSON.stringify(sessionFeeds);
        callback
      })
    });
  }

  return {
    query: query,
    save: save
  }
}]);