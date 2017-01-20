const md5 = require('../lib/md5')
const outPath = `${process.cwd()}/public`
const getOutURI = url => `${outPath}/${md5(url)}-${+new Date()}.html`

module.exports = { getOutURI }