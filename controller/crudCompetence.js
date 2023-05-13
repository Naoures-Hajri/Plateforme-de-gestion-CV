const competences = require('../model/competence')
exports.createComp = async(req, res) => {
    try{
    let competence = new competences({
       competence: req.body.competence
      
    });
    await competence.save();
    
    console.log("Save effectué avec succés!")
    res.json({competence})
    }catch(err){
        console.log(err)
    }
}
