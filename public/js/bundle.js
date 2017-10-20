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

},{}],3:[function(require,module,exports){
angular.module('mainApp').component('event',
				    {templateUrl: 'event.html',bindings:{ data: "="},
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

},{}],4:[function(require,module,exports){
angular.module('mainApp').directive('scroll', function($timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      scope.$watchCollection(attr.scroll, function(newVal) {
        $timeout(function() {
         element[0].scrollTop = element[0].scrollHeight;
        });
      });
    }
  };
});

angular.module('mainApp')
    .component('location',
	       {templateUrl: 'location.html',bindings:{data:"="},
		controller:
		function($scope,Info,Auth,$http,$timeout,$sce){
		    this.renderHtml = function (htmlCode) {
			return $sce.trustAsHtml(htmlCode);
		    };
		    	 $scope.realTime=function(event){
					     return Date.parse(event.last_update);};
				  


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



},{}],5:[function(require,module,exports){
angular.module('mainApp').component('locations',
				    {templateUrl: 'locations.html',
				     controller: function($scope,Info,Auth,$sce){
					 this.Info=Info;
					 this.Auth=Auth;
				     $scope.renderHtml = function (htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        };
					

				     }});

},{}],6:[function(require,module,exports){
angular.module('mainApp').component('onlineUsers',
				    {templateUrl: 'onlineusers.html',
				     controller: function($scope,Info){
					 this.Info=Info;
					  $scope.img_file=function(o){return "img/girl.jpg";};
				     }});

},{}],7:[function(require,module,exports){
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



},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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


},{}],10:[function(require,module,exports){
angular.module('mainApp').component('tasks',
				    {templateUrl: 'tasks.html',
				     controller: function($scope,Info,Auth){
					 this.Auth=Auth;
					 this.Info=Info;
                                    
				     }});

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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


},{}],13:[function(require,module,exports){

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
require("./component/event.js");
// browserify command: browserify --debug mainapp.js -o bundle.js


},{"./component/betsomething.js":1,"./component/currentaffairs.js":2,"./component/event.js":3,"./component/location.js":4,"./component/locations.js":5,"./component/onlineusers.js":6,"./component/sampletask.js":7,"./component/saysomething.js":8,"./component/simplenotif.js":9,"./component/tasks.js":10,"./component/userstatus.js":11,"./controller/basic.js":12,"./service/auth.js":14,"./service/info.js":15}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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

},{}]},{},[13])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Vzci9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNvbXBvbmVudC9iZXRzb21ldGhpbmcuanMiLCJjb21wb25lbnQvY3VycmVudGFmZmFpcnMuanMiLCJjb21wb25lbnQvZXZlbnQuanMiLCJjb21wb25lbnQvbG9jYXRpb24uanMiLCJjb21wb25lbnQvbG9jYXRpb25zLmpzIiwiY29tcG9uZW50L29ubGluZXVzZXJzLmpzIiwiY29tcG9uZW50L3NhbXBsZXRhc2suanMiLCJjb21wb25lbnQvc2F5c29tZXRoaW5nLmpzIiwiY29tcG9uZW50L3NpbXBsZW5vdGlmLmpzIiwiY29tcG9uZW50L3Rhc2tzLmpzIiwiY29tcG9uZW50L3VzZXJzdGF0dXMuanMiLCJjb250cm9sbGVyL2Jhc2ljLmpzIiwibWFpbmFwcC5qcyIsInNlcnZpY2UvYXV0aC5qcyIsInNlcnZpY2UvaW5mby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJhbmd1bGFyLm1vZHVsZSgnbWFpbkFwcCcpLmNvbXBvbmVudCgnYmV0U29tZXRoaW5nJyxcblx0XHRcdFx0ICAgIHt0ZW1wbGF0ZVVybDogJ2JldHNvbWV0aGluZy5odG1sJyxcblx0XHRcdFx0ICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUsSW5mbyxBdXRoLCRodHRwLCR0aW1lb3V0KXtcblx0XHRcdFx0XHRcblxuIHZhciBjb250cm9sbGVyPXRoaXM7XG5cdFx0XHRcdFx0IHRoaXMuSW5mbz1JbmZvO1xuXHRcdFx0XHRcdCB0aGlzLkF1dGg9QXV0aDtcblx0XHRcdFx0XHQgLy90aGlzLmRhdGE9e307XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0ICRzY29wZS4kb24oJ2F1dGhvcml6ZWQnLGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0ICAgICAvL2NvbnRyb2xsZXIuZGF0YS5hPSBBdXRoLnVzZXI7XG5cdFx0XHRcdFx0ICAgIC8vIGNvbnNvbGUubG9nKFwic2F5IFNvbWV0aCBhOlwiK2NvbnRyb2xsZXIuZGF0YS5hKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSW5mby5sb2dpbl91cGRhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJKU09OIElORk86IFwiK0luZm8uYWxsX2V2ZW50cyk7XG5cdFx0ICAgICAgLy9jb25zb2xlLmxvZyhcIkpTT04gSU5GTyBFVkVOVFMgXCIrcmVzLmRhdGEuaW5mby5ldmVudHMpXG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0ICAgIHRoaXMuc3VibWl0PWZ1bmN0aW9uKHNvbWV0aGluZyl7XG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiU3VibWl0dGVkXCIpO1xuXHRcdFx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKHRoaXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXE9e307XG5cdFx0XHRcdFx0XHRcdHJlcS50b2NrZW49QXV0aC50b2NrZW47XG5cdFx0XHRcdFx0XHRcdHJlcS5oYXNoPVwiYmV0U29tZXRoaW5nQmV0dGVyXCI7XG5cdFx0XHRcdFx0XHRcdHNvbWV0aGluZy5hPUF1dGgudXNlcjtcblx0XHRcdFx0XHRcdFx0cmVxLmRhdGE9c29tZXRoaW5nO1xuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhyZXEpO1xuXHRcdFx0XHRcdFx0XHRcdCRodHRwKCB7bWV0aG9kOlwiUE9TVFwiLHVybDpcIi9yZWdpc3Rlcl9ldmVudFwiLGRhdGE6IHJlcX1cbiAgICAgICAgIFxuXHRcdFx0XHRcdFx0XHRcdCAgICAgKS50aGVuKGZ1bmN0aW9uKHJlcyl7XG5cdFx0XHRcdFx0XHRcdFx0XHQgY29uc29sZS5sb2coXCJyZXM6XCIpO1xuXHRcdCBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG5cdFx0ICBjb250cm9sbGVyLm1lc3NhZ2U9cmVzLmRhdGFbXCJtZXNzYWdlXCJdO1xuXHRcdCBjb250cm9sbGVyLm1lc3NhZ2VfdmlzaWJsZT10cnVlO1xuXHRcdCAkdGltZW91dChmdW5jdGlvbigpe2NvbnRyb2xsZXIubWVzc2FnZV92aXNpYmxlPWZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibWVzc2FnZSBoaWRkZW5cIik7XG5cdFx0XHRcdCB9LDMwMDApO1xuXHQvL1x0IHNlcnZpY2UuYWxsX2V2ZW50cz1yZXMuZGF0YS5pbmZvLmV2ZW50cztcblx0Ly9cdCBzZXJ2aWNlLnJlc291cmNlcz1yZXMuZGF0YS5pbmZvLnJlc291cmNlcztcblx0XHQgXG5cdFx0XHRcdFx0XHRcdFx0ICAgICB9XG5cdFx0ICAgICxmdW5jdGlvbihyZXMpe1xuICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibG9naW5fdXBkYXRlIGZhaWxlZFwiKTtcblx0XHRcblx0XHQgICAgfSk7fTtcblx0XHRcdFx0ICAgICB9XG5cblxuXHRcdFx0XHRcdCBcblx0XHRcdFx0ICAgIH1cblxuXHRcdFx0XHQgICAgKTtcbiIsImFuZ3VsYXIubW9kdWxlKCdtYWluQXBwJykuY29tcG9uZW50KCdjdXJyZW50QWZmYWlycycsXG5cdFx0XHRcdCAgICB7dGVtcGxhdGVVcmw6ICdldmVudHMuaHRtbCcsXG5cdFx0XHRcdCAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlLEluZm8sQXV0aCwkc2NlKXtcblx0XHRcdFx0XHQgdGhpcy5JbmZvPUluZm87XG5cdFx0XHRcdFx0IHRoaXMuQXV0aD1BdXRoO1xuXHRcdFx0XHRcdCAkc2NvcGUucmVhbFRpbWU9ZnVuY3Rpb24oZXZlbnQpe1xuXHRcdFx0XHRcdCAgICAgcmV0dXJuIERhdGUucGFyc2UoZXZlbnQubGFzdF91cGRhdGUpO307XG5cdFx0XHRcdCAgICAgJHNjb3BlLnJlbmRlckh0bWwgPSBmdW5jdGlvbiAoaHRtbENvZGUpIHtcbiAgICAgICAgICAgIHJldHVybiAkc2NlLnRydXN0QXNIdG1sKGh0bWxDb2RlKTtcbiAgICAgICAgfTtcblx0XHRcdFx0XHQgJHNjb3BlLiRvbignYXV0aG9yaXplZCcsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEluZm8ubG9naW5fdXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkpTT04gSU5GTzogXCIrSW5mby5hbGxfZXZlbnRzKTtcblx0XHQgICAgICAvL2NvbnNvbGUubG9nKFwiSlNPTiBJTkZPIEVWRU5UUyBcIityZXMuZGF0YS5pbmZvLmV2ZW50cylcblx0XHRcdFx0XHQgfSk7XG5cblx0XHRcdFx0ICAgICB9fSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnbWFpbkFwcCcpLmNvbXBvbmVudCgnZXZlbnQnLFxuXHRcdFx0XHQgICAge3RlbXBsYXRlVXJsOiAnZXZlbnQuaHRtbCcsYmluZGluZ3M6eyBkYXRhOiBcIj1cIn0sXG5cdFx0XHRcdCAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlLEluZm8sQXV0aCwkc2NlKXtcblx0XHRcdFx0XHQgdGhpcy5JbmZvPUluZm87XG5cdFx0XHRcdFx0IHRoaXMuQXV0aD1BdXRoO1xuXHRcdFx0XHQgICAgICRzY29wZS5yZW5kZXJIdG1sID0gZnVuY3Rpb24gKGh0bWxDb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gJHNjZS50cnVzdEFzSHRtbChodG1sQ29kZSk7XG4gICAgICAgIH07XG5cdFx0XHRcdFx0ICRzY29wZS4kb24oJ2F1dGhvcml6ZWQnLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJbmZvLmxvZ2luX3VwZGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJKU09OIElORk86IFwiK0luZm8uYWxsX2V2ZW50cyk7XG5cdFx0ICAgICAgLy9jb25zb2xlLmxvZyhcIkpTT04gSU5GTyBFVkVOVFMgXCIrcmVzLmRhdGEuaW5mby5ldmVudHMpXG5cdFx0XHRcdFx0IH0pO1xuXG5cdFx0XHRcdCAgICAgfX0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ21haW5BcHAnKS5kaXJlY3RpdmUoJ3Njcm9sbCcsIGZ1bmN0aW9uKCR0aW1lb3V0KSB7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBJyxcbiAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cikge1xuICAgICAgc2NvcGUuJHdhdGNoQ29sbGVjdGlvbihhdHRyLnNjcm9sbCwgZnVuY3Rpb24obmV3VmFsKSB7XG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgZWxlbWVudFswXS5zY3JvbGxUb3AgPSBlbGVtZW50WzBdLnNjcm9sbEhlaWdodDtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59KTtcblxuYW5ndWxhci5tb2R1bGUoJ21haW5BcHAnKVxuICAgIC5jb21wb25lbnQoJ2xvY2F0aW9uJyxcblx0ICAgICAgIHt0ZW1wbGF0ZVVybDogJ2xvY2F0aW9uLmh0bWwnLGJpbmRpbmdzOntkYXRhOlwiPVwifSxcblx0XHRjb250cm9sbGVyOlxuXHRcdGZ1bmN0aW9uKCRzY29wZSxJbmZvLEF1dGgsJGh0dHAsJHRpbWVvdXQsJHNjZSl7XG5cdFx0ICAgIHRoaXMucmVuZGVySHRtbCA9IGZ1bmN0aW9uIChodG1sQ29kZSkge1xuXHRcdFx0cmV0dXJuICRzY2UudHJ1c3RBc0h0bWwoaHRtbENvZGUpO1xuXHRcdCAgICB9O1xuXHRcdCAgICBcdCAkc2NvcGUucmVhbFRpbWU9ZnVuY3Rpb24oZXZlbnQpe1xuXHRcdFx0XHRcdCAgICAgcmV0dXJuIERhdGUucGFyc2UoZXZlbnQubGFzdF91cGRhdGUpO307XG5cdFx0XHRcdCAgXG5cblxuXHRcdCAgICB0aGlzLkF1dGg9QXV0aDtcblx0XHQgICAgdGhpcy5JbmZvPUluZm87XG5cdFx0ICAgICRzY29wZS5tZXNzYWdlX2JveD1cItm+24zYp9mFINiu2YjYryDYsdinINmI2KfYsdivINqp2YbbjNivXCI7XG5cdFx0ICAgIHZhciBjb21wb25lbnQ9dGhpcztcblx0XHQgICAgdmFyIGVudGVyX3RleHQ9XCLZiNix2YjYr1wiO1xuXHRcdCAgICB2YXIgZXhpdF90ZXh0PVwi2K7YsdmI2KxcIjtcblx0XHQgICAgdmFyIGxlc3NfdGV4dD1cItqp2YXYqtixXCI7XG5cdFx0ICAgIHZhciBtb3JlX3RleHQ9XCLYqNuM2LTYqtixXCI7XG5cdFx0ICAgIHZhciBpbnNpZGVfY29sb3I9XCJyZWRcIjtcblx0XHQgICAgdmFyIG91dHNpZGVfY29sb3I9XCJibGFja1wiO1xuXHRcdCAgICB2YXIgY29udHJvbGxlcj10aGlzO1xuXHRcdCAgICB0aGlzLmJ1dHRvbl9kaXNhYmxlZD1mdW5jdGlvbigpe1xuXHRcdFx0aWYgKGNvbnRyb2xsZXIuZGF0YS5pbnNpZGUpIHJldHVybiBcIlwiOyBlbHNlIHJldHVybiBcImRpc2FibGVkXCI7XG5cdFx0ICAgIH07XG5cblx0XHQgICAgdGhpcy5zZW5kX21lc3NhZ2U9ZnVuY3Rpb24oKXtcblx0XHRcdHZhciByZXE9IHtcInRvY2tlblwiOkF1dGgudG9ja2VuLFwiaGFzaFwiOlwibWVzc2FnZVRvR3JvdXBcIlxuXHRcdFx0XHQgICAgLFwiZGF0YVwiOntcIm1lc3NhZ2VcIjokc2NvcGUubWVzc2FnZV9ib3hcblx0XHRcdFx0XHQgICAgICxcImdyb3VwXCI6IFwiOlwiK2NvbnRyb2xsZXIuZGF0YS5ncm91cCB9fTtcblx0XHRcdGNvbnNvbGUubG9nKFwic2VuZF9tZXNzYWdlXCIpO1xuXHRcdFx0Y29uc29sZS5sb2cocmVxKTtcblx0XHRcdCRodHRwLnBvc3QoXCIvcmVnaXN0ZXJfZXZlbnRcIixyZXEpO1xuXG5cdFx0ICAgIH07XG5cdFx0ICAgIHRoaXMudG9nZ2xlX21vcmVfdGV4dD1mdW5jdGlvbigpXG5cdFx0ICAgIHtpZiAodGhpcy5kYXRhLm1vcmUpIHJldHVybiBsZXNzX3RleHQ7IGVsc2UgcmV0dXJuIG1vcmVfdGV4dDt9O1xuXHRcdCAgICB0aGlzLnRvZ2dsZV9lbnRlcl9jb2xvcj1mdW5jdGlvbigpXG5cdFx0ICAgIHtpZiAodGhpcy5kYXRhLmluc2lkZSkgcmV0dXJuIGluc2lkZV9jb2xvcjsgZWxzZSByZXR1cm4gb3V0c2lkZV9jb2xvcjt9O1xuXHRcdCAgICB0aGlzLnRvZ2dsZV9lbnRlcl90ZXh0PWZ1bmN0aW9uKClcblx0XHQgICAge2lmICh0aGlzLmRhdGEuaW5zaWRlKSByZXR1cm4gZXhpdF90ZXh0OyBlbHNlIHJldHVybiBlbnRlcl90ZXh0O307XG5cdFx0ICAgIFxuXHRcdCAgICB0aGlzLmluc2lkZT1mYWxzZTtcblx0XHQgICAgdGhpcy50b2dnbGVfbW9yZT1mdW5jdGlvbigpe1xuXHRcdFx0aWYgKGNvbXBvbmVudC5kYXRhLm1vcmUpXG5cdFx0XHR7Ly9jb21wb25lbnQudG9nZ2xlX21vcmVfdGV4dD1tb3JlX3RleHQ7XG5cdFx0XHQgICAgY29uc29sZS5sb2coXCJ0b2dnbGUgbW9yZSB3YXMgc2V0XCIpO1xuXHRcdFx0ICAgIGNvbXBvbmVudC5kYXRhLm1vcmU9ZmFsc2U7fVxuXHRcdFx0ZWxzZXsvLyBjb21wb25lbnQudG9nZ2xlX21vcmVfdGV4dD1sZXNzX3RleHQ7XG5cdFx0XHQgICAgY29tcG9uZW50LmRhdGEubW9yZT10cnVlO1xuXHRcdFx0ICAgIGNvbnNvbGUubG9nKFwidG9nZ2xlIG1vcmUgd2FzIG5vdCBzZXRcIik7fVxuXG5cdFx0ICAgIH07XG5cdFx0ICAgIFxuXHRcdCAgICBcblxuXHRcdCAgICBcblx0XHQgICAgdGhpcy5idXR0b25fZGVjaWRlZD1mYWxzZTtcblx0XHQgICAgLy8gdGhpcy5tZXNzYWdlPVwiXCI7XG5cdFx0ICAgIC8vY29uc29sZS5sb2codGhpcyk7XG5cdFx0ICAgIC8vY29uc29sZS5sb2codGhpcy5kYXRhKTtcblx0XHQgICAgdmFyIHJlcT17fTtcblx0XHQgICAgXG5cdFx0ICAgIC8vIHJlcS5pZD1jb250cm9sbGVyLmRhdGEuaWQ7XG5cdFx0ICAgIHJlcS5pbmZvPXt9O1xuXHRcdCAgICAvLyByZXEubmFtZT1jb250cm9sbGVyLmRhdGEubmFtZTtcblx0XHQgICAgcmVxLnRvY2tlbj1BdXRoLnRvY2tlbjtcblx0XHQgICAgdGhpcy5kYXRhX3NldD1mYWxzZTtcblx0XHQgICAgdGhpcy5tZXNzYWdlX3Nob3c9ZmFsc2U7XG5cdFx0ICAgIHRoaXMubWVzc2FnZT1cIm1lc3NhZ2UhIS4uLlwiO1xuXHRcdCAgICB0aGlzLmVudGVyX2J1dHRvbj1mdW5jdGlvbigpe1xuXHRcdFx0aWYgKGNvbnRyb2xsZXIuYnV0dG9uX2RlY2lkZWQpIHJldHVybjtcblx0XHRcdGNvbnRyb2xsZXIuYnV0dG9uX2RlY2lkZWQ9dHJ1ZTtcblx0XHRcdGlmICghY29udHJvbGxlci5kYXRhLmluc2lkZSlcblx0XHRcdCAgICAkaHR0cC5wb3N0KFwiL3JlZ2lzdGVyX2V2ZW50XCIsXG5cdFx0XHRcdCAgICAgICB7XCJ0b2NrZW5cIjpBdXRoLnRvY2tlbixcblx0XHRcdFx0XHRcImhhc2hcIjpcImVudGVyTG9jYXRpb25cIixcblx0XHRcdFx0XHRcImRhdGFcIjp7XCJ1c2VyXCI6QXV0aC51c2VyLFwibG9jYXRpb25cIjpjb250cm9sbGVyLmRhdGEuaGFzaH19XG5cdFx0XHRcdCAgICAgICkudGhlbihcblx0XHRcdFx0XHQgIGZ1bmN0aW9uKHJlcyl7XG5cdFx0XHRcdFx0ICAgICAgdmFyIGRhdGE9cmVzLmRhdGE7XG5cdFx0XHRcdFx0ICAgICAgY29uc29sZS5sb2coXCJzdWNjZXNzIGluIHJlZ2lzdGVyaW5nIGVudGVyX2xvY2F0aW9uXCIpO1xuXHRcdFx0XHRcdCAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuXHRcdFx0XHRcdCAgICAgIGlmIChkYXRhLmV2ZW50X2NvZGUgPjAgJiYgZGF0YS5jb2RlID4gMCApIGNvbnRyb2xsZXIuZGF0YS5pbnNpZGU9IWNvbnRyb2xsZXIuZGF0YS5pbnNpZGU7XG5cdFx0XHRcdFx0ICAgICAgY29udHJvbGxlci5idXR0b25fZGVjaWRlZD1mYWxzZTtcblx0XHRcdFx0XHQgICAgICBjb250cm9sbGVyLm1lc3NhZ2U9ZGF0YS5tZXNzYWdlO1xuXHRcdFx0XHRcdCAgICAgIGNvbnRyb2xsZXIubWVzc2FnZV9zaG93PXRydWU7XG5cdFx0XHRcdFx0ICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtjb250cm9sbGVyLm1lc3NhZ2Vfc2hvdz1mYWxzZTt9LDMwMDApO1xuXHRcdFx0XHRcdCAgICAgIFxuXG5cdFx0XHRcdFx0ICB9KTtcblxuXHRcdFx0XG5cdFx0XHRlbHNlXG5cdFx0XHQgICAgJGh0dHAucG9zdChcIi91cGRhdGVfZXZlbnRcIix7XG5cdFx0XHRcdFwidG9ja2VuXCI6QXV0aC50b2NrZW4sXG5cdFx0XHRcdFwibmFtZVwiOlwiZW50ZXJMb2NhdGlvblwiLFxuXHRcdFx0XHRcIm1ldGhvZFwiOiBcImdldF9vdXRcIixcblx0XHRcdFx0XCJpbmZvXCI6IHtcInVzZXJcIjpBdXRoLnVzZXIsXCJsb2NhdGlvblwiOmNvbnRyb2xsZXIuZGF0YS5oYXNofVxuXG5cdFx0XHQgICAgfSkudGhlbihmdW5jdGlvbihyZXMpe1xuXHRcdFx0XHR2YXIgZGF0YT1yZXMuZGF0YTtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJzdWNjZXNzIGluIGdldF9vdXQgZW50ZXJfbG9jYXRpb25cIik7XG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xuXHRcdFx0XHRjb250cm9sbGVyLmJ1dHRvbl9kZWNpZGVkPWZhbHNlO1xuXHRcdFx0XHRpZiAoZGF0YS5tZXNzYWdlLm9rICkgY29udHJvbGxlci5kYXRhLmluc2lkZT0hY29udHJvbGxlci5kYXRhLmluc2lkZTtcblx0XHRcdFx0XG5cdFx0XHQgICAgICAgIGNvbnRyb2xsZXIubWVzc2FnZT1kYXRhLm1lc3NhZ2UubWVzc2FnZTtcblx0XHRcdCAgICAgICAgY29udHJvbGxlci5tZXNzYWdlX3Nob3c9dHJ1ZTtcblx0XHRcdFx0JHRpbWVvdXQoZnVuY3Rpb24oKXtjb250cm9sbGVyLm1lc3NhZ2Vfc2hvdz1mYWxzZTt9LDMwMDApO1xuXG5cdFx0XHQgICAgfSk7XG5cblx0XHQgICAgfTtcblx0XHQgICAgdGhpcy4kb25DaGFuZ2VzPWZ1bmN0aW9uKCl7XG5cdFx0XHRpZiAoKGNvbnRyb2xsZXIuZGF0YV9zZXQ9PWZhbHNlKSYmXG5cdFx0XHQgICAgKFwiZGF0YVwiIGluIGNvbnRyb2xsZXIpKXtcblx0XHRcdCAgICBjb250cm9sbGVyLmRhdGFfc2V0PXRydWU7XG5cdFx0XHQgICAgLy9cdCByZXEubmFtZT1jb250cm9sbGVyLmRhdGEubmFtZTtcblx0XHRcdCAgICAvL1x0IHJlcS5pZD1jb250cm9sbGVyLmRhdGEuaWQ7XG5cdFx0XHQgICAgY29uc29sZS5sb2coY29udHJvbGxlci5kYXRhKTtcblxuXHRcdFx0ICAgIGlmIChjb250cm9sbGVyLmRhdGEubW9yZSA9PSBudWxsICkgY29udHJvbGxlci5kYXRhLm1vcmU9ZmFsc2U7XG5cblx0XHRcdH1cblx0XHQgICAgfTtcblxuXHRcdCAgICAkc2NvcGUuJG9uKCdsb2NhdGlvbl91cGRhdGUnLGZ1bmN0aW9uKCl7XG5cdFx0XHRjb25zb2xlLmxvZyhcIkkga25vdyEgbG9jYXRpb25zXCIpO1xuXHRcdFx0XG5cblx0XHQgICAgfSk7XG5cdFx0ICAgIFxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy50ZXh0PUluZm8udGFza3MgICBcblx0XHR9fSk7XG5cblxuIiwiYW5ndWxhci5tb2R1bGUoJ21haW5BcHAnKS5jb21wb25lbnQoJ2xvY2F0aW9ucycsXG5cdFx0XHRcdCAgICB7dGVtcGxhdGVVcmw6ICdsb2NhdGlvbnMuaHRtbCcsXG5cdFx0XHRcdCAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlLEluZm8sQXV0aCwkc2NlKXtcblx0XHRcdFx0XHQgdGhpcy5JbmZvPUluZm87XG5cdFx0XHRcdFx0IHRoaXMuQXV0aD1BdXRoO1xuXHRcdFx0XHQgICAgICRzY29wZS5yZW5kZXJIdG1sID0gZnVuY3Rpb24gKGh0bWxDb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gJHNjZS50cnVzdEFzSHRtbChodG1sQ29kZSk7XG4gICAgICAgIH07XG5cdFx0XHRcdFx0XG5cblx0XHRcdFx0ICAgICB9fSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnbWFpbkFwcCcpLmNvbXBvbmVudCgnb25saW5lVXNlcnMnLFxuXHRcdFx0XHQgICAge3RlbXBsYXRlVXJsOiAnb25saW5ldXNlcnMuaHRtbCcsXG5cdFx0XHRcdCAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlLEluZm8pe1xuXHRcdFx0XHRcdCB0aGlzLkluZm89SW5mbztcblx0XHRcdFx0XHQgICRzY29wZS5pbWdfZmlsZT1mdW5jdGlvbihvKXtyZXR1cm4gXCJpbWcvZ2lybC5qcGdcIjt9O1xuXHRcdFx0XHQgICAgIH19KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdtYWluQXBwJykuY29tcG9uZW50KCdzYW1wbGVUYXNrJyxcblx0XHRcdFx0ICAgIHt0ZW1wbGF0ZVVybDogJ3NhbXBsZXRhc2suaHRtbCcsYmluZGluZ3M6e2RhdGE6XCI9XCJ9LFxuXHRcdFx0XHQgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSxJbmZvLEF1dGgsJGh0dHAsJHRpbWVvdXQpe1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdCB0aGlzLkF1dGg9QXV0aDtcblx0XHRcdFx0XHQgdGhpcy5JbmZvPUluZm87XG5cdFx0XHRcdFx0IHRoaXMuZGVjaWRlZD1mYWxzZTtcblx0XHRcdFx0XHQgdGhpcy5tZXNzYWdlPVwiXCI7XG5cdFx0XHRcdFx0IC8vY29uc29sZS5sb2codGhpcyk7XG5cdFx0XHRcdFx0ICAvL2NvbnNvbGUubG9nKHRoaXMuZGF0YSk7XG5cdFx0XHRcdFx0IHZhciBjb250cm9sbGVyPXRoaXM7XG5cdFx0XHRcdFx0IHZhciByZXE9e307XG5cdFx0XHRcdFxuXHRcdFx0XHRcdC8vIHJlcS5pZD1jb250cm9sbGVyLmRhdGEuaWQ7XG5cdFx0XHRcdFx0IHJlcS5pbmZvPXt9O1xuXHRcdFx0XHRcdC8vIHJlcS5uYW1lPWNvbnRyb2xsZXIuZGF0YS5uYW1lO1xuXHRcdFx0XHRcdCByZXEudG9ja2VuPUF1dGgudG9ja2VuO1xuXHRcdFx0XHRcdCB0aGlzLmRhdGFfc2V0PWZhbHNlO1xuXHRcdFx0XHQgICAgICAgICB0aGlzLiRvbkNoYW5nZXM9ZnVuY3Rpb24oKXtcblx0XHRcdFx0XHQgICAgIGlmICgoY29udHJvbGxlci5kYXRhX3NldD09ZmFsc2UpJiZcblx0XHRcdFx0XHRcdCAoXCJkYXRhXCIgaW4gY29udHJvbGxlcikpe1xuXHRcdFx0XHRcdFx0IGNvbnRyb2xsZXIuZGF0YV9zZXQ9dHJ1ZTtcblx0XHRcdFx0XHRcdCByZXEubmFtZT1jb250cm9sbGVyLmRhdGEubmFtZTtcblx0XHRcdFx0XHRcdCByZXEuaWQ9Y29udHJvbGxlci5kYXRhLmlkO1xuXHRcdFx0XHRcdFx0IGNvbnNvbGUubG9nKGNvbnRyb2xsZXIuZGF0YSk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHQgfTtcblx0XHRcdFx0XHQgIHRoaXMuYWNjZXB0PWZ1bmN0aW9uKCl7aWYgKCFjb250cm9sbGVyLmRlY2lkZWQpIHtcblx0XHRcdFx0XHQgICAgIGNvbnRyb2xsZXIuZGVjaWRlZD10cnVlO1xuXHRcdFx0XHRcdCAgICAgXG5cdFx0XHRcdFx0ICAgICBcblx0XHRcdFx0XHQgICAgIHJlcS5tZXRob2Q9XCJhY2NlcHRcIjtcblx0XHRcdFx0XHQgICAgIFxuXHRcdFx0XHRcdCAgICAgY29uc29sZS5sb2coXCJhY2NlcHRcIik7XG5cdFx0XHRcdFx0ICAgICBjb25zb2xlLmxvZyhyZXEpO1xuXHRcdFx0XHRcdCAgICAgJGh0dHAoIHttZXRob2Q6XCJQT1NUXCIsdXJsOlwiL3VwZGF0ZV9ldmVudFwiLGRhdGE6IHJlcX1cbiAgICAgICAgIFxuXHRcdFx0XHRcdFx0ICApLnRoZW4oZnVuY3Rpb24ocmVzKXtcblx0XHRcdFx0XHRcdCAgICAgIGNvbnRyb2xsZXIubWVzc2FnZT1yZXMuZGF0YS5tZXNzYWdlO1xuXHRcdFx0XHRcdFx0ICAgICAgY29uc29sZS5sb2coXCJzdWNjZXNzXCIpO1xuXHRcdFx0XHRcdFx0ICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuXHRcdFx0XHRcdFx0ICAgICAgIGNvbnRyb2xsZXIubWVzc2FnZT1yZXMuZGF0YS5tZXNzYWdlO1xuXHRcdFx0XHRcdFx0ICAgICAgIGNvbnRyb2xsZXIubWVzc2FnZT1yZXMuZGF0YVtcIm1lc3NhZ2VcIl07XG5cdFx0IGNvbnRyb2xsZXIubWVzc2FnZV92aXNpYmxlPXRydWU7XG5cdC8vXHQgJHRpbWVvdXQoZnVuY3Rpb24oKXtjb250cm9sbGVyLm1lc3NhZ2VfdmlzaWJsZT1mYWxzZTtcblxuXHQvL1x0XHRcdCB9LDcwMDApO1xuXHRcdFx0XHRcdFx0ICAgICAgXG5cblx0XHRcdFx0XHRcdCAgfSxmdW5jdGlvbihyZXMpe1xuXHRcdFx0XHRcdFx0ICAgICAgY29uc29sZS5sb2coXCJ1bnN1Y2Nlc3NmdWxcIik7XG5cdFx0XHRcdFx0XHQgICAgICBjb250cm9sbGVyLmRlY2lkZWQ9ZmFsc2U7XG5cblx0XHRcdFx0XHRcdCAgfSk7XG5cblx0XHRcdFx0XHQgfX07XG5cdFx0XHRcdFx0IHRoaXMucmVqZWN0PWZ1bmN0aW9uKCl7aWYgKCFjb250cm9sbGVyLmRlY2lkZWQpIHtcblx0XHRcdFx0XHQgICAgIGNvbnRyb2xsZXIuZGVjaWRlZD10cnVlO1xuXHRcdFx0XHRcdCAgICAgICAgIHZhciByZXE9e307XG5cdFx0XHRcdFx0ICAgIFxuXHRcdFx0XHRcdCAgICAgcmVxLm1ldGhvZD1cInJlamVjdFwiO1xuXHRcdFx0XHRcdCAgICAgcmVxLnRvY2tlbj1BdXRoLnRvY2tlbjtcblx0XHRcdFx0XHQgICAgIHJlcS5pbmZvPXt9O1xuXHRcdFx0XHRcdCAgICAgIHJlcS5uYW1lPWNvbnRyb2xsZXIuZGF0YS5uYW1lO1xuXHRcdFx0XHRcdFx0IHJlcS5pZD1jb250cm9sbGVyLmRhdGEuaWQ7XG5cdFx0XHRcdFx0ICAgICBjb25zb2xlLmxvZyhcInJlamVjdFwiKTtcblx0XHRcdFx0XHQgICAgIGNvbnNvbGUubG9nKHJlcSk7XG5cdFx0XHRcdFx0ICAgICAkaHR0cCgge21ldGhvZDpcIlBPU1RcIix1cmw6XCIvdXBkYXRlX2V2ZW50XCIsZGF0YTogcmVxfVxuICAgICAgICAgXG5cdFx0XHRcdFx0XHQgICkudGhlbihmdW5jdGlvbihyZXMpe1xuXHRcdFx0XHRcdFx0ICAgICAgY29uc29sZS5sb2coXCJSZWplY3QgY29ubmVjdGVkIHNlcnZlciB3aXRoIHN1Y2Nlc3NcIik7IGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcblx0XHRcdFx0XHRcdCAgICAgIGNvbnRyb2xsZXIubWVzc2FnZT1yZXMuZGF0YS5tZXNzYWdlO1xuXHRcdFx0XHRcdFx0ICAgICAgIGNvbnRyb2xsZXIubWVzc2FnZT1yZXMuZGF0YVtcIm1lc3NhZ2VcIl07XG5cdFx0IGNvbnRyb2xsZXIubWVzc2FnZV92aXNpYmxlPXRydWU7XG5cdC8vXHQgJHRpbWVvdXQoZnVuY3Rpb24oKXtjb250cm9sbGVyLm1lc3NhZ2VfdmlzaWJsZT1mYWxzZTtcblxuXHQvL1x0XHRcdCB9LDcwMDApO1xuXG5cdFx0XHRcdFx0XHQgIH0sZnVuY3Rpb24ocmVzKXtcblx0XHRcdFx0XHRcdCAgICAgIGNvbnNvbGUubG9nKFwidW5zdWNjZXNzZnVsXCIpO1xuXHRcdFx0XHRcdFx0ICAgICAgY29udHJvbGxlci5kZWNpZGVkPWZhbHNlO1xuXG5cdFx0XHRcdFx0XHQgIH0pO1xuXG5cdFx0XHRcdFx0IH19O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcdFx0XHRcdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMudGV4dD1JbmZvLnRhc2tzICAgXG5cdFx0XHRcdCAgICAgfX0pO1xuXG5cbiIsImFuZ3VsYXIubW9kdWxlKCdtYWluQXBwJykuY29tcG9uZW50KCdzYXlTb21ldGhpbmcnLFxuXHRcdFx0XHQgICAge3RlbXBsYXRlVXJsOiAnc2F5c29tZXRoaW5nLmh0bWwnLFxuXHRcdFx0XHQgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSxJbmZvLEF1dGgsJGh0dHAsJHRpbWVvdXQpe1xuXHRcdFx0XHRcdFxuXG4gdmFyIGNvbnRyb2xsZXI9dGhpcztcblx0XHRcdFx0XHQgdGhpcy5JbmZvPUluZm87XG5cdFx0XHRcdFx0IHRoaXMuQXV0aD1BdXRoO1xuXHRcdFx0XHRcdCAvL3RoaXMuZGF0YT17fTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQgJHNjb3BlLiRvbignYXV0aG9yaXplZCcsZnVuY3Rpb24oKXtcblx0XHRcdFx0XHQgICAgIC8vY29udHJvbGxlci5kYXRhLmE9IEF1dGgudXNlcjtcblx0XHRcdFx0XHQgICAgLy8gY29uc29sZS5sb2coXCJzYXkgU29tZXRoIGE6XCIrY29udHJvbGxlci5kYXRhLmEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJbmZvLmxvZ2luX3VwZGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkpTT04gSU5GTzogXCIrSW5mby5hbGxfZXZlbnRzKTtcblx0XHQgICAgICAvL2NvbnNvbGUubG9nKFwiSlNPTiBJTkZPIEVWRU5UUyBcIityZXMuZGF0YS5pbmZvLmV2ZW50cylcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHQgICAgdGhpcy5zdWJtaXQ9ZnVuY3Rpb24oc29tZXRoaW5nKXtcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXCJTdWJtaXR0ZWRcIik7XG5cdFx0XHRcdFx0XHRcdC8vY29uc29sZS5sb2codGhpcy5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlcT17fTtcblx0XHRcdFx0XHRcdFx0cmVxLnRvY2tlbj1BdXRoLnRvY2tlbjtcblx0XHRcdFx0XHRcdFx0cmVxLmhhc2g9XCJzYXlTb21ldGhpbmdcIjtcblx0XHRcdFx0XHRcdFx0c29tZXRoaW5nLmE9QXV0aC51c2VyO1xuXHRcdFx0XHRcdFx0XHRyZXEuZGF0YT1zb21ldGhpbmc7XG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKHJlcSk7XG5cdFx0XHRcdFx0XHRcdFx0JGh0dHAoIHttZXRob2Q6XCJQT1NUXCIsdXJsOlwiL3JlZ2lzdGVyX2V2ZW50XCIsZGF0YTogcmVxfVxuICAgICAgICAgKS50aGVuKGZ1bmN0aW9uKHJlcyl7XG5cdFx0XHRcdFx0IGNvbnNvbGUubG9nKFwicmVzOlwiKTtcblx0XHRcdFx0XHQgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuXHRcdFx0XHRcdFx0XHRcdFx0IFxuXHQgICAgIGlmIChyZXMuZGF0YVtcIm1lc3NhZ2VcIl0pe1xuXHRcdCBjb250cm9sbGVyLm1lc3NhZ2U9cmVzLmRhdGFbXCJtZXNzYWdlXCJdO1xuXHRcdCBjb250cm9sbGVyLm1lc3NhZ2VfdmlzaWJsZT10cnVlO1xuXHRcdCAkdGltZW91dChmdW5jdGlvbigpe2NvbnRyb2xsZXIubWVzc2FnZV92aXNpYmxlPWZhbHNlO1xuXG5cdFx0XHRcdCB9LDMwMDApO1xuXG5cdFx0XHRcdFx0IH1cblx0Ly9cdCBzZXJ2aWNlLmFsbF9ldmVudHM9cmVzLmRhdGEuaW5mby5ldmVudHM7XG5cdC8vXHQgc2VydmljZS5yZXNvdXJjZXM9cmVzLmRhdGEuaW5mby5yZXNvdXJjZXM7XG5cdFx0IFxuXHRcdFx0XHRcdFx0XHRcdCAgICAgfVxuXHRcdCAgICAsZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImxvZ2luX3VwZGF0ZSBmYWlsZWRcIik7XG5cdFx0XG5cdFx0ICAgIH0pO307XG5cdFx0XHRcdCAgICAgfVxuXG5cblx0XHRcdFx0XHQgXG5cdFx0XHRcdCAgICB9XG5cblx0XHRcdFx0ICAgKTtcbiIsImFuZ3VsYXIubW9kdWxlKCdtYWluQXBwJykuY29tcG9uZW50KCdzaW1wbGVOb3RpZicsXG5cdFx0XHRcdCAgICB7dGVtcGxhdGVVcmw6ICdzaW1wbGVub3RpZi5odG1sJyxiaW5kaW5nczp7ZGF0YTpcIj1cIn0sXG5cdFx0XHRcdCAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlLEluZm8sQXV0aCwkaHR0cCwkdGltZW91dCl7XG5cdFx0XHRcdFx0IGNvbnNvbGUubG9nKFwic2ltcGxlLW5vdGlmXCIpO1xuXHRcdFx0XHRcdCB0aGlzLkF1dGg9QXV0aDtcblx0XHRcdFx0XHQgdGhpcy5JbmZvPUluZm87XG5cdFx0XHRcdFx0IHRoaXMuZGVjaWRlZD1mYWxzZTtcblx0XHRcdFx0XHQgdGhpcy5tZXNzYWdlPVwiXCI7XG5cdFx0XHRcdFx0IC8vY29uc29sZS5sb2codGhpcyk7XG5cdFx0XHRcdFx0ICAvL2NvbnNvbGUubG9nKHRoaXMuZGF0YSk7XG5cdFx0XHRcdFx0IHZhciBjb250cm9sbGVyPXRoaXM7XG5cdFx0XHRcdFx0IHZhciByZXE9e307XG5cdFx0XHRcdFxuXHRcdFx0XHRcdC8vIHJlcS5pZD1jb250cm9sbGVyLmRhdGEuaWQ7XG5cdFx0XHRcdFx0IHJlcS5pbmZvPXt9O1xuXHRcdFx0XHRcdC8vIHJlcS5uYW1lPWNvbnRyb2xsZXIuZGF0YS5uYW1lO1xuXHRcdFx0XHRcdCByZXEudG9ja2VuPUF1dGgudG9ja2VuO1xuXHRcdFx0XHRcdCB0aGlzLmRhdGFfc2V0PWZhbHNlO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHQgICAgICAgICB0aGlzLiRvbkNoYW5nZXM9ZnVuY3Rpb24oKXtcblx0XHRcdFx0XHQgICAgIGlmICgoY29udHJvbGxlci5kYXRhX3NldD09ZmFsc2UpJiZcblx0XHRcdFx0XHRcdCBjb250cm9sbGVyLmhhc093blByb3BlcnR5KCdkYXRhJykmJlxuXHRcdFx0XHRcdFx0IGNvbnRyb2xsZXIuZGF0YSE9dW5kZWZpbmVkKXtcblx0XHRcdFx0XHRcdCAgY29udHJvbGxlci5kYXRhLnNlZW49ZmFsc2U7XG5cdFx0XHRcdFx0XHQgY29uc29sZS5sb2coXCJkYXRhIGRlZmluZWQhXCIpO1xuXHRcdFx0XHRcdFx0IGNvbnNvbGUubG9nKGNvbnRyb2xsZXIuZGF0YSk7XG5cdFx0XHRcdFx0XHQgY29udHJvbGxlci5kYXRhX3NldD10cnVlO1xuXHRcdFx0XHRcdFx0IHJlcS5uYW1lPWNvbnRyb2xsZXIuZGF0YS5uYW1lO1xuXHRcdFx0XHRcdFx0IHJlcS5pZD1jb250cm9sbGVyLmRhdGEuaWQ7XG5cdFx0XHRcdFx0XHQgY29uc29sZS5sb2coY29udHJvbGxlci5kYXRhKTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdCB9O1xuXHRcdFx0XHRcdCAgdGhpcy5hY2NlcHQ9ZnVuY3Rpb24oKXtpZiAoIWNvbnRyb2xsZXIuZGVjaWRlZCkge1xuXHRcdFx0XHRcdCAgICAgY29udHJvbGxlci5kZWNpZGVkPXRydWU7XG5cdFx0XHRcdFx0ICAgICBcblx0XHRcdFx0XHQgICAgIFxuXHRcdFx0XHRcdCAgICAgcmVxLm1ldGhvZD1cInNlZW5cIjtcblx0XHRcdFx0XHQgICAgIFxuXHRcdFx0XHRcdCAgICAgY29uc29sZS5sb2coXCJhY2NlcHRcIik7XG5cdFx0XHRcdFx0ICAgICBjb25zb2xlLmxvZyhyZXEpO1xuXHRcdFx0XHRcdCAgICAgJGh0dHAoIHttZXRob2Q6XCJQT1NUXCIsdXJsOlwiL3VwZGF0ZV9ldmVudFwiLGRhdGE6IHJlcX1cbiAgICAgICAgIFxuXHRcdFx0XHRcdFx0ICApLnRoZW4oZnVuY3Rpb24ocmVzKXtcblx0XHRcdFx0XHRcdCAgICAgIGNvbnRyb2xsZXIubWVzc2FnZT1yZXMuZGF0YS5tZXNzYWdlO1xuXHRcdFx0XHRcdFx0ICAgICAgY29uc29sZS5sb2coXCJzdWNjZXNzXCIpO1xuXHRcdFx0XHRcdFx0ICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuXHRcdFx0XHRcdFx0ICAgICAgIGNvbnRyb2xsZXIubWVzc2FnZT1yZXMuZGF0YS5tZXNzYWdlO1xuXHRcdFx0XHRcdFx0ICAgICAgIGNvbnRyb2xsZXIubWVzc2FnZT1yZXMuZGF0YVtcIm1lc3NhZ2VcIl07XG5cdFx0XHRcdFx0XHQgICAgICBjb250cm9sbGVyLm1lc3NhZ2VfdmlzaWJsZT10cnVlO1xuXHRcdFx0XHRcdFx0ICAgIFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtjb250cm9sbGVyLmRhdGEuc2Vlbj10cnVlO1xuXG5cdFx0XHRcdCB9LDcwMDApO1xuXHQvL1x0ICR0aW1lb3V0KGZ1bmN0aW9uKCl7Y29udHJvbGxlci5tZXNzYWdlX3Zpc2libGU9ZmFsc2U7XG5cblx0Ly9cdFx0XHQgfSw3MDAwKTtcblx0XHRcdFx0XHRcdCAgICAgIFxuXG5cdFx0XHRcdFx0XHQgIH0sZnVuY3Rpb24ocmVzKXtcblx0XHRcdFx0XHRcdCAgICAgIGNvbnNvbGUubG9nKFwidW5zdWNjZXNzZnVsXCIpO1xuXHRcdFx0XHRcdFx0ICAgICAgY29udHJvbGxlci5kZWNpZGVkPWZhbHNlO1xuXG5cdFx0XHRcdFx0XHQgIH0pO1xuXG5cdFx0XHRcdFx0IH19O1xuXHRcdFx0XHRcdCB0aGlzLnJlamVjdD1mdW5jdGlvbigpe2lmICghY29udHJvbGxlci5kZWNpZGVkKSB7XG5cdFx0XHRcdFx0ICAgICBjb250cm9sbGVyLmRlY2lkZWQ9dHJ1ZTtcblx0XHRcdFx0XHQgICAgICAgICB2YXIgcmVxPXt9O1xuXHRcdFx0XHRcdCAgICBcblx0XHRcdFx0XHQgICAgIHJlcS5tZXRob2Q9XCJyZWplY3RcIjtcblx0XHRcdFx0XHQgICAgIHJlcS50b2NrZW49QXV0aC50b2NrZW47XG5cdFx0XHRcdFx0ICAgICByZXEuaW5mbz17fTtcblx0XHRcdFx0XHQgICAgICByZXEubmFtZT1jb250cm9sbGVyLmRhdGEubmFtZTtcblx0XHRcdFx0XHRcdCByZXEuaWQ9Y29udHJvbGxlci5kYXRhLmlkO1xuXHRcdFx0XHRcdCAgICAgY29uc29sZS5sb2coXCJyZWplY3RcIik7XG5cdFx0XHRcdFx0ICAgICBjb25zb2xlLmxvZyhyZXEpO1xuXHRcdFx0XHRcdCAgICAgJGh0dHAoIHttZXRob2Q6XCJQT1NUXCIsdXJsOlwiL3VwZGF0ZV9ldmVudFwiLGRhdGE6IHJlcX1cbiAgICAgICAgIFxuXHRcdFx0XHRcdFx0ICApLnRoZW4oZnVuY3Rpb24ocmVzKXtcblx0XHRcdFx0XHRcdCAgICAgIGNvbnNvbGUubG9nKFwiUmVqZWN0IGNvbm5lY3RlZCBzZXJ2ZXIgd2l0aCBzdWNjZXNzXCIpOyBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG5cdFx0XHRcdFx0XHQgICAgICBjb250cm9sbGVyLm1lc3NhZ2U9cmVzLmRhdGEubWVzc2FnZTtcblx0XHRcdFx0XHRcdCAgICAgICBjb250cm9sbGVyLm1lc3NhZ2U9cmVzLmRhdGFbXCJtZXNzYWdlXCJdO1xuXHRcdCBjb250cm9sbGVyLm1lc3NhZ2VfdmlzaWJsZT10cnVlO1xuXHRcdFx0XHRcdFx0IFxuXG5cdFx0XHRcdFx0XHQgIH0sZnVuY3Rpb24ocmVzKXtcblx0XHRcdFx0XHRcdCAgICAgIGNvbnNvbGUubG9nKFwidW5zdWNjZXNzZnVsXCIpO1xuXHRcdFx0XHRcdFx0ICAgICAgY29udHJvbGxlci5kZWNpZGVkPWZhbHNlO1xuXG5cdFx0XHRcdFx0XHQgIH0pO1xuXG5cdFx0XHRcdFx0IH19O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcdFx0XHRcdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMudGV4dD1JbmZvLnRhc2tzICAgXG5cdFx0XHRcdCAgICAgfX0pO1xuXG4iLCJhbmd1bGFyLm1vZHVsZSgnbWFpbkFwcCcpLmNvbXBvbmVudCgndGFza3MnLFxuXHRcdFx0XHQgICAge3RlbXBsYXRlVXJsOiAndGFza3MuaHRtbCcsXG5cdFx0XHRcdCAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlLEluZm8sQXV0aCl7XG5cdFx0XHRcdFx0IHRoaXMuQXV0aD1BdXRoO1xuXHRcdFx0XHRcdCB0aGlzLkluZm89SW5mbztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXHRcdFx0XHQgICAgIH19KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdtYWluQXBwJykuY29tcG9uZW50KCd1c2VyU3RhdHVzJyxcblx0XHRcdFx0ICAgIHt0ZW1wbGF0ZVVybDogJ3N0YXR1cy5odG1sJyxcblx0XHRcdFx0ICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUsQXV0aCxJbmZvKXtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQgdGhpcy51c2VybmFtZT1cInVua25vd25cIjtcblx0XHRcdFx0XHQgdGhpcy5BdXRoPUF1dGg7XG5cdFx0XHRcdFx0IHRoaXMuSW5mbz1JbmZvO1xuXHRcdFx0XHRcdCB2YXIgY29udHJvbGxlcj10aGlzO1xuXHRcdFx0XHRcdCAkc2NvcGUuJG9uKCdhdXRob3JpemVkJyxmdW5jdGlvbigpe1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgY29uc29sZS5sb2coXCJjb21wb25lbnQga25vd3MgaXQgaXMgYXV0aG9yaXplZFwiKTtcblx0XHRcdFx0XHQgICAgY29udHJvbGxlci51c2VybmFtZT1BdXRoLnVzZXI7XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCAgfSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0IH19KTtcbiIsImFwcC5maWx0ZXIoXCJ0cnVzdFwiLCBbJyRzY2UnLCBmdW5jdGlvbigkc2NlKSB7XG4gIHJldHVybiBmdW5jdGlvbihodG1sQ29kZSl7XG4gICAgcmV0dXJuICRzY2UudHJ1c3RBc0h0bWwoaHRtbENvZGUpO1xuICB9O1xufV0pO1xuYXBwLmNvbnRyb2xsZXIoJ2Jhc2ljJyxmdW5jdGlvbiAoJHJvb3RTY29wZSwkc2NvcGUsJGh0dHAsQXV0aCxJbmZvLCRzY2Upe1xuICAgIC8vIEluZm8udXBkYXRlKCk7XG4gICAgJHNjb3BlLnJlbmRlckh0bWwgPSBmdW5jdGlvbiAoaHRtbENvZGUpIHtcbiAgICAgICAgICAgIHJldHVybiAkc2NlLnRydXN0QXNIdG1sKGh0bWxDb2RlKTtcbiAgICAgICAgfTtcbiAgICB2YXIgbW91c2Vpbj17XCJ0YXNrc1wiOmZhbHNlLFwiYWN0aW9uc1wiOmZhbHNlLFwiZXZlbnRzXCI6ZmFsc2V9O1xuICAgICRzY29wZS5tb3VzZXRvZ2dsZT1mdW5jdGlvbihzKXttb3VzZWluW3NdPSFtb3VzZWluW3NdO307XG4gICAgXG4gICAgJHNjb3BlLmJhY2tncm91bmQ9ZnVuY3Rpb24ocyl7XG5cdGlmIChtb3VzZWluW3NdKSByZXR1cm4gXCIjZmNmXCI7XG5cdGlmICgkc2NvcGUuc2hvdz09cykgcmV0dXJuIFwiIzBhYVwiOyBlbHNlIHJldHVybiBcIiNjZmNcIjtcbiAgICB9O1xuICAgICRzY29wZS53b3JraW5nPVwiPHNwYW4+IEFuZ3VsYXJKUyA8L3NwYW4+XCI7XG4gICBcbiAgICAkc2NvcGUuQXV0aD1BdXRoO1xuICAgICRzY29wZS5JbmZvPUluZm87XG4gICAgJHNjb3BlLmNyZWRlbnRpYWxzPXt9O1xuICAgICRzY29wZS5sb2dpbj1mdW5jdGlvbiAoY3JlZGVudGlhbHMpe2NvbnNvbGUubG9nKFwic3VibWl0dGVkIFwiICsgY3JlZGVudGlhbHMudXNlcm5hbWUpO1xuXHRcdFx0XHRcdGlmIChBdXRoLmF1dGhlbnRpY2F0ZShjcmVkZW50aWFscy51c2VybmFtZSxjcmVkZW50aWFscy5wYXNzd29yZCkpICRyb290U2NvcGUuJGJyb2FkY2FzdCgnYXV0aG9yaXplZCcpOyAgICAgIC8vJHNjb3BlLmF1dGhvcml6ZWQ9QXV0aC5hdXRob3JpemVkO1xuICAgICAgICAgICAgICRzY29wZS5zaG93PVwiYWN0aW9uc1wiO1x0XHRcdCAgICAgICAgICAgICAgIFxuXHRcdFx0XHQgICAgICAgfTtcbiAgIC8vICRzY29wZS4kb24oJ2F1dGhvcml6ZWQnLGZ1bmN0aW9uKCl7JHNjb3BlLmF1dGhvcml6ZWQ9dHJ1ZTsgY29uc29sZS5sb2coXCIkc2NvcGUuYXV0aG9yaXplZFwiLCRzY29wZS5hdXRob3JpemVkKTt9KTtcbiAgICBcbn0pO1xuYXBwLmNvbnRyb2xsZXIoJ2Jhc2ljMicsZnVuY3Rpb24gKCRzY29wZSwkaHR0cCl7XG4gICAgJHNjb3BlLndvcmtpbmc9XCJBbmd1bGFySlMyXCI7XG4gICAgXG59KTtcblxuIiwiXG5jb25zb2xlLmxvZyhcImhlcmUgcHVibGljIVwiKTtcbmFwcD1hbmd1bGFyLm1vZHVsZSgnbWFpbkFwcCcsW10pO1xubWVzc2FnZT1cIm1lc3NhYWFhZ2VcIjtcbnJlcXVpcmUoXCIuL3NlcnZpY2UvYXV0aC5qc1wiKTtcbnJlcXVpcmUoXCIuL3NlcnZpY2UvaW5mby5qc1wiKTtcbnJlcXVpcmUoXCIuL2NvbnRyb2xsZXIvYmFzaWMuanNcIik7XG5yZXF1aXJlKFwiLi9jb21wb25lbnQvdXNlcnN0YXR1cy5qc1wiKTtcbnJlcXVpcmUoXCIuL2NvbXBvbmVudC9vbmxpbmV1c2Vycy5qc1wiKTtcbnJlcXVpcmUoXCIuL2NvbXBvbmVudC9jdXJyZW50YWZmYWlycy5qc1wiKTtcbnJlcXVpcmUoXCIuL2NvbXBvbmVudC9zYXlzb21ldGhpbmcuanNcIik7XG5yZXF1aXJlKFwiLi9jb21wb25lbnQvYmV0c29tZXRoaW5nLmpzXCIpO1xucmVxdWlyZShcIi4vY29tcG9uZW50L3Rhc2tzLmpzXCIpO1xucmVxdWlyZShcIi4vY29tcG9uZW50L3NhbXBsZXRhc2suanNcIik7XG5yZXF1aXJlKFwiLi9jb21wb25lbnQvc2ltcGxlbm90aWYuanNcIik7XG5yZXF1aXJlKFwiLi9jb21wb25lbnQvbG9jYXRpb25zLmpzXCIpO1xucmVxdWlyZShcIi4vY29tcG9uZW50L2xvY2F0aW9uLmpzXCIpO1xucmVxdWlyZShcIi4vY29tcG9uZW50L2V2ZW50LmpzXCIpO1xuLy8gYnJvd3NlcmlmeSBjb21tYW5kOiBicm93c2VyaWZ5IC0tZGVidWcgbWFpbmFwcC5qcyAtbyBidW5kbGUuanNcblxuIiwiY29uc29sZS5sb2coXCJBdXRoIHN0YXJ0ZWRcIik7XG5jb25zb2xlLmxvZyhcIkhFUkUgXCIgK21lc3NhZ2UrIFwiIC5cIik7XG5hcHAuc2VydmljZSgnQXV0aCcsZnVuY3Rpb24oJGh0dHAsJHJvb3RTY29wZSl7XG4gICAgdGhpcy5hdXRob3JpemVkPWZhbHNlO1xuICAgIHZhciBzZXJ2aWNlPXRoaXM7XG4gICAgc2VydmljZS51c2VyPVwiXCI7XG4gICAgdGhpcy5hdXRoZW50aWNhdGU9ZnVuY3Rpb24odXNlcixwYXNzKXtcblx0Ly8kaHR0cC5kZWZhdWx0cy5oZWFkZXJzLnBvc3RbXCJDb250ZW50LVR5cGVcIl0gPSBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiO1xuXHQkaHR0cCh7bWV0aG9kOlwiUE9TVFwiLHVybDogJy9sb2dpbicsIGRhdGE6e1widXNlclwiOnVzZXIsXCJwYXNzXCI6cGFzc31cbiAgICAgICAgICAgICAgIFxuXHQgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlcyl7XG5cdFx0ICBjb25zb2xlLmxvZyhcInNlcnZlciByZXNwb25kZWRcIiwgcmVzKTtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG5cdFx0ICAgICAgY29uc29sZS5sb2coXCJsb2dpbiBzdWNjZXNzZnVsIFwiK3Jlcy5kYXRhLnRvY2tlbik7XG5cdFx0ICAgICAgc2VydmljZS5hdXRob3JpemVkPXRydWU7XG5cdFx0ICAgICAgc2VydmljZS50b2NrZW49cmVzLmRhdGEudG9ja2VuO1xuXHRcdCAgICAgIHNlcnZpY2UudXNlcj11c2VyO1xuXHRcdCAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnYXV0aG9yaXplZCcpO1xuICAgICAgICAgIFx0XHQgIH0gZWxzZXtcblx0XHQgICAgICBjb25zb2xlLmxvZyhcImludmFsaWQgdXNlcm5hbWUgb3IgcGFzc3dvcmRcIik7XG5cdFx0ICB9XG5cdCAgICAgIH0sIGZ1bmN0aW9uKHJlcyl7fSk7XG5cdFx0XHQvL1x0ICBpZiAodXNlcj09XCJhcm1pblwiICYmIHBhc3M9PVwiMTIzNFwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLmF1dGhvcml6ZWQ9dHJ1ZTtcblx0XHRcdFx0ICAgICAgXG5cdFx0XHQvL1x0ICAgICAgdGhpcy51c2VyPVwiYXJtaW5cIjtcblx0XHRcdC8vXHQgICAgICB0aGlzLnJlc291cmNlcz17fTtcblx0XHRcdC8vXHQgICAgICB0aGlzLnJlc291cmNlcy5tb25leT01MDtcblx0XHRcdC8vXHQgICAgICB0aGlzLnJlc291cmNlcy50aW1lPTEwMDtcblx0XHRcdC8vXHQgICAgICB0aGlzLnJlc291cmNlcy5yZXA9MTA7XG5cdFx0XHQvL1x0ICAgICAgY29uc29sZS5sb2coXCJsb2dnZWQgaW5cIik7XG5cdFx0XHQvL1x0ICAgICAgcmV0dXJuIHRydWU7XG5cdFx0XHQvL1x0ICB9XG5cdFx0XHRcdCAgcmV0dXJuIGZhbHNlO1xuXHRcdFx0ICAgICAgfTtcblxufSk7XG4iLCJhcHAuc2VydmljZSgnSW5mbycsZnVuY3Rpb24oJGh0dHAsJHRpbWVvdXQsQXV0aCwkcm9vdFNjb3BlKXtcblxuICAgIHZhciBzZXJ2aWNlPXRoaXM7XG4gICAgc2VydmljZS5vbmxpbmVfcGxheWVycz17fTtcbiAgICBzZXJ2aWNlLnJlc291cmNlcz17fTtcbiAgICBzZXJ2aWNlLmFsbF9wbGF5ZXJzPVtdO1xuICAgIHNlcnZpY2UuYWxsX2V2ZW50cz1bXTtcbiAgICBzZXJ2aWNlLmFsbF90YXNrcz1bXTtcbiAgICBzZXJ2aWNlLmxvY2F0aW9ucz1bXTtcbiAgICBzZXJ2aWNlLmdyb3Vwcz1bXTtcbiAgICBzZXJ2aWNlLmxvZ2luX3VwZGF0ZT1mdW5jdGlvbigpe1xuXHRpZiAoIUF1dGguYXV0aG9yaXplZCkge2NvbnNvbGUubG9nKFwibG9naW5fdXBkYXRlIG5vdCBwb3NzaWJsZSBub3QgbG9nZ2VkIGluXCIpOyByZXR1cm47fVxuXHR2YXIgcmVxPXtcImRvb2Rvb1wiOlwiY2hpY2hpXCJ9O1xuXHRyZXFbXCJ0b2NrZW5cIl09QXV0aC50b2NrZW47XG5cdGNvbnNvbGUubG9nKCdsb2dpbl91cGRhdGUgaXMgY29ubmVjdGluZyBzZXJ2ZXInKTtcblx0JGh0dHAoIHttZXRob2Q6XCJQT1NUXCIsdXJsOlwiL2xvZ2luSW5mb1wiLGRhdGE6IHJlcX1cblxuXHQgICAgICkudGhlbihmdW5jdGlvbihyZXMpe1xuXHRcdCBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG5cblx0XHQgc2VydmljZS5hbGxfZXZlbnRzPXJlcy5kYXRhLmluZm8uZXZlbnRzO1xuXHRcdCBzZXJ2aWNlLnJlc291cmNlcz1yZXMuZGF0YS5pbmZvLnJlc291cmNlcztcblx0XHQgc2VydmljZS50YXNrcz1yZXMuZGF0YS5pbmZvLnRhc2tzO1xuXHRcdCBzZXJ2aWNlLmxvY2F0aW9ucz1yZXMuZGF0YS5pbmZvLmxvY2F0aW9ucztcbiAgICAgICAgICAgICAgICAgc2VydmljZS5ncm91cHM9cmVzLmRhdGEuaW5mby5ncm91cHM7XG5cblxuXG5cdFx0IGNvbnNvbGUubG9nKFwidGFza3NcIik7XG5cdFx0IGNvbnNvbGUubG9nKHNlcnZpY2UudGFza3MpO1xuXHQgICAgIH1cblx0XHQgICAgLGZ1bmN0aW9uKHJlcyl7XG5cdFx0XHRjb25zb2xlLmxvZyhcImxvZ2luX3VwZGF0ZSBmYWlsZWRcIik7XG5cblx0XHQgICAgfSk7fTtcbiAgICB2YXIgdXBkYXRlPWZ1bmN0aW9uKCl7XG5cdHJlcT17XCJkb29kb29cIjpcImNoaWNoaVwifTtcblx0aWYgKEF1dGguYXV0aG9yaXplZCkgcmVxW1widG9ja2VuXCJdPUF1dGgudG9ja2VuO1xuXHRjb25zb2xlLmxvZygnSW5mbyBpcyBjb25uZWN0aW5nIHNlcnZlcicpO1xuXHQkaHR0cCgge21ldGhvZDpcIlBPU1RcIix1cmw6XCIvdXBkYXRlXCIsZGF0YTogcmVxfVxuXG5cdCAgICAgKS50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidXBkYXRpbmcuLi5cIik7XG5cdFx0IGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcblxuXHRcdCBjb25zb2xlLmxvZyhcImVuZFwiKTtcblx0XHQgaWYgKHJlcy5kYXRhIT09bnVsbCl7XG5cdFx0ICAgICBjb25zb2xlLmxvZyhcIm5vdCBudWxsXCIpO1xuXG5cdFx0ICAgICBpZiAoXCJpbmZvXCIgaW4gcmVzLmRhdGEpIHtcblx0XHRcdCBjb25zb2xlLmxvZyhyZXMuZGF0YS5pbmZvLmV2ZW50cyk7XG5cdFx0XHQgIGNvbnNvbGUubG9nKFwibmV3IGxvY2F0aW9uczpcIik7XG5cdFx0ICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhLmluZm8ubG9jYXRpb25zKTtcblx0XHRcdCBzZXJ2aWNlLnJlc291cmNlcz1yZXMuZGF0YS5pbmZvLnJlc291cmNlcztcbiAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlLmdyb3Vwcz1yZXMuZGF0YS5pbmZvLmdyb3Vwcztcblx0XHRcdCAvL3NlcnZpY2UubG9jYXRpb25zPXJlcy5kYXRhLmluZm8ubG9jYXRpb25zO1xuXHRcdFx0IGNvbnNvbGUubG9nKHNlcnZpY2UucmVzb3VyY2VzKTtcblx0XHRcdCB2YXIgbmV3X2V2ZW50cz1yZXMuZGF0YS5pbmZvLmV2ZW50cztcblxuXG5cdFx0XHQgbmV3X2V2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50KXtcblx0XHRcdCAgICAgdmFyIGFscmVhZHk9ZmFsc2U7XG5cdFx0XHQgICAgIHNlcnZpY2UuYWxsX2V2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uKHJlZ2V2ZW50LGluZGV4KXtcblx0XHRcdFx0IGlmIChyZWdldmVudFtcImlkXCJdPT1ldmVudFtcImlkXCJdKXtcblx0XHRcdFx0ICAgICBzZXJ2aWNlLmFsbF9ldmVudHNbaW5kZXhdPWV2ZW50O1xuXHRcdFx0XHQgICAgIGFscmVhZHk9dHJ1ZTt9XG5cdFx0XHQgICAgIH0pO1xuXHRcdFx0ICAgICBpZiAoIWFscmVhZHkpXG5cdFx0XHRcdCBzZXJ2aWNlLmFsbF9ldmVudHMucHVzaChldmVudCk7IGNvbnNvbGUubG9nKGV2ZW50W1wiaWRcIl0pO30pO1xuXG5cdFx0XHQgcmVzLmRhdGEuaW5mby5sb2NhdGlvbnMuZm9yRWFjaChmdW5jdGlvbihsb2NhdGlvbil7XG5cdFx0XHQgICAgIHZhciBhbHJlYWR5PWZhbHNlO1xuXHRcdFx0ICAgICBzZXJ2aWNlLmxvY2F0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHJlZ2xvY2F0aW9uLGluZGV4KXtcblx0XHRcdFx0IGlmIChyZWdsb2NhdGlvbltcImhhc2hcIl09PWxvY2F0aW9uW1wiaGFzaFwiXSl7XG5cdFx0XHRcdCAgICAgdmFyIG1vcmU9c2VydmljZS5sb2NhdGlvbnNbaW5kZXhdLm1vcmU7XG5cdFx0XHRcdCAgICAgc2VydmljZS5sb2NhdGlvbnNbaW5kZXhdPWxvY2F0aW9uO1xuXHRcdFx0XHQgICAgIHNlcnZpY2UubG9jYXRpb25zW2luZGV4XS5tb3JlPW1vcmU7XG5cdFx0XHRcdCAgICAgY29uc29sZS5sb2coXCJtb3JlIGZyb20gaW5mbyBzZXJ2aWNlOlwiKTtcblx0XHRcdFx0ICAgICBjb25zb2xlLmxvZyhzZXJ2aWNlLmxvY2F0aW9uc1tpbmRleF0pO1xuXHRcdFx0XHQgICAgIGFscmVhZHk9dHJ1ZTt9XG5cdFx0XHQgICAgIH0pO1xuXHRcdFx0ICAgICBpZiAoIWFscmVhZHkpXG5cdFx0XHRcdCBzZXJ2aWNlLmxvY2F0aW9ucy5wdXNoKGxvY2F0aW9uKTsgY29uc29sZS5sb2cobG9jYXRpb25bXCJoYXNoXCJdKTt9KTtcblx0XHRcdCBpZiAocmVzLmRhdGEuaW5mby5sb2NhdGlvbnMubGVuZ3RoID4gMClcblx0XHRcdCB7JHJvb3RTY29wZS4kYnJvYWRjYXN0KCdsb2NhdGlvbl91cGRhdGUnKTtjb25zb2xlLmxvZyhcImxvY2F0aW9uX3VwZGF0ZVwiKTt9XG5cblxuXG5cdFx0XHQgaWYgKE9iamVjdC5rZXlzKHJlcy5kYXRhLmluZm8udGFza3MpLmxlbmd0aD4wICkgY29uc29sZS5sb2coXCJUQVNLUzpcIik7XG5cdFx0XHQgY29uc29sZS5sb2cocmVzLmRhdGEuaW5mby50YXNrcyk7XG5cdFx0XHQgdmFyIG5ld190YXNrcz1yZXMuZGF0YS5pbmZvLnRhc2tzO1xuXHRcdFx0IE9iamVjdC5rZXlzKG5ld190YXNrcykuZm9yRWFjaChmdW5jdGlvbih0YXNrX2lkKXtcblx0XHRcdCAgICAgc2VydmljZS50YXNrc1t0YXNrX2lkXT1uZXdfdGFza3NbdGFza19pZF07IGNvbnNvbGUubG9nKG5ld190YXNrc1t0YXNrX2lkXSk7fSk7XG5cblxuXG5cblxuXG5cdFx0ICAgICB9XG5cdFx0IH1cblxuXHRcdCBzZXJ2aWNlLm9ubGluZV9wbGF5ZXJzPXJlcy5kYXRhLm9ubGluZTskdGltZW91dCh1cGRhdGUsMTAwMDApO30sZnVuY3Rpb24ocmVzKXtcblxuXHRcdCAgICAgY29uc29sZS5sb2coXCJvbmxpbmUgcGxheWVycyB1cGRhdGUgZmFpbGVkXCIpO1xuXHRcdCAgICAgJHRpbWVvdXQodXBkYXRlLDEwMDAwKTt9KTt9O1xuICAgIHVwZGF0ZSgpO1xufSk7XG4iXX0=
