const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  return res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('disconnect', () => {
        console.log('Disconnected')
    })
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    })
    
    socket.on('chat is typing', () => {
        io.emit('chat is typing', true)
    })
})

server.listen(3000, () => {
    console.log('Listening on 300')
})
