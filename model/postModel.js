const mongoose = require('mongoose');
const {Schema} = mongoose;
const objectId = mongoose.ObjectId;

const postSchema = new Schema({
    title:String,
    description:String,
    user:{type:objectId, ref:"login"}
})
const model = mongoose.model("postDetails", postSchema)

module.exports = model