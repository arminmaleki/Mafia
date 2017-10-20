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
		    $scope.message_box="پیام خود را وارد کنید";
		    var component=this;
		    var enter_text="ورود";
		    var exit_text="خروج";
		    var less_text="کمتر";
		    var more_text="بیشتر";
		    var inside_color="red";
		    var outside_color="black";
		    var controller=this;
		    this.button_disabled=function(){
			if (controller.data.inside) return ""; else return "disabled";
		    };

		    this.send_message=function(){
			var req= {"tocken":Auth.tocken,"hash":"messageToGroup"
				    ,"data":{"message":$scope.message_box
					     ,"group": ":"+controller.data.group }};
			console.log("send_message");
			console.log(req);
			$http.post("/register_event",req);

		    };
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
    service.groups=[];
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
                 service.groups=res.data.info.groups;



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
                         service.groups=res.data.info.groups;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Vzci9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNvbXBvbmVudC9iZXRzb21ldGhpbmcuanMiLCJjb21wb25lbnQvY3VycmVudGFmZmFpcnMuanMiLCJjb21wb25lbnQvbG9jYXRpb24uanMiLCJjb21wb25lbnQvbG9jYXRpb25zLmpzIiwiY29tcG9uZW50L29ubGluZXVzZXJzLmpzIiwiY29tcG9uZW50L3NhbXBsZXRhc2suanMiLCJjb21wb25lbnQvc2F5c29tZXRoaW5nLmpzIiwiY29tcG9uZW50L3NpbXBsZW5vdGlmLmpzIiwiY29tcG9uZW50L3Rhc2tzLmpzIiwiY29tcG9uZW50L3VzZXJzdGF0dXMuanMiLCJjb250cm9sbGVyL2Jhc2ljLmpzIiwibWFpbmFwcC5qcyIsInNlcnZpY2UvYXV0aC5qcyIsInNlcnZpY2UvaW5mby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJhbmd1bGFyLm1vZHVsZSgnbWFpbkFwcCcpLmNvbXBvbmVudCgnYmV0U29tZXRoaW5nJyxcblx0XHRcdFx0ICAgIHt0ZW1wbGF0ZVVybDogJ2JldHNvbWV0aGluZy5odG1sJyxcblx0XHRcdFx0ICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUsSW5mbyxBdXRoLCRodHRwLCR0aW1lb3V0KXtcblx0XHRcdFx0XHRcblxuIHZhciBjb250cm9sbGVyPXRoaXM7XG5cdFx0XHRcdFx0IHRoaXMuSW5mbz1JbmZvO1xuXHRcdFx0XHRcdCB0aGlzLkF1dGg9QXV0aDtcblx0XHRcdFx0XHQgLy90aGlzLmRhdGE9e307XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0ICRzY29wZS4kb24oJ2F1dGhvcml6ZWQnLGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0ICAgICAvL2NvbnRyb2xsZXIuZGF0YS5hPSBBdXRoLnVzZXI7XG5cdFx0XHRcdFx0ICAgIC8vIGNvbnNvbGUubG9nKFwic2F5IFNvbWV0aCBhOlwiK2NvbnRyb2xsZXIuZGF0YS5hKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSW5mby5sb2dpbl91cGRhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJKU09OIElORk86IFwiK0luZm8uYWxsX2V2ZW50cyk7XG5cdFx0ICAgICAgLy9jb25zb2xlLmxvZyhcIkpTT04gSU5GTyBFVkVOVFMgXCIrcmVzLmRhdGEuaW5mby5ldmVudHMpXG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0ICAgIHRoaXMuc3VibWl0PWZ1bmN0aW9uKHNvbWV0aGluZyl7XG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiU3VibWl0dGVkXCIpO1xuXHRcdFx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKHRoaXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXE9e307XG5cdFx0XHRcdFx0XHRcdHJlcS50b2NrZW49QXV0aC50b2NrZW47XG5cdFx0XHRcdFx0XHRcdHJlcS5oYXNoPVwiYmV0U29tZXRoaW5nQmV0dGVyXCI7XG5cdFx0XHRcdFx0XHRcdHNvbWV0aGluZy5hPUF1dGgudXNlcjtcblx0XHRcdFx0XHRcdFx0cmVxLmRhdGE9c29tZXRoaW5nO1xuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhyZXEpO1xuXHRcdFx0XHRcdFx0XHRcdCRodHRwKCB7bWV0aG9kOlwiUE9TVFwiLHVybDpcIi9yZWdpc3Rlcl9ldmVudFwiLGRhdGE6IHJlcX1cbiAgICAgICAgIFxuXHRcdFx0XHRcdFx0XHRcdCAgICAgKS50aGVuKGZ1bmN0aW9uKHJlcyl7XG5cdFx0XHRcdFx0XHRcdFx0XHQgY29uc29sZS5sb2coXCJyZXM6XCIpO1xuXHRcdCBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG5cdFx0ICBjb250cm9sbGVyLm1lc3NhZ2U9cmVzLmRhdGFbXCJtZXNzYWdlXCJdO1xuXHRcdCBjb250cm9sbGVyLm1lc3NhZ2VfdmlzaWJsZT10cnVlO1xuXHRcdCAkdGltZW91dChmdW5jdGlvbigpe2NvbnRyb2xsZXIubWVzc2FnZV92aXNpYmxlPWZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibWVzc2FnZSBoaWRkZW5cIik7XG5cdFx0XHRcdCB9LDMwMDApO1xuXHQvL1x0IHNlcnZpY2UuYWxsX2V2ZW50cz1yZXMuZGF0YS5pbmZvLmV2ZW50cztcblx0Ly9cdCBzZXJ2aWNlLnJlc291cmNlcz1yZXMuZGF0YS5pbmZvLnJlc291cmNlcztcblx0XHQgXG5cdFx0XHRcdFx0XHRcdFx0ICAgICB9XG5cdFx0ICAgICxmdW5jdGlvbihyZXMpe1xuICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibG9naW5fdXBkYXRlIGZhaWxlZFwiKTtcblx0XHRcblx0XHQgICAgfSk7fTtcblx0XHRcdFx0ICAgICB9XG5cblxuXHRcdFx0XHRcdCBcblx0XHRcdFx0ICAgIH1cblxuXHRcdFx0XHQgICAgKTtcbiIsImFuZ3VsYXIubW9kdWxlKCdtYWluQXBwJykuY29tcG9uZW50KCdjdXJyZW50QWZmYWlycycsXG5cdFx0XHRcdCAgICB7dGVtcGxhdGVVcmw6ICdldmVudHMuaHRtbCcsXG5cdFx0XHRcdCAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlLEluZm8sQXV0aCwkc2NlKXtcblx0XHRcdFx0XHQgdGhpcy5JbmZvPUluZm87XG5cdFx0XHRcdFx0IHRoaXMuQXV0aD1BdXRoO1xuXHRcdFx0XHQgICAgICRzY29wZS5yZW5kZXJIdG1sID0gZnVuY3Rpb24gKGh0bWxDb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gJHNjZS50cnVzdEFzSHRtbChodG1sQ29kZSk7XG4gICAgICAgIH07XG5cdFx0XHRcdFx0ICRzY29wZS4kb24oJ2F1dGhvcml6ZWQnLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJbmZvLmxvZ2luX3VwZGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJKU09OIElORk86IFwiK0luZm8uYWxsX2V2ZW50cyk7XG5cdFx0ICAgICAgLy9jb25zb2xlLmxvZyhcIkpTT04gSU5GTyBFVkVOVFMgXCIrcmVzLmRhdGEuaW5mby5ldmVudHMpXG5cdFx0XHRcdFx0IH0pO1xuXG5cdFx0XHRcdCAgICAgfX0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ21haW5BcHAnKVxuICAgIC5jb21wb25lbnQoJ2xvY2F0aW9uJyxcblx0ICAgICAgIHt0ZW1wbGF0ZVVybDogJ2xvY2F0aW9uLmh0bWwnLGJpbmRpbmdzOntkYXRhOlwiPVwifSxcblx0XHRjb250cm9sbGVyOlxuXHRcdGZ1bmN0aW9uKCRzY29wZSxJbmZvLEF1dGgsJGh0dHAsJHRpbWVvdXQsJHNjZSl7XG5cdFx0ICAgIHRoaXMucmVuZGVySHRtbCA9IGZ1bmN0aW9uIChodG1sQ29kZSkge1xuXHRcdFx0cmV0dXJuICRzY2UudHJ1c3RBc0h0bWwoaHRtbENvZGUpO1xuXHRcdCAgICB9O1xuXG5cblx0XHQgICAgdGhpcy5BdXRoPUF1dGg7XG5cdFx0ICAgIHRoaXMuSW5mbz1JbmZvO1xuXHRcdCAgICAkc2NvcGUubWVzc2FnZV9ib3g9XCLZvtuM2KfZhSDYrtmI2K8g2LHYpyDZiNin2LHYryDaqdmG24zYr1wiO1xuXHRcdCAgICB2YXIgY29tcG9uZW50PXRoaXM7XG5cdFx0ICAgIHZhciBlbnRlcl90ZXh0PVwi2YjYsdmI2K9cIjtcblx0XHQgICAgdmFyIGV4aXRfdGV4dD1cItiu2LHZiNisXCI7XG5cdFx0ICAgIHZhciBsZXNzX3RleHQ9XCLaqdmF2KrYsVwiO1xuXHRcdCAgICB2YXIgbW9yZV90ZXh0PVwi2KjbjNi02KrYsVwiO1xuXHRcdCAgICB2YXIgaW5zaWRlX2NvbG9yPVwicmVkXCI7XG5cdFx0ICAgIHZhciBvdXRzaWRlX2NvbG9yPVwiYmxhY2tcIjtcblx0XHQgICAgdmFyIGNvbnRyb2xsZXI9dGhpcztcblx0XHQgICAgdGhpcy5idXR0b25fZGlzYWJsZWQ9ZnVuY3Rpb24oKXtcblx0XHRcdGlmIChjb250cm9sbGVyLmRhdGEuaW5zaWRlKSByZXR1cm4gXCJcIjsgZWxzZSByZXR1cm4gXCJkaXNhYmxlZFwiO1xuXHRcdCAgICB9O1xuXG5cdFx0ICAgIHRoaXMuc2VuZF9tZXNzYWdlPWZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgcmVxPSB7XCJ0b2NrZW5cIjpBdXRoLnRvY2tlbixcImhhc2hcIjpcIm1lc3NhZ2VUb0dyb3VwXCJcblx0XHRcdFx0ICAgICxcImRhdGFcIjp7XCJtZXNzYWdlXCI6JHNjb3BlLm1lc3NhZ2VfYm94XG5cdFx0XHRcdFx0ICAgICAsXCJncm91cFwiOiBcIjpcIitjb250cm9sbGVyLmRhdGEuZ3JvdXAgfX07XG5cdFx0XHRjb25zb2xlLmxvZyhcInNlbmRfbWVzc2FnZVwiKTtcblx0XHRcdGNvbnNvbGUubG9nKHJlcSk7XG5cdFx0XHQkaHR0cC5wb3N0KFwiL3JlZ2lzdGVyX2V2ZW50XCIscmVxKTtcblxuXHRcdCAgICB9O1xuXHRcdCAgICB0aGlzLnRvZ2dsZV9tb3JlX3RleHQ9ZnVuY3Rpb24oKVxuXHRcdCAgICB7aWYgKHRoaXMuZGF0YS5tb3JlKSByZXR1cm4gbGVzc190ZXh0OyBlbHNlIHJldHVybiBtb3JlX3RleHQ7fTtcblx0XHQgICAgdGhpcy50b2dnbGVfZW50ZXJfY29sb3I9ZnVuY3Rpb24oKVxuXHRcdCAgICB7aWYgKHRoaXMuZGF0YS5pbnNpZGUpIHJldHVybiBpbnNpZGVfY29sb3I7IGVsc2UgcmV0dXJuIG91dHNpZGVfY29sb3I7fTtcblx0XHQgICAgdGhpcy50b2dnbGVfZW50ZXJfdGV4dD1mdW5jdGlvbigpXG5cdFx0ICAgIHtpZiAodGhpcy5kYXRhLmluc2lkZSkgcmV0dXJuIGV4aXRfdGV4dDsgZWxzZSByZXR1cm4gZW50ZXJfdGV4dDt9O1xuXHRcdCAgICBcblx0XHQgICAgdGhpcy5pbnNpZGU9ZmFsc2U7XG5cdFx0ICAgIHRoaXMudG9nZ2xlX21vcmU9ZnVuY3Rpb24oKXtcblx0XHRcdGlmIChjb21wb25lbnQuZGF0YS5tb3JlKVxuXHRcdFx0ey8vY29tcG9uZW50LnRvZ2dsZV9tb3JlX3RleHQ9bW9yZV90ZXh0O1xuXHRcdFx0ICAgIGNvbnNvbGUubG9nKFwidG9nZ2xlIG1vcmUgd2FzIHNldFwiKTtcblx0XHRcdCAgICBjb21wb25lbnQuZGF0YS5tb3JlPWZhbHNlO31cblx0XHRcdGVsc2V7Ly8gY29tcG9uZW50LnRvZ2dsZV9tb3JlX3RleHQ9bGVzc190ZXh0O1xuXHRcdFx0ICAgIGNvbXBvbmVudC5kYXRhLm1vcmU9dHJ1ZTtcblx0XHRcdCAgICBjb25zb2xlLmxvZyhcInRvZ2dsZSBtb3JlIHdhcyBub3Qgc2V0XCIpO31cblxuXHRcdCAgICB9O1xuXHRcdCAgICBcblx0XHQgICAgXG5cblx0XHQgICAgXG5cdFx0ICAgIHRoaXMuYnV0dG9uX2RlY2lkZWQ9ZmFsc2U7XG5cdFx0ICAgIC8vIHRoaXMubWVzc2FnZT1cIlwiO1xuXHRcdCAgICAvL2NvbnNvbGUubG9nKHRoaXMpO1xuXHRcdCAgICAvL2NvbnNvbGUubG9nKHRoaXMuZGF0YSk7XG5cdFx0ICAgIHZhciByZXE9e307XG5cdFx0ICAgIFxuXHRcdCAgICAvLyByZXEuaWQ9Y29udHJvbGxlci5kYXRhLmlkO1xuXHRcdCAgICByZXEuaW5mbz17fTtcblx0XHQgICAgLy8gcmVxLm5hbWU9Y29udHJvbGxlci5kYXRhLm5hbWU7XG5cdFx0ICAgIHJlcS50b2NrZW49QXV0aC50b2NrZW47XG5cdFx0ICAgIHRoaXMuZGF0YV9zZXQ9ZmFsc2U7XG5cdFx0ICAgIHRoaXMubWVzc2FnZV9zaG93PWZhbHNlO1xuXHRcdCAgICB0aGlzLm1lc3NhZ2U9XCJtZXNzYWdlISEuLi5cIjtcblx0XHQgICAgdGhpcy5lbnRlcl9idXR0b249ZnVuY3Rpb24oKXtcblx0XHRcdGlmIChjb250cm9sbGVyLmJ1dHRvbl9kZWNpZGVkKSByZXR1cm47XG5cdFx0XHRjb250cm9sbGVyLmJ1dHRvbl9kZWNpZGVkPXRydWU7XG5cdFx0XHRpZiAoIWNvbnRyb2xsZXIuZGF0YS5pbnNpZGUpXG5cdFx0XHQgICAgJGh0dHAucG9zdChcIi9yZWdpc3Rlcl9ldmVudFwiLFxuXHRcdFx0XHQgICAgICAge1widG9ja2VuXCI6QXV0aC50b2NrZW4sXG5cdFx0XHRcdFx0XCJoYXNoXCI6XCJlbnRlckxvY2F0aW9uXCIsXG5cdFx0XHRcdFx0XCJkYXRhXCI6e1widXNlclwiOkF1dGgudXNlcixcImxvY2F0aW9uXCI6Y29udHJvbGxlci5kYXRhLmhhc2h9fVxuXHRcdFx0XHQgICAgICApLnRoZW4oXG5cdFx0XHRcdFx0ICBmdW5jdGlvbihyZXMpe1xuXHRcdFx0XHRcdCAgICAgIHZhciBkYXRhPXJlcy5kYXRhO1xuXHRcdFx0XHRcdCAgICAgIGNvbnNvbGUubG9nKFwic3VjY2VzcyBpbiByZWdpc3RlcmluZyBlbnRlcl9sb2NhdGlvblwiKTtcblx0XHRcdFx0XHQgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcblx0XHRcdFx0XHQgICAgICBpZiAoZGF0YS5ldmVudF9jb2RlID4wICYmIGRhdGEuY29kZSA+IDAgKSBjb250cm9sbGVyLmRhdGEuaW5zaWRlPSFjb250cm9sbGVyLmRhdGEuaW5zaWRlO1xuXHRcdFx0XHRcdCAgICAgIGNvbnRyb2xsZXIuYnV0dG9uX2RlY2lkZWQ9ZmFsc2U7XG5cdFx0XHRcdFx0ICAgICAgY29udHJvbGxlci5tZXNzYWdlPWRhdGEubWVzc2FnZTtcblx0XHRcdFx0XHQgICAgICBjb250cm9sbGVyLm1lc3NhZ2Vfc2hvdz10cnVlO1xuXHRcdFx0XHRcdCAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7Y29udHJvbGxlci5tZXNzYWdlX3Nob3c9ZmFsc2U7fSwzMDAwKTtcblx0XHRcdFx0XHQgICAgICBcblxuXHRcdFx0XHRcdCAgfSk7XG5cblx0XHRcdFxuXHRcdFx0ZWxzZVxuXHRcdFx0ICAgICRodHRwLnBvc3QoXCIvdXBkYXRlX2V2ZW50XCIse1xuXHRcdFx0XHRcInRvY2tlblwiOkF1dGgudG9ja2VuLFxuXHRcdFx0XHRcIm5hbWVcIjpcImVudGVyTG9jYXRpb25cIixcblx0XHRcdFx0XCJtZXRob2RcIjogXCJnZXRfb3V0XCIsXG5cdFx0XHRcdFwiaW5mb1wiOiB7XCJ1c2VyXCI6QXV0aC51c2VyLFwibG9jYXRpb25cIjpjb250cm9sbGVyLmRhdGEuaGFzaH1cblxuXHRcdFx0ICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzKXtcblx0XHRcdFx0dmFyIGRhdGE9cmVzLmRhdGE7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwic3VjY2VzcyBpbiBnZXRfb3V0IGVudGVyX2xvY2F0aW9uXCIpO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcblx0XHRcdFx0Y29udHJvbGxlci5idXR0b25fZGVjaWRlZD1mYWxzZTtcblx0XHRcdFx0aWYgKGRhdGEubWVzc2FnZS5vayApIGNvbnRyb2xsZXIuZGF0YS5pbnNpZGU9IWNvbnRyb2xsZXIuZGF0YS5pbnNpZGU7XG5cdFx0XHRcdFxuXHRcdFx0ICAgICAgICBjb250cm9sbGVyLm1lc3NhZ2U9ZGF0YS5tZXNzYWdlLm1lc3NhZ2U7XG5cdFx0XHQgICAgICAgIGNvbnRyb2xsZXIubWVzc2FnZV9zaG93PXRydWU7XG5cdFx0XHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCl7Y29udHJvbGxlci5tZXNzYWdlX3Nob3c9ZmFsc2U7fSwzMDAwKTtcblxuXHRcdFx0ICAgIH0pO1xuXG5cdFx0ICAgIH07XG5cdFx0ICAgIHRoaXMuJG9uQ2hhbmdlcz1mdW5jdGlvbigpe1xuXHRcdFx0aWYgKChjb250cm9sbGVyLmRhdGFfc2V0PT1mYWxzZSkmJlxuXHRcdFx0ICAgIChcImRhdGFcIiBpbiBjb250cm9sbGVyKSl7XG5cdFx0XHQgICAgY29udHJvbGxlci5kYXRhX3NldD10cnVlO1xuXHRcdFx0ICAgIC8vXHQgcmVxLm5hbWU9Y29udHJvbGxlci5kYXRhLm5hbWU7XG5cdFx0XHQgICAgLy9cdCByZXEuaWQ9Y29udHJvbGxlci5kYXRhLmlkO1xuXHRcdFx0ICAgIGNvbnNvbGUubG9nKGNvbnRyb2xsZXIuZGF0YSk7XG5cblx0XHRcdCAgICBpZiAoY29udHJvbGxlci5kYXRhLm1vcmUgPT0gbnVsbCApIGNvbnRyb2xsZXIuZGF0YS5tb3JlPWZhbHNlO1xuXG5cdFx0XHR9XG5cdFx0ICAgIH07XG5cblx0XHQgICAgJHNjb3BlLiRvbignbG9jYXRpb25fdXBkYXRlJyxmdW5jdGlvbigpe1xuXHRcdFx0Y29uc29sZS5sb2coXCJJIGtub3chIGxvY2F0aW9uc1wiKTtcblx0XHRcdFxuXG5cdFx0ICAgIH0pO1xuXHRcdCAgICBcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMudGV4dD1JbmZvLnRhc2tzICAgXG5cdFx0fX0pO1xuXG5cbiIsImFuZ3VsYXIubW9kdWxlKCdtYWluQXBwJykuY29tcG9uZW50KCdsb2NhdGlvbnMnLFxuXHRcdFx0XHQgICAge3RlbXBsYXRlVXJsOiAnbG9jYXRpb25zLmh0bWwnLFxuXHRcdFx0XHQgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSxJbmZvLEF1dGgsJHNjZSl7XG5cdFx0XHRcdFx0IHRoaXMuSW5mbz1JbmZvO1xuXHRcdFx0XHRcdCB0aGlzLkF1dGg9QXV0aDtcblx0XHRcdFx0ICAgICAkc2NvcGUucmVuZGVySHRtbCA9IGZ1bmN0aW9uIChodG1sQ29kZSkge1xuICAgICAgICAgICAgcmV0dXJuICRzY2UudHJ1c3RBc0h0bWwoaHRtbENvZGUpO1xuICAgICAgICB9O1xuXHRcdFx0XHRcdFxuXG5cdFx0XHRcdCAgICAgfX0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ21haW5BcHAnKS5jb21wb25lbnQoJ29ubGluZVVzZXJzJyxcblx0XHRcdFx0ICAgIHt0ZW1wbGF0ZVVybDogJ29ubGluZXVzZXJzLmh0bWwnLFxuXHRcdFx0XHQgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSxJbmZvKXtcblx0XHRcdFx0XHQgdGhpcy5JbmZvPUluZm87XG5cdFx0XHRcdFx0ICAkc2NvcGUuaW1nX2ZpbGU9ZnVuY3Rpb24obyl7cmV0dXJuIFwiaW1nL2dpcmwuanBnXCI7fTtcblx0XHRcdFx0ICAgICB9fSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnbWFpbkFwcCcpLmNvbXBvbmVudCgnc2FtcGxlVGFzaycsXG5cdFx0XHRcdCAgICB7dGVtcGxhdGVVcmw6ICdzYW1wbGV0YXNrLmh0bWwnLGJpbmRpbmdzOntkYXRhOlwiPVwifSxcblx0XHRcdFx0ICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUsSW5mbyxBdXRoLCRodHRwLCR0aW1lb3V0KXtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQgdGhpcy5BdXRoPUF1dGg7XG5cdFx0XHRcdFx0IHRoaXMuSW5mbz1JbmZvO1xuXHRcdFx0XHRcdCB0aGlzLmRlY2lkZWQ9ZmFsc2U7XG5cdFx0XHRcdFx0IHRoaXMubWVzc2FnZT1cIlwiO1xuXHRcdFx0XHRcdCAvL2NvbnNvbGUubG9nKHRoaXMpO1xuXHRcdFx0XHRcdCAgLy9jb25zb2xlLmxvZyh0aGlzLmRhdGEpO1xuXHRcdFx0XHRcdCB2YXIgY29udHJvbGxlcj10aGlzO1xuXHRcdFx0XHRcdCB2YXIgcmVxPXt9O1xuXHRcdFx0XHRcblx0XHRcdFx0XHQvLyByZXEuaWQ9Y29udHJvbGxlci5kYXRhLmlkO1xuXHRcdFx0XHRcdCByZXEuaW5mbz17fTtcblx0XHRcdFx0XHQvLyByZXEubmFtZT1jb250cm9sbGVyLmRhdGEubmFtZTtcblx0XHRcdFx0XHQgcmVxLnRvY2tlbj1BdXRoLnRvY2tlbjtcblx0XHRcdFx0XHQgdGhpcy5kYXRhX3NldD1mYWxzZTtcblx0XHRcdFx0ICAgICAgICAgdGhpcy4kb25DaGFuZ2VzPWZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0ICAgICBpZiAoKGNvbnRyb2xsZXIuZGF0YV9zZXQ9PWZhbHNlKSYmXG5cdFx0XHRcdFx0XHQgKFwiZGF0YVwiIGluIGNvbnRyb2xsZXIpKXtcblx0XHRcdFx0XHRcdCBjb250cm9sbGVyLmRhdGFfc2V0PXRydWU7XG5cdFx0XHRcdFx0XHQgcmVxLm5hbWU9Y29udHJvbGxlci5kYXRhLm5hbWU7XG5cdFx0XHRcdFx0XHQgcmVxLmlkPWNvbnRyb2xsZXIuZGF0YS5pZDtcblx0XHRcdFx0XHRcdCBjb25zb2xlLmxvZyhjb250cm9sbGVyLmRhdGEpO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0IH07XG5cdFx0XHRcdFx0ICB0aGlzLmFjY2VwdD1mdW5jdGlvbigpe2lmICghY29udHJvbGxlci5kZWNpZGVkKSB7XG5cdFx0XHRcdFx0ICAgICBjb250cm9sbGVyLmRlY2lkZWQ9dHJ1ZTtcblx0XHRcdFx0XHQgICAgIFxuXHRcdFx0XHRcdCAgICAgXG5cdFx0XHRcdFx0ICAgICByZXEubWV0aG9kPVwiYWNjZXB0XCI7XG5cdFx0XHRcdFx0ICAgICBcblx0XHRcdFx0XHQgICAgIGNvbnNvbGUubG9nKFwiYWNjZXB0XCIpO1xuXHRcdFx0XHRcdCAgICAgY29uc29sZS5sb2cocmVxKTtcblx0XHRcdFx0XHQgICAgICRodHRwKCB7bWV0aG9kOlwiUE9TVFwiLHVybDpcIi91cGRhdGVfZXZlbnRcIixkYXRhOiByZXF9XG4gICAgICAgICBcblx0XHRcdFx0XHRcdCAgKS50aGVuKGZ1bmN0aW9uKHJlcyl7XG5cdFx0XHRcdFx0XHQgICAgICBjb250cm9sbGVyLm1lc3NhZ2U9cmVzLmRhdGEubWVzc2FnZTtcblx0XHRcdFx0XHRcdCAgICAgIGNvbnNvbGUubG9nKFwic3VjY2Vzc1wiKTtcblx0XHRcdFx0XHRcdCAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcblx0XHRcdFx0XHRcdCAgICAgICBjb250cm9sbGVyLm1lc3NhZ2U9cmVzLmRhdGEubWVzc2FnZTtcblx0XHRcdFx0XHRcdCAgICAgICBjb250cm9sbGVyLm1lc3NhZ2U9cmVzLmRhdGFbXCJtZXNzYWdlXCJdO1xuXHRcdCBjb250cm9sbGVyLm1lc3NhZ2VfdmlzaWJsZT10cnVlO1xuXHQvL1x0ICR0aW1lb3V0KGZ1bmN0aW9uKCl7Y29udHJvbGxlci5tZXNzYWdlX3Zpc2libGU9ZmFsc2U7XG5cblx0Ly9cdFx0XHQgfSw3MDAwKTtcblx0XHRcdFx0XHRcdCAgICAgIFxuXG5cdFx0XHRcdFx0XHQgIH0sZnVuY3Rpb24ocmVzKXtcblx0XHRcdFx0XHRcdCAgICAgIGNvbnNvbGUubG9nKFwidW5zdWNjZXNzZnVsXCIpO1xuXHRcdFx0XHRcdFx0ICAgICAgY29udHJvbGxlci5kZWNpZGVkPWZhbHNlO1xuXG5cdFx0XHRcdFx0XHQgIH0pO1xuXG5cdFx0XHRcdFx0IH19O1xuXHRcdFx0XHRcdCB0aGlzLnJlamVjdD1mdW5jdGlvbigpe2lmICghY29udHJvbGxlci5kZWNpZGVkKSB7XG5cdFx0XHRcdFx0ICAgICBjb250cm9sbGVyLmRlY2lkZWQ9dHJ1ZTtcblx0XHRcdFx0XHQgICAgICAgICB2YXIgcmVxPXt9O1xuXHRcdFx0XHRcdCAgICBcblx0XHRcdFx0XHQgICAgIHJlcS5tZXRob2Q9XCJyZWplY3RcIjtcblx0XHRcdFx0XHQgICAgIHJlcS50b2NrZW49QXV0aC50b2NrZW47XG5cdFx0XHRcdFx0ICAgICByZXEuaW5mbz17fTtcblx0XHRcdFx0XHQgICAgICByZXEubmFtZT1jb250cm9sbGVyLmRhdGEubmFtZTtcblx0XHRcdFx0XHRcdCByZXEuaWQ9Y29udHJvbGxlci5kYXRhLmlkO1xuXHRcdFx0XHRcdCAgICAgY29uc29sZS5sb2coXCJyZWplY3RcIik7XG5cdFx0XHRcdFx0ICAgICBjb25zb2xlLmxvZyhyZXEpO1xuXHRcdFx0XHRcdCAgICAgJGh0dHAoIHttZXRob2Q6XCJQT1NUXCIsdXJsOlwiL3VwZGF0ZV9ldmVudFwiLGRhdGE6IHJlcX1cbiAgICAgICAgIFxuXHRcdFx0XHRcdFx0ICApLnRoZW4oZnVuY3Rpb24ocmVzKXtcblx0XHRcdFx0XHRcdCAgICAgIGNvbnNvbGUubG9nKFwiUmVqZWN0IGNvbm5lY3RlZCBzZXJ2ZXIgd2l0aCBzdWNjZXNzXCIpOyBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG5cdFx0XHRcdFx0XHQgICAgICBjb250cm9sbGVyLm1lc3NhZ2U9cmVzLmRhdGEubWVzc2FnZTtcblx0XHRcdFx0XHRcdCAgICAgICBjb250cm9sbGVyLm1lc3NhZ2U9cmVzLmRhdGFbXCJtZXNzYWdlXCJdO1xuXHRcdCBjb250cm9sbGVyLm1lc3NhZ2VfdmlzaWJsZT10cnVlO1xuXHQvL1x0ICR0aW1lb3V0KGZ1bmN0aW9uKCl7Y29udHJvbGxlci5tZXNzYWdlX3Zpc2libGU9ZmFsc2U7XG5cblx0Ly9cdFx0XHQgfSw3MDAwKTtcblxuXHRcdFx0XHRcdFx0ICB9LGZ1bmN0aW9uKHJlcyl7XG5cdFx0XHRcdFx0XHQgICAgICBjb25zb2xlLmxvZyhcInVuc3VjY2Vzc2Z1bFwiKTtcblx0XHRcdFx0XHRcdCAgICAgIGNvbnRyb2xsZXIuZGVjaWRlZD1mYWxzZTtcblxuXHRcdFx0XHRcdFx0ICB9KTtcblxuXHRcdFx0XHRcdCB9fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHRcdFx0XHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnRleHQ9SW5mby50YXNrcyAgIFxuXHRcdFx0XHQgICAgIH19KTtcblxuXG4iLCJhbmd1bGFyLm1vZHVsZSgnbWFpbkFwcCcpLmNvbXBvbmVudCgnc2F5U29tZXRoaW5nJyxcblx0XHRcdFx0ICAgIHt0ZW1wbGF0ZVVybDogJ3NheXNvbWV0aGluZy5odG1sJyxcblx0XHRcdFx0ICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUsSW5mbyxBdXRoLCRodHRwLCR0aW1lb3V0KXtcblx0XHRcdFx0XHRcblxuIHZhciBjb250cm9sbGVyPXRoaXM7XG5cdFx0XHRcdFx0IHRoaXMuSW5mbz1JbmZvO1xuXHRcdFx0XHRcdCB0aGlzLkF1dGg9QXV0aDtcblx0XHRcdFx0XHQgLy90aGlzLmRhdGE9e307XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0ICRzY29wZS4kb24oJ2F1dGhvcml6ZWQnLGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0ICAgICAvL2NvbnRyb2xsZXIuZGF0YS5hPSBBdXRoLnVzZXI7XG5cdFx0XHRcdFx0ICAgIC8vIGNvbnNvbGUubG9nKFwic2F5IFNvbWV0aCBhOlwiK2NvbnRyb2xsZXIuZGF0YS5hKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSW5mby5sb2dpbl91cGRhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJKU09OIElORk86IFwiK0luZm8uYWxsX2V2ZW50cyk7XG5cdFx0ICAgICAgLy9jb25zb2xlLmxvZyhcIkpTT04gSU5GTyBFVkVOVFMgXCIrcmVzLmRhdGEuaW5mby5ldmVudHMpXG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0ICAgIHRoaXMuc3VibWl0PWZ1bmN0aW9uKHNvbWV0aGluZyl7XG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiU3VibWl0dGVkXCIpO1xuXHRcdFx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKHRoaXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXE9e307XG5cdFx0XHRcdFx0XHRcdHJlcS50b2NrZW49QXV0aC50b2NrZW47XG5cdFx0XHRcdFx0XHRcdHJlcS5oYXNoPVwic2F5U29tZXRoaW5nXCI7XG5cdFx0XHRcdFx0XHRcdHNvbWV0aGluZy5hPUF1dGgudXNlcjtcblx0XHRcdFx0XHRcdFx0cmVxLmRhdGE9c29tZXRoaW5nO1xuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhyZXEpO1xuXHRcdFx0XHRcdFx0XHRcdCRodHRwKCB7bWV0aG9kOlwiUE9TVFwiLHVybDpcIi9yZWdpc3Rlcl9ldmVudFwiLGRhdGE6IHJlcX1cbiAgICAgICAgICkudGhlbihmdW5jdGlvbihyZXMpe1xuXHRcdFx0XHRcdCBjb25zb2xlLmxvZyhcInJlczpcIik7XG5cdFx0XHRcdFx0IGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcblx0XHRcdFx0XHRcdFx0XHRcdCBcblx0ICAgICBpZiAocmVzLmRhdGFbXCJtZXNzYWdlXCJdKXtcblx0XHQgY29udHJvbGxlci5tZXNzYWdlPXJlcy5kYXRhW1wibWVzc2FnZVwiXTtcblx0XHQgY29udHJvbGxlci5tZXNzYWdlX3Zpc2libGU9dHJ1ZTtcblx0XHQgJHRpbWVvdXQoZnVuY3Rpb24oKXtjb250cm9sbGVyLm1lc3NhZ2VfdmlzaWJsZT1mYWxzZTtcblxuXHRcdFx0XHQgfSwzMDAwKTtcblxuXHRcdFx0XHRcdCB9XG5cdC8vXHQgc2VydmljZS5hbGxfZXZlbnRzPXJlcy5kYXRhLmluZm8uZXZlbnRzO1xuXHQvL1x0IHNlcnZpY2UucmVzb3VyY2VzPXJlcy5kYXRhLmluZm8ucmVzb3VyY2VzO1xuXHRcdCBcblx0XHRcdFx0XHRcdFx0XHQgICAgIH1cblx0XHQgICAgLGZ1bmN0aW9uKHJlcyl7XG4gICAgICAgICAgICAgY29uc29sZS5sb2coXCJsb2dpbl91cGRhdGUgZmFpbGVkXCIpO1xuXHRcdFxuXHRcdCAgICB9KTt9O1xuXHRcdFx0XHQgICAgIH1cblxuXG5cdFx0XHRcdFx0IFxuXHRcdFx0XHQgICAgfVxuXG5cdFx0XHRcdCAgICk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnbWFpbkFwcCcpLmNvbXBvbmVudCgnc2ltcGxlTm90aWYnLFxuXHRcdFx0XHQgICAge3RlbXBsYXRlVXJsOiAnc2ltcGxlbm90aWYuaHRtbCcsYmluZGluZ3M6e2RhdGE6XCI9XCJ9LFxuXHRcdFx0XHQgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSxJbmZvLEF1dGgsJGh0dHAsJHRpbWVvdXQpe1xuXHRcdFx0XHRcdCBjb25zb2xlLmxvZyhcInNpbXBsZS1ub3RpZlwiKTtcblx0XHRcdFx0XHQgdGhpcy5BdXRoPUF1dGg7XG5cdFx0XHRcdFx0IHRoaXMuSW5mbz1JbmZvO1xuXHRcdFx0XHRcdCB0aGlzLmRlY2lkZWQ9ZmFsc2U7XG5cdFx0XHRcdFx0IHRoaXMubWVzc2FnZT1cIlwiO1xuXHRcdFx0XHRcdCAvL2NvbnNvbGUubG9nKHRoaXMpO1xuXHRcdFx0XHRcdCAgLy9jb25zb2xlLmxvZyh0aGlzLmRhdGEpO1xuXHRcdFx0XHRcdCB2YXIgY29udHJvbGxlcj10aGlzO1xuXHRcdFx0XHRcdCB2YXIgcmVxPXt9O1xuXHRcdFx0XHRcblx0XHRcdFx0XHQvLyByZXEuaWQ9Y29udHJvbGxlci5kYXRhLmlkO1xuXHRcdFx0XHRcdCByZXEuaW5mbz17fTtcblx0XHRcdFx0XHQvLyByZXEubmFtZT1jb250cm9sbGVyLmRhdGEubmFtZTtcblx0XHRcdFx0XHQgcmVxLnRvY2tlbj1BdXRoLnRvY2tlbjtcblx0XHRcdFx0XHQgdGhpcy5kYXRhX3NldD1mYWxzZTtcblx0XHRcdFx0XHRcblx0XHRcdFx0ICAgICAgICAgdGhpcy4kb25DaGFuZ2VzPWZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0ICAgICBpZiAoKGNvbnRyb2xsZXIuZGF0YV9zZXQ9PWZhbHNlKSYmXG5cdFx0XHRcdFx0XHQgY29udHJvbGxlci5oYXNPd25Qcm9wZXJ0eSgnZGF0YScpJiZcblx0XHRcdFx0XHRcdCBjb250cm9sbGVyLmRhdGEhPXVuZGVmaW5lZCl7XG5cdFx0XHRcdFx0XHQgIGNvbnRyb2xsZXIuZGF0YS5zZWVuPWZhbHNlO1xuXHRcdFx0XHRcdFx0IGNvbnNvbGUubG9nKFwiZGF0YSBkZWZpbmVkIVwiKTtcblx0XHRcdFx0XHRcdCBjb25zb2xlLmxvZyhjb250cm9sbGVyLmRhdGEpO1xuXHRcdFx0XHRcdFx0IGNvbnRyb2xsZXIuZGF0YV9zZXQ9dHJ1ZTtcblx0XHRcdFx0XHRcdCByZXEubmFtZT1jb250cm9sbGVyLmRhdGEubmFtZTtcblx0XHRcdFx0XHRcdCByZXEuaWQ9Y29udHJvbGxlci5kYXRhLmlkO1xuXHRcdFx0XHRcdFx0IGNvbnNvbGUubG9nKGNvbnRyb2xsZXIuZGF0YSk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHQgfTtcblx0XHRcdFx0XHQgIHRoaXMuYWNjZXB0PWZ1bmN0aW9uKCl7aWYgKCFjb250cm9sbGVyLmRlY2lkZWQpIHtcblx0XHRcdFx0XHQgICAgIGNvbnRyb2xsZXIuZGVjaWRlZD10cnVlO1xuXHRcdFx0XHRcdCAgICAgXG5cdFx0XHRcdFx0ICAgICBcblx0XHRcdFx0XHQgICAgIHJlcS5tZXRob2Q9XCJzZWVuXCI7XG5cdFx0XHRcdFx0ICAgICBcblx0XHRcdFx0XHQgICAgIGNvbnNvbGUubG9nKFwiYWNjZXB0XCIpO1xuXHRcdFx0XHRcdCAgICAgY29uc29sZS5sb2cocmVxKTtcblx0XHRcdFx0XHQgICAgICRodHRwKCB7bWV0aG9kOlwiUE9TVFwiLHVybDpcIi91cGRhdGVfZXZlbnRcIixkYXRhOiByZXF9XG4gICAgICAgICBcblx0XHRcdFx0XHRcdCAgKS50aGVuKGZ1bmN0aW9uKHJlcyl7XG5cdFx0XHRcdFx0XHQgICAgICBjb250cm9sbGVyLm1lc3NhZ2U9cmVzLmRhdGEubWVzc2FnZTtcblx0XHRcdFx0XHRcdCAgICAgIGNvbnNvbGUubG9nKFwic3VjY2Vzc1wiKTtcblx0XHRcdFx0XHRcdCAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcblx0XHRcdFx0XHRcdCAgICAgICBjb250cm9sbGVyLm1lc3NhZ2U9cmVzLmRhdGEubWVzc2FnZTtcblx0XHRcdFx0XHRcdCAgICAgICBjb250cm9sbGVyLm1lc3NhZ2U9cmVzLmRhdGFbXCJtZXNzYWdlXCJdO1xuXHRcdFx0XHRcdFx0ICAgICAgY29udHJvbGxlci5tZXNzYWdlX3Zpc2libGU9dHJ1ZTtcblx0XHRcdFx0XHRcdCAgICBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7Y29udHJvbGxlci5kYXRhLnNlZW49dHJ1ZTtcblxuXHRcdFx0XHQgfSw3MDAwKTtcblx0Ly9cdCAkdGltZW91dChmdW5jdGlvbigpe2NvbnRyb2xsZXIubWVzc2FnZV92aXNpYmxlPWZhbHNlO1xuXG5cdC8vXHRcdFx0IH0sNzAwMCk7XG5cdFx0XHRcdFx0XHQgICAgICBcblxuXHRcdFx0XHRcdFx0ICB9LGZ1bmN0aW9uKHJlcyl7XG5cdFx0XHRcdFx0XHQgICAgICBjb25zb2xlLmxvZyhcInVuc3VjY2Vzc2Z1bFwiKTtcblx0XHRcdFx0XHRcdCAgICAgIGNvbnRyb2xsZXIuZGVjaWRlZD1mYWxzZTtcblxuXHRcdFx0XHRcdFx0ICB9KTtcblxuXHRcdFx0XHRcdCB9fTtcblx0XHRcdFx0XHQgdGhpcy5yZWplY3Q9ZnVuY3Rpb24oKXtpZiAoIWNvbnRyb2xsZXIuZGVjaWRlZCkge1xuXHRcdFx0XHRcdCAgICAgY29udHJvbGxlci5kZWNpZGVkPXRydWU7XG5cdFx0XHRcdFx0ICAgICAgICAgdmFyIHJlcT17fTtcblx0XHRcdFx0XHQgICAgXG5cdFx0XHRcdFx0ICAgICByZXEubWV0aG9kPVwicmVqZWN0XCI7XG5cdFx0XHRcdFx0ICAgICByZXEudG9ja2VuPUF1dGgudG9ja2VuO1xuXHRcdFx0XHRcdCAgICAgcmVxLmluZm89e307XG5cdFx0XHRcdFx0ICAgICAgcmVxLm5hbWU9Y29udHJvbGxlci5kYXRhLm5hbWU7XG5cdFx0XHRcdFx0XHQgcmVxLmlkPWNvbnRyb2xsZXIuZGF0YS5pZDtcblx0XHRcdFx0XHQgICAgIGNvbnNvbGUubG9nKFwicmVqZWN0XCIpO1xuXHRcdFx0XHRcdCAgICAgY29uc29sZS5sb2cocmVxKTtcblx0XHRcdFx0XHQgICAgICRodHRwKCB7bWV0aG9kOlwiUE9TVFwiLHVybDpcIi91cGRhdGVfZXZlbnRcIixkYXRhOiByZXF9XG4gICAgICAgICBcblx0XHRcdFx0XHRcdCAgKS50aGVuKGZ1bmN0aW9uKHJlcyl7XG5cdFx0XHRcdFx0XHQgICAgICBjb25zb2xlLmxvZyhcIlJlamVjdCBjb25uZWN0ZWQgc2VydmVyIHdpdGggc3VjY2Vzc1wiKTsgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuXHRcdFx0XHRcdFx0ICAgICAgY29udHJvbGxlci5tZXNzYWdlPXJlcy5kYXRhLm1lc3NhZ2U7XG5cdFx0XHRcdFx0XHQgICAgICAgY29udHJvbGxlci5tZXNzYWdlPXJlcy5kYXRhW1wibWVzc2FnZVwiXTtcblx0XHQgY29udHJvbGxlci5tZXNzYWdlX3Zpc2libGU9dHJ1ZTtcblx0XHRcdFx0XHRcdCBcblxuXHRcdFx0XHRcdFx0ICB9LGZ1bmN0aW9uKHJlcyl7XG5cdFx0XHRcdFx0XHQgICAgICBjb25zb2xlLmxvZyhcInVuc3VjY2Vzc2Z1bFwiKTtcblx0XHRcdFx0XHRcdCAgICAgIGNvbnRyb2xsZXIuZGVjaWRlZD1mYWxzZTtcblxuXHRcdFx0XHRcdFx0ICB9KTtcblxuXHRcdFx0XHRcdCB9fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHRcdFx0XHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnRleHQ9SW5mby50YXNrcyAgIFxuXHRcdFx0XHQgICAgIH19KTtcblxuIiwiYW5ndWxhci5tb2R1bGUoJ21haW5BcHAnKS5jb21wb25lbnQoJ3Rhc2tzJyxcblx0XHRcdFx0ICAgIHt0ZW1wbGF0ZVVybDogJ3Rhc2tzLmh0bWwnLFxuXHRcdFx0XHQgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSxJbmZvLEF1dGgpe1xuXHRcdFx0XHRcdCB0aGlzLkF1dGg9QXV0aDtcblx0XHRcdFx0XHQgdGhpcy5JbmZvPUluZm87XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRcdFx0ICAgICB9fSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnbWFpbkFwcCcpLmNvbXBvbmVudCgndXNlclN0YXR1cycsXG5cdFx0XHRcdCAgICB7dGVtcGxhdGVVcmw6ICdzdGF0dXMuaHRtbCcsXG5cdFx0XHRcdCAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlLEF1dGgsSW5mbyl7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0IHRoaXMudXNlcm5hbWU9XCJ1bmtub3duXCI7XG5cdFx0XHRcdFx0IHRoaXMuQXV0aD1BdXRoO1xuXHRcdFx0XHRcdCB0aGlzLkluZm89SW5mbztcblx0XHRcdFx0XHQgdmFyIGNvbnRyb2xsZXI9dGhpcztcblx0XHRcdFx0XHQgJHNjb3BlLiRvbignYXV0aG9yaXplZCcsZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0IGNvbnNvbGUubG9nKFwiY29tcG9uZW50IGtub3dzIGl0IGlzIGF1dGhvcml6ZWRcIik7XG5cdFx0XHRcdFx0ICAgIGNvbnRyb2xsZXIudXNlcm5hbWU9QXV0aC51c2VyO1x0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgIH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCB9fSk7XG4iLCJhcHAuZmlsdGVyKFwidHJ1c3RcIiwgWyckc2NlJywgZnVuY3Rpb24oJHNjZSkge1xuICByZXR1cm4gZnVuY3Rpb24oaHRtbENvZGUpe1xuICAgIHJldHVybiAkc2NlLnRydXN0QXNIdG1sKGh0bWxDb2RlKTtcbiAgfTtcbn1dKTtcbmFwcC5jb250cm9sbGVyKCdiYXNpYycsZnVuY3Rpb24gKCRyb290U2NvcGUsJHNjb3BlLCRodHRwLEF1dGgsSW5mbywkc2NlKXtcbiAgICAvLyBJbmZvLnVwZGF0ZSgpO1xuICAgICRzY29wZS5yZW5kZXJIdG1sID0gZnVuY3Rpb24gKGh0bWxDb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gJHNjZS50cnVzdEFzSHRtbChodG1sQ29kZSk7XG4gICAgICAgIH07XG4gICAgdmFyIG1vdXNlaW49e1widGFza3NcIjpmYWxzZSxcImFjdGlvbnNcIjpmYWxzZSxcImV2ZW50c1wiOmZhbHNlfTtcbiAgICAkc2NvcGUubW91c2V0b2dnbGU9ZnVuY3Rpb24ocyl7bW91c2VpbltzXT0hbW91c2VpbltzXTt9O1xuICAgIFxuICAgICRzY29wZS5iYWNrZ3JvdW5kPWZ1bmN0aW9uKHMpe1xuXHRpZiAobW91c2VpbltzXSkgcmV0dXJuIFwiI2ZjZlwiO1xuXHRpZiAoJHNjb3BlLnNob3c9PXMpIHJldHVybiBcIiMwYWFcIjsgZWxzZSByZXR1cm4gXCIjY2ZjXCI7XG4gICAgfTtcbiAgICAkc2NvcGUud29ya2luZz1cIjxzcGFuPiBBbmd1bGFySlMgPC9zcGFuPlwiO1xuICAgXG4gICAgJHNjb3BlLkF1dGg9QXV0aDtcbiAgICAkc2NvcGUuSW5mbz1JbmZvO1xuICAgICRzY29wZS5jcmVkZW50aWFscz17fTtcbiAgICAkc2NvcGUubG9naW49ZnVuY3Rpb24gKGNyZWRlbnRpYWxzKXtjb25zb2xlLmxvZyhcInN1Ym1pdHRlZCBcIiArIGNyZWRlbnRpYWxzLnVzZXJuYW1lKTtcblx0XHRcdFx0XHRpZiAoQXV0aC5hdXRoZW50aWNhdGUoY3JlZGVudGlhbHMudXNlcm5hbWUsY3JlZGVudGlhbHMucGFzc3dvcmQpKSAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2F1dGhvcml6ZWQnKTsgICAgICAvLyRzY29wZS5hdXRob3JpemVkPUF1dGguYXV0aG9yaXplZDtcbiAgICAgICAgICAgICAkc2NvcGUuc2hvdz1cImFjdGlvbnNcIjtcdFx0XHQgICAgICAgICAgICAgICBcblx0XHRcdFx0ICAgICAgIH07XG4gICAvLyAkc2NvcGUuJG9uKCdhdXRob3JpemVkJyxmdW5jdGlvbigpeyRzY29wZS5hdXRob3JpemVkPXRydWU7IGNvbnNvbGUubG9nKFwiJHNjb3BlLmF1dGhvcml6ZWRcIiwkc2NvcGUuYXV0aG9yaXplZCk7fSk7XG4gICAgXG59KTtcbmFwcC5jb250cm9sbGVyKCdiYXNpYzInLGZ1bmN0aW9uICgkc2NvcGUsJGh0dHApe1xuICAgICRzY29wZS53b3JraW5nPVwiQW5ndWxhckpTMlwiO1xuICAgIFxufSk7XG5cbiIsIlxuY29uc29sZS5sb2coXCJoZXJlIHB1YmxpYyFcIik7XG5hcHA9YW5ndWxhci5tb2R1bGUoJ21haW5BcHAnLFtdKTtcbm1lc3NhZ2U9XCJtZXNzYWFhYWdlXCI7XG5yZXF1aXJlKFwiLi9zZXJ2aWNlL2F1dGguanNcIik7XG5yZXF1aXJlKFwiLi9zZXJ2aWNlL2luZm8uanNcIik7XG5yZXF1aXJlKFwiLi9jb250cm9sbGVyL2Jhc2ljLmpzXCIpO1xucmVxdWlyZShcIi4vY29tcG9uZW50L3VzZXJzdGF0dXMuanNcIik7XG5yZXF1aXJlKFwiLi9jb21wb25lbnQvb25saW5ldXNlcnMuanNcIik7XG5yZXF1aXJlKFwiLi9jb21wb25lbnQvY3VycmVudGFmZmFpcnMuanNcIik7XG5yZXF1aXJlKFwiLi9jb21wb25lbnQvc2F5c29tZXRoaW5nLmpzXCIpO1xucmVxdWlyZShcIi4vY29tcG9uZW50L2JldHNvbWV0aGluZy5qc1wiKTtcbnJlcXVpcmUoXCIuL2NvbXBvbmVudC90YXNrcy5qc1wiKTtcbnJlcXVpcmUoXCIuL2NvbXBvbmVudC9zYW1wbGV0YXNrLmpzXCIpO1xucmVxdWlyZShcIi4vY29tcG9uZW50L3NpbXBsZW5vdGlmLmpzXCIpO1xucmVxdWlyZShcIi4vY29tcG9uZW50L2xvY2F0aW9ucy5qc1wiKTtcbnJlcXVpcmUoXCIuL2NvbXBvbmVudC9sb2NhdGlvbi5qc1wiKTtcbi8vIGJyb3dzZXJpZnkgY29tbWFuZDogYnJvd3NlcmlmeSAtLWRlYnVnIG1haW5hcHAuanMgLW8gYnVuZGxlLmpzXG5cbiIsImNvbnNvbGUubG9nKFwiQXV0aCBzdGFydGVkXCIpO1xuY29uc29sZS5sb2coXCJIRVJFIFwiICttZXNzYWdlKyBcIiAuXCIpO1xuYXBwLnNlcnZpY2UoJ0F1dGgnLGZ1bmN0aW9uKCRodHRwLCRyb290U2NvcGUpe1xuICAgIHRoaXMuYXV0aG9yaXplZD1mYWxzZTtcbiAgICB2YXIgc2VydmljZT10aGlzO1xuICAgIHNlcnZpY2UudXNlcj1cIlwiO1xuICAgIHRoaXMuYXV0aGVudGljYXRlPWZ1bmN0aW9uKHVzZXIscGFzcyl7XG5cdC8vJGh0dHAuZGVmYXVsdHMuaGVhZGVycy5wb3N0W1wiQ29udGVudC1UeXBlXCJdID0gXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIjtcblx0JGh0dHAoe21ldGhvZDpcIlBPU1RcIix1cmw6ICcvbG9naW4nLCBkYXRhOntcInVzZXJcIjp1c2VyLFwicGFzc1wiOnBhc3N9XG4gICAgICAgICAgICAgICBcblx0ICAgICAgfSkudGhlbihmdW5jdGlvbihyZXMpe1xuXHRcdCAgY29uc29sZS5sb2coXCJzZXJ2ZXIgcmVzcG9uZGVkXCIsIHJlcyk7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuXHRcdCAgICAgIGNvbnNvbGUubG9nKFwibG9naW4gc3VjY2Vzc2Z1bCBcIityZXMuZGF0YS50b2NrZW4pO1xuXHRcdCAgICAgIHNlcnZpY2UuYXV0aG9yaXplZD10cnVlO1xuXHRcdCAgICAgIHNlcnZpY2UudG9ja2VuPXJlcy5kYXRhLnRvY2tlbjtcblx0XHQgICAgICBzZXJ2aWNlLnVzZXI9dXNlcjtcblx0XHQgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2F1dGhvcml6ZWQnKTtcbiAgICAgICAgICBcdFx0ICB9IGVsc2V7XG5cdFx0ICAgICAgY29uc29sZS5sb2coXCJpbnZhbGlkIHVzZXJuYW1lIG9yIHBhc3N3b3JkXCIpO1xuXHRcdCAgfVxuXHQgICAgICB9LCBmdW5jdGlvbihyZXMpe30pO1xuXHRcdFx0Ly9cdCAgaWYgKHVzZXI9PVwiYXJtaW5cIiAmJiBwYXNzPT1cIjEyMzRcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy5hdXRob3JpemVkPXRydWU7XG5cdFx0XHRcdCAgICAgIFxuXHRcdFx0Ly9cdCAgICAgIHRoaXMudXNlcj1cImFybWluXCI7XG5cdFx0XHQvL1x0ICAgICAgdGhpcy5yZXNvdXJjZXM9e307XG5cdFx0XHQvL1x0ICAgICAgdGhpcy5yZXNvdXJjZXMubW9uZXk9NTA7XG5cdFx0XHQvL1x0ICAgICAgdGhpcy5yZXNvdXJjZXMudGltZT0xMDA7XG5cdFx0XHQvL1x0ICAgICAgdGhpcy5yZXNvdXJjZXMucmVwPTEwO1xuXHRcdFx0Ly9cdCAgICAgIGNvbnNvbGUubG9nKFwibG9nZ2VkIGluXCIpO1xuXHRcdFx0Ly9cdCAgICAgIHJldHVybiB0cnVlO1xuXHRcdFx0Ly9cdCAgfVxuXHRcdFx0XHQgIHJldHVybiBmYWxzZTtcblx0XHRcdCAgICAgIH07XG5cbn0pO1xuIiwiYXBwLnNlcnZpY2UoJ0luZm8nLGZ1bmN0aW9uKCRodHRwLCR0aW1lb3V0LEF1dGgsJHJvb3RTY29wZSl7XG5cbiAgICB2YXIgc2VydmljZT10aGlzO1xuICAgIHNlcnZpY2Uub25saW5lX3BsYXllcnM9e307XG4gICAgc2VydmljZS5yZXNvdXJjZXM9e307XG4gICAgc2VydmljZS5hbGxfcGxheWVycz1bXTtcbiAgICBzZXJ2aWNlLmFsbF9ldmVudHM9W107XG4gICAgc2VydmljZS5hbGxfdGFza3M9W107XG4gICAgc2VydmljZS5sb2NhdGlvbnM9W107XG4gICAgc2VydmljZS5ncm91cHM9W107XG4gICAgc2VydmljZS5sb2dpbl91cGRhdGU9ZnVuY3Rpb24oKXtcblx0aWYgKCFBdXRoLmF1dGhvcml6ZWQpIHtjb25zb2xlLmxvZyhcImxvZ2luX3VwZGF0ZSBub3QgcG9zc2libGUgbm90IGxvZ2dlZCBpblwiKTsgcmV0dXJuO31cblx0dmFyIHJlcT17XCJkb29kb29cIjpcImNoaWNoaVwifTtcblx0cmVxW1widG9ja2VuXCJdPUF1dGgudG9ja2VuO1xuXHRjb25zb2xlLmxvZygnbG9naW5fdXBkYXRlIGlzIGNvbm5lY3Rpbmcgc2VydmVyJyk7XG5cdCRodHRwKCB7bWV0aG9kOlwiUE9TVFwiLHVybDpcIi9sb2dpbkluZm9cIixkYXRhOiByZXF9XG5cblx0ICAgICApLnRoZW4oZnVuY3Rpb24ocmVzKXtcblx0XHQgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuXG5cdFx0IHNlcnZpY2UuYWxsX2V2ZW50cz1yZXMuZGF0YS5pbmZvLmV2ZW50cztcblx0XHQgc2VydmljZS5yZXNvdXJjZXM9cmVzLmRhdGEuaW5mby5yZXNvdXJjZXM7XG5cdFx0IHNlcnZpY2UudGFza3M9cmVzLmRhdGEuaW5mby50YXNrcztcblx0XHQgc2VydmljZS5sb2NhdGlvbnM9cmVzLmRhdGEuaW5mby5sb2NhdGlvbnM7XG4gICAgICAgICAgICAgICAgIHNlcnZpY2UuZ3JvdXBzPXJlcy5kYXRhLmluZm8uZ3JvdXBzO1xuXG5cblxuXHRcdCBjb25zb2xlLmxvZyhcInRhc2tzXCIpO1xuXHRcdCBjb25zb2xlLmxvZyhzZXJ2aWNlLnRhc2tzKTtcblx0ICAgICB9XG5cdFx0ICAgICxmdW5jdGlvbihyZXMpe1xuXHRcdFx0Y29uc29sZS5sb2coXCJsb2dpbl91cGRhdGUgZmFpbGVkXCIpO1xuXG5cdFx0ICAgIH0pO307XG4gICAgdmFyIHVwZGF0ZT1mdW5jdGlvbigpe1xuXHRyZXE9e1wiZG9vZG9vXCI6XCJjaGljaGlcIn07XG5cdGlmIChBdXRoLmF1dGhvcml6ZWQpIHJlcVtcInRvY2tlblwiXT1BdXRoLnRvY2tlbjtcblx0Y29uc29sZS5sb2coJ0luZm8gaXMgY29ubmVjdGluZyBzZXJ2ZXInKTtcblx0JGh0dHAoIHttZXRob2Q6XCJQT1NUXCIsdXJsOlwiL3VwZGF0ZVwiLGRhdGE6IHJlcX1cblxuXHQgICAgICkudGhlbihmdW5jdGlvbihyZXMpe1xuICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInVwZGF0aW5nLi4uXCIpO1xuXHRcdCBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG5cblx0XHQgY29uc29sZS5sb2coXCJlbmRcIik7XG5cdFx0IGlmIChyZXMuZGF0YSE9PW51bGwpe1xuXHRcdCAgICAgY29uc29sZS5sb2coXCJub3QgbnVsbFwiKTtcblxuXHRcdCAgICAgaWYgKFwiaW5mb1wiIGluIHJlcy5kYXRhKSB7XG5cdFx0XHQgY29uc29sZS5sb2cocmVzLmRhdGEuaW5mby5ldmVudHMpO1xuXHRcdFx0ICBjb25zb2xlLmxvZyhcIm5ldyBsb2NhdGlvbnM6XCIpO1xuXHRcdCAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YS5pbmZvLmxvY2F0aW9ucyk7XG5cdFx0XHQgc2VydmljZS5yZXNvdXJjZXM9cmVzLmRhdGEuaW5mby5yZXNvdXJjZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgc2VydmljZS5ncm91cHM9cmVzLmRhdGEuaW5mby5ncm91cHM7XG5cdFx0XHQgLy9zZXJ2aWNlLmxvY2F0aW9ucz1yZXMuZGF0YS5pbmZvLmxvY2F0aW9ucztcblx0XHRcdCBjb25zb2xlLmxvZyhzZXJ2aWNlLnJlc291cmNlcyk7XG5cdFx0XHQgdmFyIG5ld19ldmVudHM9cmVzLmRhdGEuaW5mby5ldmVudHM7XG5cblxuXHRcdFx0IG5ld19ldmVudHMuZm9yRWFjaChmdW5jdGlvbihldmVudCl7XG5cdFx0XHQgICAgIHZhciBhbHJlYWR5PWZhbHNlO1xuXHRcdFx0ICAgICBzZXJ2aWNlLmFsbF9ldmVudHMuZm9yRWFjaChmdW5jdGlvbihyZWdldmVudCxpbmRleCl7XG5cdFx0XHRcdCBpZiAocmVnZXZlbnRbXCJpZFwiXT09ZXZlbnRbXCJpZFwiXSl7XG5cdFx0XHRcdCAgICAgc2VydmljZS5hbGxfZXZlbnRzW2luZGV4XT1ldmVudDtcblx0XHRcdFx0ICAgICBhbHJlYWR5PXRydWU7fVxuXHRcdFx0ICAgICB9KTtcblx0XHRcdCAgICAgaWYgKCFhbHJlYWR5KVxuXHRcdFx0XHQgc2VydmljZS5hbGxfZXZlbnRzLnB1c2goZXZlbnQpOyBjb25zb2xlLmxvZyhldmVudFtcImlkXCJdKTt9KTtcblxuXHRcdFx0IHJlcy5kYXRhLmluZm8ubG9jYXRpb25zLmZvckVhY2goZnVuY3Rpb24obG9jYXRpb24pe1xuXHRcdFx0ICAgICB2YXIgYWxyZWFkeT1mYWxzZTtcblx0XHRcdCAgICAgc2VydmljZS5sb2NhdGlvbnMuZm9yRWFjaChmdW5jdGlvbihyZWdsb2NhdGlvbixpbmRleCl7XG5cdFx0XHRcdCBpZiAocmVnbG9jYXRpb25bXCJoYXNoXCJdPT1sb2NhdGlvbltcImhhc2hcIl0pe1xuXHRcdFx0XHQgICAgIHZhciBtb3JlPXNlcnZpY2UubG9jYXRpb25zW2luZGV4XS5tb3JlO1xuXHRcdFx0XHQgICAgIHNlcnZpY2UubG9jYXRpb25zW2luZGV4XT1sb2NhdGlvbjtcblx0XHRcdFx0ICAgICBzZXJ2aWNlLmxvY2F0aW9uc1tpbmRleF0ubW9yZT1tb3JlO1xuXHRcdFx0XHQgICAgIGNvbnNvbGUubG9nKFwibW9yZSBmcm9tIGluZm8gc2VydmljZTpcIik7XG5cdFx0XHRcdCAgICAgY29uc29sZS5sb2coc2VydmljZS5sb2NhdGlvbnNbaW5kZXhdKTtcblx0XHRcdFx0ICAgICBhbHJlYWR5PXRydWU7fVxuXHRcdFx0ICAgICB9KTtcblx0XHRcdCAgICAgaWYgKCFhbHJlYWR5KVxuXHRcdFx0XHQgc2VydmljZS5sb2NhdGlvbnMucHVzaChsb2NhdGlvbik7IGNvbnNvbGUubG9nKGxvY2F0aW9uW1wiaGFzaFwiXSk7fSk7XG5cdFx0XHQgaWYgKHJlcy5kYXRhLmluZm8ubG9jYXRpb25zLmxlbmd0aCA+IDApXG5cdFx0XHQgeyRyb290U2NvcGUuJGJyb2FkY2FzdCgnbG9jYXRpb25fdXBkYXRlJyk7Y29uc29sZS5sb2coXCJsb2NhdGlvbl91cGRhdGVcIik7fVxuXG5cblxuXHRcdFx0IGlmIChPYmplY3Qua2V5cyhyZXMuZGF0YS5pbmZvLnRhc2tzKS5sZW5ndGg+MCApIGNvbnNvbGUubG9nKFwiVEFTS1M6XCIpO1xuXHRcdFx0IGNvbnNvbGUubG9nKHJlcy5kYXRhLmluZm8udGFza3MpO1xuXHRcdFx0IHZhciBuZXdfdGFza3M9cmVzLmRhdGEuaW5mby50YXNrcztcblx0XHRcdCBPYmplY3Qua2V5cyhuZXdfdGFza3MpLmZvckVhY2goZnVuY3Rpb24odGFza19pZCl7XG5cdFx0XHQgICAgIHNlcnZpY2UudGFza3NbdGFza19pZF09bmV3X3Rhc2tzW3Rhc2tfaWRdOyBjb25zb2xlLmxvZyhuZXdfdGFza3NbdGFza19pZF0pO30pO1xuXG5cblxuXG5cblxuXHRcdCAgICAgfVxuXHRcdCB9XG5cblx0XHQgc2VydmljZS5vbmxpbmVfcGxheWVycz1yZXMuZGF0YS5vbmxpbmU7JHRpbWVvdXQodXBkYXRlLDEwMDAwKTt9LGZ1bmN0aW9uKHJlcyl7XG5cblx0XHQgICAgIGNvbnNvbGUubG9nKFwib25saW5lIHBsYXllcnMgdXBkYXRlIGZhaWxlZFwiKTtcblx0XHQgICAgICR0aW1lb3V0KHVwZGF0ZSwxMDAwMCk7fSk7fTtcbiAgICB1cGRhdGUoKTtcbn0pO1xuIl19
