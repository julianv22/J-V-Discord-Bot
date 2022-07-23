exports.name = "command";
exports.aliases = ["cmd"];
exports.description = `⤷Danh sách command\nAlias: \`${exports.aliases}\``;
exports.ussage = `\`${cfg.prefix}${exports.name}\``;

exports.execute = async (message, args, client) => {
  if (args.join(' ').trim() === '?') return client.cmdGuide(message, exports.name, exports.ussage);
  message.reply(`**Command's Catalogues [${cmdFolders.length}]:**\n\`\`\`${cmdFolders.join(' | ')}\`\`\``);
}