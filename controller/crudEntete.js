const entetes = require('../model/entete')
exports.findallEnt= async(req,res)=>{
    try{
    await entetes.find({})
    .then(result=>{res.send(result)})
    }catch(err){
        console.log(err)
    }
}
exports.createEntete = async(req, res) => {
    try{
    let entete = new entetes({
       image: req.body.image,
       nom: req.body.nom,
       prenom:req.body.prenom,
       profession:req.body.profession,
    });
    await entete.save();
    
    console.log("Save effectué avec succés!")
    res.json({entete})
    }catch(err){
        console.log(err)
    }
}