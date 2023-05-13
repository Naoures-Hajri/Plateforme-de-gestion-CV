const mongoose = require('mongoose');

const Contact = mongoose.model(
    'Contact',
    new mongoose.Schema({
        tel : String,
            
        mail : String,
            
        adresse :  String,
            } 
    )
);
module.exports=Contact;