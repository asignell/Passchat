const users = []; //Object containing list of users in all rooms

//Adds user to the current chat room
//PARAMETERS : id = socket id,
//             username = username,
//             roomID = roomID
//
//RETURNS : User object
function userJoin(id, username, roomID) {
     const user = { id, username, roomID};

     users.push(user);

     return user;
}

//Gets user based on id
//PARAMETERS : id = scocket id
//
//RETURNS : User object with matching id
function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

//Removes user from active users
//PARAMETERS : id = scocket id
//
//RETURNS : The user object that left the channel
function userLeave(id) {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

//Gets list of users in room
//PARAMETERS : roomID = roomID
//
//RETURNS : List of users in the given room
function getRoomUsers(roomID) {
    return users.filter(user => user.roomID === roomID);
}

//EXPORT
module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
};