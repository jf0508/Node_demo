

const svgCaptcha = require("svg-captcha");
//验证码处理
const Captcha = {
    //生成验证码
    genCaptcha(req,res,next){
        //res.send("验证码")
        const captcha = svgCaptcha.createMathExpr({color:true, noise:2}); //生成数学式表达式
        //在session中保存生成的字符串
        req.session.captcha = captcha.text;
        //返回生成的验证码
        res.type("svg");
        res.status(200).send(captcha.data);
    },
    //校验验证码
    verifyCaptcha(req,res,next){
        //从session获取验证码字符串
        const {code} = req.query;
        console.log(code);
        console.log(req.session.captcha);
		// 与 session 中缓存的验证码比较:忽略字符大小写
        if (code.toUpperCase() === req.session.captcha.toUpperCase()) //不区分大小写
          /* res.send("正确"); */
			      res.json({res_code:1, res_error: "", res_body: {valid:true}});
        else
        /*  res.send("错误"); */
		    	res.json({res_code:-1, res_error: "", res_body: {valid:false}});

    }
}

module.exports = Captcha;