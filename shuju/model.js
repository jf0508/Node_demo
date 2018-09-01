// 引入 mongoose
const mongoose = require("mongoose");
// 连接数据库
mongoose.connect('mongodb://localhost/Node_Js');

// 用户模型
const User = mongoose.model("user", {
	username: String,
	password: String,
	email: String
});

// 职位模型
const Position = mongoose.model("positions",{
	logo_pic:String,
	name: String,
	pay: String,
	experience: String,
	address: String
})

module.exports = {User,Position};