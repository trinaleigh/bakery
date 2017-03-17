var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/page'));
app.use(express.static(__dirname + '/page/display'));

app.get('/', function(request, response) {
  response.render('page/display/index');
});

app.get('/display', function(request, response) {
  response.render('page/display/index');
});

app.get('/trends', function(request, response) {
  response.render('page/trends/index');
});

app.get('/ideas', function(request, response) {
  response.render('page/ideas/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});