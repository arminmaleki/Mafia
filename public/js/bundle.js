(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
angular.module('mainApp').component('currentAffairs',
				    {templateUrl: 'events.html',
				     controller: function($scope,Info,Auth,$sce){
					 this.Info=Info;
					 this.Auth=Auth;
				     $scope.renderHtml = function (htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        };
					 $scope.$on('authorized',function(){
                                             Info.login_update();
                                             console.log("JSON INFO: "+Info.all_events);
		      //console.log("JSON INFO EVENTS "+res.data.info.events)
					 });

				     }});

},{}],3:[function(require,module,exports){
angular.module('mainApp')
    .component('location',
	       {templateUrl: 'location.html',bindings:{data:"="},
		controller:
		function($scope,Info,Auth,$http,$timeout,$sce){
		    this.renderHtml = function (htmlCode) {
			return $sce.trustAsHtml(htmlCode);
		    };


		    this.Auth=Auth;
		    this.Info=Info;
		    var component=this;
		    var enter_text="ورود";
		    var exit_text="خروج";
		    var less_text="کمتر";
		    var more_text="بیشتر";
		    var inside_color="red";
		    var outside_color="black";
		    this.toggle_more_text=function()
		    {if (this.data.more) return less_text; else return more_text;};
		    this.toggle_enter_color=function()
		    {if (this.data.inside) return inside_color; else return outside_color;};
		    this.toggle_enter_text=function()
		    {if (this.data.inside) return exit_text; else return enter_text;};
		    
		    this.inside=false;
		    this.toggle_more=function(){
			if (component.data.more)
			{//component.toggle_more_text=more_text;
			 console.log("toggle more was set");
			 component.data.more=false;}
			else{// component.toggle_more_text=less_text;
			      component.data.more=true;
			      console.log("toggle more was not set");}

		    };
		    
		   

		    
		     this.button_decided=false;
		    // this.message="";
		    //console.log(this);
		    //console.log(this.data);
		    var controller=this;
		    var req={};
		    
		    // req.id=controller.data.id;
		    req.info={};
		    // req.name=controller.data.name;
		    req.tocken=Auth.tocken;
		    this.data_set=false;
		    this.message_show=false;
		    this.message="message!!...";
		    this.enter_button=function(){
			if (controller.button_decided) return;
			controller.button_decided=true;
			if (!controller.data.inside)
			    $http.post("/register_event",
				       {"tocken":Auth.tocken,
					"hash":"enterLocation",
					"data":{"user":Auth.user,"location":controller.data.hash}}
				      ).then(
					  function(res){
					      var data=res.data;
					      console.log("success in registering enter_location");
					      console.log(data);
					      if (data.event_code >0 && data.code > 0 ) controller.data.inside=!controller.data.inside;
					      controller.button_decided=false;
					      controller.message=data.message;
					      controller.message_show=true;
					      $timeout(function(){controller.message_show=false;},3000);
					      

					  });

			
			else
			    $http.post("/update_event",{
				"tocken":Auth.tocken,
				"name":"enterLocation",
				"method": "get_out",
				"info": {"user":Auth.user,"location":controller.data.hash}

			    }).then(function(res){
				var data=res.data;
				console.log("success in get_out enter_location");
				console.log(data);
				controller.button_decided=false;
				if (data.message.ok ) controller.data.inside=!controller.data.inside;
				
			        controller.message=data.message.message;
			        controller.message_show=true;
				$timeout(function(){controller.message_show=false;},3000);

			    });

		    };
		    this.$onChanges=function(){
			if ((controller.data_set==false)&&
			    ("data" in controller)){
			    controller.data_set=true;
			    //	 req.name=controller.data.name;
			    //	 req.id=controller.data.id;
			    console.log(controller.data);

			    if (controller.data.more == null ) controller.data.more=false;

			}
		    };

		    $scope.$on('location_update',function(){
			console.log("I know! locations");
		

		    });
		    
                    
                    // this.text=Info.tasks   
		}});



},{}],4:[function(require,module,exports){
angular.module('mainApp').component('locations',
				    {templateUrl: 'locations.html',
				     controller: function($scope,Info,Auth,$sce){
					 this.Info=Info;
					 this.Auth=Auth;
				     $scope.renderHtml = function (htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        };
					

				     }});

},{}],5:[function(require,module,exports){
angular.module('mainApp').component('onlineUsers',
				    {templateUrl: 'onlineusers.html',
				     controller: function($scope,Info){
					 this.Info=Info;
					  $scope.img_file=function(o){return "img/girl.jpg";};
				     }});

},{}],6:[function(require,module,exports){
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



},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
angular.module('mainApp').component('simpleNotif',
				    {templateUrl: 'simplenotif.html',bindings:{data:"="},
				     controller: function($scope,Info,Auth,$http,$timeout){
					 console.log("simple-notif");
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
						 controller.hasOwnProperty('data')&&
						 controller.data!=undefined){
						  controller.data.seen=false;
						 console.log("data defined!");
						 console.log(controller.data);
						 controller.data_set=true;
						 req.name=controller.data.name;
						 req.id=controller.data.id;
						 console.log(controller.data);

									}
					 };
					  this.accept=function(){if (!controller.decided) {
					     controller.decided=true;
					     
					     
					     req.method="seen";
					     
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
						    
	                                              $timeout(function(){controller.data.seen=true;

				 },7000);
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
						 

						  },function(res){
						      console.log("unsuccessful");
						      controller.decided=false;

						  });

					 }};
                                      				
                                        // this.text=Info.tasks   
				     }});


},{}],9:[function(require,module,exports){
angular.module('mainApp').component('tasks',
				    {templateUrl: 'tasks.html',
				     controller: function($scope,Info,Auth){
					 this.Auth=Auth;
					 this.Info=Info;
                                    
				     }});

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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


},{}],12:[function(require,module,exports){

console.log("here public!");
app=angular.module('mainApp',[]);
message="messaaaage";
require("./service/auth.js");
require("./service/info.js");
require("./controller/basic.js");
require("./component/userstatus.js");
require("./component/onlineusers.js");
require("./component/currentaffairs.js");
require("./component/saysomething.js");
require("./component/betsomething.js");
require("./component/tasks.js");
require("./component/sampletask.js");
require("./component/simplenotif.js");
require("./component/locations.js");
require("./component/location.js");
// browserify command: browserify --debug mainapp.js -o bundle.js


},{"./component/betsomething.js":1,"./component/currentaffairs.js":2,"./component/location.js":3,"./component/locations.js":4,"./component/onlineusers.js":5,"./component/sampletask.js":6,"./component/saysomething.js":7,"./component/simplenotif.js":8,"./component/tasks.js":9,"./component/userstatus.js":10,"./controller/basic.js":11,"./service/auth.js":13,"./service/info.js":14}],13:[function(require,module,exports){
console.log("Auth started");
console.log("HERE " +message+ " .");
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

},{}],14:[function(require,module,exports){
app.service('Info',function($http,$timeout,Auth,$rootScope){
    
    var service=this;
    service.online_players={};
    service.resources={};
    service.all_players=[];
    service.all_events=[];
    service.all_tasks=[];
    service.locations=[];
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
		 service.locations=res.data.info.locations;
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
		     
		     if ("info" in res.data) {
			 console.log(res.data.info.events);
			  console.log("new locations:");
		          console.log(res.data.info.locations);
			 service.resources=res.data.info.resources;
			 //service.locations=res.data.info.locations;
			 console.log(service.resources);
			 var new_events=res.data.info.events;

			 
			 new_events.forEach(function(event){
			     var already=false;
			     service.all_events.forEach(function(regevent,index){
				 if (regevent["id"]==event["id"]){
				     service.all_events[index]=event;
				     already=true;}
			     });
			     if (!already)
				 service.all_events.push(event); console.log(event["id"]);});

			 res.data.info.locations.forEach(function(location){
			     var already=false;
			     service.locations.forEach(function(reglocation,index){
				 if (reglocation["hash"]==location["hash"]){
				     var more=service.locations[index].more;
				     service.locations[index]=location;
				     service.locations[index].more=more;
				     console.log("more from info service:");
				     console.log(service.locations[index]);
				     already=true;}
			     });
			     if (!already)
				 service.locations.push(location); console.log(location["hash"]);});
			 if (res.data.info.locations.length > 0) 
			 {$rootScope.$broadcast('location_update');console.log("location_update");}
			 

			 
			 if (Object.keys(res.data.info.tasks).length>0 ) console.log("TASKS:");
			 console.log(res.data.info.tasks);
			 var new_tasks=res.data.info.tasks;
			 Object.keys(new_tasks).forEach(function(task_id){
			     service.tasks[task_id]=new_tasks[task_id]; console.log(new_tasks[task_id]);});
			 

			 
			 
			 

		     }
		 }
                 
		 service.online_players=res.data.online;$timeout(update,10000);},function(res){
		     
		     console.log("online players update failed");
		     $timeout(update,10000);});};
    update();
});


},{}]},{},[12])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Vzci9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNvbXBvbmVudC9iZXRzb21ldGhpbmcuanMiLCJjb21wb25lbnQvY3VycmVudGFmZmFpcnMuanMiLCJjb21wb25lbnQvbG9jYXRpb24uanMiLCJjb21wb25lbnQvbG9jYXRpb25zLmpzIiwiY29tcG9uZW50L29ubGluZXVzZXJzLmpzIiwiY29tcG9uZW50L3NhbXBsZXRhc2suanMiLCJjb21wb25lbnQvc2F5c29tZXRoaW5nLmpzIiwiY29tcG9uZW50L3NpbXBsZW5vdGlmLmpzIiwiY29tcG9uZW50L3Rhc2tzLmpzIiwiY29tcG9uZW50L3VzZXJzdGF0dXMuanMiLCJjb250cm9sbGVyL2Jhc2ljLmpzIiwibWFpbmFwcC5qcyIsInNlcnZpY2UvYXV0aC5qcyIsInNlcnZpY2UvaW5mby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImFuZ3VsYXIubW9kdWxlKCdtYWluQXBwJykuY29tcG9uZW50KCdiZXRTb21ldGhpbmcnLFxuXHRcdFx0XHQgICAge3RlbXBsYXRlVXJsOiAnYmV0c29tZXRoaW5nLmh0bWwnLFxuXHRcdFx0XHQgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSxJbmZvLEF1dGgsJGh0dHAsJHRpbWVvdXQpe1xuXHRcdFx0XHRcdFxuXG4gdmFyIGNvbnRyb2xsZXI9dGhpcztcblx0XHRcdFx0XHQgdGhpcy5JbmZvPUluZm87XG5cdFx0XHRcdFx0IHRoaXMuQXV0aD1BdXRoO1xuXHRcdFx0XHRcdCAvL3RoaXMuZGF0YT17fTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQgJHNjb3BlLiRvbignYXV0aG9yaXplZCcsZnVuY3Rpb24oKXtcblx0XHRcdFx0XHQgICAgIC8vY29udHJvbGxlci5kYXRhLmE9IEF1dGgudXNlcjtcblx0XHRcdFx0XHQgICAgLy8gY29uc29sZS5sb2coXCJzYXkgU29tZXRoIGE6XCIrY29udHJvbGxlci5kYXRhLmEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJbmZvLmxvZ2luX3VwZGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkpTT04gSU5GTzogXCIrSW5mby5hbGxfZXZlbnRzKTtcblx0XHQgICAgICAvL2NvbnNvbGUubG9nKFwiSlNPTiBJTkZPIEVWRU5UUyBcIityZXMuZGF0YS5pbmZvLmV2ZW50cylcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHQgICAgdGhpcy5zdWJtaXQ9ZnVuY3Rpb24oc29tZXRoaW5nKXtcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXCJTdWJtaXR0ZWRcIik7XG5cdFx0XHRcdFx0XHRcdC8vY29uc29sZS5sb2codGhpcy5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlcT17fTtcblx0XHRcdFx0XHRcdFx0cmVxLnRvY2tlbj1BdXRoLnRvY2tlbjtcblx0XHRcdFx0XHRcdFx0cmVxLmhhc2g9XCJiZXRTb21ldGhpbmdCZXR0ZXJcIjtcblx0XHRcdFx0XHRcdFx0c29tZXRoaW5nLmE9QXV0aC51c2VyO1xuXHRcdFx0XHRcdFx0XHRyZXEuZGF0YT1zb21ldGhpbmc7XG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKHJlcSk7XG5cdFx0XHRcdFx0XHRcdFx0JGh0dHAoIHttZXRob2Q6XCJQT1NUXCIsdXJsOlwiL3JlZ2lzdGVyX2V2ZW50XCIsZGF0YTogcmVxfVxuICAgICAgICAgXG5cdFx0XHRcdFx0XHRcdFx0ICAgICApLnRoZW4oZnVuY3Rpb24ocmVzKXtcblx0XHRcdFx0XHRcdFx0XHRcdCBjb25zb2xlLmxvZyhcInJlczpcIik7XG5cdFx0IGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcblx0XHQgIGNvbnRyb2xsZXIubWVzc2FnZT1yZXMuZGF0YVtcIm1lc3NhZ2VcIl07XG5cdFx0IGNvbnRyb2xsZXIubWVzc2FnZV92aXNpYmxlPXRydWU7XG5cdFx0ICR0aW1lb3V0KGZ1bmN0aW9uKCl7Y29udHJvbGxlci5tZXNzYWdlX3Zpc2libGU9ZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJtZXNzYWdlIGhpZGRlblwiKTtcblx0XHRcdFx0IH0sMzAwMCk7XG5cdC8vXHQgc2VydmljZS5hbGxfZXZlbnRzPXJlcy5kYXRhLmluZm8uZXZlbnRzO1xuXHQvL1x0IHNlcnZpY2UucmVzb3VyY2VzPXJlcy5kYXRhLmluZm8ucmVzb3VyY2VzO1xuXHRcdCBcblx0XHRcdFx0XHRcdFx0XHQgICAgIH1cblx0XHQgICAgLGZ1bmN0aW9uKHJlcyl7XG4gICAgICAgICAgICAgY29uc29sZS5sb2coXCJsb2dpbl91cGRhdGUgZmFpbGVkXCIpO1xuXHRcdFxuXHRcdCAgICB9KTt9O1xuXHRcdFx0XHQgICAgIH1cblxuXG5cdFx0XHRcdFx0IFxuXHRcdFx0XHQgICAgfVxuXG5cdFx0XHRcdCAgICApO1xuIiwiYW5ndWxhci5tb2R1bGUoJ21haW5BcHAnKS5jb21wb25lbnQoJ2N1cnJlbnRBZmZhaXJzJyxcblx0XHRcdFx0ICAgIHt0ZW1wbGF0ZVVybDogJ2V2ZW50cy5odG1sJyxcblx0XHRcdFx0ICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUsSW5mbyxBdXRoLCRzY2Upe1xuXHRcdFx0XHRcdCB0aGlzLkluZm89SW5mbztcblx0XHRcdFx0XHQgdGhpcy5BdXRoPUF1dGg7XG5cdFx0XHRcdCAgICAgJHNjb3BlLnJlbmRlckh0bWwgPSBmdW5jdGlvbiAoaHRtbENvZGUpIHtcbiAgICAgICAgICAgIHJldHVybiAkc2NlLnRydXN0QXNIdG1sKGh0bWxDb2RlKTtcbiAgICAgICAgfTtcblx0XHRcdFx0XHQgJHNjb3BlLiRvbignYXV0aG9yaXplZCcsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEluZm8ubG9naW5fdXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkpTT04gSU5GTzogXCIrSW5mby5hbGxfZXZlbnRzKTtcblx0XHQgICAgICAvL2NvbnNvbGUubG9nKFwiSlNPTiBJTkZPIEVWRU5UUyBcIityZXMuZGF0YS5pbmZvLmV2ZW50cylcblx0XHRcdFx0XHQgfSk7XG5cblx0XHRcdFx0ICAgICB9fSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnbWFpbkFwcCcpXG4gICAgLmNvbXBvbmVudCgnbG9jYXRpb24nLFxuXHQgICAgICAge3RlbXBsYXRlVXJsOiAnbG9jYXRpb24uaHRtbCcsYmluZGluZ3M6e2RhdGE6XCI9XCJ9LFxuXHRcdGNvbnRyb2xsZXI6XG5cdFx0ZnVuY3Rpb24oJHNjb3BlLEluZm8sQXV0aCwkaHR0cCwkdGltZW91dCwkc2NlKXtcblx0XHQgICAgdGhpcy5yZW5kZXJIdG1sID0gZnVuY3Rpb24gKGh0bWxDb2RlKSB7XG5cdFx0XHRyZXR1cm4gJHNjZS50cnVzdEFzSHRtbChodG1sQ29kZSk7XG5cdFx0ICAgIH07XG5cblxuXHRcdCAgICB0aGlzLkF1dGg9QXV0aDtcblx0XHQgICAgdGhpcy5JbmZvPUluZm87XG5cdFx0ICAgIHZhciBjb21wb25lbnQ9dGhpcztcblx0XHQgICAgdmFyIGVudGVyX3RleHQ9XCLZiNix2YjYr1wiO1xuXHRcdCAgICB2YXIgZXhpdF90ZXh0PVwi2K7YsdmI2KxcIjtcblx0XHQgICAgdmFyIGxlc3NfdGV4dD1cItqp2YXYqtixXCI7XG5cdFx0ICAgIHZhciBtb3JlX3RleHQ9XCLYqNuM2LTYqtixXCI7XG5cdFx0ICAgIHZhciBpbnNpZGVfY29sb3I9XCJyZWRcIjtcblx0XHQgICAgdmFyIG91dHNpZGVfY29sb3I9XCJibGFja1wiO1xuXHRcdCAgICB0aGlzLnRvZ2dsZV9tb3JlX3RleHQ9ZnVuY3Rpb24oKVxuXHRcdCAgICB7aWYgKHRoaXMuZGF0YS5tb3JlKSByZXR1cm4gbGVzc190ZXh0OyBlbHNlIHJldHVybiBtb3JlX3RleHQ7fTtcblx0XHQgICAgdGhpcy50b2dnbGVfZW50ZXJfY29sb3I9ZnVuY3Rpb24oKVxuXHRcdCAgICB7aWYgKHRoaXMuZGF0YS5pbnNpZGUpIHJldHVybiBpbnNpZGVfY29sb3I7IGVsc2UgcmV0dXJuIG91dHNpZGVfY29sb3I7fTtcblx0XHQgICAgdGhpcy50b2dnbGVfZW50ZXJfdGV4dD1mdW5jdGlvbigpXG5cdFx0ICAgIHtpZiAodGhpcy5kYXRhLmluc2lkZSkgcmV0dXJuIGV4aXRfdGV4dDsgZWxzZSByZXR1cm4gZW50ZXJfdGV4dDt9O1xuXHRcdCAgICBcblx0XHQgICAgdGhpcy5pbnNpZGU9ZmFsc2U7XG5cdFx0ICAgIHRoaXMudG9nZ2xlX21vcmU9ZnVuY3Rpb24oKXtcblx0XHRcdGlmIChjb21wb25lbnQuZGF0YS5tb3JlKVxuXHRcdFx0ey8vY29tcG9uZW50LnRvZ2dsZV9tb3JlX3RleHQ9bW9yZV90ZXh0O1xuXHRcdFx0IGNvbnNvbGUubG9nKFwidG9nZ2xlIG1vcmUgd2FzIHNldFwiKTtcblx0XHRcdCBjb21wb25lbnQuZGF0YS5tb3JlPWZhbHNlO31cblx0XHRcdGVsc2V7Ly8gY29tcG9uZW50LnRvZ2dsZV9tb3JlX3RleHQ9bGVzc190ZXh0O1xuXHRcdFx0ICAgICAgY29tcG9uZW50LmRhdGEubW9yZT10cnVlO1xuXHRcdFx0ICAgICAgY29uc29sZS5sb2coXCJ0b2dnbGUgbW9yZSB3YXMgbm90IHNldFwiKTt9XG5cblx0XHQgICAgfTtcblx0XHQgICAgXG5cdFx0ICAgXG5cblx0XHQgICAgXG5cdFx0ICAgICB0aGlzLmJ1dHRvbl9kZWNpZGVkPWZhbHNlO1xuXHRcdCAgICAvLyB0aGlzLm1lc3NhZ2U9XCJcIjtcblx0XHQgICAgLy9jb25zb2xlLmxvZyh0aGlzKTtcblx0XHQgICAgLy9jb25zb2xlLmxvZyh0aGlzLmRhdGEpO1xuXHRcdCAgICB2YXIgY29udHJvbGxlcj10aGlzO1xuXHRcdCAgICB2YXIgcmVxPXt9O1xuXHRcdCAgICBcblx0XHQgICAgLy8gcmVxLmlkPWNvbnRyb2xsZXIuZGF0YS5pZDtcblx0XHQgICAgcmVxLmluZm89e307XG5cdFx0ICAgIC8vIHJlcS5uYW1lPWNvbnRyb2xsZXIuZGF0YS5uYW1lO1xuXHRcdCAgICByZXEudG9ja2VuPUF1dGgudG9ja2VuO1xuXHRcdCAgICB0aGlzLmRhdGFfc2V0PWZhbHNlO1xuXHRcdCAgICB0aGlzLm1lc3NhZ2Vfc2hvdz1mYWxzZTtcblx0XHQgICAgdGhpcy5tZXNzYWdlPVwibWVzc2FnZSEhLi4uXCI7XG5cdFx0ICAgIHRoaXMuZW50ZXJfYnV0dG9uPWZ1bmN0aW9uKCl7XG5cdFx0XHRpZiAoY29udHJvbGxlci5idXR0b25fZGVjaWRlZCkgcmV0dXJuO1xuXHRcdFx0Y29udHJvbGxlci5idXR0b25fZGVjaWRlZD10cnVlO1xuXHRcdFx0aWYgKCFjb250cm9sbGVyLmRhdGEuaW5zaWRlKVxuXHRcdFx0ICAgICRodHRwLnBvc3QoXCIvcmVnaXN0ZXJfZXZlbnRcIixcblx0XHRcdFx0ICAgICAgIHtcInRvY2tlblwiOkF1dGgudG9ja2VuLFxuXHRcdFx0XHRcdFwiaGFzaFwiOlwiZW50ZXJMb2NhdGlvblwiLFxuXHRcdFx0XHRcdFwiZGF0YVwiOntcInVzZXJcIjpBdXRoLnVzZXIsXCJsb2NhdGlvblwiOmNvbnRyb2xsZXIuZGF0YS5oYXNofX1cblx0XHRcdFx0ICAgICAgKS50aGVuKFxuXHRcdFx0XHRcdCAgZnVuY3Rpb24ocmVzKXtcblx0XHRcdFx0XHQgICAgICB2YXIgZGF0YT1yZXMuZGF0YTtcblx0XHRcdFx0XHQgICAgICBjb25zb2xlLmxvZyhcInN1Y2Nlc3MgaW4gcmVnaXN0ZXJpbmcgZW50ZXJfbG9jYXRpb25cIik7XG5cdFx0XHRcdFx0ICAgICAgY29uc29sZS5sb2coZGF0YSk7XG5cdFx0XHRcdFx0ICAgICAgaWYgKGRhdGEuZXZlbnRfY29kZSA+MCAmJiBkYXRhLmNvZGUgPiAwICkgY29udHJvbGxlci5kYXRhLmluc2lkZT0hY29udHJvbGxlci5kYXRhLmluc2lkZTtcblx0XHRcdFx0XHQgICAgICBjb250cm9sbGVyLmJ1dHRvbl9kZWNpZGVkPWZhbHNlO1xuXHRcdFx0XHRcdCAgICAgIGNvbnRyb2xsZXIubWVzc2FnZT1kYXRhLm1lc3NhZ2U7XG5cdFx0XHRcdFx0ICAgICAgY29udHJvbGxlci5tZXNzYWdlX3Nob3c9dHJ1ZTtcblx0XHRcdFx0XHQgICAgICAkdGltZW91dChmdW5jdGlvbigpe2NvbnRyb2xsZXIubWVzc2FnZV9zaG93PWZhbHNlO30sMzAwMCk7XG5cdFx0XHRcdFx0ICAgICAgXG5cblx0XHRcdFx0XHQgIH0pO1xuXG5cdFx0XHRcblx0XHRcdGVsc2Vcblx0XHRcdCAgICAkaHR0cC5wb3N0KFwiL3VwZGF0ZV9ldmVudFwiLHtcblx0XHRcdFx0XCJ0b2NrZW5cIjpBdXRoLnRvY2tlbixcblx0XHRcdFx0XCJuYW1lXCI6XCJlbnRlckxvY2F0aW9uXCIsXG5cdFx0XHRcdFwibWV0aG9kXCI6IFwiZ2V0X291dFwiLFxuXHRcdFx0XHRcImluZm9cIjoge1widXNlclwiOkF1dGgudXNlcixcImxvY2F0aW9uXCI6Y29udHJvbGxlci5kYXRhLmhhc2h9XG5cblx0XHRcdCAgICB9KS50aGVuKGZ1bmN0aW9uKHJlcyl7XG5cdFx0XHRcdHZhciBkYXRhPXJlcy5kYXRhO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcInN1Y2Nlc3MgaW4gZ2V0X291dCBlbnRlcl9sb2NhdGlvblwiKTtcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XG5cdFx0XHRcdGNvbnRyb2xsZXIuYnV0dG9uX2RlY2lkZWQ9ZmFsc2U7XG5cdFx0XHRcdGlmIChkYXRhLm1lc3NhZ2Uub2sgKSBjb250cm9sbGVyLmRhdGEuaW5zaWRlPSFjb250cm9sbGVyLmRhdGEuaW5zaWRlO1xuXHRcdFx0XHRcblx0XHRcdCAgICAgICAgY29udHJvbGxlci5tZXNzYWdlPWRhdGEubWVzc2FnZS5tZXNzYWdlO1xuXHRcdFx0ICAgICAgICBjb250cm9sbGVyLm1lc3NhZ2Vfc2hvdz10cnVlO1xuXHRcdFx0XHQkdGltZW91dChmdW5jdGlvbigpe2NvbnRyb2xsZXIubWVzc2FnZV9zaG93PWZhbHNlO30sMzAwMCk7XG5cblx0XHRcdCAgICB9KTtcblxuXHRcdCAgICB9O1xuXHRcdCAgICB0aGlzLiRvbkNoYW5nZXM9ZnVuY3Rpb24oKXtcblx0XHRcdGlmICgoY29udHJvbGxlci5kYXRhX3NldD09ZmFsc2UpJiZcblx0XHRcdCAgICAoXCJkYXRhXCIgaW4gY29udHJvbGxlcikpe1xuXHRcdFx0ICAgIGNvbnRyb2xsZXIuZGF0YV9zZXQ9dHJ1ZTtcblx0XHRcdCAgICAvL1x0IHJlcS5uYW1lPWNvbnRyb2xsZXIuZGF0YS5uYW1lO1xuXHRcdFx0ICAgIC8vXHQgcmVxLmlkPWNvbnRyb2xsZXIuZGF0YS5pZDtcblx0XHRcdCAgICBjb25zb2xlLmxvZyhjb250cm9sbGVyLmRhdGEpO1xuXG5cdFx0XHQgICAgaWYgKGNvbnRyb2xsZXIuZGF0YS5tb3JlID09IG51bGwgKSBjb250cm9sbGVyLmRhdGEubW9yZT1mYWxzZTtcblxuXHRcdFx0fVxuXHRcdCAgICB9O1xuXG5cdFx0ICAgICRzY29wZS4kb24oJ2xvY2F0aW9uX3VwZGF0ZScsZnVuY3Rpb24oKXtcblx0XHRcdGNvbnNvbGUubG9nKFwiSSBrbm93ISBsb2NhdGlvbnNcIik7XG5cdFx0XG5cblx0XHQgICAgfSk7XG5cdFx0ICAgIFxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy50ZXh0PUluZm8udGFza3MgICBcblx0XHR9fSk7XG5cblxuIiwiYW5ndWxhci5tb2R1bGUoJ21haW5BcHAnKS5jb21wb25lbnQoJ2xvY2F0aW9ucycsXG5cdFx0XHRcdCAgICB7dGVtcGxhdGVVcmw6ICdsb2NhdGlvbnMuaHRtbCcsXG5cdFx0XHRcdCAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlLEluZm8sQXV0aCwkc2NlKXtcblx0XHRcdFx0XHQgdGhpcy5JbmZvPUluZm87XG5cdFx0XHRcdFx0IHRoaXMuQXV0aD1BdXRoO1xuXHRcdFx0XHQgICAgICRzY29wZS5yZW5kZXJIdG1sID0gZnVuY3Rpb24gKGh0bWxDb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gJHNjZS50cnVzdEFzSHRtbChodG1sQ29kZSk7XG4gICAgICAgIH07XG5cdFx0XHRcdFx0XG5cblx0XHRcdFx0ICAgICB9fSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnbWFpbkFwcCcpLmNvbXBvbmVudCgnb25saW5lVXNlcnMnLFxuXHRcdFx0XHQgICAge3RlbXBsYXRlVXJsOiAnb25saW5ldXNlcnMuaHRtbCcsXG5cdFx0XHRcdCAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlLEluZm8pe1xuXHRcdFx0XHRcdCB0aGlzLkluZm89SW5mbztcblx0XHRcdFx0XHQgICRzY29wZS5pbWdfZmlsZT1mdW5jdGlvbihvKXtyZXR1cm4gXCJpbWcvZ2lybC5qcGdcIjt9O1xuXHRcdFx0XHQgICAgIH19KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdtYWluQXBwJykuY29tcG9uZW50KCdzYW1wbGVUYXNrJyxcblx0XHRcdFx0ICAgIHt0ZW1wbGF0ZVVybDogJ3NhbXBsZXRhc2suaHRtbCcsYmluZGluZ3M6e2RhdGE6XCI9XCJ9LFxuXHRcdFx0XHQgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSxJbmZvLEF1dGgsJGh0dHAsJHRpbWVvdXQpe1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdCB0aGlzLkF1dGg9QXV0aDtcblx0XHRcdFx0XHQgdGhpcy5JbmZvPUluZm87XG5cdFx0XHRcdFx0IHRoaXMuZGVjaWRlZD1mYWxzZTtcblx0XHRcdFx0XHQgdGhpcy5tZXNzYWdlPVwiXCI7XG5cdFx0XHRcdFx0IC8vY29uc29sZS5sb2codGhpcyk7XG5cdFx0XHRcdFx0ICAvL2NvbnNvbGUubG9nKHRoaXMuZGF0YSk7XG5cdFx0XHRcdFx0IHZhciBjb250cm9sbGVyPXRoaXM7XG5cdFx0XHRcdFx0IHZhciByZXE9e307XG5cdFx0XHRcdFxuXHRcdFx0XHRcdC8vIHJlcS5pZD1jb250cm9sbGVyLmRhdGEuaWQ7XG5cdFx0XHRcdFx0IHJlcS5pbmZvPXt9O1xuXHRcdFx0XHRcdC8vIHJlcS5uYW1lPWNvbnRyb2xsZXIuZGF0YS5uYW1lO1xuXHRcdFx0XHRcdCByZXEudG9ja2VuPUF1dGgudG9ja2VuO1xuXHRcdFx0XHRcdCB0aGlzLmRhdGFfc2V0PWZhbHNlO1xuXHRcdFx0XHQgICAgICAgICB0aGlzLiRvbkNoYW5nZXM9ZnVuY3Rpb24oKXtcblx0XHRcdFx0XHQgICAgIGlmICgoY29udHJvbGxlci5kYXRhX3NldD09ZmFsc2UpJiZcblx0XHRcdFx0XHRcdCAoXCJkYXRhXCIgaW4gY29udHJvbGxlcikpe1xuXHRcdFx0XHRcdFx0IGNvbnRyb2xsZXIuZGF0YV9zZXQ9dHJ1ZTtcblx0XHRcdFx0XHRcdCByZXEubmFtZT1jb250cm9sbGVyLmRhdGEubmFtZTtcblx0XHRcdFx0XHRcdCByZXEuaWQ9Y29udHJvbGxlci5kYXRhLmlkO1xuXHRcdFx0XHRcdFx0IGNvbnNvbGUubG9nKGNvbnRyb2xsZXIuZGF0YSk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHQgfTtcblx0XHRcdFx0XHQgIHRoaXMuYWNjZXB0PWZ1bmN0aW9uKCl7aWYgKCFjb250cm9sbGVyLmRlY2lkZWQpIHtcblx0XHRcdFx0XHQgICAgIGNvbnRyb2xsZXIuZGVjaWRlZD10cnVlO1xuXHRcdFx0XHRcdCAgICAgXG5cdFx0XHRcdFx0ICAgICBcblx0XHRcdFx0XHQgICAgIHJlcS5tZXRob2Q9XCJhY2NlcHRcIjtcblx0XHRcdFx0XHQgICAgIFxuXHRcdFx0XHRcdCAgICAgY29uc29sZS5sb2coXCJhY2NlcHRcIik7XG5cdFx0XHRcdFx0ICAgICBjb25zb2xlLmxvZyhyZXEpO1xuXHRcdFx0XHRcdCAgICAgJGh0dHAoIHttZXRob2Q6XCJQT1NUXCIsdXJsOlwiL3VwZGF0ZV9ldmVudFwiLGRhdGE6IHJlcX1cbiAgICAgICAgIFxuXHRcdFx0XHRcdFx0ICApLnRoZW4oZnVuY3Rpb24ocmVzKXtcblx0XHRcdFx0XHRcdCAgICAgIGNvbnRyb2xsZXIubWVzc2FnZT1yZXMuZGF0YS5tZXNzYWdlO1xuXHRcdFx0XHRcdFx0ICAgICAgY29uc29sZS5sb2coXCJzdWNjZXNzXCIpO1xuXHRcdFx0XHRcdFx0ICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuXHRcdFx0XHRcdFx0ICAgICAgIGNvbnRyb2xsZXIubWVzc2FnZT1yZXMuZGF0YS5tZXNzYWdlO1xuXHRcdFx0XHRcdFx0ICAgICAgIGNvbnRyb2xsZXIubWVzc2FnZT1yZXMuZGF0YVtcIm1lc3NhZ2VcIl07XG5cdFx0IGNvbnRyb2xsZXIubWVzc2FnZV92aXNpYmxlPXRydWU7XG5cdC8vXHQgJHRpbWVvdXQoZnVuY3Rpb24oKXtjb250cm9sbGVyLm1lc3NhZ2VfdmlzaWJsZT1mYWxzZTtcblxuXHQvL1x0XHRcdCB9LDcwMDApO1xuXHRcdFx0XHRcdFx0ICAgICAgXG5cblx0XHRcdFx0XHRcdCAgfSxmdW5jdGlvbihyZXMpe1xuXHRcdFx0XHRcdFx0ICAgICAgY29uc29sZS5sb2coXCJ1bnN1Y2Nlc3NmdWxcIik7XG5cdFx0XHRcdFx0XHQgICAgICBjb250cm9sbGVyLmRlY2lkZWQ9ZmFsc2U7XG5cblx0XHRcdFx0XHRcdCAgfSk7XG5cblx0XHRcdFx0XHQgfX07XG5cdFx0XHRcdFx0IHRoaXMucmVqZWN0PWZ1bmN0aW9uKCl7aWYgKCFjb250cm9sbGVyLmRlY2lkZWQpIHtcblx0XHRcdFx0XHQgICAgIGNvbnRyb2xsZXIuZGVjaWRlZD10cnVlO1xuXHRcdFx0XHRcdCAgICAgICAgIHZhciByZXE9e307XG5cdFx0XHRcdFx0ICAgIFxuXHRcdFx0XHRcdCAgICAgcmVxLm1ldGhvZD1cInJlamVjdFwiO1xuXHRcdFx0XHRcdCAgICAgcmVxLnRvY2tlbj1BdXRoLnRvY2tlbjtcblx0XHRcdFx0XHQgICAgIHJlcS5pbmZvPXt9O1xuXHRcdFx0XHRcdCAgICAgIHJlcS5uYW1lPWNvbnRyb2xsZXIuZGF0YS5uYW1lO1xuXHRcdFx0XHRcdFx0IHJlcS5pZD1jb250cm9sbGVyLmRhdGEuaWQ7XG5cdFx0XHRcdFx0ICAgICBjb25zb2xlLmxvZyhcInJlamVjdFwiKTtcblx0XHRcdFx0XHQgICAgIGNvbnNvbGUubG9nKHJlcSk7XG5cdFx0XHRcdFx0ICAgICAkaHR0cCgge21ldGhvZDpcIlBPU1RcIix1cmw6XCIvdXBkYXRlX2V2ZW50XCIsZGF0YTogcmVxfVxuICAgICAgICAgXG5cdFx0XHRcdFx0XHQgICkudGhlbihmdW5jdGlvbihyZXMpe1xuXHRcdFx0XHRcdFx0ICAgICAgY29uc29sZS5sb2coXCJSZWplY3QgY29ubmVjdGVkIHNlcnZlciB3aXRoIHN1Y2Nlc3NcIik7IGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcblx0XHRcdFx0XHRcdCAgICAgIGNvbnRyb2xsZXIubWVzc2FnZT1yZXMuZGF0YS5tZXNzYWdlO1xuXHRcdFx0XHRcdFx0ICAgICAgIGNvbnRyb2xsZXIubWVzc2FnZT1yZXMuZGF0YVtcIm1lc3NhZ2VcIl07XG5cdFx0IGNvbnRyb2xsZXIubWVzc2FnZV92aXNpYmxlPXRydWU7XG5cdC8vXHQgJHRpbWVvdXQoZnVuY3Rpb24oKXtjb250cm9sbGVyLm1lc3NhZ2VfdmlzaWJsZT1mYWxzZTtcblxuXHQvL1x0XHRcdCB9LDcwMDApO1xuXG5cdFx0XHRcdFx0XHQgIH0sZnVuY3Rpb24ocmVzKXtcblx0XHRcdFx0XHRcdCAgICAgIGNvbnNvbGUubG9nKFwidW5zdWNjZXNzZnVsXCIpO1xuXHRcdFx0XHRcdFx0ICAgICAgY29udHJvbGxlci5kZWNpZGVkPWZhbHNlO1xuXG5cdFx0XHRcdFx0XHQgIH0pO1xuXG5cdFx0XHRcdFx0IH19O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcdFx0XHRcdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMudGV4dD1JbmZvLnRhc2tzICAgXG5cdFx0XHRcdCAgICAgfX0pO1xuXG5cbiIsImFuZ3VsYXIubW9kdWxlKCdtYWluQXBwJykuY29tcG9uZW50KCdzYXlTb21ldGhpbmcnLFxuXHRcdFx0XHQgICAge3RlbXBsYXRlVXJsOiAnc2F5c29tZXRoaW5nLmh0bWwnLFxuXHRcdFx0XHQgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSxJbmZvLEF1dGgsJGh0dHAsJHRpbWVvdXQpe1xuXHRcdFx0XHRcdFxuXG4gdmFyIGNvbnRyb2xsZXI9dGhpcztcblx0XHRcdFx0XHQgdGhpcy5JbmZvPUluZm87XG5cdFx0XHRcdFx0IHRoaXMuQXV0aD1BdXRoO1xuXHRcdFx0XHRcdCAvL3RoaXMuZGF0YT17fTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQgJHNjb3BlLiRvbignYXV0aG9yaXplZCcsZnVuY3Rpb24oKXtcblx0XHRcdFx0XHQgICAgIC8vY29udHJvbGxlci5kYXRhLmE9IEF1dGgudXNlcjtcblx0XHRcdFx0XHQgICAgLy8gY29uc29sZS5sb2coXCJzYXkgU29tZXRoIGE6XCIrY29udHJvbGxlci5kYXRhLmEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJbmZvLmxvZ2luX3VwZGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkpTT04gSU5GTzogXCIrSW5mby5hbGxfZXZlbnRzKTtcblx0XHQgICAgICAvL2NvbnNvbGUubG9nKFwiSlNPTiBJTkZPIEVWRU5UUyBcIityZXMuZGF0YS5pbmZvLmV2ZW50cylcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHQgICAgdGhpcy5zdWJtaXQ9ZnVuY3Rpb24oc29tZXRoaW5nKXtcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXCJTdWJtaXR0ZWRcIik7XG5cdFx0XHRcdFx0XHRcdC8vY29uc29sZS5sb2codGhpcy5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlcT17fTtcblx0XHRcdFx0XHRcdFx0cmVxLnRvY2tlbj1BdXRoLnRvY2tlbjtcblx0XHRcdFx0XHRcdFx0cmVxLmhhc2g9XCJzYXlTb21ldGhpbmdcIjtcblx0XHRcdFx0XHRcdFx0c29tZXRoaW5nLmE9QXV0aC51c2VyO1xuXHRcdFx0XHRcdFx0XHRyZXEuZGF0YT1zb21ldGhpbmc7XG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKHJlcSk7XG5cdFx0XHRcdFx0XHRcdFx0JGh0dHAoIHttZXRob2Q6XCJQT1NUXCIsdXJsOlwiL3JlZ2lzdGVyX2V2ZW50XCIsZGF0YTogcmVxfVxuICAgICAgICAgKS50aGVuKGZ1bmN0aW9uKHJlcyl7XG5cdFx0XHRcdFx0IGNvbnNvbGUubG9nKFwicmVzOlwiKTtcblx0XHRcdFx0XHQgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuXHRcdFx0XHRcdFx0XHRcdFx0IFxuXHQgICAgIGlmIChyZXMuZGF0YVtcIm1lc3NhZ2VcIl0pe1xuXHRcdCBjb250cm9sbGVyLm1lc3NhZ2U9cmVzLmRhdGFbXCJtZXNzYWdlXCJdO1xuXHRcdCBjb250cm9sbGVyLm1lc3NhZ2VfdmlzaWJsZT10cnVlO1xuXHRcdCAkdGltZW91dChmdW5jdGlvbigpe2NvbnRyb2xsZXIubWVzc2FnZV92aXNpYmxlPWZhbHNlO1xuXG5cdFx0XHRcdCB9LDMwMDApO1xuXG5cdFx0XHRcdFx0IH1cblx0Ly9cdCBzZXJ2aWNlLmFsbF9ldmVudHM9cmVzLmRhdGEuaW5mby5ldmVudHM7XG5cdC8vXHQgc2VydmljZS5yZXNvdXJjZXM9cmVzLmRhdGEuaW5mby5yZXNvdXJjZXM7XG5cdFx0IFxuXHRcdFx0XHRcdFx0XHRcdCAgICAgfVxuXHRcdCAgICAsZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImxvZ2luX3VwZGF0ZSBmYWlsZWRcIik7XG5cdFx0XG5cdFx0ICAgIH0pO307XG5cdFx0XHRcdCAgICAgfVxuXG5cblx0XHRcdFx0XHQgXG5cdFx0XHRcdCAgICB9XG5cblx0XHRcdFx0ICAgKTtcbiIsImFuZ3VsYXIubW9kdWxlKCdtYWluQXBwJykuY29tcG9uZW50KCdzaW1wbGVOb3RpZicsXG5cdFx0XHRcdCAgICB7dGVtcGxhdGVVcmw6ICdzaW1wbGVub3RpZi5odG1sJyxiaW5kaW5nczp7ZGF0YTpcIj1cIn0sXG5cdFx0XHRcdCAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlLEluZm8sQXV0aCwkaHR0cCwkdGltZW91dCl7XG5cdFx0XHRcdFx0IGNvbnNvbGUubG9nKFwic2ltcGxlLW5vdGlmXCIpO1xuXHRcdFx0XHRcdCB0aGlzLkF1dGg9QXV0aDtcblx0XHRcdFx0XHQgdGhpcy5JbmZvPUluZm87XG5cdFx0XHRcdFx0IHRoaXMuZGVjaWRlZD1mYWxzZTtcblx0XHRcdFx0XHQgdGhpcy5tZXNzYWdlPVwiXCI7XG5cdFx0XHRcdFx0IC8vY29uc29sZS5sb2codGhpcyk7XG5cdFx0XHRcdFx0ICAvL2NvbnNvbGUubG9nKHRoaXMuZGF0YSk7XG5cdFx0XHRcdFx0IHZhciBjb250cm9sbGVyPXRoaXM7XG5cdFx0XHRcdFx0IHZhciByZXE9e307XG5cdFx0XHRcdFxuXHRcdFx0XHRcdC8vIHJlcS5pZD1jb250cm9sbGVyLmRhdGEuaWQ7XG5cdFx0XHRcdFx0IHJlcS5pbmZvPXt9O1xuXHRcdFx0XHRcdC8vIHJlcS5uYW1lPWNvbnRyb2xsZXIuZGF0YS5uYW1lO1xuXHRcdFx0XHRcdCByZXEudG9ja2VuPUF1dGgudG9ja2VuO1xuXHRcdFx0XHRcdCB0aGlzLmRhdGFfc2V0PWZhbHNlO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHQgICAgICAgICB0aGlzLiRvbkNoYW5nZXM9ZnVuY3Rpb24oKXtcblx0XHRcdFx0XHQgICAgIGlmICgoY29udHJvbGxlci5kYXRhX3NldD09ZmFsc2UpJiZcblx0XHRcdFx0XHRcdCBjb250cm9sbGVyLmhhc093blByb3BlcnR5KCdkYXRhJykmJlxuXHRcdFx0XHRcdFx0IGNvbnRyb2xsZXIuZGF0YSE9dW5kZWZpbmVkKXtcblx0XHRcdFx0XHRcdCAgY29udHJvbGxlci5kYXRhLnNlZW49ZmFsc2U7XG5cdFx0XHRcdFx0XHQgY29uc29sZS5sb2coXCJkYXRhIGRlZmluZWQhXCIpO1xuXHRcdFx0XHRcdFx0IGNvbnNvbGUubG9nKGNvbnRyb2xsZXIuZGF0YSk7XG5cdFx0XHRcdFx0XHQgY29udHJvbGxlci5kYXRhX3NldD10cnVlO1xuXHRcdFx0XHRcdFx0IHJlcS5uYW1lPWNvbnRyb2xsZXIuZGF0YS5uYW1lO1xuXHRcdFx0XHRcdFx0IHJlcS5pZD1jb250cm9sbGVyLmRhdGEuaWQ7XG5cdFx0XHRcdFx0XHQgY29uc29sZS5sb2coY29udHJvbGxlci5kYXRhKTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdCB9O1xuXHRcdFx0XHRcdCAgdGhpcy5hY2NlcHQ9ZnVuY3Rpb24oKXtpZiAoIWNvbnRyb2xsZXIuZGVjaWRlZCkge1xuXHRcdFx0XHRcdCAgICAgY29udHJvbGxlci5kZWNpZGVkPXRydWU7XG5cdFx0XHRcdFx0ICAgICBcblx0XHRcdFx0XHQgICAgIFxuXHRcdFx0XHRcdCAgICAgcmVxLm1ldGhvZD1cInNlZW5cIjtcblx0XHRcdFx0XHQgICAgIFxuXHRcdFx0XHRcdCAgICAgY29uc29sZS5sb2coXCJhY2NlcHRcIik7XG5cdFx0XHRcdFx0ICAgICBjb25zb2xlLmxvZyhyZXEpO1xuXHRcdFx0XHRcdCAgICAgJGh0dHAoIHttZXRob2Q6XCJQT1NUXCIsdXJsOlwiL3VwZGF0ZV9ldmVudFwiLGRhdGE6IHJlcX1cbiAgICAgICAgIFxuXHRcdFx0XHRcdFx0ICApLnRoZW4oZnVuY3Rpb24ocmVzKXtcblx0XHRcdFx0XHRcdCAgICAgIGNvbnRyb2xsZXIubWVzc2FnZT1yZXMuZGF0YS5tZXNzYWdlO1xuXHRcdFx0XHRcdFx0ICAgICAgY29uc29sZS5sb2coXCJzdWNjZXNzXCIpO1xuXHRcdFx0XHRcdFx0ICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuXHRcdFx0XHRcdFx0ICAgICAgIGNvbnRyb2xsZXIubWVzc2FnZT1yZXMuZGF0YS5tZXNzYWdlO1xuXHRcdFx0XHRcdFx0ICAgICAgIGNvbnRyb2xsZXIubWVzc2FnZT1yZXMuZGF0YVtcIm1lc3NhZ2VcIl07XG5cdFx0XHRcdFx0XHQgICAgICBjb250cm9sbGVyLm1lc3NhZ2VfdmlzaWJsZT10cnVlO1xuXHRcdFx0XHRcdFx0ICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtjb250cm9sbGVyLmRhdGEuc2Vlbj10cnVlO1xuXG5cdFx0XHRcdCB9LDcwMDApO1xuXHQvL1x0ICR0aW1lb3V0KGZ1bmN0aW9uKCl7Y29udHJvbGxlci5tZXNzYWdlX3Zpc2libGU9ZmFsc2U7XG5cblx0Ly9cdFx0XHQgfSw3MDAwKTtcblx0XHRcdFx0XHRcdCAgICAgIFxuXG5cdFx0XHRcdFx0XHQgIH0sZnVuY3Rpb24ocmVzKXtcblx0XHRcdFx0XHRcdCAgICAgIGNvbnNvbGUubG9nKFwidW5zdWNjZXNzZnVsXCIpO1xuXHRcdFx0XHRcdFx0ICAgICAgY29udHJvbGxlci5kZWNpZGVkPWZhbHNlO1xuXG5cdFx0XHRcdFx0XHQgIH0pO1xuXG5cdFx0XHRcdFx0IH19O1xuXHRcdFx0XHRcdCB0aGlzLnJlamVjdD1mdW5jdGlvbigpe2lmICghY29udHJvbGxlci5kZWNpZGVkKSB7XG5cdFx0XHRcdFx0ICAgICBjb250cm9sbGVyLmRlY2lkZWQ9dHJ1ZTtcblx0XHRcdFx0XHQgICAgICAgICB2YXIgcmVxPXt9O1xuXHRcdFx0XHRcdCAgICBcblx0XHRcdFx0XHQgICAgIHJlcS5tZXRob2Q9XCJyZWplY3RcIjtcblx0XHRcdFx0XHQgICAgIHJlcS50b2NrZW49QXV0aC50b2NrZW47XG5cdFx0XHRcdFx0ICAgICByZXEuaW5mbz17fTtcblx0XHRcdFx0XHQgICAgICByZXEubmFtZT1jb250cm9sbGVyLmRhdGEubmFtZTtcblx0XHRcdFx0XHRcdCByZXEuaWQ9Y29udHJvbGxlci5kYXRhLmlkO1xuXHRcdFx0XHRcdCAgICAgY29uc29sZS5sb2coXCJyZWplY3RcIik7XG5cdFx0XHRcdFx0ICAgICBjb25zb2xlLmxvZyhyZXEpO1xuXHRcdFx0XHRcdCAgICAgJGh0dHAoIHttZXRob2Q6XCJQT1NUXCIsdXJsOlwiL3VwZGF0ZV9ldmVudFwiLGRhdGE6IHJlcX1cbiAgICAgICAgIFxuXHRcdFx0XHRcdFx0ICApLnRoZW4oZnVuY3Rpb24ocmVzKXtcblx0XHRcdFx0XHRcdCAgICAgIGNvbnNvbGUubG9nKFwiUmVqZWN0IGNvbm5lY3RlZCBzZXJ2ZXIgd2l0aCBzdWNjZXNzXCIpOyBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG5cdFx0XHRcdFx0XHQgICAgICBjb250cm9sbGVyLm1lc3NhZ2U9cmVzLmRhdGEubWVzc2FnZTtcblx0XHRcdFx0XHRcdCAgICAgICBjb250cm9sbGVyLm1lc3NhZ2U9cmVzLmRhdGFbXCJtZXNzYWdlXCJdO1xuXHRcdCBjb250cm9sbGVyLm1lc3NhZ2VfdmlzaWJsZT10cnVlO1xuXHRcdFx0XHRcdFx0IFxuXG5cdFx0XHRcdFx0XHQgIH0sZnVuY3Rpb24ocmVzKXtcblx0XHRcdFx0XHRcdCAgICAgIGNvbnNvbGUubG9nKFwidW5zdWNjZXNzZnVsXCIpO1xuXHRcdFx0XHRcdFx0ICAgICAgY29udHJvbGxlci5kZWNpZGVkPWZhbHNlO1xuXG5cdFx0XHRcdFx0XHQgIH0pO1xuXG5cdFx0XHRcdFx0IH19O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcdFx0XHRcdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMudGV4dD1JbmZvLnRhc2tzICAgXG5cdFx0XHRcdCAgICAgfX0pO1xuXG4iLCJhbmd1bGFyLm1vZHVsZSgnbWFpbkFwcCcpLmNvbXBvbmVudCgndGFza3MnLFxuXHRcdFx0XHQgICAge3RlbXBsYXRlVXJsOiAndGFza3MuaHRtbCcsXG5cdFx0XHRcdCAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlLEluZm8sQXV0aCl7XG5cdFx0XHRcdFx0IHRoaXMuQXV0aD1BdXRoO1xuXHRcdFx0XHRcdCB0aGlzLkluZm89SW5mbztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0XHQgICAgIH19KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdtYWluQXBwJykuY29tcG9uZW50KCd1c2VyU3RhdHVzJyxcblx0XHRcdFx0ICAgIHt0ZW1wbGF0ZVVybDogJ3N0YXR1cy5odG1sJyxcblx0XHRcdFx0ICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUsQXV0aCxJbmZvKXtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQgdGhpcy51c2VybmFtZT1cInVua25vd25cIjtcblx0XHRcdFx0XHQgdGhpcy5BdXRoPUF1dGg7XG5cdFx0XHRcdFx0IHRoaXMuSW5mbz1JbmZvO1xuXHRcdFx0XHRcdCB2YXIgY29udHJvbGxlcj10aGlzO1xuXHRcdFx0XHRcdCAkc2NvcGUuJG9uKCdhdXRob3JpemVkJyxmdW5jdGlvbigpe1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgY29uc29sZS5sb2coXCJjb21wb25lbnQga25vd3MgaXQgaXMgYXV0aG9yaXplZFwiKTtcblx0XHRcdFx0XHQgICAgY29udHJvbGxlci51c2VybmFtZT1BdXRoLnVzZXI7XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCAgfSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0IH19KTtcbiIsImFwcC5maWx0ZXIoXCJ0cnVzdFwiLCBbJyRzY2UnLCBmdW5jdGlvbigkc2NlKSB7XG4gIHJldHVybiBmdW5jdGlvbihodG1sQ29kZSl7XG4gICAgcmV0dXJuICRzY2UudHJ1c3RBc0h0bWwoaHRtbENvZGUpO1xuICB9O1xufV0pO1xuYXBwLmNvbnRyb2xsZXIoJ2Jhc2ljJyxmdW5jdGlvbiAoJHJvb3RTY29wZSwkc2NvcGUsJGh0dHAsQXV0aCxJbmZvLCRzY2Upe1xuICAgIC8vIEluZm8udXBkYXRlKCk7XG4gICAgJHNjb3BlLnJlbmRlckh0bWwgPSBmdW5jdGlvbiAoaHRtbENvZGUpIHtcbiAgICAgICAgICAgIHJldHVybiAkc2NlLnRydXN0QXNIdG1sKGh0bWxDb2RlKTtcbiAgICAgICAgfTtcbiAgICB2YXIgbW91c2Vpbj17XCJ0YXNrc1wiOmZhbHNlLFwiYWN0aW9uc1wiOmZhbHNlLFwiZXZlbnRzXCI6ZmFsc2V9O1xuICAgICRzY29wZS5tb3VzZXRvZ2dsZT1mdW5jdGlvbihzKXttb3VzZWluW3NdPSFtb3VzZWluW3NdO307XG4gICAgXG4gICAgJHNjb3BlLmJhY2tncm91bmQ9ZnVuY3Rpb24ocyl7XG5cdGlmIChtb3VzZWluW3NdKSByZXR1cm4gXCIjZmNmXCI7XG5cdGlmICgkc2NvcGUuc2hvdz09cykgcmV0dXJuIFwiIzBhYVwiOyBlbHNlIHJldHVybiBcIiNjZmNcIjtcbiAgICB9O1xuICAgICRzY29wZS53b3JraW5nPVwiPHNwYW4+IEFuZ3VsYXJKUyA8L3NwYW4+XCI7XG4gICBcbiAgICAkc2NvcGUuQXV0aD1BdXRoO1xuICAgICRzY29wZS5jcmVkZW50aWFscz17fTtcbiAgICAkc2NvcGUubG9naW49ZnVuY3Rpb24gKGNyZWRlbnRpYWxzKXtjb25zb2xlLmxvZyhcInN1Ym1pdHRlZCBcIiArIGNyZWRlbnRpYWxzLnVzZXJuYW1lKTtcblx0XHRcdFx0XHRpZiAoQXV0aC5hdXRoZW50aWNhdGUoY3JlZGVudGlhbHMudXNlcm5hbWUsY3JlZGVudGlhbHMucGFzc3dvcmQpKSAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2F1dGhvcml6ZWQnKTsgICAgICAvLyRzY29wZS5hdXRob3JpemVkPUF1dGguYXV0aG9yaXplZDtcbiAgICAgICAgICAgICAkc2NvcGUuc2hvdz1cImFjdGlvbnNcIjtcdFx0XHQgICAgICAgICAgICAgICBcblx0XHRcdFx0ICAgICAgIH07XG4gICAvLyAkc2NvcGUuJG9uKCdhdXRob3JpemVkJyxmdW5jdGlvbigpeyRzY29wZS5hdXRob3JpemVkPXRydWU7IGNvbnNvbGUubG9nKFwiJHNjb3BlLmF1dGhvcml6ZWRcIiwkc2NvcGUuYXV0aG9yaXplZCk7fSk7XG4gICAgXG59KTtcbmFwcC5jb250cm9sbGVyKCdiYXNpYzInLGZ1bmN0aW9uICgkc2NvcGUsJGh0dHApe1xuICAgICRzY29wZS53b3JraW5nPVwiQW5ndWxhckpTMlwiO1xuICAgIFxufSk7XG5cbiIsIlxuY29uc29sZS5sb2coXCJoZXJlIHB1YmxpYyFcIik7XG5hcHA9YW5ndWxhci5tb2R1bGUoJ21haW5BcHAnLFtdKTtcbm1lc3NhZ2U9XCJtZXNzYWFhYWdlXCI7XG5yZXF1aXJlKFwiLi9zZXJ2aWNlL2F1dGguanNcIik7XG5yZXF1aXJlKFwiLi9zZXJ2aWNlL2luZm8uanNcIik7XG5yZXF1aXJlKFwiLi9jb250cm9sbGVyL2Jhc2ljLmpzXCIpO1xucmVxdWlyZShcIi4vY29tcG9uZW50L3VzZXJzdGF0dXMuanNcIik7XG5yZXF1aXJlKFwiLi9jb21wb25lbnQvb25saW5ldXNlcnMuanNcIik7XG5yZXF1aXJlKFwiLi9jb21wb25lbnQvY3VycmVudGFmZmFpcnMuanNcIik7XG5yZXF1aXJlKFwiLi9jb21wb25lbnQvc2F5c29tZXRoaW5nLmpzXCIpO1xucmVxdWlyZShcIi4vY29tcG9uZW50L2JldHNvbWV0aGluZy5qc1wiKTtcbnJlcXVpcmUoXCIuL2NvbXBvbmVudC90YXNrcy5qc1wiKTtcbnJlcXVpcmUoXCIuL2NvbXBvbmVudC9zYW1wbGV0YXNrLmpzXCIpO1xucmVxdWlyZShcIi4vY29tcG9uZW50L3NpbXBsZW5vdGlmLmpzXCIpO1xucmVxdWlyZShcIi4vY29tcG9uZW50L2xvY2F0aW9ucy5qc1wiKTtcbnJlcXVpcmUoXCIuL2NvbXBvbmVudC9sb2NhdGlvbi5qc1wiKTtcbi8vIGJyb3dzZXJpZnkgY29tbWFuZDogYnJvd3NlcmlmeSAtLWRlYnVnIG1haW5hcHAuanMgLW8gYnVuZGxlLmpzXG5cbiIsImNvbnNvbGUubG9nKFwiQXV0aCBzdGFydGVkXCIpO1xuY29uc29sZS5sb2coXCJIRVJFIFwiICttZXNzYWdlKyBcIiAuXCIpO1xuYXBwLnNlcnZpY2UoJ0F1dGgnLGZ1bmN0aW9uKCRodHRwLCRyb290U2NvcGUpe1xuICAgIHRoaXMuYXV0aG9yaXplZD1mYWxzZTtcbiAgICB2YXIgc2VydmljZT10aGlzO1xuICAgIHNlcnZpY2UudXNlcj1cIlwiO1xuICAgIHRoaXMuYXV0aGVudGljYXRlPWZ1bmN0aW9uKHVzZXIscGFzcyl7XG5cdC8vJGh0dHAuZGVmYXVsdHMuaGVhZGVycy5wb3N0W1wiQ29udGVudC1UeXBlXCJdID0gXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIjtcblx0JGh0dHAoe21ldGhvZDpcIlBPU1RcIix1cmw6ICcvbG9naW4nLCBkYXRhOntcInVzZXJcIjp1c2VyLFwicGFzc1wiOnBhc3N9XG4gICAgICAgICAgICAgICBcblx0ICAgICAgfSkudGhlbihmdW5jdGlvbihyZXMpe1xuXHRcdCAgY29uc29sZS5sb2coXCJzZXJ2ZXIgcmVzcG9uZGVkXCIsIHJlcyk7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuXHRcdCAgICAgIGNvbnNvbGUubG9nKFwibG9naW4gc3VjY2Vzc2Z1bCBcIityZXMuZGF0YS50b2NrZW4pO1xuXHRcdCAgICAgIHNlcnZpY2UuYXV0aG9yaXplZD10cnVlO1xuXHRcdCAgICAgIHNlcnZpY2UudG9ja2VuPXJlcy5kYXRhLnRvY2tlbjtcblx0XHQgICAgICBzZXJ2aWNlLnVzZXI9dXNlcjtcblx0XHQgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2F1dGhvcml6ZWQnKTtcbiAgICAgICAgICBcdFx0ICB9IGVsc2V7XG5cdFx0ICAgICAgY29uc29sZS5sb2coXCJpbnZhbGlkIHVzZXJuYW1lIG9yIHBhc3N3b3JkXCIpO1xuXHRcdCAgfVxuXHQgICAgICB9LCBmdW5jdGlvbihyZXMpe30pO1xuXHRcdFx0Ly9cdCAgaWYgKHVzZXI9PVwiYXJtaW5cIiAmJiBwYXNzPT1cIjEyMzRcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy5hdXRob3JpemVkPXRydWU7XG5cdFx0XHRcdCAgICAgIFxuXHRcdFx0Ly9cdCAgICAgIHRoaXMudXNlcj1cImFybWluXCI7XG5cdFx0XHQvL1x0ICAgICAgdGhpcy5yZXNvdXJjZXM9e307XG5cdFx0XHQvL1x0ICAgICAgdGhpcy5yZXNvdXJjZXMubW9uZXk9NTA7XG5cdFx0XHQvL1x0ICAgICAgdGhpcy5yZXNvdXJjZXMudGltZT0xMDA7XG5cdFx0XHQvL1x0ICAgICAgdGhpcy5yZXNvdXJjZXMucmVwPTEwO1xuXHRcdFx0Ly9cdCAgICAgIGNvbnNvbGUubG9nKFwibG9nZ2VkIGluXCIpO1xuXHRcdFx0Ly9cdCAgICAgIHJldHVybiB0cnVlO1xuXHRcdFx0Ly9cdCAgfVxuXHRcdFx0XHQgIHJldHVybiBmYWxzZTtcblx0XHRcdCAgICAgIH07XG5cbn0pO1xuIiwiYXBwLnNlcnZpY2UoJ0luZm8nLGZ1bmN0aW9uKCRodHRwLCR0aW1lb3V0LEF1dGgsJHJvb3RTY29wZSl7XG4gICAgXG4gICAgdmFyIHNlcnZpY2U9dGhpcztcbiAgICBzZXJ2aWNlLm9ubGluZV9wbGF5ZXJzPXt9O1xuICAgIHNlcnZpY2UucmVzb3VyY2VzPXt9O1xuICAgIHNlcnZpY2UuYWxsX3BsYXllcnM9W107XG4gICAgc2VydmljZS5hbGxfZXZlbnRzPVtdO1xuICAgIHNlcnZpY2UuYWxsX3Rhc2tzPVtdO1xuICAgIHNlcnZpY2UubG9jYXRpb25zPVtdO1xuICAgIHNlcnZpY2UubG9naW5fdXBkYXRlPWZ1bmN0aW9uKCl7XG5cdGlmICghQXV0aC5hdXRob3JpemVkKSB7Y29uc29sZS5sb2coXCJsb2dpbl91cGRhdGUgbm90IHBvc3NpYmxlIG5vdCBsb2dnZWQgaW5cIik7IHJldHVybjt9XG5cdHZhciByZXE9e1wiZG9vZG9vXCI6XCJjaGljaGlcIn07XG5cdHJlcVtcInRvY2tlblwiXT1BdXRoLnRvY2tlbjtcblx0Y29uc29sZS5sb2coJ2xvZ2luX3VwZGF0ZSBpcyBjb25uZWN0aW5nIHNlcnZlcicpO1xuXHQkaHR0cCgge21ldGhvZDpcIlBPU1RcIix1cmw6XCIvbG9naW5JbmZvXCIsZGF0YTogcmVxfVxuICAgICAgICAgICAgICAgXG5cdCAgICAgKS50aGVuKGZ1bmN0aW9uKHJlcyl7XG5cdFx0IGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcblx0XHQgXG5cdFx0IHNlcnZpY2UuYWxsX2V2ZW50cz1yZXMuZGF0YS5pbmZvLmV2ZW50cztcblx0XHQgc2VydmljZS5yZXNvdXJjZXM9cmVzLmRhdGEuaW5mby5yZXNvdXJjZXM7XG5cdFx0IHNlcnZpY2UudGFza3M9cmVzLmRhdGEuaW5mby50YXNrcztcblx0XHQgc2VydmljZS5sb2NhdGlvbnM9cmVzLmRhdGEuaW5mby5sb2NhdGlvbnM7XG5cdFx0IGNvbnNvbGUubG9nKFwidGFza3NcIik7XG5cdFx0IGNvbnNvbGUubG9nKHNlcnZpY2UudGFza3MpO1xuXHQgICAgIH1cblx0XHQgICAgLGZ1bmN0aW9uKHJlcyl7XG5cdFx0XHRjb25zb2xlLmxvZyhcImxvZ2luX3VwZGF0ZSBmYWlsZWRcIik7XG5cdFx0XHRcblx0XHQgICAgfSk7fTtcbiAgICB2YXIgdXBkYXRlPWZ1bmN0aW9uKCl7XG5cdHJlcT17XCJkb29kb29cIjpcImNoaWNoaVwifTtcblx0aWYgKEF1dGguYXV0aG9yaXplZCkgcmVxW1widG9ja2VuXCJdPUF1dGgudG9ja2VuO1xuXHRjb25zb2xlLmxvZygnSW5mbyBpcyBjb25uZWN0aW5nIHNlcnZlcicpO1xuXHQkaHR0cCgge21ldGhvZDpcIlBPU1RcIix1cmw6XCIvdXBkYXRlXCIsZGF0YTogcmVxfVxuICAgICAgICAgICAgICAgXG5cdCAgICAgKS50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidXBkYXRpbmcuLi5cIik7XG5cdFx0IGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcblx0XHRcblx0XHQgY29uc29sZS5sb2coXCJlbmRcIik7XG5cdFx0IGlmIChyZXMuZGF0YSE9PW51bGwpe1xuXHRcdCAgICAgY29uc29sZS5sb2coXCJub3QgbnVsbFwiKTtcblx0XHQgICAgIFxuXHRcdCAgICAgaWYgKFwiaW5mb1wiIGluIHJlcy5kYXRhKSB7XG5cdFx0XHQgY29uc29sZS5sb2cocmVzLmRhdGEuaW5mby5ldmVudHMpO1xuXHRcdFx0ICBjb25zb2xlLmxvZyhcIm5ldyBsb2NhdGlvbnM6XCIpO1xuXHRcdCAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YS5pbmZvLmxvY2F0aW9ucyk7XG5cdFx0XHQgc2VydmljZS5yZXNvdXJjZXM9cmVzLmRhdGEuaW5mby5yZXNvdXJjZXM7XG5cdFx0XHQgLy9zZXJ2aWNlLmxvY2F0aW9ucz1yZXMuZGF0YS5pbmZvLmxvY2F0aW9ucztcblx0XHRcdCBjb25zb2xlLmxvZyhzZXJ2aWNlLnJlc291cmNlcyk7XG5cdFx0XHQgdmFyIG5ld19ldmVudHM9cmVzLmRhdGEuaW5mby5ldmVudHM7XG5cblx0XHRcdCBcblx0XHRcdCBuZXdfZXZlbnRzLmZvckVhY2goZnVuY3Rpb24oZXZlbnQpe1xuXHRcdFx0ICAgICB2YXIgYWxyZWFkeT1mYWxzZTtcblx0XHRcdCAgICAgc2VydmljZS5hbGxfZXZlbnRzLmZvckVhY2goZnVuY3Rpb24ocmVnZXZlbnQsaW5kZXgpe1xuXHRcdFx0XHQgaWYgKHJlZ2V2ZW50W1wiaWRcIl09PWV2ZW50W1wiaWRcIl0pe1xuXHRcdFx0XHQgICAgIHNlcnZpY2UuYWxsX2V2ZW50c1tpbmRleF09ZXZlbnQ7XG5cdFx0XHRcdCAgICAgYWxyZWFkeT10cnVlO31cblx0XHRcdCAgICAgfSk7XG5cdFx0XHQgICAgIGlmICghYWxyZWFkeSlcblx0XHRcdFx0IHNlcnZpY2UuYWxsX2V2ZW50cy5wdXNoKGV2ZW50KTsgY29uc29sZS5sb2coZXZlbnRbXCJpZFwiXSk7fSk7XG5cblx0XHRcdCByZXMuZGF0YS5pbmZvLmxvY2F0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGxvY2F0aW9uKXtcblx0XHRcdCAgICAgdmFyIGFscmVhZHk9ZmFsc2U7XG5cdFx0XHQgICAgIHNlcnZpY2UubG9jYXRpb25zLmZvckVhY2goZnVuY3Rpb24ocmVnbG9jYXRpb24saW5kZXgpe1xuXHRcdFx0XHQgaWYgKHJlZ2xvY2F0aW9uW1wiaGFzaFwiXT09bG9jYXRpb25bXCJoYXNoXCJdKXtcblx0XHRcdFx0ICAgICB2YXIgbW9yZT1zZXJ2aWNlLmxvY2F0aW9uc1tpbmRleF0ubW9yZTtcblx0XHRcdFx0ICAgICBzZXJ2aWNlLmxvY2F0aW9uc1tpbmRleF09bG9jYXRpb247XG5cdFx0XHRcdCAgICAgc2VydmljZS5sb2NhdGlvbnNbaW5kZXhdLm1vcmU9bW9yZTtcblx0XHRcdFx0ICAgICBjb25zb2xlLmxvZyhcIm1vcmUgZnJvbSBpbmZvIHNlcnZpY2U6XCIpO1xuXHRcdFx0XHQgICAgIGNvbnNvbGUubG9nKHNlcnZpY2UubG9jYXRpb25zW2luZGV4XSk7XG5cdFx0XHRcdCAgICAgYWxyZWFkeT10cnVlO31cblx0XHRcdCAgICAgfSk7XG5cdFx0XHQgICAgIGlmICghYWxyZWFkeSlcblx0XHRcdFx0IHNlcnZpY2UubG9jYXRpb25zLnB1c2gobG9jYXRpb24pOyBjb25zb2xlLmxvZyhsb2NhdGlvbltcImhhc2hcIl0pO30pO1xuXHRcdFx0IGlmIChyZXMuZGF0YS5pbmZvLmxvY2F0aW9ucy5sZW5ndGggPiAwKSBcblx0XHRcdCB7JHJvb3RTY29wZS4kYnJvYWRjYXN0KCdsb2NhdGlvbl91cGRhdGUnKTtjb25zb2xlLmxvZyhcImxvY2F0aW9uX3VwZGF0ZVwiKTt9XG5cdFx0XHQgXG5cblx0XHRcdCBcblx0XHRcdCBpZiAoT2JqZWN0LmtleXMocmVzLmRhdGEuaW5mby50YXNrcykubGVuZ3RoPjAgKSBjb25zb2xlLmxvZyhcIlRBU0tTOlwiKTtcblx0XHRcdCBjb25zb2xlLmxvZyhyZXMuZGF0YS5pbmZvLnRhc2tzKTtcblx0XHRcdCB2YXIgbmV3X3Rhc2tzPXJlcy5kYXRhLmluZm8udGFza3M7XG5cdFx0XHQgT2JqZWN0LmtleXMobmV3X3Rhc2tzKS5mb3JFYWNoKGZ1bmN0aW9uKHRhc2tfaWQpe1xuXHRcdFx0ICAgICBzZXJ2aWNlLnRhc2tzW3Rhc2tfaWRdPW5ld190YXNrc1t0YXNrX2lkXTsgY29uc29sZS5sb2cobmV3X3Rhc2tzW3Rhc2tfaWRdKTt9KTtcblx0XHRcdCBcblxuXHRcdFx0IFxuXHRcdFx0IFxuXHRcdFx0IFxuXG5cdFx0ICAgICB9XG5cdFx0IH1cbiAgICAgICAgICAgICAgICAgXG5cdFx0IHNlcnZpY2Uub25saW5lX3BsYXllcnM9cmVzLmRhdGEub25saW5lOyR0aW1lb3V0KHVwZGF0ZSwxMDAwMCk7fSxmdW5jdGlvbihyZXMpe1xuXHRcdCAgICAgXG5cdFx0ICAgICBjb25zb2xlLmxvZyhcIm9ubGluZSBwbGF5ZXJzIHVwZGF0ZSBmYWlsZWRcIik7XG5cdFx0ICAgICAkdGltZW91dCh1cGRhdGUsMTAwMDApO30pO307XG4gICAgdXBkYXRlKCk7XG59KTtcblxuIl19
