const UserDao = require("../shuju/userDao.js");
const bcrypt = require("bcrypt"); // 加密

const UserService = {
    login(req,res,next){
       const {username,password} = req.body; //获取用户名密码
       //查询
       UserDao.find({username}).then(data=>{
           if(data.length ===1){ //用户存在
            const _pass = data[0].password; //获取数据库该用户加密的密码
            //比较密码是否正确
            if(bcrypt.compareSync(password,_pass)){ //正确
                //用session 保存用户登录成功的信息
                req.session.loginUser = username;

                res.json({res_code:1, res_error:"", res_body: data[0]})
                console.log(data); 
            }else{ //错误
                res.json({res_code:0, res_error:"密码错误", res_body:{}});
            }
           }else{ //用户不存在
            res.json({res_code:0, res_error:"用户不存在", res_body:{}});
           }
       }) 
       .catch(err=>{
        res.json({res_code: -1, res_error: err, res_body: {}});
       })
    },
    //注销 删除远程session的数据
    logout(req, res, next) {
		req.session.loginUser = null;
		res.json({res_code:1, res_error:"", res_body:{status: true}});
	},

    //注册业务
    register(req,res,next){ 
        //解构
        const {username,password,email} = req.body;
        //验证.....
        //对密码进行加密
        const passCrypt = bcrypt.hashSync(password,10)
        console.log(passCrypt);
        //保存用户信息
        UserDao.save({username,password: passCrypt,email}).then((data)=>{
            res.json({res_code:1,res_error:"",res_body:data})
        }).catch((err)=>{ //错误异常处理
            res.json({res_code:-1,res_error:"",res_body:{}});
        });
        console.log("注册业务处理成功")
    }
};

module.exports = UserService;