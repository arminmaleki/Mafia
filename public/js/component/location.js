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


