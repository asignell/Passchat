const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./utils/users');
const { format } = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const botName = "Passchat";

//SET STATIC FOLDER
app.use(express.static(path.join(__dirname,'public')));

//RUN WHEN A CLIENT CONNECTS
io.on('connection', socket => {

    socket.on('joinRoom', ({username, roomID}) => {
        const user = userJoin(socket.id,username,roomID);
        
        socket.join(user.roomID);

        socket.emit('message', formatMessage(botName,'Welcome to Passchat!'));

        //BROADCAST WHEN A USER CONNECTS
        socket.broadcast.to(user.roomID).emit('message', formatMessage(botName,`${user.username} has joined the chat`));
        //Send user and room info
        io.to(user.roomID).emit('roomUsers', {
            roomID : user.roomID,
            users : getRoomUsers(user.roomID)
        });
    
    });


    

    //Listen for chat message 
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id)
        io.to(user.roomID).emit('message',formatMessage(user.username,msg));
    });

    //RUNS WHEN A CLIENT DISCONNECTS
    socket.on('disconnect', () => {
        const user = userLeave(socket.id)

        if(user) {
        io.to(user.roomID).emit('message', formatMessage(botName,`${user.username} has left the chat`));

        io.to(user.roomID).emit('roomUsers', {
            roomID : user.roomID,
            users : getRoomUsers(user.roomID)
        });
    
        }

        
    });
});



const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));