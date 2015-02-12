app.factory('Feed', function ($resource) {
  return $resource('/feeds/:id', {id: '@id'});
});