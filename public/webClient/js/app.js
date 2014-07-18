var app = angular.module('webClient', [
  'ui.router',
  'ui.bootstrap'
]);

app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
  $urlRouterProvider.otherwise("/topStories");

  $stateProvider
    .state('topStories', {
      url: '/topStories',
      views: {
        'mainReader@': {
          templateUrl: '/webClient/templates/mainReader.html',
          controller: ''
        },
        'content@': {
          templateUrl: 'webClient/templates/reader.html',
          controller: 'content'
        },
        'dropDown@': {
          templateUrl: '/webClient/templates/dropDown.html',
          controller: 'dropDownController'
        }
      }
      });

});

app.run(function($http, $rootScope, $window) {
  if($window.localStorage.token){
    $http.post('/api/authenticate', {authType: 'run-onload'}).success(function(data) {
      $rootScope.loggedIn = true;
      $rootScope.accountName = data.username;
      $rootScope.readArticles = data.readArticles;
      $rootScope.readArticlesObject = {};
    })
  }
});
