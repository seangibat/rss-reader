app.factory('Article', ['$resource', function ($resource) {
  var Article = $resource('/articles/:id', {id: '@id'}, {update: {method: 'PATCH'}});

  var query = function() {
    var articles = Article.query(function(articles) {
      articles.forEach(function(article) {
        article.isArticle = true;
      });
      sessionStorage.setItem('articles', JSON.stringify(articles));
    });
    return articles
  }

  var save = function(saveUrl, callback) {
    var article = new Article({url: saveUrl});
    article.$save(function(savedArticle) {
      var sessionStorageArticles = sessionStorage.getItem('articles');
      sessionStorageArticles = JSON.parse(sessionStorageArticles);
      sessionStorageArticles.push(savedArticle);
      sessionStorageArticles = JSON.stringify(sessionStorageArticles);
      sessionStorage.setItem('articles', sessionStorageArticles);
      callback();
    });
  }

  return {
    query: query,
    save: save
  }
}]);