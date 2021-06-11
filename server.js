//IMPORTS
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./utils/users');
const botCommand = require('./utils/botcommand.js');
const { format } = require('path');

//CONSTANTS
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const botName = "Passchat";

//SET STATIC FOLDER
app.use(express.static(path.join(__dirname,'public')));



//Initializes connection with user
io.on('connection', socket => {
    //Listens for user joinRoom
    socket.on('joinRoom', ({username, roomID}) => {
        const user = userJoin(socket.id,username,roomID);
        
        //Connects user to specified room
        socket.join(user.roomID);

        //Emit message to user welcoming them to passchat
        socket.emit('message', formatMessage(botName,'Welcome to Passchat!'));

        //Broadcast message to room when user joins
        socket.broadcast.to(user.roomID).emit('message', formatMessage(botName,`${user.username} has joined the chat`));

        //Send roomID and active users list to client to display
        io.to(user.roomID).emit('roomUsers', {
            roomID : user.roomID,
            users : getRoomUsers(user.roomID)
        });
    
    });


    

    //Listens for chatMessage, replys with message to clients connected to room
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id)
        io.to(user.roomID).emit('message',formatMessage(user.username,msg));
        if(msg.charAt(0) === '/') {
            msg = botCommand(user,msg);
            io.to(user.roomID).emit('message',formatMessage(user.username,msg));
        }

        
    });



    //Listens for disconnect, replys with message to clients connected to room
    socket.on('disconnect', () => {
        const user = userLeave(socket.id)

        //If valid user, emit message and room information to room
        if(user) {
            io.to(user.roomID).emit('message', formatMessage(botName,`${user.username} has left the chat`));

            io.to(user.roomID).emit('roomUsers', {
                roomID : user.roomID,
                users : getRoomUsers(user.roomID)
                });
        }

    });



});


//Listens over port 8080 unless otherwise specified
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
