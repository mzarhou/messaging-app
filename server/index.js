const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { origin: "*"}
})

io.on('connection', (socket) => {
    socket.on('message', message => {
        socket.broadcast.emit('message', message);
    });

    // typing
    socket.on('typing', () => socket.broadcast.emit('typing'))
    socket.on('not typing', () => socket.broadcast.emit('not typing'))
});

http.listen(8080, console.log('listening on http://localhost:8080'))
