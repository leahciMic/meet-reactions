var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var youtubeSearch = require('youtube-search');

var opts = {
  maxResults: 10,
  key: 'AIzaSyDxe7puE8AQWkDUruzdQOOvbObcI9fTTCQ'
}

router.use(bodyParser.json());

router.post('/search', function(req, res) {
  console.log(req.body);
  youtubeSearch(req.body.query, opts, function(err, results) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send(results);
  });
});

module.exports = router;
