const mongoose = require("mongoose");
var moment = require('moment');


const infoschema = new mongoose.Schema({

    file:{type:String },
    path : {type:String},
    id:{type:String},
    name:{type:String},
    password:{type:String},
    mobileno:{type:Number},
    paise:{type:Number},
    Body:{type:String},
    statusDisappearDate: { type: Date, default: moment().add(2, 'minute').toDate() },
//     likes: [
//         {
//             user: {
//                 type: Schema.Types.ObjectId,
//                 ref: 'users'
//             }
//         }
//     ],
//     comments: [
//         {
//             user: {
//                 type: Schema.Types.ObjectId,
//                 ref: 'users'
//             },
//             text: {
//                 type: String,
//                 required: true
//             },
//             name: {
//                 type: String,
//                 required: true
//             },
//             date: {
//                 type: Date,
//                 default: Date.now
//             }
//         }
//     ]
       
 })     


module.exports = mongoose.model('infoschema',infoschema)