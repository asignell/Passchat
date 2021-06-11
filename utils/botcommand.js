//BOT COMMANDS
//HOW TO CONTRIBUTE :
//Add an object using the following template


//COMMANDS

const commands =
[
    {
        name : 'help',
        usage : '/help',
        arguments : 1,
        description : 'Lists all commands',
        funct : function(user,msg) {
            var message = "";
            commands.forEach(command => {
                message += "<b>" + command.name + "</b>" + ": <br>&emsp;Description: " + command.description + "<br>" 
            });
            return message;
        }
    }
];

//Checks if command exists, if it does, runs command
function botCommand(user, msg) {
    const index = commands.findIndex(command => "/" + command.name === msg.split(" ")[0]);
    if (index !== -1) {
        if(msg.split(" ").length === commands[index].arguments) {
            return commands[index].funct(user,msg);
        }
        else {
            return "ERROR : INVALID ARGUMENTS<br>USAGE: " + commands[index].usage;
        }
    }
    return "ERROR : Command does not exist. Use /help for help.";
}


//EXPORTS
module.exports = botCommand;