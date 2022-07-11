const { MessageEmbed } = require("discord.js")
const cfg = require('../config.json')
const func = require("../Functions/cmdHelp")

exports.name = "link"
exports.aliases = ["invite"]
exports.description = `Link 🔞\nAlias: \`${exports.aliases}\``
exports.ussage = `\`${cfg.noneemoji}\``

exports.callback = async(client, message, args) => {
  try {
    if (args.join(' ').trim() === '?') {
      return message.reply({
        embeds: (func.cmdHelp(client, message, exports.name, exports.ussage))
      })
    }
    
    const user = message.author
    const imgURL = "https://cdn-longterm.mee6.xyz/plugins/welcome/images/954736697453731850/2d36f223df925d1c99ef0d477e3c8925df5a454bec3312f1ecbfd411474d9c5b.png"
    const embed = new MessageEmbed()
      .setAuthor(user.username,user.displayAvatarURL(true))
      .setTitle("🌐 Useful links")    
      .setColor(cfg.embedcolor)
      .addField("Support","[Discord Support](https://discord.gg/dyd8DXbrVq)",true)
      .addField("Invite",`[Invite me (recommended)](${cfg.inviteLink})\n[Invite me (admin)](https://shorturl.ae/WnzIo)`,true)    
      .addField("Owner","[Discord Owner](https://discord.gg/24GPY9CmY4)\n[YouTube](https://www.youtube.com/Julian-V)",true)
      .setImage(imgURL)    
    message.reply({embeds: [embed]})  
  } catch (error) {
    console.error(error);
  }
}