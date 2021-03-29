const businessDb = require('../db/adminDb.js')

// 业务逻辑判断
function addOneValue(tableName, myArr, cb) {
    businessDb.addOnedata(tableName, myArr, function (res) {
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

function addValue(tableName, myArr, cb) {
    businessDb.addManyData(tableName, myArr, function (res) {
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


function selectValue(tableName, myobj, cb) {
    businessDb.selectValues(tableName, myobj, function (res) {
        let obj = {
            data: res,
            message: null,
            status: 200
        }
        cb(obj)
    })
}

function deleteValue(tableName, myobj, cb) {
    businessDb.deleteValues(tableName, myobj, function (res) {
        let obj = {}
        if (res.result.n > 0) {
            obj = {
                data: null,
                message: "删除成功",
                status: 200
            }
        } else {
            obj = {
                data: null,
                message: "删除失败",
                status: 405
            }
        }
        cb(obj)
    })
}

function updateValue(tableName, myobj, newData, cb) {
    businessDb.updateValues(tableName, myobj, newData, function (res) {
        let obj = {}
        if (res.result.nModified > 0) {
            obj = {
                data: null,
                message: "更新成功",
                status: 200
            }
        } else {
            obj = {
                data: null,
                message: "更新失败",
                status: 405
            }
        }
        cb(obj)
    })
}

exports.addOneValue = addOneValue
exports.selectValue = selectValue
exports.addValue = addValue
exports.deleteValue = deleteValue
exports.updateValue = updateValue