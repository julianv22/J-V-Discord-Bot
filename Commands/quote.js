const { MessageEmbed } = require("discord.js")
const cfg = require('../config.json')
const func = [require("../Functions/cmdHelp"), require("../Functions/getQuote")]

exports.name = "quote"
exports.aliases = ["qt"]
exports.description = `⤷Trích dẫn 1 câu trên [zenquotes](https://zenquotes.io)\nAlias: \`${exports.aliases}\``
exports.ussage = `\`${cfg.prefix}${exports.name}\``

exports.callback = async(client, message, args) => {
  try { 
    if (args.join(' ').trim() === '?') {
      return message.reply({
        embeds: (func[0].cmdHelp(message, exports.name, exports.ussage))
      })
    }
    
    func[1].getQuote().then(quote => {
      const user = message.author
      const embed = new MessageEmbed()      
        .setAuthor(message.guild.name, message.guild.iconURL(true))
        .setDescription(quote)
        .setColor(cfg.embedcolor)        
        .setThumbnail(cfg.thumbnailURL)
        .setFooter(`Requested by ${user.username}`, user.displayAvatarURL(true))
        .setTimestamp()        
      message.delete()
      message.channel.send({embeds: [embed]})
    })
    
  throw Error
  } catch (error) {
    console.error(error);
  }
}