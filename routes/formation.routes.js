module.exports=app =>{
    const formation = require("../controller/crudFormation.js")
    var router = require("express").Router()
//create new Formation
router.post("/createFormation", formation.createFormation)
app.use("/formation" , router)
};