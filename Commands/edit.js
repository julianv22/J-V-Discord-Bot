const cfg = require('../config.json')
const funcH = require("../Functions/cmdHelp")
const funcE = require("../Functions/cmdError")

exports.name = "edit"
//exports.aliases = [""]
exports.description = `⤷${cfg.OwnerEmoji} only`//\nAlias: \`${exports.aliases}\``
exports.ussage = `**${cfg.OwnerEmoji} only**\n
\`${cfg.prefix}${exports.name} ID | Nội dung chỉnh sửa\`
*(ID = ID của tin nhắn)*`
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
      message.channel.send(`Đang phát triển\n\`${args.join(' ')}\``)
    }
    
    //let msgID = message.channel.messages.fetch(stEdit[0])    
    //console.log(msgID)
    /*msgID.then(msg => {
      msg.edit(stEdit[1])//.then( () => {msg.channel.send('ok')})
    })*/
  
  throw Error
  } catch(err) {console.error(err)}
}