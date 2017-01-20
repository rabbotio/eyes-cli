#!/usr/bin/env node

// Native
require('dotenv').config()
if (!process.env.FIREBASE_TOKEN) {
  error('Eyes requires .env with FIREBASE_TOKEN')
}

const { resolve } = require('path')

// Packages
const nodeVersion = require('node-version')
const updateNotifier = require('update-notifier')

// Ours
const { error } = require('../lib/error')
const pkg = require('../package')

// Ignore register
require('firebase-tools')

// Support for keywords "async" and "await"
require('async-to-gen/register')({
  excludes: null
})

// Throw an error if node version is too low
if (nodeVersion.major < 6) {
  error('Eyes requires at least version 6 of Node. Please upgrade!')
  process.exit(1)
}

// Only check for updates in the npm version
if (!process.pkg) {
  updateNotifier({ pkg }).notify()
}

// This command will be run if no other sub command is specified
const defaultCommand = 'scan'

const commands = new Set([
  defaultCommand,
  'help',
  'scan',
  'ssllabs',
  'perf'
])

let cmd = defaultCommand
const args = process.argv.slice(2)
const index = args.findIndex(a => commands.has(a))

if (index > -1) {
  cmd = args[index]
  args.splice(index, 1)

  if (cmd === 'help') {
    if (index < args.length && commands.has(args[index])) {
      cmd = args[index]
      args.splice(index, 1)
    } else {
      cmd = defaultCommand
    }

    args.unshift('--help')
  }
}

const bin = resolve(__dirname, 'eyes-' + cmd + '.js')

// Prepare process.argv for subcommand
process.argv = process.argv.slice(0, 2).concat(args)

// Load sub command
// With custom parameter to make "pkg" happy
require(bin, 'may-exclude')