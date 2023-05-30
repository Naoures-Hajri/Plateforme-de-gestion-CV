module.exports=app =>{
    const experience = require("../controller/crudExperience.js")
    var router = require("express").Router()
//create new Experience
router.post("/createExperience", experience.createExperience)
app.use("/experience" , router)
};