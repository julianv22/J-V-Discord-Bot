const Database = require("@replit/database")
const db = new Database()
const { MessageEmbed } = require("discord.js")
const cfg = require('../config.json')
const thumbnailURL = "https://media.discordapp.net/attachments/976364997066231828/995628740782596127/unknown.png"

exports.name = "suggest"
exports.aliases = ["sgt"]
exports.description = `Đề xuất ý kiến.\nAlias: \`${exports.aliases}\``
exports.ussage = `\`${cfg.prefix}${exports.name} nội dung đề xuất\`
\n**Admin only:**
\`${cfg.prefix}${exports.name} set [ID channel]\` để set channel gửi đề xuất`

exports.callback = async (client, message, args) => {
  try {
    const sgtSet = args.join(' ').split(' ')
    const sgtChannel = await db.get(`sgtChannel_${message.guild.id}`)
    //console.log(`Suggset Channel: ${sgtChannel}`)        
    if (sgtSet[0] === '?') {
      return message.reply({
        embeds: [{
          author: {
            name: message.author.username,
            icon_url: message.author.displayAvatarURL(true)
          },
          thumbnail: {url: cfg.helpPNG},
          title: `Huớng dẫn sử dụng command [${exports.name}]`,
          description: exports.ussage,          
          color: 'RANDOM',          
        }]
      })
    }

    if (sgtSet[0] === 'set') { //Set Channel 
      if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`${cfg.erroremoji} | Bạn không phải Admin để sử dụng command này!`) //Check Permission
      const setChannel = client.channels.cache.get(sgtSet[1] || message.channel.id)
      if (setChannel === undefined) { //Check Channel ID
        message.reply(`${cfg.erroremoji} | ID channel không đúng hoặc chưa chính xác`)
      } else {
        await db.set(`sgtChannel_${message.guild.id}`, sgtSet[1] || message.channel.id) //Set Channel ID
        message.reply(`${cfg.successemoji} | Channel đề xuất đã được đặt thành ${setChannel}`)
      }
      return
    }
    if (!sgtChannel) return message.reply(`${cfg.erroremoji} | Chưa setup channel gửi đề xuất. Hãy liên hệ với ban quản trị để được hỗ trợ và hướng dẫn!`)
    //Check Suggest Content
    if (!args.join(' ')) return message.reply(`${cfg.erroremoji} | Nội dung đề xuất không thể bỏ trống!
\`${cfg.prefix}${exports.name} <nội dung đề xuất>\``)

    if (sgtSet[0] === 'ok') { //Suggest Accept
      message.delete();
      message.channel.send(`\`${cfg.successemoji} | Đề xuất đã được chấp nhận!\``);
      return;
    } else if (sgtSet[0] === 'deny') { //Suggest Deny
      message.delete();
      message.channel.send(`\`🚫 | Đề xuất không được chấp nhận!\``);
      return;
    } else {
      //Create Embed Message
      const user = message.author
      const em = new MessageEmbed()
        .setAuthor({ name: `Đề xuất của ${user.tag}`, iconURL: user.displayAvatarURL(true) })
        //.setTitle('')
        .setDescription("Đề xuất sẽ được xem xét và trả lời sớm nhất!")
        .addField('Nội dung:', args.join(' '))
        .setTimestamp()
        .setColor("RED")
        .setThumbnail(thumbnailURL)
        .setFooter(message.guild.name, message.guild.iconURL(true))
      message.delete()
      //Report Channel
      const rpChannel = client.channels.cache.get(sgtChannel)
      const msgSuggest = await rpChannel.send({ embeds: [em] })
      msgSuggest.react("👍")
      msgSuggest.react("👎")
      await message.channel.send(`${cfg.successemoji} | Đề xuất của **${user.username}** đã được gửi tới channel <#${sgtChannel}> thành công!`)
    }
  } catch (error) {
    console.error(error);
  }
}