const mongoose = require('mongoose');
const Entete = mongoose.model(
    'Entete',
    new mongoose.Schema({
        enteteId: String,
        image : String,
            
        nom : String,
            
        prenom :  String,

        profession : String,
            } 
    )
);
module.exports=Entete;