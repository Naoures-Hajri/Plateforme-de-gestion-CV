module.exports=app =>{
    const cv = require("../controller/crudCV")
    var router = require("express").Router()
//create new CV
router.post("/createCV", cv.createCV)
//get CVByID
router.get("/getCV/:id",cv.getCVById)
app.use("/cv" , router)
};