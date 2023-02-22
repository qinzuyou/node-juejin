const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')

const logger = require('./toolutils/logger')
const verify = require('./toolutils/verify')
const config = require('./config')

const app = express()

// /////////////////////////////////// <中间件> ///////////////////////////////////
app.use(logger) // 日志中间件
app.use(cors()) // 跨域处理
app.use(verify.verifyHandle()) // token 验证
app.use(verify.verifyErrorHandle) // 无token异常全局处理
app.use(express.json())  // 请求体解析中间件
app.use(express.urlencoded({ extended: false }))

// /////////////////////////////////// <路由中间件> ///////////////////////////////////
app.use(require('./api/users'))
app.use(require('./api/article'))

// /////////////////////////////////// <静态资源挂载> ///////////////////////////////////
app.use(express.static('./static'))

// /////////////////////////////////// <服务程序入口> ///////////////////////////////////
const server = app.listen(config.port, function () {
  const address = server.address()
  const addr = address.address === '::' ? '127.0.0.1' : address.address
  console.log("================================================")
  console.log("=== service started successfully!")
  console.log("=== the access address is %s http://%s:%s", address.family, addr, address.port)
  console.log("================================================")
})