
var e = require("./crypto")
var SIGN_KEY = "wxmini_no6Q3Bo0";
var  RESPONSE_DEC_KEY = "jow5s?LA";
var REQUEST_ENC_KEY = "YmWcn'sb_wxmini";

//解密请求需要将请求Query组成JSON后，传isRequest = true
//解密响应JSON直接传入即可，isRequest默认为false
function decrypt(json,isRequest=false) {
    var key
    if(isRequest) key = REQUEST_ENC_KEY
    else key = RESPONSE_DEC_KEY

    var data = (0,e.decrypt)(json,key)
    
    if (typeof data === "string" && data.startsWith("\"") && data.endsWith("\"")) {
            data = JSON.parse(data); // 解析掉外层的字符串（去掉转义字符）
            return JSON.parse(data);
    } else {
        return data
    }
}

//加密函数，发送网络请求时需要加密
function encrypt(json) {
    return (0, e.addSign)(json, SIGN_KEY, REQUEST_ENC_KEY)
}



// var json = '{"service":"Rollcall.Student.IsInActiveClass"}'

// var s = '{"ct":"TXKSrN2qWdlTjdR64D/B5svJWxqwNP88QB9f6ruNWZgzjyudnPJLwnbUPowAK/w/lkjbYfUj3oio2vgJGthRRA==","iv":"d3d52bd8f6e6d186d88840a49e23416a","s":"3b73e8401ae366ca"}'

// var data = '{"ct":"86C3tCT7xRkGmmleQdGnW8Rmw8N1lVJpGF+ObfiE3NKexcq8w/ASJ1YMwa1Jhg792c9JSJwFDbANAI2b/kZqnj7q1fmbmg06XrM0AJaoWzR61vOWTOUNgkbwBkAoQ1PgFZclSAkSF9SGJFKX9uNgbCLFgeH06n4ryLndPc4ioRHs8u3pq8NV1peEYKhbU5QPwuBbCiD7g+O1cDq2HQ60JMibk15vRmt97Owv97FJC4nGrcM7bRocF3xXzC3ThzoK","iv": "de174af4fc67bd261f097b2ff3997469","s": "2f45557c9293fc0e"}'





// var d = decrypt(data,true)
// console.log(d)

module.exports = { decrypt,encrypt };
