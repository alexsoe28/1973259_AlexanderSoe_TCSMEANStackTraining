let app = require("express")();
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
let mongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017";
/*
index.html                  get 
retreive all course         get
create, delete and update   post 
*/
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.get("/addCourse",(req,res)=>{
    res.sendFile(__dirname+"/addCourse.html");
})

app.get("/updateCourse",(req,res)=>{
    res.sendFile(__dirname+"/updateCourse.html");
})

app.get("/deleteCourse",(req,res)=>{
    res.sendFile(__dirname+"/deleteCourse.html");
})

app.get("/fetchCourse",(req,res)=>{
    res.sendFile(__dirname+"/fetchCourse.html");
})

app.post("/addCourse",(req,res)=> {
    let id = req.body.id;
    let name = req.body.name;
    let desc = req.body.desc;
    let amt = req.body.amount;
    if(id == "" || name == "" || desc == "" || amt == ""){
        res.send("All fields required!");
    }
    else{
        let courseData = {courseId:id, courseName:name, description:desc, amount:amt};
        mongoClient.connect(url,{ useUnifiedTopology: true },(err1,client)=> {
            if(!err1){
                let db = client.db("meanstack");
                db.collection("CourseInformation").insertOne(courseData,(err2,result)=> {
                    if(!err2){
                        if(result.insertedCount>0){
                            res.send("Record inserted successfully");
                        }else {
                            res.send("Record didn't insert");
                        }
                    }
                    client.close();
                });           
            }
        });
    }
})

app.post("/updateCourse",(req,res)=> {
    let id = req.body.id;
    let amt = req.body.amount;
    if(id == "" || amt == ""){
        res.send("All fields required!");
    }
    else{
        mongoClient.connect(url,{ useUnifiedTopology: true },(err1,client)=> {
            if(!err1){
                let db = client.db("meanstack");
                db.collection("CourseInformation").updateOne({courseId:id},{$set:{amount:amt}},(err2,result)=> {
                    if(!err2){
                           // console.log(result);
                           if(result.modifiedCount>0){
                                res.send("Record updated successfully")
                           }else {
                                res.send("Record didn't update");
                           }
                    }
                    client.close();
                })           
            }
        })
    }
})

app.post("/deleteCourse",(req,res)=> {
    let id = req.body.id;
    if(id == ""){
        res.send("id field required!");
    }
    else{
        mongoClient.connect(url,{ useUnifiedTopology: true },(err1,client)=> {
            if(!err1){
                let db = client.db("meanstack");
                db.collection("CourseInformation").deleteOne({courseId:id},(err2,result)=> {
                    if(!err2){
                        if(result.deletedCount>0){
                                res.send("Record deleted successfully")
                        }else {
                                res.send("Record not present")
                        }
        
                    }
                    client.close();
                })           
            }
        })
    }
})

app.post("/fetchCourse",(req,res)=> {
    mongoClient.connect(url,{ useUnifiedTopology: true },(err1,client)=> {
        if(!err1){
            let db = client.db("meanstack");
            // let cursor = db.collection("Product").find();
            let cursor = db.collection("CourseInformation").find({}).toArray(function(err, result){
                if(!err){
                    res.setHeader("content-type","text/html");
                    let table = `
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta http-equiv="X-UA-Compatible" content="IE=edge">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Fetch Courses</title>
                        </head>
                        <body>
                            <center><h1>List of Courses</h1>
                            <table style="border: 1px solid black; height: 100%">
                                <tr>
                                    <th style="border: 1px solid black;">Course Id</th>
                                    <th style="border: 1px solid black;">Course Name</th>
                                    <th style="border: 1px solid black;">Description</th>
                                    <th style="border: 1px solid black;">Amount</th>
                                </tr>
                    `;
                    for(let i = 0; i < result.length; i++){
                        let tableEntry = `
                            <tr>
                                <td style="border: 1px solid black;">${result[i].courseId}</td>
                                <td style="border: 1px solid black;">${result[i].courseName}</td>
                                <td style="border: 1px solid black;">${result[i].description}</td>
                                <td style="border: 1px solid black;">${result[i].amount}</td>
                            </tr>
                        `;
                        table += tableEntry;   
                    }
                    table += `
                        </table>
                        <center>
                        </body>
                        </html>
                    `
                    res.send(table);
                    client.close();
                }
            });
        }
    })
})
app.listen(9090,()=>console.log("running.."));