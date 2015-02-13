app.factory('Article', ['$resource', function ($resource) {
  var Article = $resource('/articles/:id', {id: '@id'}, {update: {method: 'PATCH'}});

  var query = function(cb) {
    var sessionArticles = sessionStorage.getItem('articles');
    if(sessionArticles) {
      cb(JSON.parse(sessionArticles));
    } else {
      Article.query({archive: false}, function(articles) {
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
      Article.get({id: savedArticle.id}, function(foundArticle) {
        foundArticle.isArticle = true;
        var sessionStorageArticles = sessionStorage.getItem('articles');
        sessionStorageArticles = JSON.parse(sessionStorageArticles);
        sessionStorageArticles.push(foundArticle);
        if(callback) {
          callback(sessionStorageArticles);
        }
        sessionStorageArticles = JSON.stringify(sessionStorageArticles);
        sessionStorage.setItem('articles', sessionStorageArticles);
      });
    });
  }

  var update = function(article, callback) {
    console.log(article.archive);
    article.archive = true;
    console.log(article.archive);
    Article.update({id: article.id}, article, function(data) {
      Article.get({id: data.id}, function(foundArticle) {

        var sessionStorageArticles = sessionStorage.getItem('articles');
        sessionStorageArticles = JSON.parse(sessionStorageArticles);
        var len = sessionStorageArticles.length;
        for (var i=0; i < len; i++) {
          if (foundArticle.id === sessionStorageArticles[i].id) {
            sessionStorageArticles.splice(i, 1);
            if (callback) {
              callback(sessionStorageArticles);
            }
            sessionStorageArticles = JSON.stringify(sessionStorageArticles);
            sessionStorage.setItem('articles', sessionStorageArticles);
            break;
          }
        }
      });
    });
  }

  return {
    query: query,
    save: save,
    update: update
  }
}]);