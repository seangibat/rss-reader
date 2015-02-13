app.factory('Article', ['$resource', '$location', function ($resource, $location) {
  var Article = $resource('/articles/:id', {id: '@id'});

  var query = function() {
    var articles = Article.query(function() {
      articles.forEach(function(article) {
        article.isArticle = true;
      });
      sessionStorage.setItem('articles', JSON.stringify(articles));
      console.log(articles);
      return articles
    });
  }

  var save = function(saveUrl, callback) {
    var article = new Article({url: saveUrl});
    article.$save(function(savedArticle) {
      var sessionStorageArticles = sessionStorage.getItem('articles');
      sessionStorageArticles = JSON.parse(sessionStorageArticles);
      sessionStorageArticles.push(savedArticle);
      sessionStorageArticles = JSON.stringify(sessionStorageArticles);
      sessionStorage.setItem('articles', sessionStorageArticles);
      callback;
    });
  }

  return {
    query: query,
    save: save
  }
}]);