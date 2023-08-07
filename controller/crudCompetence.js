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
exports.getCompetenceByID = async (req, res) => {
    try {
      const competence = await competences.findById(req.params.id);
  
      if (!competence) {
        return res.status(404).json({ message: 'Competence not found' });
      }
  
      res.status(200).json({ competence });
    } catch (error) {
      console.error('Error fetching competence:', error);
      res.status(500).json({ message: 'Error fetching competence' });
    }
  };
