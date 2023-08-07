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
    
    
  /*   const langue = new langues({langue:req.body});
    try{const savedLangue = await langue.save()
        res.json({ _id: savedLangue._id});


    }catch(err){
        console.log(err)
        res.send('Error' + err)
    } */
   
    try{
        console.log('Request body:', req.body); 
        const { langueId, langue} = req.body;
    let newLangue = new langues({
        langueId,
        langue
      
    });
    const savedLangue=await newLangue.save();
    
    console.log("Save effectué avec succés!")
    res.json({langueId:savedLangue._id})
    }catch(err){
        console.log(err)
    }
    
    
    
}