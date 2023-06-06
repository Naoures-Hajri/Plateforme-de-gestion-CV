const mongoose = require('mongoose');
const Competence = mongoose.model(
    'Competence',
    new mongoose.Schema({
        competenceId : String,
        competence :[{type:String}]
    })
);
module.exports=Competence;