module.exports = function(io) {

    // the chat namespace
    const chat = io.of('/chat');

    let usersCountByRoom = {};
    chat.on('connection', function (socket) {
        try {
            /**
             * it creates or joins a room
             */
            socket.on('create or join', function (room, userId) {
                if (!usersCountByRoom[room]) {
                    usersCountByRoom[room] = 0;
                }
                usersCountByRoom[room]++;
                socket.join(room);
                chat.to(room).emit('joined', room, userId);
                chat.in(room).emit('update user count', room, usersCountByRoom[room]);
            });

            socket.on('chat', function (room, userId, chatText) {
                chat.to(room).emit('chat', room, userId, chatText);
            });

            // Handling disconnect event
            socket.on('leave', function (room, userId) {
                // Handle the leave event to notify other users
                if (userId) {
                    socket.leave(room);
                    chat.to(room).emit('left', room, userId);
                }
                if (usersCountByRoom[room] && usersCountByRoom[room] > 0) {
                    usersCountByRoom[room]--;
                    chat.in(room).emit('update user count', room, usersCountByRoom[room]);
                }
            });
            // Additional logic to set userId on connection
            socket.on('setUserId', function (userId) {
                socket.userId = userId;
            });
        } catch (e) {
            console.error('Error in socket connection:', e);
        }
    });
}