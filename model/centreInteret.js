const mongoose = require('mongoose');
const CentreInteret = mongoose.model(
    'CentreInteret',
    new mongoose.Schema({
        interet :[{type:String}]
    })
);
module.exports=CentreInteret;