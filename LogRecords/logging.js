class login{
    constructor(name, age, gender, email, timestamp){
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.email = email;
        this.timestamp = timestamp;
    }
}
function getLoginInformation(){
    let obj =  require("readline-sync");
	let name = obj.question("Enter your name: ");
	let age = obj.question("Enter your age: ");
	let gender = obj.question("Enter your gender: ");
	let email = obj.question("Enter your email: ");
    let timestamp = getTimestamp()
    debugger;
    let newLogin = new login(name, age, gender, email, timestamp);
    return newLogin;
}
function getTimestamp(){
    let date_ob = new Date();
	let date = ("0" + date_ob.getDate()).slice(-2);
	let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
	let year = date_ob.getFullYear();
	let hours = date_ob.getHours()%12;
	let minutes = date_ob.getMinutes();
	let seconds = date_ob.getSeconds();
    timestamp = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    debugger;
    return timestamp
}
module.exports = {getLoginInformation, getTimestamp, login}