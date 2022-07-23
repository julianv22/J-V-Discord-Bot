exports.name = "delete";
exports.aliases = ["del", "clear"];
exports.description = `⤷${cfg.adminRole} only\n\`${cfg.prefix}${exports.name} ?\`
Alias: \`${exports.aliases}\``;
exports.ussage = `**${cfg.adminRole} only**\n
**Xoá tin nhắn hàng loạt** :
\`${cfg.prefix}${exports.name} [số tin nhắn]\` *(0 < [số tin nhắn] < 100)*`;

exports.execute = async (message, args, client) => {
  const isAdmin = message.member.permissions.has("ADMINISTRATOR");
  if (args.join(' ').trim() === '?' && isAdmin)
    return client.cmdGuide(message, exports.name, exports.ussage, 'Không thể xoá tin nhắn cũ hơn 14 ngày.');

  const user = message.member;
  if (!isAdmin) return message.reply(`\`\`\`❌ | Bạn không phải Admin để sử dụng command này!\`\`\``);
  if (!args[0] || isNaN(args[0])) return message.reply(`\`\`\`❌ | Hãy nhập số lượng tin nhắn muốn xoá\`\`\``);
  if (args[0] < 1 || args[0] > 100) return message.reply(`\`\`\`❌ | Số lượng tin nhắn trong khoảng từ 1 > 100\`\`\``);

  message.delete();
  await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
    message.channel.bulkDelete(messages)
  });
  await message.channel.send(`✅ | Đã xoá ${args[0]} tin nhắn!`);
}