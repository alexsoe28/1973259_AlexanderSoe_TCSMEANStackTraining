let app = require("express")();
let http = require("http").Server(app);   // to load the library we have run port number using hhtp module 
let io = require("socket.io")(http);
let mongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017"

app.get("/",(req,res)=> {
    res.sendFile(__dirname+"/index.html");
})

io.on("connection",(socket)=> {
    console.log("Client connected to application.....");
    let name = "";
    let message = "";
    socket.on("chat",(msg)=> {
        if(msg.includes("Name:")){
            name = msg.slice(6);
        }
        else{
            message = msg.slice(9);
        }
        if(name && message){
            mongoClient.connect(url, {useUnifiedTopology: true },(err1,client)=>{
                if(!err1){
                    let db = client.db("meanstack");
                    db.collection("ChatLog").insertOne({name: name, message: message},(err2,result)=>{
                            if(!err2){
                                console.log(result.insertedCount + " message has been sent!");
                            }else {
                                console.log(err2.message);
                            }
                            client.close();    
                        });
                        
                    }
            });
        }
    })
})
http.listen(9090,()=>console.log('server running on port number 9090'));