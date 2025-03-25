const socket = io();

const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', sendMessage);

socket.on('chat message', function(msg) {
  const messageElement = document.createElement('div');
  messageElement.textContent = msg;
  messagesDiv.appendChild(messageElement);
});

function sendMessage() {
  const message = messageInput.value;
  socket.emit('chat message', message);
  messageInput.value = '';
}

window.addEventListener('beforeunload', function() {
  socket.emit('clear chat');
});