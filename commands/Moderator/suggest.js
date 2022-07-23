const Database = require("@replit/database");
const db = new Database();
const { MessageEmbed } = require("discord.js");

async function replySuggest(message, msgID, stReply) {
  let msg = await message.channel.messages.fetch(msgID).catch(() => undefined);
  if (msg === undefined) return client.showError(
    message,
    'Lỗi Message ID',
    'Message ID không chính xác!'
  );
  if (msg.author.id != cfg.ID)
    return message.reply(`\`\`\`${cfg.x} | Hình như sai ID rồi đó man!\`\`\``)
  return await msg.edit(stReply).then(() => message.delete());
}

exports.name = "suggest";
exports.aliases = ["sgt"];
exports.description = `⤷Đề xuất ý kiến.\nAlias: \`${exports.aliases}\``;
exports.ussage = "";

exports.execute = async (message, args, client) => {
  const sgtSet = args.join(' ').split(' ');
  const isAdmin = message.member.permissions.has("ADMINISTRATOR");
  let sgtChannel = await db.get(`sgtChannel_${message.guild.id}`);
  let rpChannel = client.channels.cache.get(sgtChannel);
  //Suggest Help
  const sgtHelp = new MessageEmbed()
    .setTitle(`Hướng dẫn sử dụng [${exports.name}]`)
    .setColor('RANDOM')
    .setThumbnail('https://www.pngall.com/wp-content/uploads/5/Help.png')
    .setAuthor(message.guild.name, message.guild.iconURL(true))
    .addField('Gửi đề xuất', `\`${cfg.prefix}${exports.name} nội dung đề xuất\`
\nChannel gửi đề xuất: ${rpChannel}`)
  if (isAdmin) { //Show help for Admin
    sgtHelp.addFields(
      { name: `${cfg.adminRole} only:`, value: '*(dành cho quản trị viên)*' },
      { name: 'Set channel gửi đề xuất', value: `\`${cfg.prefix}${exports.name} set [ChannelID]\``, inline: true },
      { name: 'Chấp nhận đề xuất', value: `\`${cfg.prefix}${exports.name} ok [MessageID]\``, inline: true },
      { name: 'Từ chối đề xuất', value: `\`${cfg.prefix}${exports.name} deny [MessageID]\``, inline: true },
      {
        name: 'Lưu ý:',
        value: `Để chấp nhận hoặc từ chối đề xuất cần phải sử dụng command trong channel gửi đề xuất: ${rpChannel}`
      },
      {
        name: 'Tham số:',
        value: `**[ChannelID]** là ID của channel sẽ gửi đề xuất.\n
              **[MessageID]** là ID của tin nhắn \`❗ | Đề xuất sẽ được xem xét và trả lời sớm nhất!\` ở bên dưới đề xuất tương ứng *(xem hình)*`
      },
    )
    sgtHelp.setImage(
      'https://media.discordapp.net/attachments/995993830367182858/997052005971410984/unknown.png'
    )
  }
  if (sgtSet[0] === '?') {
    return message.reply({ embeds: [sgtHelp] });
  }

  if (sgtSet[0] === 'set') { //Set Channel 
    if (!isAdmin)
      return message.reply(`\`\`\`${cfg.x} | Bạn không phải Admin để sử dụng command này!\`\`\``);
    //Check Permission
    const setChannel = client.channels.cache.get(sgtSet[1] || message.channel.id);
    if (setChannel === undefined) { //Check Channel ID
      return message.reply(`\`\`\`${cfg.x} | ID channel không đúng hoặc chưa chính xác\`\`\``);
    } else {
      //Set Channel ID
      await db.set(`sgtChannel_${message.guild.id}`, sgtSet[1] || message.channel.id);
      message.reply(`${cfg.v} | Channel đề xuất đã được đặt thành ${setChannel}`);
    }
    return
  }
  if (!sgtChannel) return client.showError(
    message,
    'Chưa setup channel gửi đề xuất!',
    'Hãy liên hệ với ban quản trị để được hỗ trợ và hướng dẫn'
  );
  if (rpChannel === undefined) return client.showError(
    message,
    'Channel gửi đề xuất không tồn tại hoặc đã bị thay đổi!',
    'Hãy liên hệ với ban quản trị để được hỗ trợ và hướng dẫn'
  );
  if (isAdmin) { //Check Permission
    if (sgtSet[0] === 'ok' && sgtSet[1]) { //Suggest Accept
      return replySuggest(message, sgtSet[1], `\`✅ | Đề xuất đã được chấp nhận!\``);
    } else if (sgtSet[0] === 'deny' && sgtSet[1]) { //Suggest Deny
      return replySuggest(message, sgtSet[1], `\`🚫 | Đề xuất không được chấp nhận!\``);
    }
  }
  if (!args.join(' ')) {
    return client.showError(
      message,
      'Nội dung đề xuất không thể bỏ trống!',
      `\`${cfg.prefix}${exports.name} nội dung đề xuất\``
    );
  } else { //Create Embed Message
    const user = message.author;
    const thumbnailURL = "https://media.discordapp.net/attachments/976364997066231828/995628740782596127/unknown.png";
    const em = new MessageEmbed()
      .setAuthor({ name: `Đề xuất của ${user.tag}`, iconURL: user.displayAvatarURL(true) })
      .setTitle('Nội dung:')
      .setDescription(args.join(' '))
      .setTimestamp()
      .setColor("RANDOM")
      .setThumbnail(thumbnailURL)
      .setFooter(message.guild.name, message.guild.iconURL(true))
    message.delete();
    //Report Channel
    rpChannel = client.channels.cache.get(sgtChannel);
    const msgSuggest = await rpChannel.send({ embeds: [em] });
    msgSuggest.react("👍");
    msgSuggest.react("👎");
    rpChannel.send(`\`❗ | Đề xuất sẽ được xem xét và trả lời sớm nhất!\``);
    await message.channel.send(`${cfg.v} | Đề xuất của **${user.username}** đã được gửi tới channel <#${sgtChannel}> thành công!`);
  }
}