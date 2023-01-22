const mongoose = require("mongoose")

async function connection(){
    await mongoose.connect('mongodb://localhost:/instagram')
    console.log("mongoose connection is up")
}

module.exports =connection;