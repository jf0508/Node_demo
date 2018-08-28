//登录模态
function LoginModal(){
    this.createDom();
    this.addListener();
}
//模板字符串 登录模态框
LoginModal.template = `<div class="modal fade" id="login" >
    <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">用户登录</h4>
          </div>
          <div class="modal-body">
                      <form class="login_form"  method="POST">
                          <div class="form-group">
                            <label for="reguser">用户名</label>
                            <input type="text" class="form-control"  placeholder="请输入用户名">
                          </div>
                          <div class="form-group">
                            <label for="exampleInputPassword1">密码</label>
                            <input type="password" class="form-control" placeholder="请输入密码">
                          </div>  
                         <div class="form-group">
                                <label for="login_yzm">验证码</label>
                                <input type="email" class="form-control" id="login_yzm" placeholder="输入验证码">
                                <span class="input-group-addon code-info">信息</span>
                                <p class="help-block code-img">这是个验证码图片</p>
                        </div>
                    </form>
             </div>
             <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
             <button type="button" class="btn btn-primary btn-login">提交 登录</button>
             </div>
         </div>
     </div>
    </div>
 `
$.extend(LoginModal.prototype,{
    //创建DOM元素
    createDom:function(){
        $(LoginModal.template).appendTo("body");
    },

    //注册事件监听
     addListener(){
        $(".btn-login").on("click",this.loginHandler);
        // 失去焦点校验验证码
      $("#login_yzm").on("blur",this.verifyHandler);
    },
     // 校验验证码
     verifyHandler() {
        console.log("失去焦点");
        // 输入的验证码
        var code = $("#login_yzm").val();
        // ajax
        $.getJSON("/captcha/verify", {code}, (data)=>{
          /* console.log(data); */
          if (data.res_code === 1) {
            $(".code-info").text("正确")
          } else {
            $(".code-info").text("错误")
          }
        })
      },
    //登录业务处理
    loginHandler(){
        var data = $(".login_form").serialize(); //通过serialize转换成 键值对
        $.post("/users/login",data,(resData)=>{
            console.log(resData);
        }).done(()=>{
            $("#login").modal("hide");
        }).done(()=>{
            $(".login-success").removeClass("hide").siblings(".not-login").remove();   
        })
    }
});
