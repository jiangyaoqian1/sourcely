app.controller('categories', ['$scope', '$http', 'techFactory', function($scope, $http, techFactory){
  $scope.categories = ["games", "tech"];
  techFactory.retrieveTechArticles();
}]);

app.controller('games', ['$scope', '$http', function($scope, $http){
  $scope.category = { name: "games", articles: [
                      {title: "man is trapped in oculus vr, believes real life is the virutal reality", author: "polygon"},
                      {title: "something about minecraft", author: "ign"}
                    ]};
}]);

app.controller('tech', ['$scope', '$http', 'techFactory', function($scope, $http, techFactory){
  $scope.category = {name:"tech", articles: techFactory.getTechArticles()};
}]);