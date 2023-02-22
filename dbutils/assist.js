
function formatSqlByObject(items) {
    if (!items) return ""
    let list = []
    Object.keys(items).forEach((key)=> {
        const value = items[key]
        list.push(`${key}='${value}'`)
      })
    return list.join(', ')
}

function formatSqlByArray(array) { 
    if (!array) return ''
    return array.join(', ')
}

module.exports = {
    formatSqlByObject: formatSqlByObject,
    formatSqlByArray: formatSqlByArray
}