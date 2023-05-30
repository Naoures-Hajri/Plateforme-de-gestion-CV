module.exports= app =>{
    const entete = require("../controller/crudEntete")
    var router = require("express").Router()
//create new Entete
router.post("/createEntete", entete.createEntete)
app.use("/entete" , router)
};