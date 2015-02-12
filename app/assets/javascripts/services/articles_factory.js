app.factory('Article', function ($resource) {
  return $resource('/articles/:id', {id: '@id'});
});