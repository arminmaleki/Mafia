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
			     if (!service.tasks[task_id])  $rootScope.$broadcast('new task');
			     service.tasks[task_id]=new_tasks[task_id]; console.log(new_tasks[task_id]);});






		     }
		 }

		 service.online_players=res.data.online;$timeout(update,10000);},function(res){

		     console.log("online players update failed");
		     $timeout(update,10000);});};
    update();
});
