module.exports = app =>{
    const competence = require('../controller/crudCompetence')
    const router = require("express").Router()
    // create new competence
    router.post("/createComp", competence.createComp)
    //get ContactByID
    router.get("/getCompetence/:id",competence.getCompetenceByID)
    app.use("/competence", router)
}