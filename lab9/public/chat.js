const socket = io.connect();
let pseudo;

document.getElementById('identificationButton').onclick = function() {
    pseudo = document.getElementById('nameInput').value || 'Utilisateur';
    document.getElementById('identificationBox').style.display = 'none';
    document.getElementById('messagesSection').style.display = 'block';
};

document.getElementById('sendMessageButton').onclick = function() {
    const message = document.getElementById('messageInput').value;
    socket.emit('newMessage', {'pseudo': pseudo, 'message': message});
    appendMessage(message, pseudo);
    document.getElementById('messageInput').value = '';
};

socket.on('getMessages', function (messages) {
    document.getElementById('chatBox').innerHTML = '';
    for (let i = 0; i < messages.length; i++) {
        appendMessage(messages[i].message, messages[i].pseudo);
    }
});

socket.on('getMessage', function (message) {
    appendMessage(message.message, message.pseudo);
});

function appendMessage(message, pseudo) {
    document.getElementById('chatBox').insertAdjacentHTML('beforeend', '<div class="line"><span class="label label-primary">' + pseudo + '</span> : ' + message + '</div>');
}