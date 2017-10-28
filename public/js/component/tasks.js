angular.module('mainApp').component('tasks',
				    {templateUrl: 'tasks.html', bindings: { value: "=" },
				     controller: function($scope,Info,Auth,$sce){
					 $scope.renderHtml = function (htmlCode) {
					     return $sce.trustAsHtml(htmlCode);
					 };
					 this.Auth=Auth;
					 this.Info=Info;
					 $scope.tasks=Info.tasks;
					 $scope.component=this;
					 $scope.toggletask=1;
					 var audio = new Audio('sound/ding1.mp3');
					 $scope.$on('new task',

								 function(){
								     $scope.toggletask=-$scope.toggletask;
								     audio.play();
								     console.log("TASK CHANGE");
								     console.log(Object.keys($scope.component.Info.tasks).length);
								     console.log($scope.tasks);
								     console.log($scope.toggletask);
								     

								 });
				     }});
