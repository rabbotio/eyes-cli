#!/usr/bin/env node

const minimist = require('minimist')
const mkdirp = require('mkdirp')
const fs = require('fs')

const md5 = require('../lib/md5')
const exit = require('../lib/exit')
const {error} = require('../lib/error')

// Required email, url
let args = process.argv.slice(2)

const argv = minimist(process.argv.slice(2))
console.dir(argv)

if (!argv.url) {
  error('Required : url')
  return
}

// Fake scan
console.log("Scaning please wait...")
console.log(`email:${argv.email}`)
console.log(`url:${argv.url}`)

// Output path
let hash = md5(argv.url);
let outPath = `${process.cwd()}/output/${hash}/${+new Date()}`
mkdirp(outPath, (err) => {
  if (err) error(err)
})

// Fake results
fs.writeFile(`${outPath}/index.html`, `<html>
<body>
Everything seem to be fine.
</body>
</html>`, (err) => {
    if (err) error(err)
  });

// TODO : Commit to Firebase and mark as committed.
// TODO : Push to email and mark as pushed

// Gracefully exit
exit(0)

// Poor exit
process.on('uncaughtException', err => {
  error(err)
  exit(1)
})