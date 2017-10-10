angular.module('mainApp').component('locations',
				    {templateUrl: 'locations.html',
				     controller: function($scope,Info,Auth,$sce){
					 this.Info=Info;
					 this.Auth=Auth;
				     $scope.renderHtml = function (htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        };
					

				     }});
