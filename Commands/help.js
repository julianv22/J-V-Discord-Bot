const { MessageEmbed } = require("discord.js")
const cfg = require('../config.json')

exports.name = "help"
exports.aliases = ["h"]
exports.description = "Đọc kỹ hướng dẫn SD trước khi dùng!"
exports.ussage = `\`Đọc kỹ hướng dẫn SD trước khi dùng!\``
                    
exports.callback = async(client, message, args) => {
  try {
    if (args.join(' ').trim() === '?') return message.reply(exports.ussage)
    
    const user = message.author
    const cmdSize = client.commands.size 
    const joinCmd = client.commands.map(command => command.name).join(" | ")
    const cmds = client.commands.map(command => {
      return {
        name: command.name,
        value: command.description,
        inline: true
      }
    })         
    const embed = new MessageEmbed()
      .setAuthor(user.username,user.displayAvatarURL(true))
      .setTitle(`Các command hiện có của ${message.client.user.username}`)
      .setDescription(`**Tổng số command: [${cmdSize}]**`)
      .setColor("RANDOM")
      .setThumbnail(cfg.helpPNG)         
      .addFields(cmds)      
      .addField(`Command prefix: ${cfg.prefix}`, `${joinCmd}`)
      .setFooter(`${cfg.prefix}command ? để xem hướng dẫn cụ thể.`, message.guild.iconURL(true))
    message.channel.send({embeds: [embed]})
    message.delete()
  } catch (error) {
    console.error(error);
  }
}