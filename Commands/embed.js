const { MessageEmbed } = require("discord.js")
const cfg = require('../config.json')
const func = require("../Functions/checkURL")

exports.name = "embed"
exports.aliases = ["em"]
exports.description = `⤷Tạo embed message.\nAlias: \`${exports.aliases}\`` 

exports.callback = async (client, message, args) => {
  try {
    const user = message.author
    const emHelp = new MessageEmbed()
      .setTitle(`Hướng dẫn sử dụng [${exports.name}]`)
      .setColor('RANDOM')
      .setThumbnail('https://www.pngall.com/wp-content/uploads/5/Help.png')
      .setAuthor(user.username, user.displayAvatarURL(true))      
      .addFields(
        {name: 'Tạo embed cơ bản', value: `\`${cfg.prefix}${exports.name} Title | Description\``},
        {name: 'Tạo embed nâng cao', value: `\`${cfg.prefix}${exports.name} Title | Description | Footer | ImageURL | ThumbnailURL \``},
        {name: 'Title' , value: 'Tiêu đề', inline: true},
        {name: 'Description' , value: 'Nội dung', inline: true},
        {name: 'Footer' , value: 'Phần cuối embed', inline: true},
        {name: 'ImageURL' , value: 'Chèn ảnh vào cuối embed *(nếu không set có thể bỏ trống)*'},
        {name: 'ThumbnailURL' , value: 'Ảnh thumbnail góc bên phải embed *(nếu không set có thể bỏ trống)*'},
      )
    
    let emContent = args.join(" ").split("|")
    if (emContent[0] === '?') return message.reply({embeds: [emHelp]})    
    
    const emErr = new MessageEmbed()
      .setTitle(`${cfg.erroremoji} | Câu lệnh chưa chính xác!`)
      .setDescription(`\`${cfg.prefix}${exports.name} Tiêu đề | Nội dung\``)
      .setColor("RED")
    
    if (!emContent[0] || !emContent[1]) return message.reply({ embeds: [emErr] })
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
        embed.setImage(emContent[3])
      } catch (err) {
        console.error(err);
        return
      }
    }
    if (func.checkURL(emContent[4])) {
      try {
        embed.setThumbnail(emContent[4])
      } catch (err) {
        console.error(err);
        return
      }
    }
    message.channel.send({ embeds: [embed] })
    message.delete()     
  } catch (error) {
    console.error(error);
  }
}