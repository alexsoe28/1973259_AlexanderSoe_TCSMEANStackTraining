const lib = require("./logging");
let fs = require("fs");

let logins = new Array();
while(true){
	loginData = lib.getLoginInformation();
	logins.push(loginData);
	let jsonData = JSON.stringify(logins);
    fs.writeFileSync("log.json", jsonData);
	debugger;
}
