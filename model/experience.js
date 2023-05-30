const mongoose = require('mongoose');

const Experience = mongoose.model(
    'Experience',
    new mongoose.Schema({
        experience:[{
            dateDeb:{type:Date},
            dateFin: {type:Date},
            entreprise: {type:String},
            poste:{type:String},
            description:{type: String},
             }]
            })
);
module.exports=Experience;