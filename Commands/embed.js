const { MessageEmbed } = require("discord.js")
const cfg = require('../config.json')
const func = require("../Functions/checkURL")
const funcE = require("../Functions/cmdError")

exports.name = "embed"
exports.aliases = ["em"]
exports.description = `⤷Tạo embed message.\nAlias: \`${exports.aliases}\``
exports.ussage = ""

exports.callback = async (client, message, args) => {
  try {
    const user = message.author
    const emHelp = new MessageEmbed()
      .setTitle(`Hướng dẫn sử dụng [${exports.name}]`)
      .setColor('RANDOM')
      .setThumbnail('https://www.pngall.com/wp-content/uploads/5/Help.png')
      .setAuthor(message.guild.name, message.guild.iconURL(true))
      .addFields(
        {name: 'Tạo embed cơ bản', value: `\`${cfg.prefix}${exports.name} Title | Description\``},
        {name: 'Tạo embed nâng cao', value: `\`${cfg.prefix}${exports.name} Title | Description | Footer | ThumbnailURL | ImageURL \``},
        {name: 'Title' , value: 'Tiêu đề', inline: true},
        {name: 'Description' , value: 'Nội dung', inline: true},
        {name: 'Footer' , value: 'Phần cuối embed', inline: true},        
        {name: 'ThumbnailURL' , value: 'Ảnh thumbnail góc bên phải embed *(nếu không set có thể bỏ trống)*'},
        {name: 'ImageURL' , value: 'Chèn ảnh vào cuối embed *(nếu không set có thể bỏ trống)*'},
      )
    
    let emContent = args.join(' ').split(' | ')
    if (emContent[0] === '?') return message.reply({embeds: [emHelp]})    
    
    if (!emContent[0] || !emContent[1]) return message.reply({
      embeds: (funcE.cmdError(message,'Command chưa chính xác!',
                              `\`${cfg.prefix}${exports.name} Tiêu đề | Nội dung\`
\n\`${cfg.prefix}${exports.name} ?\` để xem hướng dẫn cụ thể`))
    })
    const embed = new MessageEmbed()
      .setAuthor(user.username, user.displayAvatarURL(true))
      .setTitle(emContent[0])
      .setDescription(emContent[1])
      .setColor(cfg.embedcolor)
      .setTimestamp()
    if (emContent[2]) {
      embed.setFooter({
        text: emContent[2],
        iconURL: message.guild.iconURL(true)
      })
    }
    if (func.checkURL(emContent[3])) {
      try {
        embed.setThumbnail(emContent[3])
      } catch (err) {console.error(err)}
    }
    if (func.checkURL(emContent[4])) {
      try {
        embed.setImage(emContent[4])
      } catch (err) {console.error(err)}
    }
    message.channel.send({ embeds: [embed] })
    message.delete()     
    
  throw Error
  } catch (error) {
    console.error(error);
  }
}