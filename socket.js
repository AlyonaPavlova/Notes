const server = require('./server');
const io = require('socket.io')(server);

io.sockets.on('connection', function (socket) {
    socket.on('eventServer', function (data) {
        console.log(data);
        socket.emit('eventClient', { data: 'Hello Client' });
    });
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});
