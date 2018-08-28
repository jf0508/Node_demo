const {User} = require("./model.js");

const UserDao = {
    //保存
    save(userinfo){
        const user = new User(userinfo);
        return user.save(); // 返回
    },
    //查询
    find(userinfo){
        return User.find(userinfo);
    },
     //修改  
     update(userinfo){ 
            return User.update(userinfo);
        }, 
     //删除
    delete(userinfo){
        return User.delete(userinfo);
    } 
};

module.exports = UserDao;