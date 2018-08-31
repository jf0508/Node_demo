const express = require('express');
const router = express.Router();
const path = require("path");
const PositionService = require("../services/positions_service.js")

const multer = require("multer");//引入中间件 文件上传

const storage = multer.diskStorage({
    //储存
    destination:function(req,res,cb){ //储存文件地址
        cb(null,path.join(__dirname,"../public/img/upload/"))
    },
    //文件名
    filename: function(req,file,cb){
        const ext = file.originalname.slice(file.originalname.lastIndexOf(".")); //文件后缀名
        cb(null,file.filename+'-'+Date.now()+ext);
    }
})

//multer实例
const upload = multer({storage});

//添加职位
router.post("/add",upload.single("logo_pic"),PositionService.add);

//删除职位
router.get("/del",PositionService.del);

//修改职位
router.post("/update",PositionService.Position_update);

//查询 localhost:3000/positions/list?page=?
router.get("/list",PositionService.listByPage);

//导出
module.exports = router;