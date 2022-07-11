const { MessageEmbed } = require("discord.js")
const cfg = require('../config.json')
const func = require("../Functions/cmdHelp")

exports.name = "wow"
//exports.aliases = [""]
exports.description = "😍 Wow!"
exports.ussage = `\`${cfg.noneemoji}\``

exports.callback = async(client, message, args) => {
  try {
    if (args.join(' ').trim() === '?') {
      return message.reply({
        embeds: (func.cmdHelp(client, message, exports.name, exports.ussage))
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