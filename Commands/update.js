const Database = require("@replit/database")
const db = new Database()
const { MessageEmbed } = require("discord.js")
const cfg = require('../config.json')
const func = require("../Functions/cmdHelp")
const thumbnailURL = "https://blognhansu.net.vn/wp-content/uploads/2017/01/update-tai-lieu.jpg"

exports.name = "update"
exports.aliases = ["up"]
exports.description = `(${cfg.OwnerEmoji} Admin only)\nAlias: \`${exports.aliases}\``
exports.ussage = `**Admin only:**
\`${cfg.prefix}${exports.name} Tiêu đề | Nội dung thông báo\`\n
\`${cfg.prefix}${exports.name} set [ID channel]\` để set channel thông báo`

exports.callback = async (client, message, args) => {
  try {
    const stArgs = args.join(' ').split(' ')
    let sgtChannel = await db.get(`updateChannel_${message.guild.id}`)
    let rpChannel = client.channels.cache.get(sgtChannel)
    console.log(`Suggset Channel: ${sgtChannel}`)        
    if (stArgs[0] === '?') {
      return message.reply({
        embeds: (func.cmdHelp(client, message, exports.name, exports.ussage + `\n\nChannel gửi thông báo: ${rpChannel}`))
      })
    }

    if (!message.member.permissions.has("ADMINISTRATOR")) {
      return message.reply(`${cfg.erroremoji} | Bạn không phải Admin để sử dụng command này!`) 
      } else {
        if (stArgs[0] === 'set') { //Set Channel         
          const setChannel = client.channels.cache.get(stArgs[1] || message.channel.id)
          if (setChannel === undefined) { //Check Channel ID
            message.reply(`${cfg.erroremoji} | ID channel không đúng hoặc chưa chính xác`)
          } else {
            await db.set(`updateChannel_${message.guild.id}`, stArgs[1] || message.channel.id) //Set Channel ID
            message.reply(`${cfg.successemoji} | Channel thông báo đã được đặt thành ${setChannel}`)
          }
          return
      }
    }
    
    if (!sgtChannel) return message.reply(`${cfg.erroremoji} | Chưa set channel thông báo!`)
    
    //Check Suggest Content
    const emArgs = args.join(' ').split('|')
    if (!emArgs[0] || !emArgs[1]) {
      return message.reply(`${cfg.erroremoji} | Nội dung thông báo không thể bỏ trống!
\`${cfg.prefix}${exports.name} Tiêu đề | Nội dung\``)
    } else { //Create Embed Message
      const user = message.author
      const em = new MessageEmbed()
        .setAuthor({ name: user.username, iconURL: user.displayAvatarURL(true) })
        .setTitle(emArgs[0])
        .setDescription(emArgs[1])        
        .setTimestamp()
        .setColor("RED")
        .setThumbnail(thumbnailURL)
        .setFooter(`Updated by ${user.username}`, message.guild.iconURL(true))
      message.delete()
      //Report Channel
      rpChannel = client.channels.cache.get(sgtChannel)
      rpChannel.send({ embeds: [em] })      
      //console.log(`${cfg.successemoji} | Thông báo đã được gửi thành công!`)
    }
  } catch (error) {
    console.error(error);
  }
}