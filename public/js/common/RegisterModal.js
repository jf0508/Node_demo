//登录模态
function RegisterModal(){
    this.createDom();
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
                  <form  method="POST">
                      <div class="form-group">
                        <label for="reguser">用户名</label>
                        <input type="text" class="form-control"  placeholder="请输入用户名">
                      </div>
                      <div class="form-group">
                        <label for="exampleInputPassword1">密码</label>
                        <input type="password" class="form-control" placeholder="请输入密码">
                      </div>  
                      <div class="form-group">
                        <label for="exampleInputPassword1">确认密码</label>
                        <input type="password" class="form-control" placeholder="请在此输入密码">
                      </div>      
                       <div class="form-group">
                        <label for="email">邮箱</label>
                        <input type="email" class="form-control" placeholder="输入您的邮箱" id="email">
                      </div>         
                      <div class="form-group">
                        <label for="reg_yzm">验证码</label>
                        <input type="email" class="form-control" id="reg_yzm" placeholder="输入验证码">
                        <p class="help-block code-img">这是个验证码图片</p>
                      </div>
                </form>
         </div>
         <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
         <button type="button" class="btn btn-primary">提交注册</button>
         </div>
     </div>
     </div>
    </div>
 `
$.extend(RegisterModal.prototype,{
    //创建DOM元素
    createDom:function(){
        $(RegisterModal.template).appendTo("body");
    }
});
