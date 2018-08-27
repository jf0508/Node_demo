function Index(){
   
}

$.extend(Index.prototype,{
    loadHeader:function(){
        new Header();
    }
});

//调用 Index加载头部方法
 new Index().loadHeader();
