const mongoose = require('mongoose')
const express = require('express')
const cors = require("cors")
var corsOptions = {
    origin:"http://localhost:8081"
  }
const app = express()
const dbConf=require('./model');
const db= require('./config/db')
app.use(cors(corsOptions))
app.use(express.json())

dbConf.mongoose.connect(`mongodb://${db.Host}:${db.Port}/${db.DB}`,{
  useNewUrlParser : true,
  useUnifiedTopology : true
})
.then(() =>{
  console.log("Successfully connect to MongoDB");
 // initial();
})
.catch(err => {
  console.error("connection error", err);
  process.exit();
});

app.get('/',(req,res)=>{
    res.json({message:"Welcome"})
  });

require("./routes/contact.routes.js")(app);

//set port, listen for request 
const Port = process.env.Port || 8081;
app.listen(Port, ()=>{
  console.log(`Server is running on port ${Port}`)
})