const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser');
const cors = require("cors")

const app = express()
const dbUrl="mongodb+srv://admin:admin@cluster0.scwf6qx.mongodb.net/CV?retryWrites=true&w=majority"

app.use(cors())
app.use(express.json())
// Parse JSON bodies
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
require("./routes/contact.routes")(app);
require('./routes/competence.routes')(app);
require('./routes/centreInteret.routes')(app);
require('./routes/langue.routes')(app);
require('./routes/experience.routes')(app);
require('./routes/formation.routes')(app);
require('./routes/entete.routes')(app);
require('./routes/cv.routes')(app);
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

