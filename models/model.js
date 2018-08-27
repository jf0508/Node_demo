//引入 Mongoose
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/Node_demo');

const User = mongoose.model("user",{
    username:String,
    password:String,
    email:String
})

module.exports = {User};