
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

