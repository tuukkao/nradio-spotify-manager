const express = require('express');
const Spotilocal = require('spotilocal').Spotilocal;

const app = express()
const spotilocal = new Spotilocal();

spotilocal.init().then(() => {
  app.get('/play/:trackUri', function(req, res) {
    spotilocal.play(req.params.trackUri, req.params.trackUri);
    res.status(200).end();
  })

  app.listen(3001, () => {
    console.log("Backend listening");
  })
}).catch(console.log)
