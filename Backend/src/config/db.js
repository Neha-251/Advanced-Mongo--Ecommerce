const mongoose = require("mongoose");

const connect = () =>{
    return mongoose.connect("mongodb+srv://neha:nehasen@cluster0.kscegai.mongodb.net/?retryWrites=true&w=majority")
    
}

module.exports = connect;