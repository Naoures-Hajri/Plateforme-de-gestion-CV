const mongoose = require('mongoose');

const Langue = mongoose.model(
    'Langue',
    new mongoose.Schema({
        langueId : String,
        langue:[{
            type:String}]
            })
);
module.exports=Langue;