const userDb = require('../db/adminDb.js')
// 引入jwt token工具
const JwtUtil = require('../public/jwt');

function addUser(tableName, myobj, cb) {
    userDb.addOnedata(tableName, myobj, function (res) {
        let obj = {}
        if (res.insertedCount > 0) {
            obj = {
                data: null,
                message: "添加成功",
                status: 200
            }
        } else {
            obj = {
                data: null,
                message: "添加失败",
                status: 405
            }
        }
        cb(obj)
    })
}

function selectUser(obj, cb) {
    userDb.selectUsers(obj, function (res) {
        var obj = {}
        if (res.length > 0) {
            // 登陆成功，添加token验证
            let _id = res[0]._id.toString();
            // 将用户id传入并生成token
            let jwt = new JwtUtil(_id);
            let token = jwt.generateToken();
            // 将 token 返回给客户端
            obj = {
                data: res,
                status: 200,
                msg: '登陆成功',
                token: token
            }
        } else {
            obj = {
                data: null,
                message: "用户名或密码错误！",
                status: 402
            }
        }
        cb(obj)
    })
}

exports.addUser = addUser
exports.selectUser = selectUser