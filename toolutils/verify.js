const webtoken = require('jsonwebtoken')
const { expressjwt: jwt } = require("express-jwt")
const utils = require('./utils')
const jwt_config = require('../config').jwt


function create_token(userInfo) {  // 生成 token
    return 'Bearer ' + webtoken.sign(userInfo, jwt_config.secret, { 
        expiresIn: jwt_config.expiresIn 
    })
}

function verifyErrorHandle(error, req, res, next) {  // 无 token 访问处理
    if (error) {
        
        const errorName = error.name
        const currTime = Math.floor(Date.now() / 1000)
        console.log(`=== server error: ${errorName}, error path: ${req.path}`)
        console.log(`error user info: ${req.auth}, date now: ${currTime}`)
        console.log(`=== user token: ${req.headers.Authorization}`)
        console.dir(error)

        if (errorName === 'UnauthorizedError') {
            const rspHandleMap = {
                status: false, 
                message: "Token解析失败", 
                data: {
                    code: error.code,
                    status: error.status,
                    message: error.inner.message
                }}
            const rspHandle = new utils.RespondHangdle(rspHandleMap)
            return res.status(401).send(rspHandle)
        }
        res.send({ error })
    }
    next()
}

function verifyHandle() {
    return jwt({ 
        secret: jwt_config.secret,  
        algorithms: jwt_config.algorithms,
        requestProperty: jwt_config.property
    }).unless(jwt_config.unless)
}

module.exports = {
    verifyErrorHandle: verifyErrorHandle,
    verifyHandle: verifyHandle,
    create_token: create_token,
}