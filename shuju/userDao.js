const {User} = require("./model.js");

const UserDao = {
    //保存
    save(userinfo){
        const user = new User(userinfo);
        return user.save(); // 返回
    },
    find(){},//查询
    update(){}, //修改
    delete(){} //删除
};

module.exports = UserDao;