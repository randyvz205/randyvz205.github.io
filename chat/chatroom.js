document.addEventListener('DOMContentLoaded', function() {
    const socket = io('http://localhost:3000'); // Connect to the backend server
    const messagesDiv = document.getElementById('messages');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    sendButton.addEventListener('click', function() {
        const messageText = messageInput.value.trim();
        if (messageText !== '') {
            socket.emit('message', messageText); // Send message to the server
            messageInput.value = '';
        }
    });

    messageInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendButton.click();
        }
    });

    socket.on('message', function(msg) {
        const messageElement = document.createElement('div');
        messageElement.textContent = msg;
        messagesDiv.appendChild(messageElement);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    });
});