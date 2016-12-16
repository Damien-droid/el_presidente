var express = require('express');
var app = express();
var http = require( "http" ).createServer( app );
var io = require( "socket.io" )( http );
var Twitter = require("twitter");

var client = new Twitter({
  consumer_key: 'iaK4Uw1gJjeOXY2254P6Fws7U',
  consumer_secret: 'K5t0RcoRckiAnkK9EcDqsXtReNJO6zqeDRdGUGtPvkvT4QpZMp',
  access_token_key: '1088992639-N4XjmxQhgONqmkaqhC2ubiYPHrbna1gIU8Oko33',
  access_token_secret: '8gX6pD7aZQ8AyXD7z8yLpHc9VeTu4bGHQ9CCJN88zeLqF'
});

var fillon = 0;
var macron = 0;

http.listen(3001, "127.0.0.1");


app.use("/public", express.static(__dirname + '/public'));
app.use("/node_modules", express.static(__dirname + '/node_modules'));

app.get('/', function(req, res){
  res.sendFile('public/views/dashboard.html' , { root : __dirname});
});

client.stream('statuses/filter', {track: '@FrancoisFillon'},  function(stream) {
  stream.on('data', function(tweet) {
    fillon++;
  });
  stream.on('error', function(error) {
    console.log(error);
  });
});

client.stream('statuses/filter', {track: '@EmmanuelMacron'},  function(stream) {
  stream.on('data', function(tweet) {
    macron++;
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});

io.on('connection', function(){
  setInterval(function(){
    io.emit('result',[fillon,macron,10]);
  },2000);
});
