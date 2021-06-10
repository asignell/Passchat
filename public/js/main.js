//CONSTANTS
const chatForm = document.getElementById('chat-form');
const chatMessage = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const socket = io();

//Grab username and roomID from URL
const {username, roomID} = Qs.parse(location.search, { 
    ignoreQueryPrefix: true
    });

//Emits joinRoom to server with username and roomID
socket.emit('joinRoom', { username, roomID});

//Listens for room information and displays it
socket.on('roomUsers', ( { roomID, users } ) => {
outputRoom(roomID);
outputUsers(users);
});

//Listens for message and displays it
socket.on('message', message => {
    outputMessage(message);

    //Scroll down
    chatMessage.scrollTop = chatMessage.scrollHeight;
});

//Emits message to server on message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;

    socket.emit('chatMessage',msg);

    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();
});

//Renders messages from the server on DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class='meta'>${message.username}<span>  ${message.time}</span></p>
    <p class='text'>
    ${message.text}
    </p>`;

    chatMessage.appendChild(div);
}

//Displays the room ID
function outputRoom(roomID) {
    roomName.innerText = roomID;
}

//Displays the user list
function outputUsers(users) {

    userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}   
    `;
}