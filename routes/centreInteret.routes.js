module.exports = app =>{
    const centreInteret = require('../controller/crudCentreInteret')
    const router = require("express").Router()
    // create new centreInteret
    router.post("/createCentre", centreInteret.createInteret)
    app.use("/competence", router)
}