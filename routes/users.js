var express = require('express');
var router = express.Router();

// Http://localhost:3000/users
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

  // Http://localhost:3000/users/login
router.post("/login",function(req,res,next){
  res.send("用户登录")
});

router.post("/register",function(req,res,next){
  res.send("用户注册")
});

module.exports = router;
