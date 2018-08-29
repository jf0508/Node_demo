function Position(){
    this.addListener();
}
    $.extend(Position.prototype,{
    loadHeader:function(){
         //创建头部对象；加载DOM结构
        new Header();
        //选中“职位管理”
        $("#position_nav ul:first li:last").addClass("active").siblings().removeClass("active");
    },
    addListener(){
        $(".btn_add").on("click",this.addPositionHandler)
    },
    addPositionHandler(){
        const formData = new FormData($(".add_form").get(0));
        console.log(formData);
        // 使用 $.ajax() 方法
		$.ajax({
			type: "post",
			url: "/positions/add",
			data: formData,
			processData: false, // 禁止将 data 转换为查询字符串
			contentType: false, // 不设置contentType
			success: function(data){
				console.log(data);
			},
			dataType: "json"
		})
    }
});

new Position().loadHeader();
