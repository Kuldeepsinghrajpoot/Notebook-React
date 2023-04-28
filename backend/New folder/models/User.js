const  mongoose  = require("mongoose");
const { Schema } = mongoose;

const Data = new Schema({
 name:{
    type:String,
    require:true
 },
 email:{
    type:String,
    require:true,
    unique:true
 },
 password:{
    type:String,
    require:true
 },
 date: { type: Date, default: Date.now }
});
 
let user = mongoose.model("User",Data);

module.exports = user