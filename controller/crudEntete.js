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
        try {
            console.log('Request body:', req.body); 
            const { enteteId,image, nom, prenom, profession } = req.body;
    let entete = new entetes({
       enteteId,
       image,
       nom,
       prenom,
       profession
    });
    const savedEntete= await entete.save();
    
    console.log("Save effectué avec succés!")
    res.json({enteteId: savedEntete._id})
    } catch(err){
        console.error('Error saving entete:', error);
        res.status(500).json({ error: 'Failed to save entete' });
      }


}




