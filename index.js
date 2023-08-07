const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser');
const cors = require("cors")
const uploadFile = require('./routes/file.routes');
const newCV = require('./routes/newCV.routes');
const path = require('path');
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
// Utiliser les routes de téléchargement
app.use(uploadFile);
app.use(newCV);
require("./routes/contact.routes")(app);
require('./routes/competence.routes')(app);
require('./routes/centreInteret.routes')(app);
require('./routes/langue.routes')(app);
require('./routes/experience.routes')(app);
require('./routes/formation.routes')(app);
require('./routes/entete.routes')(app);
require('./routes/cv.routes')(app);


// Route pour servir le fichier HTML du modèle de CV
app.get('/api/cv', (req, res) => {
  const templatePath = path.join(__dirname, 'templates/resume1.html'); // Chemin du modèle de CV HTML

  // Lire le contenu du fichier HTML et le renvoyer en tant que réponse
  res.sendFile(templatePath);
});

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

