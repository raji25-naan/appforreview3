const mongoose = require("mongoose");

const mobileschema = new mongoose.Schema({

    MobileNo:{type:String , required:true}
})

module.exports = mongoose.model('mobileschema',mobileschema)