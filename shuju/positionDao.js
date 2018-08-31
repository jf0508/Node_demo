const {Position} = require("./model.js");

const PositionDao = {
	save(positionInfo) {
		return new Position(positionInfo).save();
	},

	//总条数
	count(){
		return Position.find().count();
	},

	//按页查找职位信息
	findByPage(page){
		const pageSize = 5;
		//查询
		return Position.find().skip((page-1)*pageSize).limit(pageSize);
	},
	update(up) {
		//修改
		return Position.update({_id:up});
	},
	find() {

	},
	delete(del) {
		//删除
		return Position.remove({_id:del});
	}
}

module.exports = PositionDao;