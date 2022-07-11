const { MessageEmbed } = require("discord.js")
const cfg = require('../config.json')
const func = require("../Functions/getQuote")

exports.name = "quote"
exports.aliases = ["qt"]
exports.description = `Trích dẫn 1 câu trên [zenquotes](https://zenquotes.io)\nAlias: \`${exports.aliases}\``
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
    
    func.getQuote().then(quote => {
      const user = message.author
      const embed = new MessageEmbed()      
        .setAuthor(user.username, user.displayAvatarURL(true))
        .setDescription(quote)
        .setColor(cfg.embedcolor)        
        .setThumbnail(cfg.thumbnailURL)
        .setFooter('Source: ZenQuotes')
        .setTimestamp()        
      message.delete()
      message.channel.send({embeds: [embed]})
    })
  } catch (error) {
    console.error(error);
  }
}