const userDb = require('../db/adminDb.js')

function addValue(tableName, myobj, cb) {
    userDb.addValues(tableName, myobj, function (res) {
        // let obj = {
        //     data: null,
        //     mark: null,
        //     message: "添加成功",
        //     rel: false,
        //     status: 200
        // }
            cb(res)

    })
}

function selectValue(tableName, myobj, cb) {
    userDb.selectValues(tableName, myobj, function (res) {
        cb(res)
    })
}

function deleteValue(tableName, myobj, cb) {
    userDb.deleteValues(tableName, myobj, function (res) {
        cb(res)
    })
}

function updateValue(tableName, myobj, newData, cb) {
    userDb.updateValues(tableName, myobj, newData, function (res) {
        cb(res)
    })
}


exports.selectValue = selectValue
exports.addValue = addValue
exports.deleteValue = deleteValue
exports.updateValue = updateValue