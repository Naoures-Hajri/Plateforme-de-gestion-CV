const mongoose = require('mongoose')
const express = require('express')
const cors = require("cors")
var corsOptions = {
    origin:"http://localhost:8081"
  }
const app = express()
const dbUrl="mongodb+srv://admin:admin@cluster0.scwf6qx.mongodb.net/Project?retryWrites=true&w=majority"

app.use(cors(corsOptions))
app.use(express.json())

mongoose.connect(dbUrl)
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