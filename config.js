module.exports = {
    jwt: {
        secret: 'Josiah', //secret: 解析口令, 需要和加密的时候一致
        algorithms: ['HS256'], //algorithms: 加密方式: SHA256 加密方式在 express-jwt 里面叫做 HS256
        property: 'auth',  //默认解析结果会赋值在 req.user，也可以通过 requestProperty 来修改
        expiresIn: 60 * 60 * 60 * 60, // 单位 秒
        unless: { 
            //path: 不需要验证 token 的路径标识符
            "path": ["/enroll", "/login","/users/select","/","/article/types","/article/select", "/test", /^\/upload\/.*/] 
        }
    },
    db: {
        mysql: {
            host:'localhost',
            user:'root',
            password:'123456',
            database:'juejin'
        }
    },
    static: {
        upload: {
            path: 'static/upload/'
        }
    },
    log: {
        path: 'log',
        name: 'access.log'
    },
    port: 8081
}

