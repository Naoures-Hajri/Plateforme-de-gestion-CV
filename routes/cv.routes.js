module.exports=app =>{
    const cv = require("../controller/crudCV")
    var router = require("express").Router()
//create new CV
router.post("/createCV", cv.createCV)

app.use("/cv" , router)
};