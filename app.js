const express = require("express");
const app = express();
const svgCaptcha = require('svg-captcha'); //npm install --save svg-captcha SVG二维码插件
//设置处理post请求参数
const bodyParser = require("body-parser");
// 最多可以提供10,000个参数（根据需要增加）和10 MB数据（也可以调整）
app.use(bodyParser.urlencoded({
    extended: false,
    parameterLimit: 10000,
     limit: 1024 * 1024 * 10
}));
app.use(bodyParser.json({
        extended: false,
     parameterLimit: 10000,
     limit: 1024 * 1024 * 10
}));

//导入cookie模块
var cookieParser = require('cookie-parser');
app.use(cookieParser());
//导入session模块
const session = require('express-session');
app.use(session({
    secret: 'somesecrettoken',
    cookie: {
        maxAge: 1 * 60 * 1000
    } // 1分钟
}));

//统一设置响应头
function setHeaders(res) {
    res.setHeader("Access-Control-Allow-Origin", "*") //设置跨域
    res.setHeader("Access-Control-Allow-Credentials", "true")
    return res;
}

//验证码
app.get("/authCode", function (req, res) {
    setHeaders(res)
    let codeConfig = {
        size: 4, // 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        noise: 2, // 干扰线条的数量
        fontSize: 48,
        color: "#000",
        height: 40,
        width: 100,
        background: "#e5e5e5", //干扰线条数
    }
    let captcha = svgCaptcha.create(codeConfig);
    //存session用于验证接口获取文字码
    let setTime=new Date()
    req.session.captcha = captcha.text.toLowerCase(); 
    req.session.saptchaTime=setTime.getTime();
    let codeData = {
        data:{
            img: captcha.data
        },
        message:"操作成功",
        status:200
    }
    res.send(codeData);
});

const userLogin = require("./controller/user");
//注册
app.post("/reg", function (req, res) {
    setHeaders(res);
    userLogin.Reg(req, res);
});
//登录
app.post("/login", function (req, res) {
    setHeaders(res);
    userLogin.Login(req, res);
});

//其他请求数据的接口
const businessService=require("./controller/business")
//添加数据
app.post("/addValue", function (req, res) {
    setHeaders(res);
    businessService.ctAddValue(req,res)
});
//查询数据
// app.post("/selectValue", function (req, res) {
//     setHeaders(res);
//     businessService.ctSelectValue(req,res)

// });
app.get("/selectValue", function (req, res) {
    setHeaders(res);
    businessService.ctSelectValue(req,res)

});
//删除数据
app.post("/deleteValue", function (req, res) {
    setHeaders(res);
    businessService.ctDeleteValue(req,res)
});
//更新数据
app.post("/updateValue", function (req, res) {
    setHeaders(res);
    businessService.ctUpdateValue(req,res)
});

app.listen(9999, function () {
    console.log("服务器正在监听中9999...");
});