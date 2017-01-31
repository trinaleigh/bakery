var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/page'));

app.get('/', function(request, response) {
  response.render('page/index');
});

app.get('/display', function(request, response) {
  response.render('page/display/index');
});

app.get('/stats', function(request, response) {
  response.render('page/stats/index');
});

app.get('/ideas', function(request, response) {
  response.render('page/ideas/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});