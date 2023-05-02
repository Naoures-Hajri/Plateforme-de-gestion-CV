const mongoose = require('mongoose');
const Contact = mongoose.model(
    'Contact',
    new mongoose.Schema({
        tel : Number,
        mail : String,
        adresse : String

    })
);
module.exports=Contact;