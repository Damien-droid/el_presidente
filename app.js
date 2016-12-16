var express = require('express');
var app = express();
var http = require( "http" ).createServer( app );
var io = require( "socket.io" )( http );

http.listen(8080, "127.0.0.1");

app.use("/public", express.static(__dirname + '/public'));
app.use("/node_modules", express.static(__dirname + '/node_modules'));

app.get('/', function(req, res){
  res.sendFile('public/views/dashboard.html' , { root : __dirname});
});

io.on('connection', function(client){
  console.log('connected');
  setInterval(function(){
    io.emit('test','this is a test');
  },5000)
});
