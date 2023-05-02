const mongoose = require('mongoose')
mongoose.Promise=global.Promise;
const db ={};
db.mongoose=mongoose;
db.contact=require('./contact')
module.exports=db;