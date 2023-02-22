const files = {
    profile: [
        {
        fieldName: 'profile',
        originalFilename: 'v2-0372a70d5349954a8ad42444b986e4ba_1440w.jpg',
        path: 'static\\upload\\un5ohvxsfCpkQtl3cJkwtEhD.jpg',
        headers: [Object],
        size: 115082
        }
    ]
}

// const res = files.profile[0].path.split("\\")[2]
// console.log(res)
class RespondHangdle {
    constructor(respond={}) {
        const {message, code, data, status} = respond
        this.respond = {
            reason: { message: message || "",  code: code || 201 }, 
            data:  data || [], 
            status: status ? 'succeed': 'failure'
        }
    }

    setStatus(status) {
        this.respond.status = status ? 'succeed': 'failure'
    }
    setReason(msg, code) {
        this.respond.reason.msg = msg ? msg : ''
        this.respond.reason.code = code ? code : 200
    }
    setData(data) {
        this.respond.data = data ? data : {}
    }
    getRespond() { return this.respond}
}



const assist = require('../dbutils/assist')
function chType(data) {
    if (data instanceof Object) {
        data = assist.formatSqlByObject(data)
    }
    
    // if (data instanceof Array) {
       
    // }
    console.log(data)
}
// const data = {a: 'a'}
// const list = [1, 2, 3, 4]
// chType(data)


const sql = "DELETE FROM article WHERE author=?, releasetime=?, title=?;"

// sql = sql.replace(';', '')
const items = {1: 2, 3: 3, 4: 4}
console.debug(Object.values(items))
const keys = Object.keys(items)
const values = [] 
for (_ in keys) values.push('?')

console.log(values.join(','))