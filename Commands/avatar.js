const { MessageEmbed } = require("discord.js")
const cfg = require('../config.json')

exports.name = "avatar"
exports.aliases = ["avt"]
exports.description = `Xem avatar của một người nào đó.\nAlias: \`${exports.aliases}\``
exports.ussage = `Xem avatar của một người nào đó: \n\`${cfg.prefix}${exports.name} @tên thành viên\``

exports.callback = async(client, message, args) => {
  try {   
    if (args.join(' ').trim() === '?') {
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
    
    const user =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.author;
    const username = user.username || user.user.username;
    
    const avtEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setTimestamp()
      //.setTitle('Avatar')
      .setDescription(`Avatar của ${user}`)
      .setImage(user.displayAvatarURL({ dynamic: true, size: 2048 }))
      .setFooter({
        text: `Requested by ${message.author.username}`,
        iconURL: message.author.displayAvatarURL(true)});      
    message.reply({ embeds: [avtEmbed] });
  } catch (err) {
    console.error(err);
    message.reply(`${cfg.erroremoji} | Error: \`\`\`${err}\`\`\``);
  }  
}