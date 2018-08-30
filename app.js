const  createError = require('http-errors');
const  express = require('express');
const  path = require('path');
const  cookieParser = require('cookie-parser');
const  logger = require('morgan');
const session = require("express-session");

const indexRouter = require('./routes/index'); 
//用户系统控制路由
const  usersRouter = require('./routes/users');
const  captchaRouter = require('./routes/captcha.js');
const  positionsRouter = require('./routes/positions.js')
//创建express实例
const  app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//使用各中间件
app.use(logger('dev')); //日志
app.use(express.json()); //json
app.use(express.urlencoded({extended:false})); 
app.use(cookieParser("jf")); //Cookie
//session配置：使用express-session中间件
 app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'jf',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 45*60*1000 }
}));

app.use(function(req,res,next){
  //获取请求的url
  const {url} = req;
  // 判断
  if (url.indexOf("/position") !== -1) {
    // 获取在 session 中保存的登录用户信息
    const user = req.session.loginUser;
    if (!user) {
      res.redirect("/"); //页面重定向 返回主页
      return false;
    }
  }
  next();
});
 
//静态资源
app.use(express.static(path.join(__dirname, 'public')));  //静态资源


// 使用路由中间件
app.use('/', indexRouter); // 访问项目根下资源
app.use('/users', usersRouter); // 访问users目录下资源
app.use('/captcha', captchaRouter); // 访问captcha目录下资源
app.use('/positions',positionsRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
