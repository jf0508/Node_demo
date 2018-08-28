const express = require('express');
const router = express.Router();
const UserService = require("../services/user_service.js")

// Http://localhost:3000/users
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

  // Http://localhost:3000/users/login
router.post("/login",function(req,res,next){
  res.send("用户登录")
});

//注册业务处理
router.post("/register",UserService.register)

module.exports = router;
