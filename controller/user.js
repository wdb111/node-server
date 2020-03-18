const userService=require("../service/user")
const EAS = require("../encryption/aes")

function Login(req, res) {
    let loginData = JSON.parse(req.query.params);
    let str= EAS.decrypt(loginData.userInfo.value,loginData.userInfo.key);
    let userInfo={
        name:str.split("&&")[0],
        password:str.split("&&")[1]
    }
    let captcha = req.session.captcha;
    
    if (loginData.authCode !== captcha) {
       let obj = {
            message: "验证码错误！",
            status: 401
        }
        res.send(obj)
    } else {
        userService.selectUser(userInfo,function (result) { 
            res.send(result)
         })
         
    }
    
}
exports.Login = Login;