let messages = [];

exports.onConnection = function (socket) {
    socket.emit('getMessages', messages);
    socket.on('newMessage', function(mess) {
        onNewMessage(socket, mess)
    });
}

function onNewMessage(socket, mess) {
    messages.push(mess);
    socket.broadcast.emit('getMessage', mess);   
}
