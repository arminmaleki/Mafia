angular.module('mainApp').component('onlineUsers',
				    {templateUrl: 'onlineusers.html',
				     controller: function($scope,Info){
					 this.Info=Info;
					  $scope.img_file=function(o){return "img/girl.jpg";};
				     }});
