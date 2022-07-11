const cfg = require('../config.json')

exports.name = "say"
//exports.aliases = ["s"]
exports.description = cfg.SayEmoji
exports.ussage = `Nói gì đó: \`${cfg.prefix}${exports.name} <nội dung>\``

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
    
    let toSay = args.join(" ")
    if(!toSay) {
      message.delete()
      return message.channel.send(`${cfg.SayEmoji} | Hãy nói gì đó...`)    
    }
    message.channel.send(toSay)  
    message.delete()
  } catch (error) {
    console.error(error);
  }
}