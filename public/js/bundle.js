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
	  var echo=function(){console.log("Echo!");//console.log(element);
			      console.log(element[0]);
			      console.log(element[0].scrollTop);
			      console.log(element[0].scrollHeight);
			      console.log(scope.Info);
			    //  element[0].scrollTop = element[0].scrollHeight;

			     // $timeout(echo,1000);
			     };
	  //echo();
	  $timeout(echo,1000);
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
		    //$scope.Info=Info;
		    $scope.component=this;
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
		    this.wait_for_submit=false;

		    this.send_message=function(){
			var req= {"tocken":Auth.tocken,"hash":"messageToGroup"
				    ,"data":{"message":$scope.message_box
					     ,"group": ":"+controller.data.group }};
			console.log("send_message");
			console.log(req);
			$http.post("/register_event",req);
			component.wait_for_submit=true;
			$timeout(function(){component.wait_for_submit=false;},10000);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Vzci9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNvbXBvbmVudC9iZXRzb21ldGhpbmcuanMiLCJjb21wb25lbnQvY3VycmVudGFmZmFpcnMuanMiLCJjb21wb25lbnQvZXZlbnQuanMiLCJjb21wb25lbnQvbG9jYXRpb24uanMiLCJjb21wb25lbnQvbG9jYXRpb25zLmpzIiwiY29tcG9uZW50L29ubGluZXVzZXJzLmpzIiwiY29tcG9uZW50L3NhbXBsZXRhc2suanMiLCJjb21wb25lbnQvc2F5c29tZXRoaW5nLmpzIiwiY29tcG9uZW50L3NpbXBsZW5vdGlmLmpzIiwiY29tcG9uZW50L3Rhc2tzLmpzIiwiY29tcG9uZW50L3VzZXJzdGF0dXMuanMiLCJjb250cm9sbGVyL2Jhc2ljLmpzIiwibWFpbmFwcC5qcyIsInNlcnZpY2UvYXV0aC5qcyIsInNlcnZpY2UvaW5mby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDektBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImFuZ3VsYXIubW9kdWxlKCdtYWluQXBwJykuY29tcG9uZW50KCdiZXRTb21ldGhpbmcnLFxuXHRcdFx0XHQgICAge3RlbXBsYXRlVXJsOiAnYmV0c29tZXRoaW5nLmh0bWwnLFxuXHRcdFx0XHQgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSxJbmZvLEF1dGgsJGh0dHAsJHRpbWVvdXQpe1xuXHRcdFx0XHRcdFxuXG4gdmFyIGNvbnRyb2xsZXI9dGhpcztcblx0XHRcdFx0XHQgdGhpcy5JbmZvPUluZm87XG5cdFx0XHRcdFx0IHRoaXMuQXV0aD1BdXRoO1xuXHRcdFx0XHRcdCAvL3RoaXMuZGF0YT17fTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQgJHNjb3BlLiRvbignYXV0aG9yaXplZCcsZnVuY3Rpb24oKXtcblx0XHRcdFx0XHQgICAgIC8vY29udHJvbGxlci5kYXRhLmE9IEF1dGgudXNlcjtcblx0XHRcdFx0XHQgICAgLy8gY29uc29sZS5sb2coXCJzYXkgU29tZXRoIGE6XCIrY29udHJvbGxlci5kYXRhLmEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJbmZvLmxvZ2luX3VwZGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkpTT04gSU5GTzogXCIrSW5mby5hbGxfZXZlbnRzKTtcblx0XHQgICAgICAvL2NvbnNvbGUubG9nKFwiSlNPTiBJTkZPIEVWRU5UUyBcIityZXMuZGF0YS5pbmZvLmV2ZW50cylcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHQgICAgdGhpcy5zdWJtaXQ9ZnVuY3Rpb24oc29tZXRoaW5nKXtcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXCJTdWJtaXR0ZWRcIik7XG5cdFx0XHRcdFx0XHRcdC8vY29uc29sZS5sb2codGhpcy5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlcT17fTtcblx0XHRcdFx0XHRcdFx0cmVxLnRvY2tlbj1BdXRoLnRvY2tlbjtcblx0XHRcdFx0XHRcdFx0cmVxLmhhc2g9XCJiZXRTb21ldGhpbmdCZXR0ZXJcIjtcblx0XHRcdFx0XHRcdFx0c29tZXRoaW5nLmE9QXV0aC51c2VyO1xuXHRcdFx0XHRcdFx0XHRyZXEuZGF0YT1zb21ldGhpbmc7XG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKHJlcSk7XG5cdFx0XHRcdFx0XHRcdFx0JGh0dHAoIHttZXRob2Q6XCJQT1NUXCIsdXJsOlwiL3JlZ2lzdGVyX2V2ZW50XCIsZGF0YTogcmVxfVxuICAgICAgICAgXG5cdFx0XHRcdFx0XHRcdFx0ICAgICApLnRoZW4oZnVuY3Rpb24ocmVzKXtcblx0XHRcdFx0XHRcdFx0XHRcdCBjb25zb2xlLmxvZyhcInJlczpcIik7XG5cdFx0IGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcblx0XHQgIGNvbnRyb2xsZXIubWVzc2FnZT1yZXMuZGF0YVtcIm1lc3NhZ2VcIl07XG5cdFx0IGNvbnRyb2xsZXIubWVzc2FnZV92aXNpYmxlPXRydWU7XG5cdFx0ICR0aW1lb3V0KGZ1bmN0aW9uKCl7Y29udHJvbGxlci5tZXNzYWdlX3Zpc2libGU9ZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJtZXNzYWdlIGhpZGRlblwiKTtcblx0XHRcdFx0IH0sMzAwMCk7XG5cdC8vXHQgc2VydmljZS5hbGxfZXZlbnRzPXJlcy5kYXRhLmluZm8uZXZlbnRzO1xuXHQvL1x0IHNlcnZpY2UucmVzb3VyY2VzPXJlcy5kYXRhLmluZm8ucmVzb3VyY2VzO1xuXHRcdCBcblx0XHRcdFx0XHRcdFx0XHQgICAgIH1cblx0XHQgICAgLGZ1bmN0aW9uKHJlcyl7XG4gICAgICAgICAgICAgY29uc29sZS5sb2coXCJsb2dpbl91cGRhdGUgZmFpbGVkXCIpO1xuXHRcdFxuXHRcdCAgICB9KTt9O1xuXHRcdFx0XHQgICAgIH1cblxuXG5cdFx0XHRcdFx0IFxuXHRcdFx0XHQgICAgfVxuXG5cdFx0XHRcdCAgICApO1xuIiwiYW5ndWxhci5tb2R1bGUoJ21haW5BcHAnKS5jb21wb25lbnQoJ2N1cnJlbnRBZmZhaXJzJyxcblx0XHRcdFx0ICAgIHt0ZW1wbGF0ZVVybDogJ2V2ZW50cy5odG1sJyxcblx0XHRcdFx0ICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUsSW5mbyxBdXRoLCRzY2Upe1xuXHRcdFx0XHRcdCB0aGlzLkluZm89SW5mbztcblx0XHRcdFx0XHQgdGhpcy5BdXRoPUF1dGg7XG5cdFx0XHRcdFx0ICRzY29wZS5yZWFsVGltZT1mdW5jdGlvbihldmVudCl7XG5cdFx0XHRcdFx0ICAgICByZXR1cm4gRGF0ZS5wYXJzZShldmVudC5sYXN0X3VwZGF0ZSk7fTtcblx0XHRcdFx0ICAgICAkc2NvcGUucmVuZGVySHRtbCA9IGZ1bmN0aW9uIChodG1sQ29kZSkge1xuICAgICAgICAgICAgcmV0dXJuICRzY2UudHJ1c3RBc0h0bWwoaHRtbENvZGUpO1xuICAgICAgICB9O1xuXHRcdFx0XHRcdCAkc2NvcGUuJG9uKCdhdXRob3JpemVkJyxmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSW5mby5sb2dpbl91cGRhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSlNPTiBJTkZPOiBcIitJbmZvLmFsbF9ldmVudHMpO1xuXHRcdCAgICAgIC8vY29uc29sZS5sb2coXCJKU09OIElORk8gRVZFTlRTIFwiK3Jlcy5kYXRhLmluZm8uZXZlbnRzKVxuXHRcdFx0XHRcdCB9KTtcblxuXHRcdFx0XHQgICAgIH19KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdtYWluQXBwJykuY29tcG9uZW50KCdldmVudCcsXG5cdFx0XHRcdCAgICB7dGVtcGxhdGVVcmw6ICdldmVudC5odG1sJyxiaW5kaW5nczp7IGRhdGE6IFwiPVwifSxcblx0XHRcdFx0ICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUsSW5mbyxBdXRoLCRzY2Upe1xuXHRcdFx0XHRcdCB0aGlzLkluZm89SW5mbztcblx0XHRcdFx0XHQgdGhpcy5BdXRoPUF1dGg7XG5cdFx0XHRcdCAgICAgJHNjb3BlLnJlbmRlckh0bWwgPSBmdW5jdGlvbiAoaHRtbENvZGUpIHtcbiAgICAgICAgICAgIHJldHVybiAkc2NlLnRydXN0QXNIdG1sKGh0bWxDb2RlKTtcbiAgICAgICAgfTtcblx0XHRcdFx0XHQgJHNjb3BlLiRvbignYXV0aG9yaXplZCcsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEluZm8ubG9naW5fdXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkpTT04gSU5GTzogXCIrSW5mby5hbGxfZXZlbnRzKTtcblx0XHQgICAgICAvL2NvbnNvbGUubG9nKFwiSlNPTiBJTkZPIEVWRU5UUyBcIityZXMuZGF0YS5pbmZvLmV2ZW50cylcblx0XHRcdFx0XHQgfSk7XG5cblx0XHRcdFx0ICAgICB9fSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnbWFpbkFwcCcpLmRpcmVjdGl2ZSgnc2Nyb2xsJywgZnVuY3Rpb24oJHRpbWVvdXQpIHtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0EnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHIpIHtcblx0ICB2YXIgZWNobz1mdW5jdGlvbigpe2NvbnNvbGUubG9nKFwiRWNobyFcIik7Ly9jb25zb2xlLmxvZyhlbGVtZW50KTtcblx0XHRcdCAgICAgIGNvbnNvbGUubG9nKGVsZW1lbnRbMF0pO1xuXHRcdFx0ICAgICAgY29uc29sZS5sb2coZWxlbWVudFswXS5zY3JvbGxUb3ApO1xuXHRcdFx0ICAgICAgY29uc29sZS5sb2coZWxlbWVudFswXS5zY3JvbGxIZWlnaHQpO1xuXHRcdFx0ICAgICAgY29uc29sZS5sb2coc2NvcGUuSW5mbyk7XG5cdFx0XHQgICAgLy8gIGVsZW1lbnRbMF0uc2Nyb2xsVG9wID0gZWxlbWVudFswXS5zY3JvbGxIZWlnaHQ7XG5cblx0XHRcdCAgICAgLy8gJHRpbWVvdXQoZWNobywxMDAwKTtcblx0XHRcdCAgICAgfTtcblx0ICAvL2VjaG8oKTtcblx0ICAkdGltZW91dChlY2hvLDEwMDApO1xuICAgICAgc2NvcGUuJHdhdGNoQ29sbGVjdGlvbihhdHRyLnNjcm9sbCwgZnVuY3Rpb24obmV3VmFsKSB7XG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgZWxlbWVudFswXS5zY3JvbGxUb3AgPSBlbGVtZW50WzBdLnNjcm9sbEhlaWdodDtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59KTtcblxuYW5ndWxhci5tb2R1bGUoJ21haW5BcHAnKVxuICAgIC5jb21wb25lbnQoJ2xvY2F0aW9uJyxcblx0ICAgICAgIHt0ZW1wbGF0ZVVybDogJ2xvY2F0aW9uLmh0bWwnLGJpbmRpbmdzOntkYXRhOlwiPVwifSxcblx0XHRjb250cm9sbGVyOlxuXHRcdGZ1bmN0aW9uKCRzY29wZSxJbmZvLEF1dGgsJGh0dHAsJHRpbWVvdXQsJHNjZSl7XG5cdFx0ICAgIHRoaXMucmVuZGVySHRtbCA9IGZ1bmN0aW9uIChodG1sQ29kZSkge1xuXHRcdFx0cmV0dXJuICRzY2UudHJ1c3RBc0h0bWwoaHRtbENvZGUpO1xuXHRcdCAgICB9O1xuXHRcdCAgICBcdCAkc2NvcGUucmVhbFRpbWU9ZnVuY3Rpb24oZXZlbnQpe1xuXHRcdFx0XHRcdCAgICAgcmV0dXJuIERhdGUucGFyc2UoZXZlbnQubGFzdF91cGRhdGUpO307XG5cdFx0XHRcdCAgXG5cblxuXHRcdCAgICB0aGlzLkF1dGg9QXV0aDtcblx0XHQgICAgdGhpcy5JbmZvPUluZm87XG5cdFx0ICAgIC8vJHNjb3BlLkluZm89SW5mbztcblx0XHQgICAgJHNjb3BlLmNvbXBvbmVudD10aGlzO1xuXHRcdCAgICAkc2NvcGUubWVzc2FnZV9ib3g9XCLZvtuM2KfZhSDYrtmI2K8g2LHYpyDZiNin2LHYryDaqdmG24zYr1wiO1xuXHRcdCAgICB2YXIgY29tcG9uZW50PXRoaXM7XG5cdFx0ICAgIHZhciBlbnRlcl90ZXh0PVwi2YjYsdmI2K9cIjtcblx0XHQgICAgdmFyIGV4aXRfdGV4dD1cItiu2LHZiNisXCI7XG5cdFx0ICAgIHZhciBsZXNzX3RleHQ9XCLaqdmF2KrYsVwiO1xuXHRcdCAgICB2YXIgbW9yZV90ZXh0PVwi2KjbjNi02KrYsVwiO1xuXHRcdCAgICB2YXIgaW5zaWRlX2NvbG9yPVwicmVkXCI7XG5cdFx0ICAgIHZhciBvdXRzaWRlX2NvbG9yPVwiYmxhY2tcIjtcblx0XHQgICAgdmFyIGNvbnRyb2xsZXI9dGhpcztcblx0XHQgICAgdGhpcy5idXR0b25fZGlzYWJsZWQ9ZnVuY3Rpb24oKXtcblx0XHRcdGlmIChjb250cm9sbGVyLmRhdGEuaW5zaWRlKSByZXR1cm4gXCJcIjsgZWxzZSByZXR1cm4gXCJkaXNhYmxlZFwiO1xuXHRcdCAgICB9O1xuXHRcdCAgICB0aGlzLndhaXRfZm9yX3N1Ym1pdD1mYWxzZTtcblxuXHRcdCAgICB0aGlzLnNlbmRfbWVzc2FnZT1mdW5jdGlvbigpe1xuXHRcdFx0dmFyIHJlcT0ge1widG9ja2VuXCI6QXV0aC50b2NrZW4sXCJoYXNoXCI6XCJtZXNzYWdlVG9Hcm91cFwiXG5cdFx0XHRcdCAgICAsXCJkYXRhXCI6e1wibWVzc2FnZVwiOiRzY29wZS5tZXNzYWdlX2JveFxuXHRcdFx0XHRcdCAgICAgLFwiZ3JvdXBcIjogXCI6XCIrY29udHJvbGxlci5kYXRhLmdyb3VwIH19O1xuXHRcdFx0Y29uc29sZS5sb2coXCJzZW5kX21lc3NhZ2VcIik7XG5cdFx0XHRjb25zb2xlLmxvZyhyZXEpO1xuXHRcdFx0JGh0dHAucG9zdChcIi9yZWdpc3Rlcl9ldmVudFwiLHJlcSk7XG5cdFx0XHRjb21wb25lbnQud2FpdF9mb3Jfc3VibWl0PXRydWU7XG5cdFx0XHQkdGltZW91dChmdW5jdGlvbigpe2NvbXBvbmVudC53YWl0X2Zvcl9zdWJtaXQ9ZmFsc2U7fSwxMDAwMCk7XG5cblx0XHQgICAgfTtcblx0XHQgICAgdGhpcy50b2dnbGVfbW9yZV90ZXh0PWZ1bmN0aW9uKClcblx0XHQgICAge2lmICh0aGlzLmRhdGEubW9yZSkgcmV0dXJuIGxlc3NfdGV4dDsgZWxzZSByZXR1cm4gbW9yZV90ZXh0O307XG5cdFx0ICAgIHRoaXMudG9nZ2xlX2VudGVyX2NvbG9yPWZ1bmN0aW9uKClcblx0XHQgICAge2lmICh0aGlzLmRhdGEuaW5zaWRlKSByZXR1cm4gaW5zaWRlX2NvbG9yOyBlbHNlIHJldHVybiBvdXRzaWRlX2NvbG9yO307XG5cdFx0ICAgIHRoaXMudG9nZ2xlX2VudGVyX3RleHQ9ZnVuY3Rpb24oKVxuXHRcdCAgICB7aWYgKHRoaXMuZGF0YS5pbnNpZGUpIHJldHVybiBleGl0X3RleHQ7IGVsc2UgcmV0dXJuIGVudGVyX3RleHQ7fTtcblx0XHQgICAgXG5cdFx0ICAgIHRoaXMuaW5zaWRlPWZhbHNlO1xuXHRcdCAgICB0aGlzLnRvZ2dsZV9tb3JlPWZ1bmN0aW9uKCl7XG5cdFx0XHRpZiAoY29tcG9uZW50LmRhdGEubW9yZSlcblx0XHRcdHsvL2NvbXBvbmVudC50b2dnbGVfbW9yZV90ZXh0PW1vcmVfdGV4dDtcblx0XHRcdCAgICBjb25zb2xlLmxvZyhcInRvZ2dsZSBtb3JlIHdhcyBzZXRcIik7XG5cdFx0XHQgICAgY29tcG9uZW50LmRhdGEubW9yZT1mYWxzZTt9XG5cdFx0XHRlbHNley8vIGNvbXBvbmVudC50b2dnbGVfbW9yZV90ZXh0PWxlc3NfdGV4dDtcblx0XHRcdCAgICBjb21wb25lbnQuZGF0YS5tb3JlPXRydWU7XG5cdFx0XHQgICAgY29uc29sZS5sb2coXCJ0b2dnbGUgbW9yZSB3YXMgbm90IHNldFwiKTt9XG5cblx0XHQgICAgfTtcblx0XHQgICAgXG5cdFx0ICAgIFxuXG5cdFx0ICAgIFxuXHRcdCAgICB0aGlzLmJ1dHRvbl9kZWNpZGVkPWZhbHNlO1xuXHRcdCAgICAvLyB0aGlzLm1lc3NhZ2U9XCJcIjtcblx0XHQgICAgLy9jb25zb2xlLmxvZyh0aGlzKTtcblx0XHQgICAgLy9jb25zb2xlLmxvZyh0aGlzLmRhdGEpO1xuXHRcdCAgICB2YXIgcmVxPXt9O1xuXHRcdCAgICBcblx0XHQgICAgLy8gcmVxLmlkPWNvbnRyb2xsZXIuZGF0YS5pZDtcblx0XHQgICAgcmVxLmluZm89e307XG5cdFx0ICAgIC8vIHJlcS5uYW1lPWNvbnRyb2xsZXIuZGF0YS5uYW1lO1xuXHRcdCAgICByZXEudG9ja2VuPUF1dGgudG9ja2VuO1xuXHRcdCAgICB0aGlzLmRhdGFfc2V0PWZhbHNlO1xuXHRcdCAgICB0aGlzLm1lc3NhZ2Vfc2hvdz1mYWxzZTtcblx0XHQgICAgdGhpcy5tZXNzYWdlPVwibWVzc2FnZSEhLi4uXCI7XG5cdFx0ICAgIHRoaXMuZW50ZXJfYnV0dG9uPWZ1bmN0aW9uKCl7XG5cdFx0XHRpZiAoY29udHJvbGxlci5idXR0b25fZGVjaWRlZCkgcmV0dXJuO1xuXHRcdFx0Y29udHJvbGxlci5idXR0b25fZGVjaWRlZD10cnVlO1xuXHRcdFx0aWYgKCFjb250cm9sbGVyLmRhdGEuaW5zaWRlKVxuXHRcdFx0ICAgICRodHRwLnBvc3QoXCIvcmVnaXN0ZXJfZXZlbnRcIixcblx0XHRcdFx0ICAgICAgIHtcInRvY2tlblwiOkF1dGgudG9ja2VuLFxuXHRcdFx0XHRcdFwiaGFzaFwiOlwiZW50ZXJMb2NhdGlvblwiLFxuXHRcdFx0XHRcdFwiZGF0YVwiOntcInVzZXJcIjpBdXRoLnVzZXIsXCJsb2NhdGlvblwiOmNvbnRyb2xsZXIuZGF0YS5oYXNofX1cblx0XHRcdFx0ICAgICAgKS50aGVuKFxuXHRcdFx0XHRcdCAgZnVuY3Rpb24ocmVzKXtcblx0XHRcdFx0XHQgICAgICB2YXIgZGF0YT1yZXMuZGF0YTtcblx0XHRcdFx0XHQgICAgICBjb25zb2xlLmxvZyhcInN1Y2Nlc3MgaW4gcmVnaXN0ZXJpbmcgZW50ZXJfbG9jYXRpb25cIik7XG5cdFx0XHRcdFx0ICAgICAgY29uc29sZS5sb2coZGF0YSk7XG5cdFx0XHRcdFx0ICAgICAgaWYgKGRhdGEuZXZlbnRfY29kZSA+MCAmJiBkYXRhLmNvZGUgPiAwICkgY29udHJvbGxlci5kYXRhLmluc2lkZT0hY29udHJvbGxlci5kYXRhLmluc2lkZTtcblx0XHRcdFx0XHQgICAgICBjb250cm9sbGVyLmJ1dHRvbl9kZWNpZGVkPWZhbHNlO1xuXHRcdFx0XHRcdCAgICAgIGNvbnRyb2xsZXIubWVzc2FnZT1kYXRhLm1lc3NhZ2U7XG5cdFx0XHRcdFx0ICAgICAgY29udHJvbGxlci5tZXNzYWdlX3Nob3c9dHJ1ZTtcblx0XHRcdFx0XHQgICAgICAkdGltZW91dChmdW5jdGlvbigpe2NvbnRyb2xsZXIubWVzc2FnZV9zaG93PWZhbHNlO30sMzAwMCk7XG5cdFx0XHRcdFx0ICAgICAgXG5cblx0XHRcdFx0XHQgIH0pO1xuXG5cdFx0XHRcblx0XHRcdGVsc2Vcblx0XHRcdCAgICAkaHR0cC5wb3N0KFwiL3VwZGF0ZV9ldmVudFwiLHtcblx0XHRcdFx0XCJ0b2NrZW5cIjpBdXRoLnRvY2tlbixcblx0XHRcdFx0XCJuYW1lXCI6XCJlbnRlckxvY2F0aW9uXCIsXG5cdFx0XHRcdFwibWV0aG9kXCI6IFwiZ2V0X291dFwiLFxuXHRcdFx0XHRcImluZm9cIjoge1widXNlclwiOkF1dGgudXNlcixcImxvY2F0aW9uXCI6Y29udHJvbGxlci5kYXRhLmhhc2h9XG5cblx0XHRcdCAgICB9KS50aGVuKGZ1bmN0aW9uKHJlcyl7XG5cdFx0XHRcdHZhciBkYXRhPXJlcy5kYXRhO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcInN1Y2Nlc3MgaW4gZ2V0X291dCBlbnRlcl9sb2NhdGlvblwiKTtcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XG5cdFx0XHRcdGNvbnRyb2xsZXIuYnV0dG9uX2RlY2lkZWQ9ZmFsc2U7XG5cdFx0XHRcdGlmIChkYXRhLm1lc3NhZ2Uub2sgKSBjb250cm9sbGVyLmRhdGEuaW5zaWRlPSFjb250cm9sbGVyLmRhdGEuaW5zaWRlO1xuXHRcdFx0XHRcblx0XHRcdCAgICAgICAgY29udHJvbGxlci5tZXNzYWdlPWRhdGEubWVzc2FnZS5tZXNzYWdlO1xuXHRcdFx0ICAgICAgICBjb250cm9sbGVyLm1lc3NhZ2Vfc2hvdz10cnVlO1xuXHRcdFx0XHQkdGltZW91dChmdW5jdGlvbigpe2NvbnRyb2xsZXIubWVzc2FnZV9zaG93PWZhbHNlO30sMzAwMCk7XG5cblx0XHRcdCAgICB9KTtcblxuXHRcdCAgICB9O1xuXHRcdCAgICB0aGlzLiRvbkNoYW5nZXM9ZnVuY3Rpb24oKXtcblx0XHRcdGlmICgoY29udHJvbGxlci5kYXRhX3NldD09ZmFsc2UpJiZcblx0XHRcdCAgICAoXCJkYXRhXCIgaW4gY29udHJvbGxlcikpe1xuXHRcdFx0ICAgIGNvbnRyb2xsZXIuZGF0YV9zZXQ9dHJ1ZTtcblx0XHRcdCAgICAvL1x0IHJlcS5uYW1lPWNvbnRyb2xsZXIuZGF0YS5uYW1lO1xuXHRcdFx0ICAgIC8vXHQgcmVxLmlkPWNvbnRyb2xsZXIuZGF0YS5pZDtcblx0XHRcdCAgICBjb25zb2xlLmxvZyhjb250cm9sbGVyLmRhdGEpO1xuXG5cdFx0XHQgICAgaWYgKGNvbnRyb2xsZXIuZGF0YS5tb3JlID09IG51bGwgKSBjb250cm9sbGVyLmRhdGEubW9yZT1mYWxzZTtcblxuXHRcdFx0fVxuXHRcdCAgICB9O1xuXG5cdFx0ICAgICRzY29wZS4kb24oJ2xvY2F0aW9uX3VwZGF0ZScsZnVuY3Rpb24oKXtcblx0XHRcdGNvbnNvbGUubG9nKFwiSSBrbm93ISBsb2NhdGlvbnNcIik7XG5cdFx0XHRcblxuXHRcdCAgICB9KTtcblx0XHQgICAgXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnRleHQ9SW5mby50YXNrcyAgIFxuXHRcdH19KTtcblxuXG4iLCJhbmd1bGFyLm1vZHVsZSgnbWFpbkFwcCcpLmNvbXBvbmVudCgnbG9jYXRpb25zJyxcblx0XHRcdFx0ICAgIHt0ZW1wbGF0ZVVybDogJ2xvY2F0aW9ucy5odG1sJyxcblx0XHRcdFx0ICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUsSW5mbyxBdXRoLCRzY2Upe1xuXHRcdFx0XHRcdCB0aGlzLkluZm89SW5mbztcblx0XHRcdFx0XHQgdGhpcy5BdXRoPUF1dGg7XG5cdFx0XHRcdCAgICAgJHNjb3BlLnJlbmRlckh0bWwgPSBmdW5jdGlvbiAoaHRtbENvZGUpIHtcbiAgICAgICAgICAgIHJldHVybiAkc2NlLnRydXN0QXNIdG1sKGh0bWxDb2RlKTtcbiAgICAgICAgfTtcblx0XHRcdFx0XHRcblxuXHRcdFx0XHQgICAgIH19KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdtYWluQXBwJykuY29tcG9uZW50KCdvbmxpbmVVc2VycycsXG5cdFx0XHRcdCAgICB7dGVtcGxhdGVVcmw6ICdvbmxpbmV1c2Vycy5odG1sJyxcblx0XHRcdFx0ICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUsSW5mbyl7XG5cdFx0XHRcdFx0IHRoaXMuSW5mbz1JbmZvO1xuXHRcdFx0XHRcdCAgJHNjb3BlLmltZ19maWxlPWZ1bmN0aW9uKG8pe3JldHVybiBcImltZy9naXJsLmpwZ1wiO307XG5cdFx0XHRcdCAgICAgfX0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ21haW5BcHAnKS5jb21wb25lbnQoJ3NhbXBsZVRhc2snLFxuXHRcdFx0XHQgICAge3RlbXBsYXRlVXJsOiAnc2FtcGxldGFzay5odG1sJyxiaW5kaW5nczp7ZGF0YTpcIj1cIn0sXG5cdFx0XHRcdCAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlLEluZm8sQXV0aCwkaHR0cCwkdGltZW91dCl7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0IHRoaXMuQXV0aD1BdXRoO1xuXHRcdFx0XHRcdCB0aGlzLkluZm89SW5mbztcblx0XHRcdFx0XHQgdGhpcy5kZWNpZGVkPWZhbHNlO1xuXHRcdFx0XHRcdCB0aGlzLm1lc3NhZ2U9XCJcIjtcblx0XHRcdFx0XHQgLy9jb25zb2xlLmxvZyh0aGlzKTtcblx0XHRcdFx0XHQgIC8vY29uc29sZS5sb2codGhpcy5kYXRhKTtcblx0XHRcdFx0XHQgdmFyIGNvbnRyb2xsZXI9dGhpcztcblx0XHRcdFx0XHQgdmFyIHJlcT17fTtcblx0XHRcdFx0XG5cdFx0XHRcdFx0Ly8gcmVxLmlkPWNvbnRyb2xsZXIuZGF0YS5pZDtcblx0XHRcdFx0XHQgcmVxLmluZm89e307XG5cdFx0XHRcdFx0Ly8gcmVxLm5hbWU9Y29udHJvbGxlci5kYXRhLm5hbWU7XG5cdFx0XHRcdFx0IHJlcS50b2NrZW49QXV0aC50b2NrZW47XG5cdFx0XHRcdFx0IHRoaXMuZGF0YV9zZXQ9ZmFsc2U7XG5cdFx0XHRcdCAgICAgICAgIHRoaXMuJG9uQ2hhbmdlcz1mdW5jdGlvbigpe1xuXHRcdFx0XHRcdCAgICAgaWYgKChjb250cm9sbGVyLmRhdGFfc2V0PT1mYWxzZSkmJlxuXHRcdFx0XHRcdFx0IChcImRhdGFcIiBpbiBjb250cm9sbGVyKSl7XG5cdFx0XHRcdFx0XHQgY29udHJvbGxlci5kYXRhX3NldD10cnVlO1xuXHRcdFx0XHRcdFx0IHJlcS5uYW1lPWNvbnRyb2xsZXIuZGF0YS5uYW1lO1xuXHRcdFx0XHRcdFx0IHJlcS5pZD1jb250cm9sbGVyLmRhdGEuaWQ7XG5cdFx0XHRcdFx0XHQgY29uc29sZS5sb2coY29udHJvbGxlci5kYXRhKTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdCB9O1xuXHRcdFx0XHRcdCAgdGhpcy5hY2NlcHQ9ZnVuY3Rpb24oKXtpZiAoIWNvbnRyb2xsZXIuZGVjaWRlZCkge1xuXHRcdFx0XHRcdCAgICAgY29udHJvbGxlci5kZWNpZGVkPXRydWU7XG5cdFx0XHRcdFx0ICAgICBcblx0XHRcdFx0XHQgICAgIFxuXHRcdFx0XHRcdCAgICAgcmVxLm1ldGhvZD1cImFjY2VwdFwiO1xuXHRcdFx0XHRcdCAgICAgXG5cdFx0XHRcdFx0ICAgICBjb25zb2xlLmxvZyhcImFjY2VwdFwiKTtcblx0XHRcdFx0XHQgICAgIGNvbnNvbGUubG9nKHJlcSk7XG5cdFx0XHRcdFx0ICAgICAkaHR0cCgge21ldGhvZDpcIlBPU1RcIix1cmw6XCIvdXBkYXRlX2V2ZW50XCIsZGF0YTogcmVxfVxuICAgICAgICAgXG5cdFx0XHRcdFx0XHQgICkudGhlbihmdW5jdGlvbihyZXMpe1xuXHRcdFx0XHRcdFx0ICAgICAgY29udHJvbGxlci5tZXNzYWdlPXJlcy5kYXRhLm1lc3NhZ2U7XG5cdFx0XHRcdFx0XHQgICAgICBjb25zb2xlLmxvZyhcInN1Y2Nlc3NcIik7XG5cdFx0XHRcdFx0XHQgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG5cdFx0XHRcdFx0XHQgICAgICAgY29udHJvbGxlci5tZXNzYWdlPXJlcy5kYXRhLm1lc3NhZ2U7XG5cdFx0XHRcdFx0XHQgICAgICAgY29udHJvbGxlci5tZXNzYWdlPXJlcy5kYXRhW1wibWVzc2FnZVwiXTtcblx0XHQgY29udHJvbGxlci5tZXNzYWdlX3Zpc2libGU9dHJ1ZTtcblx0Ly9cdCAkdGltZW91dChmdW5jdGlvbigpe2NvbnRyb2xsZXIubWVzc2FnZV92aXNpYmxlPWZhbHNlO1xuXG5cdC8vXHRcdFx0IH0sNzAwMCk7XG5cdFx0XHRcdFx0XHQgICAgICBcblxuXHRcdFx0XHRcdFx0ICB9LGZ1bmN0aW9uKHJlcyl7XG5cdFx0XHRcdFx0XHQgICAgICBjb25zb2xlLmxvZyhcInVuc3VjY2Vzc2Z1bFwiKTtcblx0XHRcdFx0XHRcdCAgICAgIGNvbnRyb2xsZXIuZGVjaWRlZD1mYWxzZTtcblxuXHRcdFx0XHRcdFx0ICB9KTtcblxuXHRcdFx0XHRcdCB9fTtcblx0XHRcdFx0XHQgdGhpcy5yZWplY3Q9ZnVuY3Rpb24oKXtpZiAoIWNvbnRyb2xsZXIuZGVjaWRlZCkge1xuXHRcdFx0XHRcdCAgICAgY29udHJvbGxlci5kZWNpZGVkPXRydWU7XG5cdFx0XHRcdFx0ICAgICAgICAgdmFyIHJlcT17fTtcblx0XHRcdFx0XHQgICAgXG5cdFx0XHRcdFx0ICAgICByZXEubWV0aG9kPVwicmVqZWN0XCI7XG5cdFx0XHRcdFx0ICAgICByZXEudG9ja2VuPUF1dGgudG9ja2VuO1xuXHRcdFx0XHRcdCAgICAgcmVxLmluZm89e307XG5cdFx0XHRcdFx0ICAgICAgcmVxLm5hbWU9Y29udHJvbGxlci5kYXRhLm5hbWU7XG5cdFx0XHRcdFx0XHQgcmVxLmlkPWNvbnRyb2xsZXIuZGF0YS5pZDtcblx0XHRcdFx0XHQgICAgIGNvbnNvbGUubG9nKFwicmVqZWN0XCIpO1xuXHRcdFx0XHRcdCAgICAgY29uc29sZS5sb2cocmVxKTtcblx0XHRcdFx0XHQgICAgICRodHRwKCB7bWV0aG9kOlwiUE9TVFwiLHVybDpcIi91cGRhdGVfZXZlbnRcIixkYXRhOiByZXF9XG4gICAgICAgICBcblx0XHRcdFx0XHRcdCAgKS50aGVuKGZ1bmN0aW9uKHJlcyl7XG5cdFx0XHRcdFx0XHQgICAgICBjb25zb2xlLmxvZyhcIlJlamVjdCBjb25uZWN0ZWQgc2VydmVyIHdpdGggc3VjY2Vzc1wiKTsgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuXHRcdFx0XHRcdFx0ICAgICAgY29udHJvbGxlci5tZXNzYWdlPXJlcy5kYXRhLm1lc3NhZ2U7XG5cdFx0XHRcdFx0XHQgICAgICAgY29udHJvbGxlci5tZXNzYWdlPXJlcy5kYXRhW1wibWVzc2FnZVwiXTtcblx0XHQgY29udHJvbGxlci5tZXNzYWdlX3Zpc2libGU9dHJ1ZTtcblx0Ly9cdCAkdGltZW91dChmdW5jdGlvbigpe2NvbnRyb2xsZXIubWVzc2FnZV92aXNpYmxlPWZhbHNlO1xuXG5cdC8vXHRcdFx0IH0sNzAwMCk7XG5cblx0XHRcdFx0XHRcdCAgfSxmdW5jdGlvbihyZXMpe1xuXHRcdFx0XHRcdFx0ICAgICAgY29uc29sZS5sb2coXCJ1bnN1Y2Nlc3NmdWxcIik7XG5cdFx0XHRcdFx0XHQgICAgICBjb250cm9sbGVyLmRlY2lkZWQ9ZmFsc2U7XG5cblx0XHRcdFx0XHRcdCAgfSk7XG5cblx0XHRcdFx0XHQgfX07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFx0XHRcdFx0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy50ZXh0PUluZm8udGFza3MgICBcblx0XHRcdFx0ICAgICB9fSk7XG5cblxuIiwiYW5ndWxhci5tb2R1bGUoJ21haW5BcHAnKS5jb21wb25lbnQoJ3NheVNvbWV0aGluZycsXG5cdFx0XHRcdCAgICB7dGVtcGxhdGVVcmw6ICdzYXlzb21ldGhpbmcuaHRtbCcsXG5cdFx0XHRcdCAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlLEluZm8sQXV0aCwkaHR0cCwkdGltZW91dCl7XG5cdFx0XHRcdFx0XG5cbiB2YXIgY29udHJvbGxlcj10aGlzO1xuXHRcdFx0XHRcdCB0aGlzLkluZm89SW5mbztcblx0XHRcdFx0XHQgdGhpcy5BdXRoPUF1dGg7XG5cdFx0XHRcdFx0IC8vdGhpcy5kYXRhPXt9O1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdCAkc2NvcGUuJG9uKCdhdXRob3JpemVkJyxmdW5jdGlvbigpe1xuXHRcdFx0XHRcdCAgICAgLy9jb250cm9sbGVyLmRhdGEuYT0gQXV0aC51c2VyO1xuXHRcdFx0XHRcdCAgICAvLyBjb25zb2xlLmxvZyhcInNheSBTb21ldGggYTpcIitjb250cm9sbGVyLmRhdGEuYSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEluZm8ubG9naW5fdXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiSlNPTiBJTkZPOiBcIitJbmZvLmFsbF9ldmVudHMpO1xuXHRcdCAgICAgIC8vY29uc29sZS5sb2coXCJKU09OIElORk8gRVZFTlRTIFwiK3Jlcy5kYXRhLmluZm8uZXZlbnRzKVxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdCAgICB0aGlzLnN1Ym1pdD1mdW5jdGlvbihzb21ldGhpbmcpe1xuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIlN1Ym1pdHRlZFwiKTtcblx0XHRcdFx0XHRcdFx0Ly9jb25zb2xlLmxvZyh0aGlzLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVxPXt9O1xuXHRcdFx0XHRcdFx0XHRyZXEudG9ja2VuPUF1dGgudG9ja2VuO1xuXHRcdFx0XHRcdFx0XHRyZXEuaGFzaD1cInNheVNvbWV0aGluZ1wiO1xuXHRcdFx0XHRcdFx0XHRzb21ldGhpbmcuYT1BdXRoLnVzZXI7XG5cdFx0XHRcdFx0XHRcdHJlcS5kYXRhPXNvbWV0aGluZztcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2cocmVxKTtcblx0XHRcdFx0XHRcdFx0XHQkaHR0cCgge21ldGhvZDpcIlBPU1RcIix1cmw6XCIvcmVnaXN0ZXJfZXZlbnRcIixkYXRhOiByZXF9XG4gICAgICAgICApLnRoZW4oZnVuY3Rpb24ocmVzKXtcblx0XHRcdFx0XHQgY29uc29sZS5sb2coXCJyZXM6XCIpO1xuXHRcdFx0XHRcdCBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG5cdFx0XHRcdFx0XHRcdFx0XHQgXG5cdCAgICAgaWYgKHJlcy5kYXRhW1wibWVzc2FnZVwiXSl7XG5cdFx0IGNvbnRyb2xsZXIubWVzc2FnZT1yZXMuZGF0YVtcIm1lc3NhZ2VcIl07XG5cdFx0IGNvbnRyb2xsZXIubWVzc2FnZV92aXNpYmxlPXRydWU7XG5cdFx0ICR0aW1lb3V0KGZ1bmN0aW9uKCl7Y29udHJvbGxlci5tZXNzYWdlX3Zpc2libGU9ZmFsc2U7XG5cblx0XHRcdFx0IH0sMzAwMCk7XG5cblx0XHRcdFx0XHQgfVxuXHQvL1x0IHNlcnZpY2UuYWxsX2V2ZW50cz1yZXMuZGF0YS5pbmZvLmV2ZW50cztcblx0Ly9cdCBzZXJ2aWNlLnJlc291cmNlcz1yZXMuZGF0YS5pbmZvLnJlc291cmNlcztcblx0XHQgXG5cdFx0XHRcdFx0XHRcdFx0ICAgICB9XG5cdFx0ICAgICxmdW5jdGlvbihyZXMpe1xuICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibG9naW5fdXBkYXRlIGZhaWxlZFwiKTtcblx0XHRcblx0XHQgICAgfSk7fTtcblx0XHRcdFx0ICAgICB9XG5cblxuXHRcdFx0XHRcdCBcblx0XHRcdFx0ICAgIH1cblxuXHRcdFx0XHQgICApO1xuIiwiYW5ndWxhci5tb2R1bGUoJ21haW5BcHAnKS5jb21wb25lbnQoJ3NpbXBsZU5vdGlmJyxcblx0XHRcdFx0ICAgIHt0ZW1wbGF0ZVVybDogJ3NpbXBsZW5vdGlmLmh0bWwnLGJpbmRpbmdzOntkYXRhOlwiPVwifSxcblx0XHRcdFx0ICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUsSW5mbyxBdXRoLCRodHRwLCR0aW1lb3V0KXtcblx0XHRcdFx0XHQgY29uc29sZS5sb2coXCJzaW1wbGUtbm90aWZcIik7XG5cdFx0XHRcdFx0IHRoaXMuQXV0aD1BdXRoO1xuXHRcdFx0XHRcdCB0aGlzLkluZm89SW5mbztcblx0XHRcdFx0XHQgdGhpcy5kZWNpZGVkPWZhbHNlO1xuXHRcdFx0XHRcdCB0aGlzLm1lc3NhZ2U9XCJcIjtcblx0XHRcdFx0XHQgLy9jb25zb2xlLmxvZyh0aGlzKTtcblx0XHRcdFx0XHQgIC8vY29uc29sZS5sb2codGhpcy5kYXRhKTtcblx0XHRcdFx0XHQgdmFyIGNvbnRyb2xsZXI9dGhpcztcblx0XHRcdFx0XHQgdmFyIHJlcT17fTtcblx0XHRcdFx0XG5cdFx0XHRcdFx0Ly8gcmVxLmlkPWNvbnRyb2xsZXIuZGF0YS5pZDtcblx0XHRcdFx0XHQgcmVxLmluZm89e307XG5cdFx0XHRcdFx0Ly8gcmVxLm5hbWU9Y29udHJvbGxlci5kYXRhLm5hbWU7XG5cdFx0XHRcdFx0IHJlcS50b2NrZW49QXV0aC50b2NrZW47XG5cdFx0XHRcdFx0IHRoaXMuZGF0YV9zZXQ9ZmFsc2U7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdCAgICAgICAgIHRoaXMuJG9uQ2hhbmdlcz1mdW5jdGlvbigpe1xuXHRcdFx0XHRcdCAgICAgaWYgKChjb250cm9sbGVyLmRhdGFfc2V0PT1mYWxzZSkmJlxuXHRcdFx0XHRcdFx0IGNvbnRyb2xsZXIuaGFzT3duUHJvcGVydHkoJ2RhdGEnKSYmXG5cdFx0XHRcdFx0XHQgY29udHJvbGxlci5kYXRhIT11bmRlZmluZWQpe1xuXHRcdFx0XHRcdFx0ICBjb250cm9sbGVyLmRhdGEuc2Vlbj1mYWxzZTtcblx0XHRcdFx0XHRcdCBjb25zb2xlLmxvZyhcImRhdGEgZGVmaW5lZCFcIik7XG5cdFx0XHRcdFx0XHQgY29uc29sZS5sb2coY29udHJvbGxlci5kYXRhKTtcblx0XHRcdFx0XHRcdCBjb250cm9sbGVyLmRhdGFfc2V0PXRydWU7XG5cdFx0XHRcdFx0XHQgcmVxLm5hbWU9Y29udHJvbGxlci5kYXRhLm5hbWU7XG5cdFx0XHRcdFx0XHQgcmVxLmlkPWNvbnRyb2xsZXIuZGF0YS5pZDtcblx0XHRcdFx0XHRcdCBjb25zb2xlLmxvZyhjb250cm9sbGVyLmRhdGEpO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0IH07XG5cdFx0XHRcdFx0ICB0aGlzLmFjY2VwdD1mdW5jdGlvbigpe2lmICghY29udHJvbGxlci5kZWNpZGVkKSB7XG5cdFx0XHRcdFx0ICAgICBjb250cm9sbGVyLmRlY2lkZWQ9dHJ1ZTtcblx0XHRcdFx0XHQgICAgIFxuXHRcdFx0XHRcdCAgICAgXG5cdFx0XHRcdFx0ICAgICByZXEubWV0aG9kPVwic2VlblwiO1xuXHRcdFx0XHRcdCAgICAgXG5cdFx0XHRcdFx0ICAgICBjb25zb2xlLmxvZyhcImFjY2VwdFwiKTtcblx0XHRcdFx0XHQgICAgIGNvbnNvbGUubG9nKHJlcSk7XG5cdFx0XHRcdFx0ICAgICAkaHR0cCgge21ldGhvZDpcIlBPU1RcIix1cmw6XCIvdXBkYXRlX2V2ZW50XCIsZGF0YTogcmVxfVxuICAgICAgICAgXG5cdFx0XHRcdFx0XHQgICkudGhlbihmdW5jdGlvbihyZXMpe1xuXHRcdFx0XHRcdFx0ICAgICAgY29udHJvbGxlci5tZXNzYWdlPXJlcy5kYXRhLm1lc3NhZ2U7XG5cdFx0XHRcdFx0XHQgICAgICBjb25zb2xlLmxvZyhcInN1Y2Nlc3NcIik7XG5cdFx0XHRcdFx0XHQgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG5cdFx0XHRcdFx0XHQgICAgICAgY29udHJvbGxlci5tZXNzYWdlPXJlcy5kYXRhLm1lc3NhZ2U7XG5cdFx0XHRcdFx0XHQgICAgICAgY29udHJvbGxlci5tZXNzYWdlPXJlcy5kYXRhW1wibWVzc2FnZVwiXTtcblx0XHRcdFx0XHRcdCAgICAgIGNvbnRyb2xsZXIubWVzc2FnZV92aXNpYmxlPXRydWU7XG5cdFx0XHRcdFx0XHQgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe2NvbnRyb2xsZXIuZGF0YS5zZWVuPXRydWU7XG5cblx0XHRcdFx0IH0sNzAwMCk7XG5cdC8vXHQgJHRpbWVvdXQoZnVuY3Rpb24oKXtjb250cm9sbGVyLm1lc3NhZ2VfdmlzaWJsZT1mYWxzZTtcblxuXHQvL1x0XHRcdCB9LDcwMDApO1xuXHRcdFx0XHRcdFx0ICAgICAgXG5cblx0XHRcdFx0XHRcdCAgfSxmdW5jdGlvbihyZXMpe1xuXHRcdFx0XHRcdFx0ICAgICAgY29uc29sZS5sb2coXCJ1bnN1Y2Nlc3NmdWxcIik7XG5cdFx0XHRcdFx0XHQgICAgICBjb250cm9sbGVyLmRlY2lkZWQ9ZmFsc2U7XG5cblx0XHRcdFx0XHRcdCAgfSk7XG5cblx0XHRcdFx0XHQgfX07XG5cdFx0XHRcdFx0IHRoaXMucmVqZWN0PWZ1bmN0aW9uKCl7aWYgKCFjb250cm9sbGVyLmRlY2lkZWQpIHtcblx0XHRcdFx0XHQgICAgIGNvbnRyb2xsZXIuZGVjaWRlZD10cnVlO1xuXHRcdFx0XHRcdCAgICAgICAgIHZhciByZXE9e307XG5cdFx0XHRcdFx0ICAgIFxuXHRcdFx0XHRcdCAgICAgcmVxLm1ldGhvZD1cInJlamVjdFwiO1xuXHRcdFx0XHRcdCAgICAgcmVxLnRvY2tlbj1BdXRoLnRvY2tlbjtcblx0XHRcdFx0XHQgICAgIHJlcS5pbmZvPXt9O1xuXHRcdFx0XHRcdCAgICAgIHJlcS5uYW1lPWNvbnRyb2xsZXIuZGF0YS5uYW1lO1xuXHRcdFx0XHRcdFx0IHJlcS5pZD1jb250cm9sbGVyLmRhdGEuaWQ7XG5cdFx0XHRcdFx0ICAgICBjb25zb2xlLmxvZyhcInJlamVjdFwiKTtcblx0XHRcdFx0XHQgICAgIGNvbnNvbGUubG9nKHJlcSk7XG5cdFx0XHRcdFx0ICAgICAkaHR0cCgge21ldGhvZDpcIlBPU1RcIix1cmw6XCIvdXBkYXRlX2V2ZW50XCIsZGF0YTogcmVxfVxuICAgICAgICAgXG5cdFx0XHRcdFx0XHQgICkudGhlbihmdW5jdGlvbihyZXMpe1xuXHRcdFx0XHRcdFx0ICAgICAgY29uc29sZS5sb2coXCJSZWplY3QgY29ubmVjdGVkIHNlcnZlciB3aXRoIHN1Y2Nlc3NcIik7IGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcblx0XHRcdFx0XHRcdCAgICAgIGNvbnRyb2xsZXIubWVzc2FnZT1yZXMuZGF0YS5tZXNzYWdlO1xuXHRcdFx0XHRcdFx0ICAgICAgIGNvbnRyb2xsZXIubWVzc2FnZT1yZXMuZGF0YVtcIm1lc3NhZ2VcIl07XG5cdFx0IGNvbnRyb2xsZXIubWVzc2FnZV92aXNpYmxlPXRydWU7XG5cdFx0XHRcdFx0XHQgXG5cblx0XHRcdFx0XHRcdCAgfSxmdW5jdGlvbihyZXMpe1xuXHRcdFx0XHRcdFx0ICAgICAgY29uc29sZS5sb2coXCJ1bnN1Y2Nlc3NmdWxcIik7XG5cdFx0XHRcdFx0XHQgICAgICBjb250cm9sbGVyLmRlY2lkZWQ9ZmFsc2U7XG5cblx0XHRcdFx0XHRcdCAgfSk7XG5cblx0XHRcdFx0XHQgfX07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFx0XHRcdFx0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy50ZXh0PUluZm8udGFza3MgICBcblx0XHRcdFx0ICAgICB9fSk7XG5cbiIsImFuZ3VsYXIubW9kdWxlKCdtYWluQXBwJykuY29tcG9uZW50KCd0YXNrcycsXG5cdFx0XHRcdCAgICB7dGVtcGxhdGVVcmw6ICd0YXNrcy5odG1sJyxcblx0XHRcdFx0ICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUsSW5mbyxBdXRoKXtcblx0XHRcdFx0XHQgdGhpcy5BdXRoPUF1dGg7XG5cdFx0XHRcdFx0IHRoaXMuSW5mbz1JbmZvO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0XHRcdCAgICAgfX0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ21haW5BcHAnKS5jb21wb25lbnQoJ3VzZXJTdGF0dXMnLFxuXHRcdFx0XHQgICAge3RlbXBsYXRlVXJsOiAnc3RhdHVzLmh0bWwnLFxuXHRcdFx0XHQgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSxBdXRoLEluZm8pe1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdCB0aGlzLnVzZXJuYW1lPVwidW5rbm93blwiO1xuXHRcdFx0XHRcdCB0aGlzLkF1dGg9QXV0aDtcblx0XHRcdFx0XHQgdGhpcy5JbmZvPUluZm87XG5cdFx0XHRcdFx0IHZhciBjb250cm9sbGVyPXRoaXM7XG5cdFx0XHRcdFx0ICRzY29wZS4kb24oJ2F1dGhvcml6ZWQnLGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCBjb25zb2xlLmxvZyhcImNvbXBvbmVudCBrbm93cyBpdCBpcyBhdXRob3JpemVkXCIpO1xuXHRcdFx0XHRcdCAgICBjb250cm9sbGVyLnVzZXJuYW1lPUF1dGgudXNlcjtcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ICB9KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgfX0pO1xuIiwiYXBwLmZpbHRlcihcInRydXN0XCIsIFsnJHNjZScsIGZ1bmN0aW9uKCRzY2UpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGh0bWxDb2RlKXtcbiAgICByZXR1cm4gJHNjZS50cnVzdEFzSHRtbChodG1sQ29kZSk7XG4gIH07XG59XSk7XG5hcHAuY29udHJvbGxlcignYmFzaWMnLGZ1bmN0aW9uICgkcm9vdFNjb3BlLCRzY29wZSwkaHR0cCxBdXRoLEluZm8sJHNjZSl7XG4gICAgLy8gSW5mby51cGRhdGUoKTtcbiAgICAkc2NvcGUucmVuZGVySHRtbCA9IGZ1bmN0aW9uIChodG1sQ29kZSkge1xuICAgICAgICAgICAgcmV0dXJuICRzY2UudHJ1c3RBc0h0bWwoaHRtbENvZGUpO1xuICAgICAgICB9O1xuICAgIHZhciBtb3VzZWluPXtcInRhc2tzXCI6ZmFsc2UsXCJhY3Rpb25zXCI6ZmFsc2UsXCJldmVudHNcIjpmYWxzZX07XG4gICAgJHNjb3BlLm1vdXNldG9nZ2xlPWZ1bmN0aW9uKHMpe21vdXNlaW5bc109IW1vdXNlaW5bc107fTtcbiAgICBcbiAgICAkc2NvcGUuYmFja2dyb3VuZD1mdW5jdGlvbihzKXtcblx0aWYgKG1vdXNlaW5bc10pIHJldHVybiBcIiNmY2ZcIjtcblx0aWYgKCRzY29wZS5zaG93PT1zKSByZXR1cm4gXCIjMGFhXCI7IGVsc2UgcmV0dXJuIFwiI2NmY1wiO1xuICAgIH07XG4gICAgJHNjb3BlLndvcmtpbmc9XCI8c3Bhbj4gQW5ndWxhckpTIDwvc3Bhbj5cIjtcbiAgIFxuICAgICRzY29wZS5BdXRoPUF1dGg7XG4gICAgJHNjb3BlLkluZm89SW5mbztcbiAgICAkc2NvcGUuY3JlZGVudGlhbHM9e307XG4gICAgJHNjb3BlLmxvZ2luPWZ1bmN0aW9uIChjcmVkZW50aWFscyl7Y29uc29sZS5sb2coXCJzdWJtaXR0ZWQgXCIgKyBjcmVkZW50aWFscy51c2VybmFtZSk7XG5cdFx0XHRcdFx0aWYgKEF1dGguYXV0aGVudGljYXRlKGNyZWRlbnRpYWxzLnVzZXJuYW1lLGNyZWRlbnRpYWxzLnBhc3N3b3JkKSkgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdhdXRob3JpemVkJyk7ICAgICAgLy8kc2NvcGUuYXV0aG9yaXplZD1BdXRoLmF1dGhvcml6ZWQ7XG4gICAgICAgICAgICAgJHNjb3BlLnNob3c9XCJhY3Rpb25zXCI7XHRcdFx0ICAgICAgICAgICAgICAgXG5cdFx0XHRcdCAgICAgICB9O1xuICAgLy8gJHNjb3BlLiRvbignYXV0aG9yaXplZCcsZnVuY3Rpb24oKXskc2NvcGUuYXV0aG9yaXplZD10cnVlOyBjb25zb2xlLmxvZyhcIiRzY29wZS5hdXRob3JpemVkXCIsJHNjb3BlLmF1dGhvcml6ZWQpO30pO1xuICAgIFxufSk7XG5hcHAuY29udHJvbGxlcignYmFzaWMyJyxmdW5jdGlvbiAoJHNjb3BlLCRodHRwKXtcbiAgICAkc2NvcGUud29ya2luZz1cIkFuZ3VsYXJKUzJcIjtcbiAgICBcbn0pO1xuXG4iLCJcbmNvbnNvbGUubG9nKFwiaGVyZSBwdWJsaWMhXCIpO1xuYXBwPWFuZ3VsYXIubW9kdWxlKCdtYWluQXBwJyxbXSk7XG5tZXNzYWdlPVwibWVzc2FhYWFnZVwiO1xucmVxdWlyZShcIi4vc2VydmljZS9hdXRoLmpzXCIpO1xucmVxdWlyZShcIi4vc2VydmljZS9pbmZvLmpzXCIpO1xucmVxdWlyZShcIi4vY29udHJvbGxlci9iYXNpYy5qc1wiKTtcbnJlcXVpcmUoXCIuL2NvbXBvbmVudC91c2Vyc3RhdHVzLmpzXCIpO1xucmVxdWlyZShcIi4vY29tcG9uZW50L29ubGluZXVzZXJzLmpzXCIpO1xucmVxdWlyZShcIi4vY29tcG9uZW50L2N1cnJlbnRhZmZhaXJzLmpzXCIpO1xucmVxdWlyZShcIi4vY29tcG9uZW50L3NheXNvbWV0aGluZy5qc1wiKTtcbnJlcXVpcmUoXCIuL2NvbXBvbmVudC9iZXRzb21ldGhpbmcuanNcIik7XG5yZXF1aXJlKFwiLi9jb21wb25lbnQvdGFza3MuanNcIik7XG5yZXF1aXJlKFwiLi9jb21wb25lbnQvc2FtcGxldGFzay5qc1wiKTtcbnJlcXVpcmUoXCIuL2NvbXBvbmVudC9zaW1wbGVub3RpZi5qc1wiKTtcbnJlcXVpcmUoXCIuL2NvbXBvbmVudC9sb2NhdGlvbnMuanNcIik7XG5yZXF1aXJlKFwiLi9jb21wb25lbnQvbG9jYXRpb24uanNcIik7XG5yZXF1aXJlKFwiLi9jb21wb25lbnQvZXZlbnQuanNcIik7XG4vLyBicm93c2VyaWZ5IGNvbW1hbmQ6IGJyb3dzZXJpZnkgLS1kZWJ1ZyBtYWluYXBwLmpzIC1vIGJ1bmRsZS5qc1xuXG4iLCJjb25zb2xlLmxvZyhcIkF1dGggc3RhcnRlZFwiKTtcbmNvbnNvbGUubG9nKFwiSEVSRSBcIiArbWVzc2FnZSsgXCIgLlwiKTtcbmFwcC5zZXJ2aWNlKCdBdXRoJyxmdW5jdGlvbigkaHR0cCwkcm9vdFNjb3BlKXtcbiAgICB0aGlzLmF1dGhvcml6ZWQ9ZmFsc2U7XG4gICAgdmFyIHNlcnZpY2U9dGhpcztcbiAgICBzZXJ2aWNlLnVzZXI9XCJcIjtcbiAgICB0aGlzLmF1dGhlbnRpY2F0ZT1mdW5jdGlvbih1c2VyLHBhc3Mpe1xuXHQvLyRodHRwLmRlZmF1bHRzLmhlYWRlcnMucG9zdFtcIkNvbnRlbnQtVHlwZVwiXSA9IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCI7XG5cdCRodHRwKHttZXRob2Q6XCJQT1NUXCIsdXJsOiAnL2xvZ2luJywgZGF0YTp7XCJ1c2VyXCI6dXNlcixcInBhc3NcIjpwYXNzfVxuICAgICAgICAgICAgICAgXG5cdCAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzKXtcblx0XHQgIGNvbnNvbGUubG9nKFwic2VydmVyIHJlc3BvbmRlZFwiLCByZXMpO1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcblx0XHQgICAgICBjb25zb2xlLmxvZyhcImxvZ2luIHN1Y2Nlc3NmdWwgXCIrcmVzLmRhdGEudG9ja2VuKTtcblx0XHQgICAgICBzZXJ2aWNlLmF1dGhvcml6ZWQ9dHJ1ZTtcblx0XHQgICAgICBzZXJ2aWNlLnRvY2tlbj1yZXMuZGF0YS50b2NrZW47XG5cdFx0ICAgICAgc2VydmljZS51c2VyPXVzZXI7XG5cdFx0ICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdhdXRob3JpemVkJyk7XG4gICAgICAgICAgXHRcdCAgfSBlbHNle1xuXHRcdCAgICAgIGNvbnNvbGUubG9nKFwiaW52YWxpZCB1c2VybmFtZSBvciBwYXNzd29yZFwiKTtcblx0XHQgIH1cblx0ICAgICAgfSwgZnVuY3Rpb24ocmVzKXt9KTtcblx0XHRcdC8vXHQgIGlmICh1c2VyPT1cImFybWluXCIgJiYgcGFzcz09XCIxMjM0XCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuYXV0aG9yaXplZD10cnVlO1xuXHRcdFx0XHQgICAgICBcblx0XHRcdC8vXHQgICAgICB0aGlzLnVzZXI9XCJhcm1pblwiO1xuXHRcdFx0Ly9cdCAgICAgIHRoaXMucmVzb3VyY2VzPXt9O1xuXHRcdFx0Ly9cdCAgICAgIHRoaXMucmVzb3VyY2VzLm1vbmV5PTUwO1xuXHRcdFx0Ly9cdCAgICAgIHRoaXMucmVzb3VyY2VzLnRpbWU9MTAwO1xuXHRcdFx0Ly9cdCAgICAgIHRoaXMucmVzb3VyY2VzLnJlcD0xMDtcblx0XHRcdC8vXHQgICAgICBjb25zb2xlLmxvZyhcImxvZ2dlZCBpblwiKTtcblx0XHRcdC8vXHQgICAgICByZXR1cm4gdHJ1ZTtcblx0XHRcdC8vXHQgIH1cblx0XHRcdFx0ICByZXR1cm4gZmFsc2U7XG5cdFx0XHQgICAgICB9O1xuXG59KTtcbiIsImFwcC5zZXJ2aWNlKCdJbmZvJyxmdW5jdGlvbigkaHR0cCwkdGltZW91dCxBdXRoLCRyb290U2NvcGUpe1xuXG4gICAgdmFyIHNlcnZpY2U9dGhpcztcbiAgICBzZXJ2aWNlLm9ubGluZV9wbGF5ZXJzPXt9O1xuICAgIHNlcnZpY2UucmVzb3VyY2VzPXt9O1xuICAgIHNlcnZpY2UuYWxsX3BsYXllcnM9W107XG4gICAgc2VydmljZS5hbGxfZXZlbnRzPVtdO1xuICAgIHNlcnZpY2UuYWxsX3Rhc2tzPVtdO1xuICAgIHNlcnZpY2UubG9jYXRpb25zPVtdO1xuICAgIHNlcnZpY2UuZ3JvdXBzPVtdO1xuICAgIHNlcnZpY2UubG9naW5fdXBkYXRlPWZ1bmN0aW9uKCl7XG5cdGlmICghQXV0aC5hdXRob3JpemVkKSB7Y29uc29sZS5sb2coXCJsb2dpbl91cGRhdGUgbm90IHBvc3NpYmxlIG5vdCBsb2dnZWQgaW5cIik7IHJldHVybjt9XG5cdHZhciByZXE9e1wiZG9vZG9vXCI6XCJjaGljaGlcIn07XG5cdHJlcVtcInRvY2tlblwiXT1BdXRoLnRvY2tlbjtcblx0Y29uc29sZS5sb2coJ2xvZ2luX3VwZGF0ZSBpcyBjb25uZWN0aW5nIHNlcnZlcicpO1xuXHQkaHR0cCgge21ldGhvZDpcIlBPU1RcIix1cmw6XCIvbG9naW5JbmZvXCIsZGF0YTogcmVxfVxuXG5cdCAgICAgKS50aGVuKGZ1bmN0aW9uKHJlcyl7XG5cdFx0IGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcblxuXHRcdCBzZXJ2aWNlLmFsbF9ldmVudHM9cmVzLmRhdGEuaW5mby5ldmVudHM7XG5cdFx0IHNlcnZpY2UucmVzb3VyY2VzPXJlcy5kYXRhLmluZm8ucmVzb3VyY2VzO1xuXHRcdCBzZXJ2aWNlLnRhc2tzPXJlcy5kYXRhLmluZm8udGFza3M7XG5cdFx0IHNlcnZpY2UubG9jYXRpb25zPXJlcy5kYXRhLmluZm8ubG9jYXRpb25zO1xuICAgICAgICAgICAgICAgICBzZXJ2aWNlLmdyb3Vwcz1yZXMuZGF0YS5pbmZvLmdyb3VwcztcblxuXG5cblx0XHQgY29uc29sZS5sb2coXCJ0YXNrc1wiKTtcblx0XHQgY29uc29sZS5sb2coc2VydmljZS50YXNrcyk7XG5cdCAgICAgfVxuXHRcdCAgICAsZnVuY3Rpb24ocmVzKXtcblx0XHRcdGNvbnNvbGUubG9nKFwibG9naW5fdXBkYXRlIGZhaWxlZFwiKTtcblxuXHRcdCAgICB9KTt9O1xuICAgIHZhciB1cGRhdGU9ZnVuY3Rpb24oKXtcblx0cmVxPXtcImRvb2Rvb1wiOlwiY2hpY2hpXCJ9O1xuXHRpZiAoQXV0aC5hdXRob3JpemVkKSByZXFbXCJ0b2NrZW5cIl09QXV0aC50b2NrZW47XG5cdGNvbnNvbGUubG9nKCdJbmZvIGlzIGNvbm5lY3Rpbmcgc2VydmVyJyk7XG5cdCRodHRwKCB7bWV0aG9kOlwiUE9TVFwiLHVybDpcIi91cGRhdGVcIixkYXRhOiByZXF9XG5cblx0ICAgICApLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1cGRhdGluZy4uLlwiKTtcblx0XHQgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuXG5cdFx0IGNvbnNvbGUubG9nKFwiZW5kXCIpO1xuXHRcdCBpZiAocmVzLmRhdGEhPT1udWxsKXtcblx0XHQgICAgIGNvbnNvbGUubG9nKFwibm90IG51bGxcIik7XG5cblx0XHQgICAgIGlmIChcImluZm9cIiBpbiByZXMuZGF0YSkge1xuXHRcdFx0IGNvbnNvbGUubG9nKHJlcy5kYXRhLmluZm8uZXZlbnRzKTtcblx0XHRcdCAgY29uc29sZS5sb2coXCJuZXcgbG9jYXRpb25zOlwiKTtcblx0XHQgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEuaW5mby5sb2NhdGlvbnMpO1xuXHRcdFx0IHNlcnZpY2UucmVzb3VyY2VzPXJlcy5kYXRhLmluZm8ucmVzb3VyY2VzO1xuICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZpY2UuZ3JvdXBzPXJlcy5kYXRhLmluZm8uZ3JvdXBzO1xuXHRcdFx0IC8vc2VydmljZS5sb2NhdGlvbnM9cmVzLmRhdGEuaW5mby5sb2NhdGlvbnM7XG5cdFx0XHQgY29uc29sZS5sb2coc2VydmljZS5yZXNvdXJjZXMpO1xuXHRcdFx0IHZhciBuZXdfZXZlbnRzPXJlcy5kYXRhLmluZm8uZXZlbnRzO1xuXG5cblx0XHRcdCBuZXdfZXZlbnRzLmZvckVhY2goZnVuY3Rpb24oZXZlbnQpe1xuXHRcdFx0ICAgICB2YXIgYWxyZWFkeT1mYWxzZTtcblx0XHRcdCAgICAgc2VydmljZS5hbGxfZXZlbnRzLmZvckVhY2goZnVuY3Rpb24ocmVnZXZlbnQsaW5kZXgpe1xuXHRcdFx0XHQgaWYgKHJlZ2V2ZW50W1wiaWRcIl09PWV2ZW50W1wiaWRcIl0pe1xuXHRcdFx0XHQgICAgIHNlcnZpY2UuYWxsX2V2ZW50c1tpbmRleF09ZXZlbnQ7XG5cdFx0XHRcdCAgICAgYWxyZWFkeT10cnVlO31cblx0XHRcdCAgICAgfSk7XG5cdFx0XHQgICAgIGlmICghYWxyZWFkeSlcblx0XHRcdFx0IHNlcnZpY2UuYWxsX2V2ZW50cy5wdXNoKGV2ZW50KTsgY29uc29sZS5sb2coZXZlbnRbXCJpZFwiXSk7fSk7XG5cblx0XHRcdCByZXMuZGF0YS5pbmZvLmxvY2F0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGxvY2F0aW9uKXtcblx0XHRcdCAgICAgdmFyIGFscmVhZHk9ZmFsc2U7XG5cdFx0XHQgICAgIHNlcnZpY2UubG9jYXRpb25zLmZvckVhY2goZnVuY3Rpb24ocmVnbG9jYXRpb24saW5kZXgpe1xuXHRcdFx0XHQgaWYgKHJlZ2xvY2F0aW9uW1wiaGFzaFwiXT09bG9jYXRpb25bXCJoYXNoXCJdKXtcblx0XHRcdFx0ICAgICB2YXIgbW9yZT1zZXJ2aWNlLmxvY2F0aW9uc1tpbmRleF0ubW9yZTtcblx0XHRcdFx0ICAgICBzZXJ2aWNlLmxvY2F0aW9uc1tpbmRleF09bG9jYXRpb247XG5cdFx0XHRcdCAgICAgc2VydmljZS5sb2NhdGlvbnNbaW5kZXhdLm1vcmU9bW9yZTtcblx0XHRcdFx0ICAgICBjb25zb2xlLmxvZyhcIm1vcmUgZnJvbSBpbmZvIHNlcnZpY2U6XCIpO1xuXHRcdFx0XHQgICAgIGNvbnNvbGUubG9nKHNlcnZpY2UubG9jYXRpb25zW2luZGV4XSk7XG5cdFx0XHRcdCAgICAgYWxyZWFkeT10cnVlO31cblx0XHRcdCAgICAgfSk7XG5cdFx0XHQgICAgIGlmICghYWxyZWFkeSlcblx0XHRcdFx0IHNlcnZpY2UubG9jYXRpb25zLnB1c2gobG9jYXRpb24pOyBjb25zb2xlLmxvZyhsb2NhdGlvbltcImhhc2hcIl0pO30pO1xuXHRcdFx0IGlmIChyZXMuZGF0YS5pbmZvLmxvY2F0aW9ucy5sZW5ndGggPiAwKVxuXHRcdFx0IHskcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2xvY2F0aW9uX3VwZGF0ZScpO2NvbnNvbGUubG9nKFwibG9jYXRpb25fdXBkYXRlXCIpO31cblxuXG5cblx0XHRcdCBpZiAoT2JqZWN0LmtleXMocmVzLmRhdGEuaW5mby50YXNrcykubGVuZ3RoPjAgKSBjb25zb2xlLmxvZyhcIlRBU0tTOlwiKTtcblx0XHRcdCBjb25zb2xlLmxvZyhyZXMuZGF0YS5pbmZvLnRhc2tzKTtcblx0XHRcdCB2YXIgbmV3X3Rhc2tzPXJlcy5kYXRhLmluZm8udGFza3M7XG5cdFx0XHQgT2JqZWN0LmtleXMobmV3X3Rhc2tzKS5mb3JFYWNoKGZ1bmN0aW9uKHRhc2tfaWQpe1xuXHRcdFx0ICAgICBzZXJ2aWNlLnRhc2tzW3Rhc2tfaWRdPW5ld190YXNrc1t0YXNrX2lkXTsgY29uc29sZS5sb2cobmV3X3Rhc2tzW3Rhc2tfaWRdKTt9KTtcblxuXG5cblxuXG5cblx0XHQgICAgIH1cblx0XHQgfVxuXG5cdFx0IHNlcnZpY2Uub25saW5lX3BsYXllcnM9cmVzLmRhdGEub25saW5lOyR0aW1lb3V0KHVwZGF0ZSwxMDAwMCk7fSxmdW5jdGlvbihyZXMpe1xuXG5cdFx0ICAgICBjb25zb2xlLmxvZyhcIm9ubGluZSBwbGF5ZXJzIHVwZGF0ZSBmYWlsZWRcIik7XG5cdFx0ICAgICAkdGltZW91dCh1cGRhdGUsMTAwMDApO30pO307XG4gICAgdXBkYXRlKCk7XG59KTtcbiJdfQ==
