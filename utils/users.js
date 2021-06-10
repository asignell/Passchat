const users = [];

//Join user to chat
function userJoin(id, username, roomID) {
     const user = { id, username, roomID};

     users.push(user);

     return user;
}

//Get the current user
function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

//User leaves chat

function userLeave(id) {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}
//Get room users
function getRoomUsers(roomID) {
    return users.filter(user => user.roomID === roomID);
}
module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
};