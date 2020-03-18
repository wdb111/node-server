// 引入模块
const dbutils = require('../utils/dbutils.js');
const ObjectId = require('mongodb').ObjectID;

//用户登录
function selectUsers(myobj,cb){
	dbutils.MongoClient.connect(dbutils.url, { useUnifiedTopology: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("mydatabase");
		  // 查询用户
		  dbo.collection("T_USER").find(myobj).sort({"_id":-1}).toArray(function(err, result) { // 返回集合中所有数据
			  if (err) throw err;
			  cb(result)
		      db.close();//释放连接池
		  });
	  });
}


function addValues(tableName,myobj,cb){
	dbutils.MongoClient.connect(dbutils.url, { useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("mydatabase");
		// console.log('数据库已创建');
		// 插入数据
	  dbo.collection(tableName).insert(myobj, function(err, res) {//插入多条数据,此时myobj为数组
			if (err) throw err;
		//    console.log("插入的文档数量为: " + res.insertedCount);
		let obj = {
            data: null,
            mark: null,
            message: "添加成功",
            rel: false,
            status: 200
        }
		//   console.log(err,res)
		    cb(obj)
			db.close();
		});
	  });
}

function selectValues(tableName,myobj,cb){
	dbutils.MongoClient.connect(dbutils.url, { useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("mydatabase");
		// console.log('数据库已创建');
		  // 查询数据
		  dbo.collection(tableName).find(myobj).sort({"_id":-1}).toArray(function(err, result) { // 返回集合中所有数据
			  if (err) throw err;
			  let obj = {
				data: result,
				mark: null,
				message: null,
				rel: false,
				status: 200
			}
		      cb(obj);
		      db.close();//释放连接池
		  });
	  });
}

function deleteValues(tableName,myobj,cb){
	dbutils.MongoClient.connect(dbutils.url, { useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("mydatabase");
		// console.log('数据库已创建');
	  // 删除数据
		  // var myobj = {"name":'菜鸟教程'};  // 查询条件
		  if("_id" in myobj){
			myobj._id=ObjectId(myobj._id)
		  }
		//   dbo.collection(tableName).deleteOne(myobj, function(err, res) {//删除一条数据
		  dbo.collection(tableName).deleteMany(myobj, function(err, res) {//删除多条数据
		      if (err) throw err;
			//   console.log(res.result.n + " 条文档被删除")
			let obj = {
				data: null,
				mark: null,
				message: "删除成功",
				rel: false,
				status: 200
			}
			cb(obj)
		      db.close();
		  });
	  });
}

function updateValues(tableName,myobj,newData,cb){
	dbutils.MongoClient.connect(dbutils.url, { useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("mydatabase");
		// console.log('数据库已创建');
	  // 更新数据
		//   var myobj = {"name":'菜鸟教程'};  // 查询条件
		if("_id" in myobj){
			myobj._id=ObjectId(myobj._id)
		  }
		  var updateStr = {$set:newData};
		  dbo.collection(tableName).updateOne(myobj, updateStr, function(err, res) {//更新一条数据
		//   dbo.collection(tableName).updateMany(myobj, updateStr, function(err, res) {//更新多条数据
		      if (err) throw err;
			//   console.log(res.result.nModified + " 条文档被更新");
			let obj = {
				data: null,
				mark: null,
				message: "更新成功",
				rel: false,
				status: 200
			}
			cb(obj)
		      db.close();
		  });
	  });
}


exports.selectUsers = selectUsers;
exports.selectValues = selectValues;
exports.addValues = addValues;
exports.deleteValues = deleteValues;
exports.updateValues = updateValues;