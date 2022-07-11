const cfg = require('../config.json')
exports.name = "ping"
//exports.aliases = [""]
exports.description = "Ping Pong!"
exports.ussage = `\`${cfg.noneemoji}\``

exports.callback = async(client, message, args) => {
  try {
    if (args.join(' ').trim() === '?') {
      return message.reply({
        embeds: [{
          author: {
            name: message.author.username,
            icon_url: message.author.displayAvatarURL(true)
          },
          thumbnail: {url: cfg.helpPNG},
          title: `Huớng dẫn sử dụng command [${exports.name}]`,
          description: exports.ussage,          
          color: 'RANDOM',          
        }]
      })
    }
    
    let x = args.join(" ")
    if(x) {return}
    message.reply(`⏱ | Pong **${message.author.username}**: \`${client.ws.ping} ms\``) 
  } catch (error) {
    console.error(error);
  }
}