// Packages
const ms = require('ms')
const chalk = require('chalk')

function handleError(err) {
  if (err.status === 403) {
    error('Authentication error')
  } else if (err.userError) {
    error(err.message)
  } else if (err.status === 500) {
    error('Unexpected server error. Please retry.')
  } else {
    error(`Unexpected error. Please try later. (${err.message})`)
  }
}

function error(err) {
  console.error(`> ${chalk.red('Error!')} ${err}`)
}

module.exports = {
  handleError,
  error
}