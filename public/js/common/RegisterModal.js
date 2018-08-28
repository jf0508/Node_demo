//登录模态
function RegisterModal(){
    this.createDom();
    this.addListener();
}
//模板字符串
RegisterModal.template = ` <div class="modal fade" id="zhuce" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">用户注册</h4>
      </div>
      <div class="modal-body">
                  <form  method="POST" class="reg_form">
                      <div class="form-group">
                        <label for="reguser">用户名</label>
                        <input type="text" class="form-control" name="username" placeholder="请输入用户名">
                      </div>
                      <div class="form-group">
                        <label for="exampleInputPassword1">密码</label>
                        <input type="password" class="form-control" name="password" placeholder="请输入密码">
                      </div>  
                      <div class="form-group">
                        <label for="qrpassword">确认密码</label>
                        <input type="password" class="form-control" id="qrpassword" placeholder="请在此输入密码">
                      </div>      
                       <div class="form-group">
                        <label for="email">邮箱</label>
                        <input type="email" class="form-control" name="email" placeholder="输入您的邮箱" id="email">
                      </div>         
                      <div class="form-group">
                        <label for="reg_yzm">验证码</label>
                        <input type="email" class="form-control" id="reg_yzm" placeholder="输入验证码">
                        <span class="input-group-addon code-info">信息</span>
                        <p class="help-block code-img">这是个验证码图片</p>
                      </div>
                </form>
         </div>
         <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
         <button type="button" class="btn btn-primary btn_register">提交注册</button>
         </div>
     </div>
     </div>
    </div>
 `
$.extend(RegisterModal.prototype,{
    //创建DOM元素
    createDom:function(){
        $(RegisterModal.template).appendTo("body");
    },
    //注册事件监听
    addListener() {
      // 失去焦点校验验证码
      $("#reg_yzm").on("blur",this.verifyHandler);
      // 点击注册按钮
      $(".btn_register").on("click", this.registerHandler)/* (req,res,next)=>{
          
      }) */
    },
    // 校验验证码
    verifyHandler() {
      console.log("失去焦点");
      // 输入的验证码
      var code = $("#reg_yzm").val();
      // ajax
      $.getJSON("/captcha/verify", {code}, (data)=>{
       /*  console.log(data); */
        if (data.res_code === 1) {
          $(".code-info").text("正确").css({"color":"green"})
        } else {
          $(".code-info").text("错误").css({"color":"red"})
        }
      })
    },
    // 注册业务处理
    registerHandler(){
      // 待传递到服务器的用户注册数据
      var data = $(".reg_form").serialize();
      // ajax提交登录处理
      console.log(data);
      $.post("/users/register",data, (resData)=>{
        //console.log(resData);
      },"json");
    }
});
