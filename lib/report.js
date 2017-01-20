const fs = require('fs')
const path = require('path')

const { error } = require('../lib/error')
const exit = require('../lib/exit')

const report = async (outURI, outHTMLString, email) => {
  // TODO : Beauty HTML
  await fs.writeFile(outURI, outHTMLString, (err) => {
    err && error(err) && exit(1)
  })

  // TODO : Push to email and mark as pushed
  email && console.log(`email:${email}`)
}

module.exports = report
