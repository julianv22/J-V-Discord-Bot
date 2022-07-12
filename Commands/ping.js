const cfg = require('../config.json')
const func = require("../Functions/cmdHelp")

exports.name = "ping"
//exports.aliases = [""]
exports.description = "⤷Ping Pong!"
exports.ussage = `\`${cfg.prefix}${exports.name}\``

exports.callback = async(client, message, args) => {
  try {
    if (args.join(' ').trim() === '?') {
      return message.reply({
        embeds: (func.cmdHelp(message, exports.name, exports.ussage))
      })
    }
    
    let x = args.join(" ")
    if(x) {return}
    message.reply(`⏱ | **${message.author.username}** ping: \`${client.ws.ping} ms\`
**Bots** ping: ${Math.round(bot.ws.ping)}`) 
  } catch (error) {
    console.error(error);
  }
}