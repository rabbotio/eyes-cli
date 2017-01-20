#!/usr/bin/env node

const { exec } = require('child_process');
const minimist = require('minimist')

const exit = require('../lib/exit')
const { getOutURI } = require('../lib/config')
const report = require('../lib/report')
const { error } = require('../lib/error')
const { init, deploy } = require('../lib/firebase')

const getOutHTMLString = require('../lib/bake')

// Required email, url
const argv = minimist(process.argv.slice(2))

if (!argv.url) {
  error('Required : url')
  return
}

// Check SSL
const image = "jumanjiman/ssllabs-scan:latest"
const scan_opts = "-usecache -quiet" // See : https://github.com/ssllabs/ssllabs-scan#usage
const url = argv.url
const email = argv.email
const verbose = false

exec(`docker run ${image} ${scan_opts} ${url}`, async (error, stdout, stderr) => {
  // Log
  error && console.log(`error:${error}`)
  verbose && stdout && console.log(`stdout:${stdout}`)
  stderr && console.log(`stderr:${stderr}`)

  // Make report
  await report(getOutURI(url), getOutHTMLString(stdout), email)

  // Will deploy to Firebase, TODO : Mark as deployed.  
  await deploy(process.env.FIREBASE_TOKEN)

  // TODO : Update Firebase if deploy succeed.
  await init(process.env.FIREBASE_URL)

  // Gracefully exit
  exit(0)
})

// Poor exit
process.on('uncaughtException', err => {
  error(err)
  exit(1)
})
