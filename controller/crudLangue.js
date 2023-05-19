const langues = require('../model/langue')
exports.findallC= async(req,res)=>{
    try{
    await langues.find({})
    .then(result=>{res.send(result)})
    }catch(err){
        console.log(err)
    }
}
exports.createlangue = async(req, res) => {
    try{console.log(req.body.titre)
    let langue = new langues({
       titre: req.body.titre,
       niveau: req.body.niveau,
    });
    await langue.save();
    
    console.log("Save effectué avec succés!")
    res.json({langue})
    }catch(err){
        console.log(err)
    }
}