
  console.log("here public!");
var app=angular.module('mainApp',[]);

app.service('Auth',function($http,$rootScope){
    this.authorized=false;
    var service=this;
    service.user="";
    this.authenticate=function(user,pass){
	//$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
	$http({method:"POST",url: '/login', data:{"user":user,"pass":pass}
               
	      }).then(function(res){
		  console.log("server responded", res);
                  if (res.data.success) {
		      console.log("login successful "+res.data.tocken);
		      service.authorized=true;
		      service.tocken=res.data.tocken;
		      service.user=user;
		      $rootScope.$broadcast('authorized');
          		  } else{
		      console.log("invalid username or password");
		  }
	      }, function(res){});
			//	  if (user=="armin" && pass=="1234"){
                         //             this.authorized=true;
				      
			//	      this.user="armin";
			//	      this.resources={};
			//	      this.resources.money=50;
			//	      this.resources.time=100;
			//	      this.resources.rep=10;
			//	      console.log("logged in");
			//	      return true;
			//	  }
				  return false;
			      };

});
app.service('Info',function($http,$timeout,Auth){
    
    var service=this;
    service.online_players={};
    service.resources={};
    service.all_players=[];
    service.all_events=[];
    service.all_tasks=[];
    service.login_update=function(){
	if (!Auth.authorized) {console.log("login_update not possible not logged in"); return;}
	var req={"doodoo":"chichi"};
	 req["tocken"]=Auth.tocken;
	console.log('login_update is connecting server');
	$http( {method:"POST",url:"/loginInfo",data: req}
         
	     ).then(function(res){
		 console.log(res.data);
		 
		 service.all_events=res.data.info.events;
		 service.resources=res.data.info.resources;
		 service.tasks=res.data.info.tasks;
		 console.log("tasks");
		 console.log(service.tasks);
	     }
		    ,function(res){
             console.log("login_update failed");
		
		    });};
    var update=function(){
	req={"doodoo":"chichi"};
	if (Auth.authorized) req["tocken"]=Auth.tocken;
	console.log('Info is connecting server');
	$http( {method:"POST",url:"/update",data: req}
         
	     ).then(function(res){
                 console.log("updating...");
		 console.log(res.data);
		 console.log("end");
		 if (res.data!==null){
		     console.log("not null");
		    
		     if ("info" in res.data) {console.log(res.data.info.events);
					       service.resources=res.data.info.resources;
		     console.log(service.resources);
					      var new_events=res.data.info.events;
					      new_events.forEach(function(event){service.all_events.push(event); console.log(event["id"]);});
					      if (Object.keys(res.data.info.tasks).length>0 ) console.log("TASKS:");
					      console.log(res.data.info.tasks);
					      var new_tasks=res.data.info.tasks;
					      Object.keys(new_tasks).forEach(function(task_id){service.tasks[task_id]=new_tasks[task_id]; console.log(new_tasks[task_id]);});
				      
					      
					      

					     }
		 }
                
				  service.online_players=res.data.online;$timeout(update,10000);},function(res){
             console.log("online players update failed");
	     $timeout(update,10000);});};
    update();
});
app.controller('basic',function ($rootScope,$scope,$http,Auth,Info){
   // Info.update();
    $scope.working="AngularJS";
    $scope.Auth=Auth;
    $scope.credentials={};
    $scope.login=function (credentials){console.log("submitted " + credentials.username);
					if (Auth.authenticate(credentials.username,credentials.password)) $rootScope.$broadcast('authorized');      //$scope.authorized=Auth.authorized;
			               
				       };
   // $scope.$on('authorized',function(){$scope.authorized=true; console.log("$scope.authorized",$scope.authorized);});
    
});
app.controller('basic2',function ($scope,$http){
    $scope.working="AngularJS2";
    
});

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
angular.module('mainApp').component('onlineUsers',
				    {templateUrl: 'onlineusers.html',
				     controller: function($scope,Info){
					 this.Info=Info;
				     }});
angular.module('mainApp').component('currentAffairs',
				    {templateUrl: 'events.html',
				     controller: function($scope,Info,Auth){
					 this.Info=Info;
					 this.Auth=Auth;
					 $scope.$on('authorized',function(){
                                             Info.login_update();
                                             console.log("JSON INFO: "+Info.all_events);
		      //console.log("JSON INFO EVENTS "+res.data.info.events)
					 });

				     }});
angular.module('mainApp').component('saySomething',
				    {templateUrl: 'saysomething.html',
				     controller: function($scope,Info,Auth,$http,$timeout){
					

 var controller=this;
					 this.Info=Info;
					 this.Auth=Auth;
					 //this.data={};
					
					 $scope.$on('authorized',function(){
					     //controller.data.a= Auth.user;
					    // console.log("say Someth a:"+controller.data.a);
                                            // Info.login_update();
                                            // console.log("JSON INFO: "+Info.all_events);
		      //console.log("JSON INFO EVENTS "+res.data.info.events)
							});
						    this.submit=function(something){
							console.log("Submitted");
							//console.log(this.data);
                                                        var req={};
							req.tocken=Auth.tocken;
							req.hash="saySomething";
							something.a=Auth.user;
							req.data=something;
							console.log(req);
								$http( {method:"POST",url:"/register_event",data: req}
         ).then(function(res){
					 console.log("res:");
					 console.log(res.data);
									 
	     if (res.data["message"]){
		 controller.message=res.data["message"];
		 controller.message_visible=true;
		 $timeout(function(){controller.message_visible=false;

				 },3000);

					 }
	//	 service.all_events=res.data.info.events;
	//	 service.resources=res.data.info.resources;
		 
								     }
		    ,function(res){
             console.log("login_update failed");
		
		    });};
				     }


					 
				    }

				   );
angular.module('mainApp').component('betSomething',
				    {templateUrl: 'betsomething.html',
				     controller: function($scope,Info,Auth,$http,$timeout){
					

 var controller=this;
					 this.Info=Info;
					 this.Auth=Auth;
					 //this.data={};
					
					 $scope.$on('authorized',function(){
					     //controller.data.a= Auth.user;
					    // console.log("say Someth a:"+controller.data.a);
                                            // Info.login_update();
                                            // console.log("JSON INFO: "+Info.all_events);
		      //console.log("JSON INFO EVENTS "+res.data.info.events)
							});
						    this.submit=function(something){
							console.log("Submitted");
							//console.log(this.data);
                                                        var req={};
							req.tocken=Auth.tocken;
							req.hash="betSomethingBetter";
							something.a=Auth.user;
							req.data=something;
							console.log(req);
								$http( {method:"POST",url:"/register_event",data: req}
         
								     ).then(function(res){
									 console.log("res:");
		 console.log(res.data);
		  controller.message=res.data["message"];
		 controller.message_visible=true;
		 $timeout(function(){controller.message_visible=false;
                                     console.log("message hidden");
				 },3000);
	//	 service.all_events=res.data.info.events;
	//	 service.resources=res.data.info.resources;
		 
								     }
		    ,function(res){
             console.log("login_update failed");
		
		    });};
				     }


					 
				    }

				    );
angular.module('mainApp').component('tasks',
				    {templateUrl: 'tasks.html',
				     controller: function($scope,Info,Auth){
					 this.Auth=Auth;
					 this.Info=Info;
                                    
				     }});
angular.module('mainApp').component('sampleTask',
				    {templateUrl: 'sampletask.html',bindings:{data:"="},
				     controller: function($scope,Info,Auth,$http,$timeout){
					
					 this.Auth=Auth;
					 this.Info=Info;
					 this.decided=false;
					 this.message="";
					 //console.log(this);
					  //console.log(this.data);
					 var controller=this;
					 var req={};
				
					// req.id=controller.data.id;
					 req.info={};
					// req.name=controller.data.name;
					 req.tocken=Auth.tocken;
					 this.data_set=false;
				         this.$onChanges=function(){
					     if ((controller.data_set==false)&&
						 ("data" in controller)){
						 controller.data_set=true;
						 req.name=controller.data.name;
						 req.id=controller.data.id;
						 console.log(controller.data);

									}
					 };
					  this.accept=function(){if (!controller.decided) {
					     controller.decided=true;
					     
					     
					     req.method="accept";
					     
					     console.log("accept");
					     console.log(req);
					     $http( {method:"POST",url:"/update_event",data: req}
         
						  ).then(function(res){
						      controller.message=res.data.message;
						      console.log("success");
						      console.log(res.data);
						       controller.message=res.data.message;
						       controller.message=res.data["message"];
		 controller.message_visible=true;
	//	 $timeout(function(){controller.message_visible=false;

	//			 },7000);
						      

						  },function(res){
						      console.log("unsuccessful");
						      controller.decided=false;

						  });

					 }};
					 this.reject=function(){if (!controller.decided) {
					     controller.decided=true;
					         var req={};
					    
					     req.method="reject";
					     req.tocken=Auth.tocken;
					     req.info={};
					      req.name=controller.data.name;
						 req.id=controller.data.id;
					     console.log("reject");
					     console.log(req);
					     $http( {method:"POST",url:"/update_event",data: req}
         
						  ).then(function(res){
						      console.log("Reject connected server with success"); console.log(res.data);
						      controller.message=res.data.message;
						       controller.message=res.data["message"];
		 controller.message_visible=true;
	//	 $timeout(function(){controller.message_visible=false;

	//			 },7000);

						  },function(res){
						      console.log("unsuccessful");
						      controller.decided=false;

						  });

					 }};
                                      				
                                        // this.text=Info.tasks   
				     }});
