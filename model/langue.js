const mongoose = require('mongoose');

const Langue = mongoose.model(
    'Langue',
    new mongoose.Schema({
        langue:[{
            langue : {type:String},
            
        niveau : {type:String},
            
        
             }]
            })
);
module.exports=Langue;