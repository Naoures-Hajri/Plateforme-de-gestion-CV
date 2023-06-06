const competences = require('../model/competence')
exports.createComp = async(req, res) => {
    try{
        console.log('Request body:', req.body); 
        const { competenceId, competence} = req.body;
    let newCompetence = new competences({
        competenceId,
        competence
      
    });
    const savedCompetence=await newCompetence.save();
    
    console.log("Save effectué avec succés!")
    res.json({competenceId:savedCompetence._id})
    }catch(err){
        console.log(err)
    }
}
