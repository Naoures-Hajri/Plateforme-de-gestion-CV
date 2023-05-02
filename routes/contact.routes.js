module.exports=app =>{
    const contact = require("../controller/crudContact.js")
    var router = require("express").Router()
//create new Contact
router.post("/createCont", contact.createcontact)
//get Contact
router.get("/allContact",contact.contactGetAll)
app.use("/contact" , router)
};
