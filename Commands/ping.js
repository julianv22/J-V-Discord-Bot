const cfg = require('../config.json')
const func = require("../Functions/cmdHelp")

exports.name = "ping"
//exports.aliases = [""]
exports.description = "Ping Pong!"
exports.ussage = `\`${cfg.noneemoji}\``

exports.callback = async(client, message, args) => {
  try {
    if (args.join(' ').trim() === '?') {
      return message.reply({
        embeds: (func.cmdHelp(client, message, exports.name, exports.ussage))
      })
    }
    
    let x = args.join(" ")
    if(x) {return}
    message.reply(`⏱ | Pong **${message.author.username}**: \`${client.ws.ping} ms\``) 
  } catch (error) {
    console.error(error);
  }
}