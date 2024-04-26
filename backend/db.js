const mongoose = require('mongoose');

var mongoURL = "mongodb://localhost:27017/TOURISM_SITE";

mongoose.connect(mongoURL, {useUnifiedTopology : true , useNewUrlParser:true} )

var connection = mongoose.connection

connection.on("error", ()=>{
    console.log("Mongo DB connection failed");
})
connection.on("connected" , ()=>{
    console.log("mongo DB connection Successfull !");
})

module.exports = mongoose;