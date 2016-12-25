//var app = require('express')();
//var http = require('http').Server(app);
var io = require('socket.io')(3001);
var socketioJwt = require('socketio-jwt');

io
  .on('connection', socketioJwt.authorize({
    secret: 'YnxtO2FjkUXqN_dbEGu8ezhPuFyWC9HcekeFGr1HW3ddwz96YxPS4A5ETrBfuZkg',
    timeout: 15000 // 15 seconds to send the authentication message
  })).on('authenticated', function(socket) {
    //this socket is authenticated, we are good to handle more events from it.
    console.log('hello! ' + JSON.stringify(socket.decoded_token));
  });
