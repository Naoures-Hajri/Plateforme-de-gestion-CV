module.exports = app =>{
    const competence = require('../controller/crudCompetence')
    const router = require("express").Router()
    // create new competence
    router.post("/createComp", competence.createComp)
    app.use("/competence", router)
}