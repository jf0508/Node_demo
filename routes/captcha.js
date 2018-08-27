const express = require('express');
const router = express.Router();
const Capt = require("../services/captcha.js")

//生成验证码
router.get('/gencode',Capt.genCaptcha);

//验证验证码
router.get('/verify',Capt.verifyCaptcha);

/* router.get('/yz',function(req,res,next){
    res.send("验证码")
}); */

module.exports = router;
