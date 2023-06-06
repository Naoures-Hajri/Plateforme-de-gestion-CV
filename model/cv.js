const mongoose = require('mongoose');

const CV = mongoose.model(
    'CV',
    new mongoose.Schema({
        
            
        entete: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Entete'
          },
        contact: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Contact',
            unique: true, // Ensure uniqueness for the contact field
          },
        experience: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Experience'
          },
        formation:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Formation'
          },
        langue:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Langue'
          }, 
        competence:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Competence'
          }, 
        centreInteret:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CentreInteret'
          },         
            } 
    )
);
module.exports=CV;