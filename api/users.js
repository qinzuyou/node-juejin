const router = require('express').Router()
const verify = require('../toolutils/verify')
const db_handle = require('../dbutils/dbhandle')
const utils = require('../toolutils/utils')
const connection = db_handle.connection()

console.log("=== load route [users]")
// 根路径
router.get('/', function(req, res) {
  const code = '<h1 style="text-align: center;width:100%;color:red;">hello world</h1>'
  res.send(code)
})

// 注册接口
router.post('/enroll', async function(req, res) {
  console.log("===> [/enroll] request ")
  let reason = ""
  let status = true

  const {fields, files} = await utils.multipartyForm(req)
  console.log("multiparty form fields: =====", fields)
  console.log("multiparty form files : =====", files)
  const {account, password, nickname, antistop} = fields

  const checkUser = await db_handle.query(connection, 'user', ['account'], {account: account})
  console.log('checkUser', checkUser, checkUser == false)
  if (checkUser.length === 0) {
    const profile = `/upload/${files.profile[0].path.split("\\")[2]}`
    const insertData = {
      account: account[0], 
      password: password[0], 
      nickname: nickname[0], 
      antistop: antistop.join(','), 
      profile:profile
    }
    const result = await db_handle.inster(connection, 'user', insertData)

    reason = result ? "注册成功": "注册失败"
    status = result
  } else {
    reason = "注册失败, 此账户已存在!"
    status = false
  }
  const respond = new utils.RespondHangdle({message: reason, status: status})
  console.log("===> [/enroll] respond ", respond)
  return res.send(respond)
})

// 登录接口
router.post('/login', async function(req, res) {
  console.log("===> [/login] request")

  const reqAccount = req.body.account
  const reqPassword = req.body.password

  const selFields = ['account', 'password', 'nickname', 'antistop', 'profile', 'regtime']
  const userInfoList = await db_handle.query(connection, 'user', selFields, {account: reqAccount})

  if (userInfoList.length === 0) {
    const notFoundRsp = new utils.RespondHangdle({message: '用户不存在!', status: false })
    console.log("===> [/login] respond ", notFoundRsp)
    return res.send(notFoundRsp)
  }

  const userInfo = userInfoList[0]
  const {account, password, nickname, antistop, profile, regtime} = userInfo
  
  let respond = new utils.RespondHangdle()
  if (userInfo && reqPassword === password) {
    respond.respond.token = verify.create_token(userInfo)
    respond.setReason("登陆成功")
    respond.setStatus(true)
    respond.setData({ account, nickname, antistop, profile, regtime})
  } else {
    respond.setReason("密码错误")
    respond.setStatus(false)
  }
  console.log("===> [/login] respond ", respond)
  return res.send(respond)
})

// 更新用户数据
router.post('/users/update', async function(req, res) {
  console.log("===> [/users/update] request ")
  const {update, condition} = req.body
  const updateRes = await db_handle.update(connection, 'user', update, condition)
  const respond = new utils.RespondHangdle({status: updateRes})
  return res.send(respond)
})

// 查询用户数据
router.get('/users/select', async function(req, res) {
    console.log("===> [/users/select] request ")
    const account = req.query.account
    const fields = req.query.fields
    const qryFields = fields || ['account', 'password', 'nickname', 'antistop', 'profile', 'regtime']
    const userInfoList = await db_handle.query(connection, 'user', qryFields, account ? {account} : null)
    const respond = new utils.RespondHangdle({status: true, data: userInfoList})
    return res.send(respond)
  })

// 删除用户数据
router.delete('/users/delete', async function(req, res) {
  console.log("===> [/users/delete] request ")
  const {account} = req.body
  const deleteRes = await db_handle.remove(connection, 'user', {account})
  const respond = new utils.RespondHangdle({status: deleteRes})
  return res.send(respond)
})

module.exports = router
