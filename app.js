var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.listen(3000);

app.use("/public", express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile('public/views/dashboard.html' , { root : __dirname});
});
