exports.name = "ping"
exports.aliases = ["p"]
exports.description = "Ping Pong!"
exports.callback = async(client, message, args) => {
  let x = args.join(" ")
  if(x) {return}
  message.reply(`⏱ | Pong **${message.author.username}**: \`${client.ws.ping} ms\``) 
}