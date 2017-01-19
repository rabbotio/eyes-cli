#!/usr/bin/env node

const { exec } = require('child_process');
const minimist = require('minimist')

const exit = require('../lib/exit')
const { getOutURI } = require('../lib/config')
const report = require('../lib/report')
const { error } = require('../lib/error')

const getOutHTMLString = require('../lib/bake')

// Required email, url
const argv = minimist(process.argv.slice(2))

if (!argv.url) {
  error('Required : url')
  return
}

// Check SSL
const image = "jumanjiman/ssllabs-scan:latest"
const scan_opts = "-usecache -quiet"
const url = argv.url
const email = argv.email

exec(`docker run ${image} ${scan_opts} ${url}`, async (error, stdout, stderr) => {
  error && console.log(`error:${error}`)
  stdout && console.log(`stdout:${stdout}`)
  stderr && console.log(`stderr:${stderr}`)

  // Make report
  await report(getOutHTMLString(stdout), getOutURI(url), email)

  // Gracefully exit
  exit(0)
})

// Poor exit
process.on('uncaughtException', err => {
  error(err)
  exit(1)
})