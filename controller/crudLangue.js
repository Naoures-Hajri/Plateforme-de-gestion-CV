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
    
    console.log('yass22',req.body)
    const langue = new langues({langue:req.body});
    try{const e1 = await langue.save()
        res.status(200).json({langue})

    }catch(err){
        console.log(err)
        res.send('Error' + err)
    }
    
    
    
    
}