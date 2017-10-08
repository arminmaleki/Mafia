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

