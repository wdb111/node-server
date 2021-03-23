// let mysql = require('mysql');
// // 创建了一个数据库连接池
// const pool = mysql.createPool({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: 'root',
//     database: 'MySQLs'
// });
// // 导出模块
// exports.pool=pool;

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
 
exports.MongoClient=MongoClient;
exports.url=url;