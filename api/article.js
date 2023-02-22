const router = require('express').Router()
const db_handle = require('../dbutils/dbhandle')
const utils = require('../toolutils/utils')
const connection = db_handle.connection()

console.log("=== load route [article]")

// 文章发布
router.post('/article/publish', async function(req, res) {
  console.log("===> [/article/publish] request ")
  const {author, content, title, type} = req.body
  // const insterSql = "INSERT INTO article (author, content, title, type) values (?, ?, ?, ?);"
  // const insertRes = await db_handle.execute(connection, insterSql, [author, content, title, type])
  const insertRes = await db_handle.inster(connection, 'article', {author, content, title, type})
  const rspData = {status: insertRes}
  const respond = new utils.RespondHangdle(rspData)
  return res.send(respond)
})

// 文章删除
router.delete('/article/delete', async function(req, res) {
  console.log("===> [/article/delete] request ")
  const {author, releasetime, title} = req.body
  // const deleteSql = "DELETE FROM article WHERE author=?, releasetime=?, title=?;"
  // const deleteRes = await db_handle.execute(connection, deleteSql, [author, releasetime, title])
  const deleteRes = await db_handle.remove(connection, 'article', {author, releasetime, title})
  const rspData = {status: deleteRes}
  const respond = new utils.RespondHangdle(rspData)
  return res.send(respond)
})

// 文章信息更新
router.post('/article/update', async function(req, res) {
  console.log("===> [/article/update] request ")
  const {condition, substance} = req.body

  // const substanceSql = assist.formatSqlByObject(substance)
  // const conditionSql = assist.formatSqlByObject(condition)
  // const updateSql = `UPDATE article SET ${substanceSql} WHERE ${conditionSql};`
  // const updateRes = await db_handle.execute(condition, updateSql, null)
  const updateRes = await db_handle.update(connection, 'article', substance, condition)

  const rspData = {status: updateRes}
  const respond = new utils.RespondHangdle(rspData)
  return res.send(respond)
})

// 文章查询
router.get('/article/select', async function(req, res) {
  console.log("===> [/article/select] request ")
  let condition = ""
  let pagination = ""

  const queryMap = {}

  const condString = req.query.condition
  const pageString = req.query.pagination
  
  if (condString) {
    condition = JSON.parse(condString)
    queryMap['WHERE'] = condition
  }
  if (pageString) {
    pagination = JSON.parse(pageString)
    const {size, page} = pagination   // size 页大小; page 当前页
    queryMap['LIMIT'] = [(page - 1) * size, size]
  }

  const selectRes = await db_handle.enhancedQuery(connection, 'article', null, queryMap)
  const rspData = {data: selectRes, status: true}
  const respond = new utils.RespondHangdle(rspData)
  return res.send(respond)
})

// 文章类型查询
router.get('/article/types', async function(req, res) {
  console.log("===> [/article/types] request ")
  const fields = ['typeid', 'typename']
  const selectRes = await db_handle.query(connection, 'posttype', fields, null)
  const rspData = {data: selectRes, status: true}
  const respond = new utils.RespondHangdle(rspData)
  return res.send(respond)
})

module.exports = router
