const express = require('express');
const router = express.Router();
const UserService = require("../services/user_service.js")

// Http://localhost:3000/users
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//登录业务处理
  // Http://localhost:3000/users/login
router.post("/login",UserService.login);

//退出 注销
router.get("/logout",UserService.logout);

//注册业务处理
router.post("/register",UserService.register)

module.exports = router;
