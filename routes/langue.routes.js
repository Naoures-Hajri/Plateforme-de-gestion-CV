module.exports=app =>{
    const langue = require("../controller/crudLangue.js")
    var router = require("express").Router()
//create new Langue
router.post("/createLangue", langue.createlangue)
app.use("/langue" , router)
};