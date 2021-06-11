const moment=require('moment'); //Enables the access of the current time

//Formats messages to contain the user, content, and time
//PARAMETERS : username = username
//             text = content of message
//
//RETURNS : Message object
function formatMessage (username, text) {
    return {
        username,
        text,
        time: moment().utc().format('h:mm a')
    }
}

//EXPORT
module.exports = formatMessage;