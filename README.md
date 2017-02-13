# eyes-cli
CLI for an eyes

# Setup
- Add `bin/serviceAccountKey.json` from our `rabbot.io-credentials` excel or by [download](https://console.firebase.google.com/project/eyes-c4e79/settings/serviceaccounts/adminsdk).
- Add `bin/.env` token from our `rabbot.io-credentials` excel.
  ```env
  FIREBASE_TOKEN="YOUR_FIREBASE_TOKEN"
  FIREBASE_DB_URL="YOUR_FIREBASE_DB_URL"
  ```
# Scan
```shell
# Get in bin
$ cd bin

# With ssllab
$ node eyes ssllabs --url http://rabbot.io

# With golismero
$ node eyes golismero --url http://rabbot.io
# golismero help
$ docker run --rm rabbotio/golismero --help

# With mozilla/tls-observatory
$ cd bin
$ node eyes tlsobs --url http://rabbot.io
```

TODO
- [ ] Auto add protocol.
- [ ] Commit to Firebase and mark as committed.
- [ ] Push to email and mark as pushed.
- [ ] Scan until queue is empty.
- [ ] Self schedule scan if available.