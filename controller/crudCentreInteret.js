const centreinterets = require('../model/centreInteret')
exports.createInteret = async(req, res) => {
    try{
        console.log('Request body:', req.body); 
        const { interetId, interet} = req.body;
    let newInteret = new centreinterets({
        interetId,
        interet
      
    });
    const savedInteret=await newInteret.save();
    
    console.log("Save effectué avec succés!")
    res.json({interetId:savedInteret._id})
    }catch(err){
        console.log(err)
    }
}