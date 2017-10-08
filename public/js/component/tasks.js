angular.module('mainApp').component('tasks',
				    {templateUrl: 'tasks.html',
				     controller: function($scope,Info,Auth){
					 this.Auth=Auth;
					 this.Info=Info;
                                    
				     }});
