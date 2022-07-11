const cfg = require('../config.json')
exports.name = "react"
//exports.aliases = [""]
exports.description = "Cool! 😎"
exports.ussage = `\`${cfg.noneemoji}\``

exports.callback = async (client, message, args) => {  
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