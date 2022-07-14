const { MessageEmbed } = require("discord.js")
const cfg = require('../config.json')
const func = require("../Functions/cmdHelp")

exports.name = "link"
exports.aliases = ["invite"]
exports.description = `⤷Link 🔞\nAlias: \`${exports.aliases}\``
exports.ussage = `\`${cfg.prefix}${exports.name}\``

exports.callback = async(client, message, args) => {
  try {
    if (args.join(' ').trim() === '?') {
      return message.reply({
        embeds: (func.cmdHelp(message, exports.name, exports.ussage))
      })
    }
    
    const user = message.author
    const imgURL = "https://cdn-longterm.mee6.xyz/plugins/welcome/images/954736697453731850/2d36f223df925d1c99ef0d477e3c8925df5a454bec3312f1ecbfd411474d9c5b.png"
    const embed = new MessageEmbed()
      .setAuthor(user.username,user.displayAvatarURL(true))
      .setTitle("Dưới dây là các liên kết bạn có thể cần")
      .setColor(cfg.embedcolor)
      .addField("Server hỗ trợ", `[${cfg.serverName} Server](${cfg.discordLink})`,true)
      .addField("Link mời",`[Invite me (recommended)](${cfg.inviteLink})\n\n[Invite me (admin)](https://shorturl.ae/WnzIo)`,true)    
      .addField("Chủ sở hữu",`[Discord](${cfg.ownerServerLink})\n\n[YouTube](https://www.youtube.com/Julian-V)`,true)
      .setImage(imgURL)
      .setFooter(`${client.user.username} is working in [${client.guilds.cache.size.toLocaleString()}] servers`, client.user.displayAvatarURL(true))
      .setTimestamp()
    message.reply({embeds: [embed]}) 
    
  throw Error
  } catch (error) {
    console.error(error);
  }
}