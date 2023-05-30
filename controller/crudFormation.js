const formations = require('../model/formation')
exports.findallFormation= async(req,res)=>{
    try{
    await formations.find({})
    .then(result=>{res.send(result)})
    }catch(err){
        console.log(err)
    }
}
exports.createFormation = async(req, res) => {
    
    
    const formation = new formations({formation:req.body});
    try{const e1 = await formation.save()
        res.status(200).json({formation})

    }catch(err){
        console.log(err)
        res.send('Error' + err)
    }
    
    
    
    
}