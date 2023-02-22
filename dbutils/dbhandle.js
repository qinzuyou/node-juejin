const sql_handle = require('mysql');
const assist = require('./assist')
const mysql_config = require('../config').db.mysql

function attr_handle_pool() { return sql_handle.createPool(mysql_config) }

function executeHnadle(pool, sql, data) {
    if (data) console.log(`execute sql: <${sql}>, datas: ${data}`)
    return new Promise((resolve, reject) => {
        pool.getConnection(function(error, connection){

            if(error) {
                console.log(`execute sql: <${sql}>, error: ${error}`)
                reject({error: error, values: null, fields: null})
                return
            }

            connection.query(sql, data, function(error, values, fields){
                connection.release() //释放连接
                const info = values ? values.length : "0"
                console.log(`execute sql: <${sql}>, values size: ${info}`)
                resolve({error: error, values: values, fields: fields}) //事件驱动回调
            })

        })
    })
}

async function select (pool, sql, data) {
    const {error, values, fields} = await executeHnadle(pool, sql, data)
    if (error === null && values) {
        return JSON.parse(JSON.stringify(values))
    }
    return []
}

async function execute(pool, sql, data) {
    const {error, values, fields} = await executeHnadle(pool, sql, data)
    if (error) {
        console.log('execute err: ', error)
        console.log('execute sql: ', sql)
    }
    return error === null && values
}

async function inster(pool, table, items) {
    const keys = Object.keys(items)
    const fields = assist.formatSqlByArray(keys)
    const values = []
    for (_ in keys) {
        values.push('?')
    }
    const sql = `INSERT INTO ${table} (${fields}) values (${values.join(', ')});`
    return await execute(pool, sql, Object.values(items))
}

async function remove(pool, table, condition) {
    const conditionSql = assist.formatSqlByObject(condition)
    const sql = `DELETE FROM ${table} WHERE ${conditionSql};`
    return execute(pool, sql, null)
}

async function update(pool, table, update, condition) {
    const updateSql = assist.formatSqlByObject(update)
    const conditionSql = assist.formatSqlByObject(condition)
    const sql = `UPDATE ${table} SET ${updateSql} WHERE ${conditionSql};`
    return await execute(pool, sql, null)
}

async function query(pool, table, fields, condition) {
    const flssql = assist.formatSqlByArray(fields)
    const consql = assist.formatSqlByObject(condition)
    const sql = `SELECT ${ flssql || '*' } FROM ${table} ${ consql ? 'WHERE ' + consql : ''};`
    const selectRes = await select(pool, sql, null)
    return selectRes
}

async function enhancedQuery(pool, table, fields, items) {
    const sqlKeyword = ["where"]
    let params = ""
    Object.keys(items).forEach((key) =>{
        let char = ''
        const val = items[key]
        if (val instanceof Array) {
            char = val.join(',')
        } else if (val instanceof Object) {
            char = assist.formatSqlByObject(val)
        } else {char = val}
        params += `${key} ${char} `
    })
    const flssql = assist.formatSqlByArray(fields)
    const sql = `SELECT ${ flssql || '*' } FROM ${table} ${ params ? params : ''};`
    return await select(pool, sql, null)
}

module.exports = {
    connection: attr_handle_pool,
    executeHnadle: executeHnadle,
    select: select,
    execute: execute,
    inster: inster,
    remove: remove,
    update: update,
    query: query,
    enhancedQuery: enhancedQuery
}
