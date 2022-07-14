const Database = require("@replit/database")
const db = new Database()
const { MessageEmbed } = require("discord.js")
const cfg = require('../config.json')
const func = require("../Functions/cmdHelp")
const funcE = require("../Functions/cmdError")
const thumbnailURL = "https://media.discordapp.net/attachments/976364997066231828/995628740782596127/unknown.png"

async function replySuggest(message, msgID, stReply) {    
  let msg = await message.channel.messages.fetch(msgID).catch(() => undefined);
  if (msg === undefined) return message.reply({
      embeds: (funcE.cmdError(message,'Lỗi Message ID', 'Message ID không chính xác!'))
    })
  if (msg.author.id != cfg.botID) return message.reply(`${cfg.erroremoji} | Hình như sai ID rồi đó man!`)
  return await msg.edit(stReply).then(() => message.delete())
}

exports.name = "suggest"
exports.aliases = ["sgt"]
exports.description = `⤷Đề xuất ý kiến.\nAlias: \`${exports.aliases}\``
exports.ussage = ""

exports.callback = async (client, message, args) => {
  try {
    const sgtSet = args.join(' ').split(' ')
    let sgtChannel = await db.get(`sgtChannel_${message.guild.id}`)
    let rpChannel = client.channels.cache.get(sgtChannel)
    //Suggest Help
    const sgtHelp = new MessageEmbed()
      .setTitle(`Hướng dẫn sử dụng [${exports.name}]`)
      .setColor('RANDOM')
      .setThumbnail('https://www.pngall.com/wp-content/uploads/5/Help.png')
      .setAuthor(message.guild.name, message.guild.iconURL(true))
      .setImage('https://media.discordapp.net/attachments/995993830367182858/997052005971410984/unknown.png')
      .addFields(
        {name: 'Gửi đề xuất', value: `\`${cfg.prefix}${exports.name} nội dung đề xuất\`
\nChannel gửi đề xuất: ${rpChannel}`},
        {name: `${cfg.OwnerEmoji} only:`, value: '*(dành cho quản trị viên)*'},
        {name: 'Set channel gửi đề xuất' , value: `\`${cfg.prefix}${exports.name} set [ChannelID]\``, inline: true},
        {name: 'Chấp nhận đề xuất' , value: `\`${cfg.prefix}${exports.name} ok [MessageID]\``, inline: true},
        {name: 'Từ chối đề xuất' , value: `\`${cfg.prefix}${exports.name} deny [MessageID]\``, inline: true},
        {name: 'Tham số:' , value: `**ChannelID** là ID của channel sẽ gửi đề xuất. Lấy ID bằng cách click chuột phải vào channel => chọn \`Sao chép ID\`\n
**MessageID** là ID của tin nhắn
\`❗ | Đề xuất sẽ được xem xét và trả lời sớm nhất!\`
ở bên dưới đề xuất tương ứng. Sao chép ID giống như **ChannelID**`},
      )
    if (sgtSet[0] === '?') {
      return message.reply({embeds: [sgtHelp]})
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
    if (!sgtChannel) return message.reply({
        embeds: (funcE.cmdError(message, 'Chưa setup channel gửi đề xuất!', 'Hãy liên hệ với ban quản trị để được hỗ trợ và hướng dẫn'))
      })
    if (message.member.permissions.has("ADMINISTRATOR")) {      
      if (sgtSet[0] === 'ok' && sgtSet[1]) { //Suggest Accept
          replySuggest(message, sgtSet[1],`\`${cfg.successemoji} | Đề xuất đã được chấp nhận!\``);
          return;
      } else if (sgtSet[0] === 'deny' && sgtSet[1]) { //Suggest Deny
          replySuggest(message, sgtSet[1],`\`🚫 | Đề xuất không được chấp nhận!\``);
          return;
      }
    }
    if (!args.join(' ')) {
      return message.reply({
        embeds: (funcE.cmdError(message, 'Nội dung đề xuất không thể bỏ trống!', `\`${cfg.prefix}${exports.name} nội dung đề xuất\``))
      })
    } else { //Create Embed Message
      const user = message.author
      const em = new MessageEmbed()
        .setAuthor({ name: `Đề xuất của ${user.tag}`, iconURL: user.displayAvatarURL(true) })
        .setTitle('Nội dung:')
        .setDescription(args.join(' '))
        //.addField('Nội dung:', args.join(' '))
        .setTimestamp()
        .setColor("RANDOM")
        .setThumbnail(thumbnailURL)
        .setFooter(message.guild.name, message.guild.iconURL(true))
      message.delete()
      //Report Channel
      rpChannel = client.channels.cache.get(sgtChannel)
      const msgSuggest = await rpChannel.send({ embeds: [em] })
      msgSuggest.react("👍")
      msgSuggest.react("👎")
      rpChannel.send(`\`❗ | Đề xuất sẽ được xem xét và trả lời sớm nhất!\``)
      await message.channel.send(`${cfg.successemoji} | Đề xuất của **${user.username}** đã được gửi tới channel <#${sgtChannel}> thành công!`)
    }

  throw Error
  } catch (error) {
    console.error(error);
  }
}