app.factory('Article', ['$resource', function ($resource) {
  var Article = $resource('/articles/:id', {id: '@id'}, {update: {method: 'PATCH'}});

  var query = function(cb) {
    var sessionArticles = sessionStorage.getItem('articles');
    if(sessionArticles) {
      cb(JSON.parse(sessionArticles));
    } else {
      Article.query(function(articles) {
        articles.forEach(function(article) {
          article.isArticle = true;
        });
        sessionStorage.setItem('articles', JSON.stringify(articles));
        cb(articles);
      });
    }
  }

  var save = function(saveUrl, callback) {
    var article = new Article({url: saveUrl});
    article.$save(function(savedArticle) {
      var sessionStorageArticles = sessionStorage.getItem('articles');
      sessionStorageArticles = JSON.parse(sessionStorageArticles);
      sessionStorageArticles.push(savedArticle);
      sessionStorageArticles = JSON.stringify(sessionStorageArticles);
      sessionStorage.setItem('articles', sessionStorageArticles);
      if(callback) {
        callback();
      }
    });
  }

  return {
    query: query,
    save: save
  }
}]);