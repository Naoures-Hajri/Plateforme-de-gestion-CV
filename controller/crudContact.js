

const contacts = require('../model/contact')
exports.findallC= async(req,res)=>{
    try{
    await contacts.find({})
    .then(result=>{res.send(result)})
    }catch(err){
        console.log(err)
    }
}
exports.createcontact = async(req, res) => {
    try{
    let contact = new contacts({
       tel: req.body.tel,
       mail: req.body.mail,
       adresse:req.body.adresse,
    });
    await contact.save();
    
    console.log("Save effectué avec succés!")
    res.json({contact})
    }catch(err){
        console.log(err)
    }
}
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