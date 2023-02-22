
const morgan = require('morgan')
const path = require('path')
const fs = require('fs')

const logConfig = require('../config').log

const logPath = path.join(logConfig.path, logConfig.name)

const accessLogStream = fs.createWriteStream(logPath, {flags: 'a+'})

morgan.token('from', function(req, res){ return req.query.from || '-' }) // 自定义token

morgan.format('server', '[server] :method :url :status :res[content-length] - :response-time ms') // 自定义format，其中包含自定义的token

module.exports = morgan('server', {stream: accessLogStream})

