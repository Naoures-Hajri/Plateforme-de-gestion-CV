
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const app = express();

const contacts = require('../model/contact')
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
exports.findallC= async(req,res)=>{
    try{
    await contacts.find({})
    .then(result=>{res.send(result)})
    }catch(err){
        console.log(err)
    }
}
exports.createcontact = async (req, res) => {
    try {
      console.log('Request body:', req.body); 
      const { contactId,tel, mail, adresse } = req.body;
  
      // Create a new instance of the Contact model
      const newContact = new contacts({
        contactId,
        tel,
        mail,
        adresse
      });
  
      // Save the contact to the database
      const savedContact = await newContact.save();
  
      console.log("Save effectué avec succès!");
      res.json({ contactId: savedContact._id});
    } catch (error) {
      console.error('Error saving contact:', error);
      res.status(500).json({ error: 'Failed to save contact' });
    }
  };

exports.deleteContact = async(req, res) => {
    try{
        await contacts.findOneAndDelete({_id:req.params.id});
        res.send("Supprimé avec succés!")
    }catch(err){
        res.send(err)
    }
}
exports.updateContact = async(req, res) => {
    try{
        await contacts.findOneAndUpdate({_id:req.params.id},{
            mail: req.body.mail});
        res.send("mise à jour avec succés")    
        
    }catch(err){
        res.send(err)
    }

}

