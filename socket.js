const cool = require('cool-ascii-faces');
const server = require('./server');
const io = require('socket.io')(server);

io.sockets.on('connection', function (socket) {
    socket.on('eventServer', function (data) {
        console.log(data);
        statusPacketTimer = setInterval(function () {
            socket.emit('eventClient', cool());
        }, 1000);
    });
    socket.on('disconnect', function () {
        console.log('User disconnected');
    });
});