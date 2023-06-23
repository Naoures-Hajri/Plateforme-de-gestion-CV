const experiences = require('../model/experience')
exports.findallExp= async(req,res)=>{
    try{
    await experiences.find({})
    .then(result=>{res.send(result)})
    }catch(err){
        console.log(err)
    }
}
exports.createExperience = async(req, res) => {
    
    
    const experience = new experiences({experience:req.body});
    try{const e1 = await experience.save()
        console.log("Save effectué avec succés!")
        res.status(200).json({_id:e1._id})

    }catch(err){
        console.log(err)
        res.send('Error' + err)
    }
    
    
    
    
}