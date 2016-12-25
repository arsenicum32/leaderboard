var socket = io.connect( 'https://12800.sliceofring.ru' );
  //'http://localhost:1280');//'http://1280.sliceofring.ru' ); // 85.143.209.210 сокет по этому ip

socket.on('connect', function() {
     socket.emit('join', 'room'); //комната и её получение
});

socket.on( 'build', function( data ) {
    build(data);
    //$("#chat" ).append('<div>' + data.name + ' : ' + data.message + '</div>');
});

// получение сообщения
socket.on( 'res', function( data ) {
    console.log(data);
    if(data.event == 'add'){
      newb(data);
    }else if(data.event == 'like'){
      update(data.id2);
    }
    //$("#chat" ).append('<div>' + data.name + ' : ' + data.message + '</div>');
});

socket.on( 'like', function( data ) {
    alert(data);
    //$("#chat" ).append('<div>' + data.name + ' : ' + data.message + '</div>');
});



$(document).ready(function(){
  // setInterval( function(){
  //   //alert('test')
  //   sendpm('room' , $('#m').val(), $('#n').val() );
  // } , 500)
})

//отправка сообщения
function Sadd(message, name ) {
     socket.emit( 'add', { room: 'room', message: message, id: name });
}

function Slike( name , id ) {
     socket.emit( 'like', { room: 'room', id: name, id2: id });
}
