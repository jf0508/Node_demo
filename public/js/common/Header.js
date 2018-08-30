//构造函数
function Header() {
  this.createDom();
  this.createLoginModal();
  this.createRegisterModal();
  this.addListener();
  this.load();
}

//头部结构局部模板
Header.template = `  <nav class="navbar navbar-inverse">
              <div class="container-fluid">
                <div class="navbar-header">
                  <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" >
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                  </button>
                  <a class="navbar-brand" href="#">职位管理系统</a>
                </div>
                <div class="collapse navbar-collapse" id="position_nav">
                      <ul class="nav navbar-nav">
                        <li class="active"><a href="/">首页 <span class="sr-only">(current)</span></a></li>
                        <li><a href="/html/position.html">职位管理</a></li>
                      </ul>
                      <ul class="nav navbar-nav navbar-right login_success hide">
                       <li><a href="#">你好<span>xxxx</span></a></li>  
                        <li><a href="javascript:;" class="login_out">注销</a></li>                       
                      </ul>
                      <ul class="nav navbar-nav navbar-right not_login">
                       <li data-toggle="modal" data-target="#login" class="link_login"><a href="#">登录</a></li>  
                        <li data-toggle="modal" data-target="#zhuce" class="link_register"><a href="#">注册</a></li>                       
                      </ul>
                </div>
              </div>
      </nav> `
//原型继承
$.extend(Header.prototype,{
    //创建头部的DOM结构
    createDom:function(){
        $(Header.template).appendTo(".header");
    },
    createLoginModal:function(){
    new LoginModal();
  },
  // 创建注册模态框
  createRegisterModal : function() {
    new RegisterModal();
  },
  //页面加载 判断是否有用户登录
    load(){
      let user = sessionStorage.loginUser;
      //console.log(user)
      if(user){ //存在该用户 登陆成功后
        user = JSON.parse(user);
        //console.log(user);
        $(".login_success").removeClass("hide").find("a:first").text(`欢迎：${user.username}`);
        $(".not_login").remove();
      }
    },

  // 注册事件监听
	addListener() {
    //点击注册 登录按钮 生成验证码
    $(".link_login,.link_register").on("click", this.genCaptchaHandler);
    
    //点击注销
    $(".login_out").on("click",this.logoutHandler)
  },
  
	// 生成验证码
	genCaptchaHandler() {
    console.log("牛逼牛逼，生成了验证码");
		$.get("/captcha/gencode", (data)=>{
			$(".code-img").html(data);
		}, "text");
  },
  
  //退出注销方法处理
  logoutHandler() {
		$.getJSON("/users/logout", (data)=>{
			if (data.res_body.status){
        if(confirm("真的要注销嘛？")){ 
				sessionStorage.removeItem("loginUser");
				location.href = "/";}
			}
		})
	}

});
