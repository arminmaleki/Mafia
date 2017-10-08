angular.module('mainApp').component('userStatus',
				    {templateUrl: 'status.html',
				     controller: function($scope,Auth,Info){
					
					 this.username="unknown";
					 this.Auth=Auth;
					 this.Info=Info;
					 var controller=this;
					 $scope.$on('authorized',function(){
																			 console.log("component knows it is authorized");
					    controller.username=Auth.user;														  });
																	 }});
