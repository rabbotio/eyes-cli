const mkdirp = require('mkdirp')
const fs = require('fs')
const path = require('path')

const { error } = require('../lib/error')
const exit = require('../lib/exit')

const report = async (outHTMLString, outURI, email) => {
  // Get dir
  const dir = path.parse(outURI).dir

  // Make output path
  await mkdirp(dir, (err) => {
    err && error(err) && exit(1)
  })

  // TODO : Beauty HTML
  await fs.writeFile(outURI, outHTMLString, (err) => {
    err && error(err) && exit(1)
  })

  // TODO : Commit to Firebase and mark as committed.
  // TODO : Push to email and mark as pushed
  email && console.log(`email:${email}`)
}

module.exports = report
