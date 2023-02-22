const multiparty = require('multiparty')
const config = require('../config')
class RespondHangdle {
    constructor(respond={}) {
        const {message, data, status} = respond
        this.respond = {
            reason: { 
                message: message || "",  
                code: status ? 200 : 201
            }, 
            data:  data || [], 
            status: status ? 'succeed': 'failure'
        }
    }
    setStatus(status) { 
        this.respond.status = status ? 'succeed': 'failure'
        this.respond.reason.code = status ? 200 : 201
    }

    setReason(msg) {
        this.respond.reason.message = msg ? msg : ''
    }

    setData(data) { this.respond.data = data ? data : {} }

    getRespond() { return this.respond}
}

function multipartyForm(request) {
    return new Promise((resolve, reject) => {
        const uploadDir = {uploadDir: config.static.upload.path}
        const form = new multiparty.Form(uploadDir)
        form.parse(request, function(error, fields, files) {
            if (error) {
                console.log('multiparty form error: ', error)
                reject(error)
            }
            resolve({fields: fields, files: files})
        })
    })
}

module.exports = {
    RespondHangdle: RespondHangdle,
    multipartyForm: multipartyForm
}
