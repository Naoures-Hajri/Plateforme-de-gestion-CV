module.exports=app =>{
    const contact = require("../controller/crudContact.js")
    var router = require("express").Router()
//create new Contact
router.post("/createCont", contact.createcontact)
//get Contact
router.get("/allContact",contact.findallC)
//delete Contact
router.delete("/deleteContact/:id",contact.deleteContact)
//update Contact
router.put('/updateContact/:id',contact.updateContact)

app.use("/contact" , router)
};
