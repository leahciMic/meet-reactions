var PORT = process.env.PORT || 5000;
var express = require('express');
var app = express();

app.set('view engine', 'jade');

app.use('/js', express.static('js'));
app.use('/styles', express.static('styles'));

app.use('/youtube', require('./routes/youtube.js'));
app.use('/media', require('./routes/media.js'));

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(PORT);
console.log('Listening on :' + PORT);
