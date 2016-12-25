var io = require('socket.io')(12800);

var a = require('./mg');

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

io.sockets.on( 'connection', function( socket ) {
  console.log('socket connect');
  socket.on('leave', function(room) {
      socket.leave(room);
      console.log("User Leave the room: "+socket.room);
      io.sockets.in(room).emit('log', {
        users: io.sockets.adapter.rooms[room]
      });
  });
  socket.on('join', function(room) {
      socket.join(room);
      socket.room = room;
      console.log(socket.id);

      a.getall(function(data){
        socket.emit('build',  data );
      })
      console.log("User Joined the room: "+socket.room);
      io.sockets.in(room).emit('log', {
        users: io.sockets.adapter.rooms[room]
      });
  });
  socket.on('like', function (data) {
      if(data.room){
        a.addlike(data);
        io.sockets.in(data.room).emit('res', _extends({}, data, { event: 'like' }) );
      }
  });
  socket.on('add', function (data) {
      if(data.room && data.message && data.id ){
        a.add(data);
        io.sockets.in(data.room).emit('res',  _extends({}, data, { event: 'add' }) );
      }
  });
  socket.on('disconnect',function(){
    console.log('disconnect');
    io.sockets.in(socket.room).emit('log', {
      users: io.sockets.adapter.rooms[socket.room],
      disconnect: true
    });
  })
});
