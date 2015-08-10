var PORT = process.env.PORT || 5000;
var express = require('express');
var app = express();

// settings
app.set('view engine', 'jade');

// static files
app.use('/js', express.static('js'));
app.use('/styles', express.static('styles'));

// routes
app.use('/youtube', require('./routes/youtube.js'));
app.use('/media', require('./routes/media.js'));

// index
app.get('/', function(req, res) {
  res.render('index');
});

// listen
app.listen(PORT);
console.log('Listening on :' + PORT);
