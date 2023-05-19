const mongoose = require('mongoose');

const Langue = mongoose.model(
    'Langue',
    new mongoose.Schema([{
        titre : {type:String},
            
        niveau : {type:String},
            
        
            } ]
    )
);
module.exports=Langue;