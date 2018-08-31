function Position(){
    this.loadHeader();
    this.addListener();
    this.load(); //调用Load加载页面数据
}

    //temelate 模板 
    Position.listInfoTemplate = `
    <% for (var i = 0; i < positions.length; i++) { %> 
        <tr>

            <td><%= i+1 %></td>
            <td><img src="../img/upload/<%=positions[i].logo_pic%>" style="width: 80px;height: 80px;"></td>
            <td><%= positions[i].name %></td>
            <td><%= positions[i].pay %></td>
            <td><%= positions[i].experience %></td>
             <td><%= positions[i].address %></td>
             <td>
                <button type="button" class="position_update btn btn-success" data-toggle="modal" data-target="#up_Modal"  data-id="<%=positions[i]._id %>" style="margin-left:10px">修改</button>
                 <button type="button" class="position_delete btn btn-danger" data-id="<%=positions[i]._id %>">删除</button>
             </td>
                  </tr>
        <% } %>`;

    //分页按钮模板
    Position.pageTamplate = `
    <li class="disabled"><a href="javascript:;" class="left_btn"  disabled="disabled"> <span>&laquo;</span></a></li>
        <% for(var i =1; i<=totalPages; i++){ %>
       <li class="<%= currentPage == i ? 'active' : '' %>"><a href="#"><%= i %></a></li>
	<% } %>
     <li class="disabled" ><a href="javascript:;" disabled="disabled"> <span class="right_btn">&raquo;</span> </a></li>
    `
    $.extend(Position.prototype,{
    loadHeader:function(){
         //创建头部对象；加载DOM结构
        new Header();
        //选中“职位管理”
        $("#position_nav ul:first li:last").addClass("active").siblings().removeClass("active");
    },
    addListener(){
        //添加职位
        $(".btn_add").on("click",this.addPositionHandler);
        // 点击页码翻页
        $(".pagination").on("click", "li", this.loadByPage);
        //点击左右按钮翻页
       /*  $(".left_btn").delegate("span","click",function(){
            console.log("向前")
        }) 
        $(".right_btn").click(function(){
            console.log("this")
        });*/
        
        //删除
        $("tbody").delegate(".position_delete","click",function(){
            $(this).parents("tr").remove();
            const _id = $(this).data("id");
            $.getJSON("/positions/del?id="+_id,function(data){
               console.log(data) 
               //data.res_body.id
            })
        })

        //修改职位
        $(".position_update").on("click",this.upPositionHandler);
        
    }, 

    load(){ //页面加载第一页信息
        this.loadByPage(1);
    },

   	// 按页加载数据
	loadByPage(event){
		let page;
		if (typeof event === "number") // 直接传递页码
			page = event;
		else { // 获取待加载页码			
			//console.log(event.target)
			page = $(event.target).text();
		}

		// 读取page页数据
		$.getJSON("/positions/list?page=" + page, data=>{
			// 显示职位数据
			// 待渲染的数据
			const positions = data.res_body.data;
			// EJS渲染模板
			const html = ejs.render(Position.listInfoTemplate,{positions});
			// 显示
			$(".list_table tbody").html(html);

			// 显示页码数据
			const pagination = ejs.render(Position.pageTamplate, {totalPages: data.res_body.totalPages, currentPage : page})
			$(".pagination").html(pagination);
		});
	},
    

    //添加职位事件
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
                //console.log(data);
                $("#pos_Modal").modal("hide");
                window.location.reload();
			},
			dataType: "json"
        })
       
    },
       //添加职位事件
        upPositionHandler(){
        const formData = new FormData($(".up_form").get(0));
        console.log(formData);
        // 使用 $.ajax() 方法
		$.ajax({
			type: "post",
			url: "/positions/update",
			data: formData,
			processData: false, // 禁止将 data 转换为查询字符串
			contentType: false, // 不设置contentType
			success: function(data){
                //console.log(data);
                $("#up_Modal").modal("hide");
                window.location.reload();
			},
			dataType: "json"
        })
       
    }
});

new Position();
