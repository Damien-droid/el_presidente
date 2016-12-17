var express = require('express');
var app = express();
var http = require( "http" ).createServer( app );
var io = require( "socket.io" )( http );
var Twitter = require("twitter");
var fs = require('fs');



fs.readFile('./config.json', 'utf8', function (err,data) {
  var config = JSON.parse(data);

  var client = new Twitter({
    consumer_key: config.twitter.consumer_key,
    consumer_secret: config.twitter.consumer_secret,
    access_token_key: config.twitter.access_token_key,
    access_token_secret: config.twitter.access_token_secret
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

  client.stream('statuses/filter', {track: '@manuelvalls'},  function(stream) {
    stream.on('data', function(tweet) {
      valls++;
    });

    stream.on('error', function(error) {
      console.log(error);
    });
  });

});

var fillon = 0;
var macron = 0;
var valls = 0;

http.listen(3001, "127.0.0.1");


app.use("/public", express.static(__dirname + '/public'));
app.use("/node_modules", express.static(__dirname + '/node_modules'));

app.get('/', function(req, res){
  res.sendFile('public/views/dashboard.html' , { root : __dirname});
});



io.on('connection', function(){
  setInterval(function(){
    fs.readFile('./config.json', 'utf8', function (err,data) {
      var config = JSON.parse(data);
      io.emit('result',[fillon,macron,valls, config.app.scale]);
    });
  },3000
);
});
