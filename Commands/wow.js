const { MessageEmbed } = require("discord.js")
const cfg = require('../config.json')

exports.name = "wow"
//exports.aliases = [""]
exports.description = "😍 Wow!"
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
    
    const user = message.author
    const embed = new MessageEmbed()
      .setAuthor(user.username,user.displayAvatarURL(true))
      .setFooter("😍 Wow!")    
      .setColor(cfg.embedcolor)
      .setImage("https://thumbs.gfycat.com/FavoriteBasicBadger-max-1mb.gif")    
    message.channel.send({embeds: [embed]})
    message.delete()
  } catch (error) {
    console.error(error);
  }
}