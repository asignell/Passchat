//IMPORTS
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./users');

//BOT COMMANDS
//HOW TO CONTRIBUTE :
//Add an object to the commands array using the following template :
/*
    {
        name : '<name of the command>',
        usage : '/<name of command> <arg1> <arg2>...',
        arguments : <number of arguments (including the command itself)>,
        description : <breif description of the command>.
        funct : function(user,msg,args) {
            args is passed as an array of strings

            Return the string that you want to be displayed.
            You can use html tags like <b></b> and <br>.
        }

    }

*/


//COMMANDS

const commands =
[
    {
        name : 'help',
        usage : '/help',
        arguments : 1,
        description : 'Lists all commands',
        funct : function(user,msg,args) {
            var message = "";
            commands.forEach(command => {
                message += "<b>" + command.name + "</b>" + ": <br>&emsp;Description: " + command.description + "<br>"
            });
            return message;
        }
    },
    {
        name : 'users',
        usage : '/users',
        arguments : 1,
        description : 'Lists all users in current room',
        funct : function(user,msg,args) {
            var message = "<b>Active Users</b> :<br>";
            getRoomUsers(user.roomID).forEach(user => {
                message += user.username + ", ";
            });
            return message.slice(0, -2);
        }
    },
    {
      name : 'rng',
      usage : '/rng min max',
      arguments : 3,
      description : 'Generates a random number between min nd max',
      funct : function(user,msg,args) {
        var out = "";
        var min = arguments[2][1];
        var max = arguments[2][2];
        min = Math.ceil(min);
        max = Math.floor(max);
        num = Math.floor(Math.random() * (max - min + 1) + min);
        return num;
      }
    }
];

//Checks if command exists, if it does, runs command
function botCommand(user, msg) {
    const index = commands.findIndex(command => "/" + command.name === msg.split(" ")[0]);
    if (index !== -1) {
        if(msg.split(" ").length === commands[index].arguments) {
            return commands[index].funct(user,msg,msg.split(" "));
        }
        else {
            return "ERROR : INVALID ARGUMENTS<br>USAGE: " + commands[index].usage;
        }
    }
    return "ERROR : Command does not exist. Use /help for help.";
}


//EXPORTS
module.exports = botCommand;
