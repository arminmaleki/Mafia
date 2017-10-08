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
