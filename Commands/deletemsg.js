const { Permissions } = require('discord.js');
const cfg = require('../config.json')
const func = require("../Functions/cmdHelp")

exports.name = "delete"
exports.aliases = ["del","clear"]
exports.description = `(${cfg.OwnerEmoji} Admin only)
Alias: \`${exports.aliases}\``
exports.ussage = `**Xoá tin nhắn hàng loạt:**
\`${cfg.prefix}${exports.name} [số tin nhắn]\` *(0 < [số tin nhắn] < 100)*
\nKhông thể xoá tin nhắn cũ hơn 14 ngày.`

exports.callback = async (client, message, args) => {
  try {
    if (args.join(' ').trim() === '?') {
      return message.reply({
        embeds: (func.cmdHelp(client, message, exports.name, exports.ussage))
      })
    }
    
    const user = message.member
    if (user.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
      if (!args[0] || isNaN(args[0])) return message.reply(`${cfg.erroremoji} | Hãy nhập số lượng tin nhắn muốn xoá`)
      if (args[0] < 1 || args[0] > 100) return message.reply(`${cfg.erroremoji} | Số lượng tin nhắn trong từ 1 > 100`)
      message.delete()
      await message.channel.messages.fetch({ limit: args[0] }).then(messages => {         message.channel.bulkDelete(messages)              
      })            
      await message.channel.send(`${cfg.successemoji} | Đã xoá ${args[0]} tin nhắn!`)
    } else {
      return message.reply(`${cfg.erroremoji} | Bạn không phải là Admin nên không thể sử dụng command này!`)
    }
  } catch (error) {
    console.error(error);
  }
}