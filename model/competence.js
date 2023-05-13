const mongoose = require('mongoose');
const Competence = mongoose.model(
    'Competence',
    new mongoose.Schema({
        competence :[{type:String}]
    })
);
module.exports=Competence;