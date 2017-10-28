angular.module('mainApp').component('currentAffairs',
				    {templateUrl: 'events.html',
				     bindings: { value: "=" },
				     controller: function($scope,Info,Auth,$sce){
					 this.Info=Info;
					 this.Auth=Auth;
					 $scope.component=this;
					
					 
					 $scope.realTime=function(event){
					     return Date.parse(event.last_update);};
				     $scope.renderHtml = function (htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        };
					 $scope.$on('authorized',function(){
                                             Info.login_update();
                                             console.log("JSON INFO: "+Info.all_events);
		      //console.log("JSON INFO EVENTS "+res.data.info.events)
					 });

				     }});
