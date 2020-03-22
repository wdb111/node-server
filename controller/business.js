const businessService = require("../service/businessService")
// 引入jwt token工具
const JwtUtil = require('../public/jwt');

function judgeToken(req) {
    let token = req.headers.token;
    let jwt = new JwtUtil(token);
    let result = jwt.verifyToken();
    return result;
}

function ctAddValue(req, res) {
    let result = judgeToken(req)
    let tableName = req.query.tableName
    let myArr = JSON.parse(req.query.params);
    // 如果考验通过就next，否则就返回登陆信息不正确
    if (result == 'err') {
        res.send({
            status: 403,
            message: '登录已过期,请重新登录'
        });
    } else {
        //返回数据
        businessService.addValue(tableName, myArr, function (result) {
            res.send(result)
        })
    }


}

function ctSelectValue(req, res) {
    let result = judgeToken(req)
    let tableName = req.query.tableName
    let myarr = JSON.parse(req.query.params)
    let myobj = {}
    myarr.forEach(i => {
        myobj[i.column] = i.value
    })
    // 如果考验通过就next，否则就返回登陆信息不正确
    if (result == 'err') {
        res.send({
            status: 403,
            message: '登录已过期,请重新登录'
        });
    } else {
        //返回数据
        businessService.selectValue(tableName, myobj, function (result) {

            res.send(result)
        })
    }
}

function ctDeleteValue(req, res) {
    let result = judgeToken(req)
    let tableName = req.query.tableName
    let myarr = JSON.parse(req.query.params)
    let myobj = {}
    myarr.forEach(i => {
        myobj[i.column] = i.value
    })
    // 如果考验通过就next，否则就返回登陆信息不正确
    if (result == 'err') {
        res.send({
            status: 403,
            message: '登录已过期,请重新登录'
        });
    } else {
        //返回数据
        businessService.deleteValue(tableName, myobj, function (result) {
            res.send(result)
        })
    }
}
function ctUpdateValue(req, res) {
    let result = judgeToken(req)
    let tableName = req.query.tableName
    let myarr = JSON.parse(req.query.params)
    let myobj = {}
    myarr.forEach(i => {
        myobj[i.column] = i.value
    })
    let newData = JSON.parse(req.query.newData)
    // 如果考验通过就next，否则就返回登陆信息不正确
    if (result == 'err') {
        res.send({
            status: 403,
            message: '登录已过期,请重新登录'
        });
    } else {
        //返回数据
        businessService.updateValue(tableName, myobj,newData, function (result) {
            res.send(result)
        })
    }
}
exports.ctAddValue = ctAddValue;
exports.ctSelectValue = ctSelectValue;
exports.ctDeleteValue = ctDeleteValue;
exports.ctUpdateValue = ctUpdateValue;