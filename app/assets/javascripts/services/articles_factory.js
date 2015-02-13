app.factory('Article', ['$resource', function ($resource) {
  var Article = $resource('/articles/:id', {id: '@id'}, {update: {method: 'PATCH'}});

  var query = function(cb) {
    var sessionArticles = sessionStorage.getItem('articles');
    if(sessionArticles) {
      cb(JSON.parse(sessionArticles));
    } else {
      Article.query(function(articles) {
        if(articles.length !== 0) {
          articles.forEach(function(article) {
            article.isArticle = true;
          });
          sessionStorage.setItem('articles', JSON.stringify(articles));
          cb(articles);
        }
      });
    }
  }

  var save = function(saveUrl, callback) {
    var article = new Article({url: saveUrl});
    article.$save(function(savedArticle) {
      Article.get({id: savedArticle.id}, function(foundArticle) {
        foundArticle.isArticle = true;
        var sessionStorageArticles = sessionStorage.getItem('articles');
        if(sessionStorageArticles) {
          sessionStorageArticles = JSON.parse(sessionStorageArticles);
          sessionStorageArticles.push(foundArticle);
        } else {
          sessionStorage.setItem('articles', JSON.stringify(foundArticle));
        }
        if(callback) {
          callback(sessionStorageArticles || foundArticle);
        }
        sessionStorageArticles = JSON.stringify(sessionStorageArticles);
        sessionStorage.setItem('articles', sessionStorageArticles);
      });
    });
  }

  var update = function(article, callback) {
    article.archive = true;
    Article.update({id: article.id}, article, function(data) {
      Article.get({id: data.id}, function(foundArticle) {
        var sessionStorageArticles = sessionStorage.getItem('articles');
        sessionStorageArticles = JSON.parse(sessionStorageArticles);
        var len = sessionStorageArticles.length;
        for (var i=0; i < len; i++) {
          if (foundArticle.id === sessionStorageArticles[i].id) {
            sessionStorageArticles.splice(i, 1);
            if(sessionArticles.length === 0) {
              sessionStorage.removeItem('articles');
            }
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

  var destroy = function(articleId, callback) {
    Article.remove({id:articleId}, function() {
      var sessionArticles = sessionStorage.getItem('articles');
      sessionArticles = JSON.parse(sessionArticles);
      for (var i=0; i < sessionArticles.length; i++) {
        if (articleId === sessionArticles[i].id) {
          sessionArticles.splice(i, 1);
          if (callback) {
            callback(sessionArticles);
          }
          sessionArticles = JSON.stringify(sessionArticles);
          sessionStorage.setItem('articles', sessionArticles);
          break;
        }
      }
    })
  }

  return {
    query: query,
    save: save,
    update: update,
    destroy: destroy
  }
}]);