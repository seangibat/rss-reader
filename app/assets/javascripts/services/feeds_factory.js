app.factory('Feed', ['$resource', function ($resource) {
  var Feed = $resource('/feeds/:id', {id: '@id'});

  var query = function(cb) {
    var sessionFeeds = sessionStorage.getItem('feeds');
    if(sessionFeeds){
      cb(JSON.parse(sessionFeeds));
    } else {
      Feed.query(function(feeds) {
        feeds.forEach(function(feed) {
          feed.showing = false;
        });
        sessionStorage.setItem('feeds', JSON.stringify(feeds));
        cb(feeds);
      });
    }
  }

  var save = function(feedUrl, callback) {
    var feed = new Feed({url: feedUrl});
    console.log(feed);
    feed.$save(function(savedFeed){
      console.log(savedFeed);
      var savedFeedId = savedFeed.id;
      Feed.get({id: savedFeedId}, function(foundFeed) {
        console.log(foundFeed);
        var sessionFeeds = sessionStorage.getItem('feeds');
        sessionFeeds = JSON.parse(sessionFeeds);
        sessionFeeds.push(foundFeed);
        if(callback) {
          callback(sessionFeeds)
        }
        sessionFeeds = JSON.stringify(sessionFeeds);
        sessionStorage.setItem('feeds', sessionFeeds);
      })
    });
  }

  return {
    query: query,
    save: save
  }
}]);