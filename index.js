const mongoose = require('mongoose')
const express = require('express')
const cors = require("cors")

const app = express()
const dbUrl="mongodb+srv://admin:admin@cluster0.scwf6qx.mongodb.net/CV?retryWrites=true&w=majority"

app.use(cors())
app.use(express.json())
require("./routes/contact.routes")(app);
require('./routes/competence.routes')(app);
require('./routes/centreInteret.routes')(app)
//set port, listen for request 
const Port = process.env.Port || 8081;
app.listen(Port, ()=>{
  console.log(`Server is running on port ${Port}`)
})
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

