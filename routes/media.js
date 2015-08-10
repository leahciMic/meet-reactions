var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var childprocess = require('child_process');

router.use(bodyParser.json());

router.post('/play', function(req, res) {
  res.send('queued');
  childprocess.fork(
    './lib/player.js',
    [],
    {
      env: {
        video: req.body.video,
        room: req.body.room
      }
    }
  );
});

module.exports = router;
