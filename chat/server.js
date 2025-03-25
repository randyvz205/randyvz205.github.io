const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });

  socket.on('clear chat', function() {
    io.emit('clear chat');
  });
});

server.listen(3000, function() {
  console.log('listening on *:3000');
});