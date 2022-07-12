const cfg = require('../config.json')
const func = require("../Functions/cmdHelp")

exports.name = "react"
//exports.aliases = [""]
exports.description = "⤷Cool! 😎"
exports.ussage = `\`${cfg.prefix}${exports.name}\``

exports.callback = async (client, message, args) => {  
  try {
    if (args.join(' ').trim() === '?') {
      return message.reply({
        embeds: (func.cmdHelp(client, message, exports.name, exports.ussage))
      })
    }

    let raMsg = [
      "Cool!",
      "Greet!",
      "Perfect!",
      "Wonderful!",
      "Amazing!",
      "Holy!"
    ]
    message.delete()
    const msg = `${raMsg[Math.floor(Math.random() * raMsg.length)]}`
    const msgReact = await message.channel.send(msg)
    msgReact.react("😎")
  } catch (error) {
    console.error(error);
  }
} 