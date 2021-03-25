var clientNumber = 1;
var currRow = 0;
var totalBudget = 0;
function retrieveFromSession() {
    for(let i = 1; i < sessionStorage.length + 1; i++){
        var obj = sessionStorage.getItem("clientInfo" + i);
        insertNewRecord(JSON.parse(obj))
        console.log(obj);
    }
}
function onFormSubmit(){
    //alert("Event generated...")
    var data = readFormData();
    sessionStorage.setItem("clientInfo" + clientNumber, JSON.stringify(data));
    clientNumber++;
    resetData();
    
}

function readFormData() {
    var obj = {}    // client object
    obj.clientName = document.getElementById("clientName").value;
    obj.projectName = document.getElementById("projectName").value;
    obj.budget = document.getElementById("budget").value;
    console.log(obj);
    return obj; 
}
function insertNewRecord(data){
    var table = document.getElementById("clientList")
    var body = table.getElementsByTagName("tbody")[0];
    console.log("body length = ", body.length - 1);
    var newRow = body.insertRow(body.length);  // row created 

    var cell1 = newRow.insertCell(0);          // cell created 
    cell1.innerHTML=data.clientName;                 // value placed 

    var cell2 = newRow.insertCell(1);          // cell created 
    cell2.innerHTML=data.projectName;                 // value placed

    var cell3 = newRow.insertCell(2);          // cell created 
    cell3.innerHTML=data.budget;                 // value placed
    totalBudget += parseInt(data.budget);
}
function printTotalBudget(){
    document.write("Total Budget = " + totalBudget)
}
function resetData() {
    document.getElementById("clientName").value="";
    document.getElementById("projectName").value="";
    document.getElementById("budget").value="";
}