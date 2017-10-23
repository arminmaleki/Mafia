angular.module('mainApp').component('tasks',
				    {templateUrl: 'tasks.html',
				     controller: function($scope,Info,Auth,$sce){
					 $scope.renderHtml = function (htmlCode) {
					     return $sce.trustAsHtml(htmlCode);
					 };
					 this.Auth=Auth;
					 this.Info=Info;
					 $scope.tasks=Info.tasks;
					 var audio = new Audio('sound/ding1.mp3');
					 $scope.$on('new task',

								 function(){
								     
								     audio.play();
								     console.log("TASK CHANGE");
								     console.log($scope.tasks);

								 });
				     }});
