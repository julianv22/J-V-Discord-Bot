const { MessageEmbed } = require("discord.js")
const cfg = require('../config.json')
const funcQ = require("../Functions/getQuote")
const funcH = require("../Functions/cmdHelp")

exports.name = "quote"
exports.aliases = ["qt"]
exports.description = `⤷Trích dẫn 1 câu trên [zenquotes](https://zenquotes.io)\nAlias: \`${exports.aliases}\``
exports.ussage = `\`${cfg.prefix}${exports.name}\``

exports.callback = async(client, message, args) => {
  try { 
    if (args.join(' ').trim() === '?') {
      return message.reply({
        embeds: (funcH.cmdHelp(client, message, exports.name, exports.ussage))
      })
    }
    
    funcQ.getQuote().then(quote => {
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