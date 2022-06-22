const { SayEmoji } = require('../config.json')

exports.name = "say"
exports.aliases = ["s"]
exports.description = SayEmoji
exports.callback = async(client, message, args) => {
  let toSay = args.join(" ")
  if(!toSay) {
    message.delete()
    return message.channel.send(`${SayEmoji} | Hãy nói gì đó...`)    
  }
  message.channel.send(toSay)  
  message.delete()
}