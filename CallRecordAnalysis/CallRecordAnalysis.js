let mongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017"
let fs = require("fs");

let jsonData = fs.readFileSync("call_data.json");
let jsonDataString = jsonData.toString();
let CallData = JSON.parse(jsonDataString);

mongoClient.connect(url, {useUnifiedTopology: true },(err1,client)=>{
    if(!err1){
        let db = client.db("meanstack");
        db.collection("Product").insertMany(CallData,(err2,result)=>{
            if(!err2){
                console.log("Number inserted = ", result.insertedCount);
            }else {
                console.log(err2.message);
            }
            client.close();    
        });
            
    }
});