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
    const imgURL = "https://media.discordapp.net/attachments/976364997066231828/997976998527914124/Header.png"
    const embed = new MessageEmbed()
      .setAuthor(user.username,user.displayAvatarURL(true))
      .setTitle("Dưới dây là các liên kết bạn có thể cần")
      .setColor(cfg.embedcolor)
      .addField("Server hỗ trợ", `[${cfg.serverName} Server](${cfg.discordLink})`,true)
      .addField(
        "Link mời",
        `[Invite me (recommended)](${cfg.inviteLink})\n\n[Invite me (admin)](https://shorturl.ae/WnzIo)`,true
      )    
      .addField(
        "Chủ sở hữu",
        `[YouTube](https://www.youtube.com/Julian-V)`,true
      )
      .setImage(imgURL)
      .setFooter(
        `${client.user.username} is working in [${client.guilds.cache.size.toLocaleString()}] servers`,
        client.user.displayAvatarURL(true)
      )
      .setTimestamp()
    message.reply({embeds: [embed]})
      .then((msg) => {
        msg.edit(`Owner Discord: ${cfg.ownerServerLink}`)
      })
    
  throw Error
  } catch (error) {
    console.error(error);
  }
}