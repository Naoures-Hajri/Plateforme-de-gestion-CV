const mongoose = require('mongoose');

const Formation = mongoose.model(
    'Formation',
    new mongoose.Schema({
        formation:[{
            dateDeb:{type:Date},
            dateFin: {type:Date},
            diplome: {type:String},
            etablissement:{type:String},
             }]
            })
);
module.exports=Formation;