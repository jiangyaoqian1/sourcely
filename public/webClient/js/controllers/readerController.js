app.controller('reader', ['$scope', '$http', function($scope, $http){

  $scope.openLink = function (articleUrl, collectionID) {
    document.getElementById('articleIFrame').src = articleUrl;
    var collection = {id: collectionID}
    $http.post('/markread', collection).success(console.log("collection: ", collectionID + " has been marked as read"));  
  };  
  
}]);
