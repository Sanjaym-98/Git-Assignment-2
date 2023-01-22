const mongoose = require('mongoose')
const {Schema} = mongoose;



const regSchema = new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String}
})

const model = mongoose.model("login", regSchema);

module.exports = model;