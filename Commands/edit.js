const cfg = require('../config.json')
const funcH = require("../Functions/cmdHelp")
const funcE = require("../Functions/cmdError")

exports.name = "edit"
//exports.aliases = [""]
exports.description = `⤷${cfg.OwnerEmoji} only\n\`${cfg.prefix}${exports.name} ?\` để xem hướng dẫn`
//\nAlias: \`${exports.aliases}\``
exports.ussage = `**${cfg.OwnerEmoji} only**\n
\`${cfg.prefix}${exports.name} MessageID | Nội dung chỉnh sửa\`
*(MessageID = ID của tin nhắn)*\n
**Lưu ý:** Chỉ có thể sửa tin nhắn của Bot`
exports.callback = async (client, message, args) => {
  try {
    if (args.join(' ').trim() === '?') {
      return message.reply({
        embeds: (funcH.cmdHelp(message, exports.name, exports.ussage))
      })
    }
  
    if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`${cfg.erroremoji} | Bạn không phải Admin để sử dụng command này!`) //Check Permission
     
    const stEdit = args.join(' ').split(' | ')   
      
    if (!stEdit[0] || !stEdit[1]) {
      return message.reply({
      embeds: (funcE.cmdError(message,'Command chưa chính xác!',
                              `\`${cfg.prefix}${exports.name} ID | Nội dung chỉnh sửa\``))
      })
    } else {       
      let msgID = await message.channel.messages.fetch(stEdit[0]).catch(() => undefined);
      if (msgID === undefined) {
        return message.reply({
          embeds: (funcE.cmdError(message,'Lỗi Message ID', 'Message ID không chính xác hoặc không có quyền edit tin nhắn!'))
        })
      }
      if (msgID.author.id != client.user.id) return message.reply(`${cfg.erroremoji} | Đây không phải tin nhắn của <@${client.user.id}>`)
      
      await msgID.edit(stEdit[1]).then(() => message.delete())      
        /*msgID.then(msg => {
        msg.edit(stEdit[1])//.then( () => {msg.channel.send('ok')})
      })*/
    }
  } catch(err) {console.error(err)}
}