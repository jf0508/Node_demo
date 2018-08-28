const UserDao = require("../shuju/userDao.js");

const UserService = {
    login(){

    },
    register(req,res,next){
            //res.send("用户注册")
            console.log("注册业务处理")
        //解构
        const {username,password,email} = req.body;
        //验证

        //保存用户信息
        UserDao.save({username,password,email}).then((data)=>{
            res.json({res_code:1,res_error:"",res_body:data})
        }).catch((err)=>{ //错误异常处理
            res.json({res_code:-1,res_error:"",res_body:{}});
        });
    }
};

module.exports = UserService;