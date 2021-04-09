let fs = require("fs");
let http = require("http");
let url = require("url");
let port=9999;
let tasks = new Array();
let taskLoginHTML = `
    <form action="/store" method="get">
        <label>Employee ID:</label>
        <input type="number" name="empid"/><br/>
        <label>Task ID:</label>
        <input type="text" name="taskid"/><br/>
        <label>Task:</label>
        <input type="text" name="task"/><br/>
        <label>Deadline:</label>
        <input type="text" name="deadline"/><br/>
        <input type="submit" value="Submit!"/>
        <input type="reset" value="reset"/>
    </form>
`
let displayHTML = `
    <form action="/display" method="get">
        <input type="submit" value="Display"/>
    </form> 
`
let deleteHTML = `
    <form action="/delete" method="get">
        <label>Task ID:</label>
        <input type="number" name="taskid"/><br/>
        <input type="submit" value="Delete"/>
    </form>
`

function duplicateIDs(currTaskID){
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].taskId == currTaskID){
            return true;
        }
    }
    return false;
}

let server = http.createServer((req,res)=> {
    res.setHeader("content-type","text/html");
    res.write(taskLoginHTML);
    res.write(deleteHTML);
    res.write(displayHTML);
    if(req.url != "/favicon.ico"){
        let pathInfo = url.parse(req.url,true).pathname;
        let urlDetails = req.url;
        if(pathInfo=="/store"){
            let data = url.parse(urlDetails,true).query;
            if(duplicateIDs(data.taskid) == true){
                res.write("Can't have duplicate task IDs!");
            }
            else if(data.empid == "" || data.taskid == "" || data.task == "" || data.deadline == ""){
                res.write("Please fill out all fields!");
            }
            else{
                let taskData = {employeeId:data.empid, taskId:data.taskid, task:data.task, deadline:data.deadline};
                tasks.push(taskData);
                let taskJSONData = JSON.stringify(tasks);
                fs.writeFileSync("tasks.json", taskJSONData);
            }
        }else if(pathInfo=="/delete"){
            let data = url.parse(urlDetails,true).query;
            let reqTaskId = data.taskid;
            if(reqTaskId == ""){
                res.write("Please give an id!");
            }
            else{
                let jsonData = fs.readFileSync("tasks.json");
                let jsonDataString = jsonData.toString();
                let jsonTaskArray = JSON.parse(jsonDataString);
                let idPresent = false;
                for(let i = 0; i < jsonTaskArray.length; i ++){
                    console.log("reqTaskId ", reqTaskId);
                    console.log("json ", jsonTaskArray[i].taskId);
                    if(reqTaskId == jsonTaskArray[i].taskId){
                        idPresent = true;
                        jsonTaskArray.splice(i,1);
                        let newTaskArray = JSON.stringify(jsonTaskArray);
                        fs.writeFileSync("tasks.json", newTaskArray);
                        break;
                    }
                }
                if(idPresent == false){
                    res.write("ID not found!");
                }
            }
        }else if(pathInfo=="/display"){
                // read from file 
                // convert to json 
                //iterator loop 
                // create tableData variable using backticks 
                /*
                    <table>
                    <tr>
                            <td>${variableName}</td>
                    </tr>
                    </table>
                    res.end(tableDatavariable);
                */
        }
    }
    res.end();
});
server.listen(port,()=>console.log(`Server running on port number ${port}`));