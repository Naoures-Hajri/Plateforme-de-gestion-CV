

const Contact = require('../model/contact')
exports.contactGetAll = (req, res, next) => {
    //find all database objects of schema type contact
    Contact.find((err, foundObjects) => {
      if (err) return next(err);
      //return found objects to client
      return res.status(200).json(foundObjects).end();
    });}
exports.createcontact = (req, res) => {
   if(!req.body.tel){
      console.log ("tel cannot be empty")
   }
   if(!req.body.mail){
    console.log ("mail cannot be empty")
   }
   if(!req.body.adresse){
    console.log ("adresse cannot be empty")
    }
    const contact = new contacts({
       tel: req.body.tel,
       mail: req.body.mail,
       adress:req.body.adresse,
    });
    contact.save().then((res, err)=>{
     if(err){
      console.log(err)
     }else {
      console.log(res)
     }
    })
}