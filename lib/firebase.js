const { exec } = require('child_process')
const client = require('firebase-tools')
const admin = require("firebase-admin")

const init = () => {
  admin.initializeApp({
    credential: admin.credential.cert("env/eyes-ed226-firebase-adminsdk-op4hk-73dff6a0db.json"),
    databaseURL: "https://eyes-ed226.firebaseio.com"
  })
}

const deploy = async (token) => {
  console.log(`* deploy : ${token}`)

  await client.deploy({
    project: 'default',
    token: token,
    cwd: 'public'
  }).then(() => {
    console.log('deployed')
  }).catch((err) => {
    console.log(`err:${err}`)
  })

}

module.exports = { init, deploy }