const mongoose = require('mongoose')
mongoose.Promise=global.Promise;
const db ={};
db.mongoose=mongoose;
db.contact=require('./contact')
db.competence=require('./competence')
db.centreInteret=require('./centreInteret')
module.exports=db;