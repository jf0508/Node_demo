function Position(){

}

    $.extend(Position.prototype,{
    loadHeader:function(){
         //创建头部对象；加载DOM结构
        new Header();
        //选中“职位管理”
        $("#position_nav ul:first li:last").addClass("active").siblings().removeClass("active");
    }
});

new Position().loadHeader();
