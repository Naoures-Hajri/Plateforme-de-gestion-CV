const mongoose = require('mongoose');

const Contact = mongoose.model(
    'Contact',
    new mongoose.Schema({
        tel :{
            type: Number,
            required: true} ,
        mail :{
            type: String,
            required: true}  ,
        adresse:{
            type: String,
            required: true} 

    })
);
module.exports=Contact;