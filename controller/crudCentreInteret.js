const centreinterets = require('../model/centreInteret')
exports.createInteret = async(req, res) => {
    try{
    let interet = new centreinterets({
       interet: req.body.interet
      
    });
    await interet.save();
    
    console.log("Save effectué avec succés!")
    res.json({interet})
    }catch(err){
        console.log(err)
    }
}