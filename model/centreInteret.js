const mongoose = require('mongoose');
const CentreInteret = mongoose.model(
    'CentreInteret',
    new mongoose.Schema({
        interetId : String,
        interet :[{type:String}]
    })
);
module.exports=CentreInteret;