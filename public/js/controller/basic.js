app.filter("trust", ['$sce', function($sce) {
  return function(htmlCode){
    return $sce.trustAsHtml(htmlCode);
  };
}]);
app.controller('basic',function ($rootScope,$scope,$http,Auth,Info,$sce){
    // Info.update();
    $scope.renderHtml = function (htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        };
    var mousein={"tasks":false,"actions":false,"events":false};
    $scope.mousetoggle=function(s){mousein[s]=!mousein[s];};
    
    $scope.background=function(s){
	if (mousein[s]) return "#fcf";
	if ($scope.show==s) return "#0aa"; else return "#cfc";
    };
    $scope.working="<span> AngularJS </span>";
   
    $scope.Auth=Auth;
    $scope.Info=Info;
    $scope.credentials={};
    $scope.login=function (credentials){console.log("submitted " + credentials.username);
					if (Auth.authenticate(credentials.username,credentials.password)) $rootScope.$broadcast('authorized');      //$scope.authorized=Auth.authorized;
             $scope.show="actions";			               
				       };
   // $scope.$on('authorized',function(){$scope.authorized=true; console.log("$scope.authorized",$scope.authorized);});
    
});
app.controller('basic2',function ($scope,$http){
    $scope.working="AngularJS2";
    
});

