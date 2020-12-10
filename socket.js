const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
});

let users = [];

io.on('connection', socket => {
    console.log('a user connected');

    socket.on('sent', data => {
        io.emit('received', data);
    });

    socket.on('users', () => {
        io.emit('users-list', users);
    });

    socket.on('add-user', username => {
        users.push({
            id: socket.id,
            username
        });
        console.log(users);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        spliceUser();
        io.emit('users-list', users);
        console.log(users);
    });

    socket.on('logout', () => {
        console.log('user logged out');
        spliceUser();
        io.emit('logged-out', users);
        console.log(users);
    });

    socket.on('mention', (whoMentioned, userMentioned) => {
        socket.broadcast.to(userMentioned).emit('mentioned', whoMentioned + ' mentioned you in chat!');
    });

    function spliceUser() {
        const userIndex = users.findIndex(u => u.id === socket.id);
        if (userIndex !== -1)
            users.splice(userIndex, 1);
    }
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
