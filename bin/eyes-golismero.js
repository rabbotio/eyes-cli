#!/usr/bin/env node

const { exec } = require('child_process');
const minimist = require('minimist')
const path = require('path')

const exit = require('../lib/exit')
const { getOutURI } = require('../lib/config')
const { error } = require('../lib/error')
const { init, deploy } = require('../lib/firebase')

// Required email, url
const argv = minimist(process.argv.slice(2))

if (!argv.url) {
  error('Required : url')
  return
}

// run golismero
const url = argv.url
const email = argv.email
// prepare output file/path
const outputFullPath = getOutURI(url)
const outputFileName = path.basename(outputFullPath)
const outputPath = path.dirname(outputFullPath)
// image and command switch
const image = "rabbotio/golismero:latest"
const scan_opts = `-e ssl* -o /opt/golismero/result/${outputFileName}` // 
const verbose = false

var cmd = `docker run --rm -v ${outputPath}:/opt/golismero/result:rw ${image} ${scan_opts} ${url}`
exec(cmd, async (error, stdout, stderr) => {
  // Log
  error && console.log(`error:${error}`)
  verbose && stdout && console.log(`stdout:${stdout}`)
  stderr && console.log(`stderr:${stderr}`)

  // no need to write output to file, golismero saves in in html `outputFullPath`
  // TODO: what about email?

  // Will deploy to Firebase, TODO : Mark as deployed.  
  await deploy(process.env.FIREBASE_TOKEN)

  // TODO: Update Firebase if deploy succeed.
  await init(process.env.FIREBASE_URL)

  // Gracefully exit
  exit(0)
})

// Poor exit
process.on('uncaughtException', err => {
  error(err)
  exit(1)
})
