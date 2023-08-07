const mongoose = require('mongoose');

const Contact = mongoose.model(
    'Contact',
    new mongoose.Schema({
        contactId : mongoose.Types.ObjectId,
        tel : String,
            
        mail : String,
            
        adresse :  String,
            } 
    )
);
module.exports=Contact;