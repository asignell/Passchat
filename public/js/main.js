const chatForm = document.getElementById('chat-form');
const chatMessage = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const socket = io();

//GET USERNAME AND ROOM FROM URL
const {username, roomID} = Qs.parse(location.search, { 
    ignoreQueryPrefix: true
    });




//JOIN ROOM
socket.emit('joinRoom', { username, roomID});

//Get room and users
socket.on('roomUsers', ( { roomID, users } ) => {
outputRoom(roomID);
outputUsers(users);
});

//MESSAGE FROM SERVER
socket.on('message', message => {
    outputMessage(message);

    //Scroll down
    chatMessage.scrollTop = chatMessage.scrollHeight;
});


//Message Submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;

    socket.emit('chatMessage',msg);

    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();
});

//DOM Manipulation
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class='meta'>${message.username}<span>  ${message.time}</span></p>
    <p class='text'>
    ${message.text}
    </p>`;

    document.querySelector('.chat-messages').appendChild(div);
}

function outputRoom(roomID) {
    roomName.innerText = roomID;
}

function outputUsers(users) {

    userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}   
    `;
}