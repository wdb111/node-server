const userService = require("../service/user")
const EAS = require("../encryption/aes") //eas加解密

function Reg(req, res) {
    let loginData = JSON.parse(req.query.params);
    let str = EAS.decrypt(loginData.userInfo.value, loginData.userInfo.key);
    let userInfo = {
        name: str.split("&&")[0],
        password: str.split("&&")[1],
        email: loginData.email
    }
    userService.addUser("T_USER", userInfo, function (result) {
        res.send(result)
    })

}

function Login(req, res) {
    let loginData = JSON.parse(req.query.params);
    let str = EAS.decrypt(loginData.userInfo.value, loginData.userInfo.key);
    let userInfo = {
        name: str.split("&&")[0],
        password: str.split("&&")[1]
    }
    let captcha = req.session.captcha;
    let setTime = req.session.saptchaTime;
    let nowTime = new Date()
    let loginTime = nowTime.getTime();
    let timeDifference = loginTime - setTime;
    if (loginData.authCode.toLowerCase() !== captcha) {
        let obj = {
            data:null,
            message: "验证码错误！",
            status: 401
        }
        res.send(obj)
    } else if (timeDifference >= 1000*60) {
        let obj = {
            data:null,
            message: "验证码已失效！",
            status: 402
        }
        res.send(obj)
    } else {
        userService.selectUser(userInfo, function (result) {
            res.send(result)
        })
    }

}
exports.Reg = Reg;
exports.Login = Login;