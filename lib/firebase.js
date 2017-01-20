const { exec } = require('child_process')
const client = require('firebase-tools')
const admin = require("firebase-admin")

const init = (databaseURL) => {
  admin.initializeApp({
    credential: admin.credential.cert("serviceAccountKey.json"),
    databaseURL
  })
}

const deploy = async (token) => {
  console.log(` * deploy : ${token}`)

  await client.deploy({
    project: 'default',
    token,
    cwd: 'public'
  }).then(() => {
    console.log(' # deployed')
  }).catch((err) => {
    console.log(` ! ${err}`)
  })

}

module.exports = { init, deploy }