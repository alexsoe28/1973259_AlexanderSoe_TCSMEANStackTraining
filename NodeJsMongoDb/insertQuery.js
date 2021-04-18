let mongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017";
mongoClient.connect(url,{ useUnifiedTopology: true },(err1, client)=>{
    if(!err1){
        let db = client.db("meanstack");
        db.collection("Product").insertOne({_id:100,pname:"TV",price:55000},(err2, result)=>{
            if(!err2){
                console.log(result);
            }
            else{
                console.log(err);
            }
            client.close();
        });
    }
});