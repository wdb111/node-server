// 引入模块
const dbutils = require('../utils/dbutils.js');
const ObjectId = require('mongodb').ObjectID;

//用户登录
function selectUsers(myobj, cb) {
	dbutils.MongoClient.connect(dbutils.url, {
		useUnifiedTopology: true
	}, function (err, db) {
		if (err) throw err;
		var dbo = db.db("mydatabase");
		// 查询用户
		dbo.collection("T_USER").find(myobj).sort({
			"_id": -1
		}).toArray(function (err, result) { // 返回集合中所有数据
			if (err) throw err;
			cb(result)
			db.close(); //释放连接池
		});
	});
}


function addOnedata(tableName, myobj, cb) {
	dbutils.MongoClient.connect(dbutils.url, {
		useUnifiedTopology: true
	}, function (err, db) {
		if (err) throw err;
		var dbo = db.db("mydatabase");
		// console.log('数据库已创建');
		// 插入数据
		dbo.collection(tableName).insertOne(myobj, function (err, res) { //插入一条数据,此时myobj为对象
			if (err) throw err;
			//    console.log("插入的文档数量为: " + res.insertedCount);
			cb(res)
			db.close();
		});
	});
}

function addManyData(tableName, myArr, cb) {
	dbutils.MongoClient.connect(dbutils.url, {
		useUnifiedTopology: true
	}, function (err, db) {
		if (err) throw err;
		var dbo = db.db("mydatabase");
		// console.log('数据库已创建');
		// 插入数据
		dbo.collection(tableName).insertMany(myArr, function (err, res) { //插入多条数据,此时myArr为数组(元素为对象)
			if (err) throw err;
			//    console.log("插入的文档数量为: " + res.insertedCount);
			cb(res)
			db.close();
		});
	});
}

function selectValues(tableName, myobj, cb) {
	dbutils.MongoClient.connect(dbutils.url, {
		useUnifiedTopology: true
	}, function (err, db) {
		if (err) throw err;
		var dbo = db.db("mydatabase");
		// console.log('数据库已创建');
		// 查询数据
		dbo.collection(tableName).find(myobj).sort({
			"_id": -1
		}).toArray(function (err, result) { // 返回集合中所有数据
			if (err) throw err;
			cb(result);
			db.close(); //释放连接池
		});
	});
}

function deleteValues(tableName, myobj, cb) {
	dbutils.MongoClient.connect(dbutils.url, {
		useUnifiedTopology: true
	}, function (err, db) {
		if (err) throw err;
		var dbo = db.db("mydatabase");
		// console.log('数据库已创建');
		// 删除数据
		// var myobj = {"name":'菜鸟教程'};  // 查询条件
		if ("_id" in myobj) {
			myobj._id = ObjectId(myobj._id)
		}
		//   dbo.collection(tableName).deleteOne(myobj, function(err, res) {//删除一条数据
		dbo.collection(tableName).deleteMany(myobj, function (err, res) { //删除多条数据
			if (err) throw err;
			//   console.log(res.result.n + " 条文档被删除")

			cb(res)
			db.close();
		});
	});
}

function updateValues(tableName, myobj, newData, cb) {
	dbutils.MongoClient.connect(dbutils.url, {
		useUnifiedTopology: true
	}, function (err, db) {
		if (err) throw err;
		var dbo = db.db("mydatabase");
		// console.log('数据库已创建');
		// 更新数据
		//   var myobj = {"name":'菜鸟教程'};  // 查询条件
		
		if ("_id" in myobj) {
			myobj._id = ObjectId(myobj._id)
		}
		var updateStr = {
			$set: newData
		};
		dbo.collection(tableName).updateOne(myobj, updateStr, function (err, res) { //更新一条数据
			//   dbo.collection(tableName).updateMany(myobj, updateStr, function(err, res) {//更新多条数据
			if (err) throw err;
			//   console.log(res.result.nModified + " 条文档被更新");
			cb(res)
			db.close();
		});
	});
}


exports.selectUsers = selectUsers;
exports.selectValues = selectValues;
exports.addOnedata = addOnedata;
exports.addManyData = addManyData;
exports.deleteValues = deleteValues;
exports.updateValues = updateValues;