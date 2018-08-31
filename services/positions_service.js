const PositionDao = require("../shuju/positionDao.js");

const PositionService = {
    //添加职位
    add(req,res,next){
        const {name,pay,experience,address} = req.body;  
        //保存Logo文件 单独处理文件
        let logo_pic = "";
        if(req.file)
        logo_pic = req.file.filename;
        console.log(logo_pic);
        //保存到数据库
        PositionDao.save({logo_pic,name,pay,experience,address}).then(data=>{
            res.json({res_code:1, res_error:"", res_body: data})
            window.location.reload();
        })
        .catch(err=>{
            res.json({res_code:-1, res_error:err, res_body: {}})
        });
     },

     //删除操作
     del(req,res,next){
        let {id} = req.query;
        PositionDao.delete(id).then(idData=>{
            res.json({res_code:1,res_error:"",res_body:{id:idData}})
        }).catch(err=>{
            res.json({res_code:1,res_error:err,res_body:""})
        })
     },

    //修改操作
     Position_update(req,res,next){
        let {id} = req.query;
        PositionDao.update(id).then(idData=>{
            res.json({res_code:1,res_error:"",res_body:{id:idData}})
        }).catch(err=>{
            res.json({res_code:1,res_error:err,res_body:""})
        })
     },

     //分页查询
    listByPage(req,res,next){
        let {page} = req.query;
        page = page || 1;
        //调用数据库查询方法
        PositionDao.count().then((data)=>{
            PositionDao.findByPage(page).then(pageData=>{
                    // 总页数
                    const totalPages = Math.ceil(data / 5);
                    res.json({res_code:1, res_error:"", res_body: {data: pageData, count: data, totalPages}});
                }).catch(err=>{
                    res.json({res_code:-1, res_error:err, res_body: {}});
                });
             }).catch(err=>{
            res.json({res_code:-1, res_error:err, res_body: {}});
        });

    }
}



module.exports = PositionService;