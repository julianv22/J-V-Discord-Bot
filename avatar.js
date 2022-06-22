const { MessageEmbed } = require("discord.js")
const { erroremoji, prefix } = require('../config.json')

exports.name = "avatar"
exports.aliases = ["avt"]
exports.description = `Xem avatar của ai đó.
\`${prefix}avatar @...\`
Alias: \`${prefix}avt\``
exports.callback = async(client, message, args) => {
  try {
    const user =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.author;
    const username = user.username || user.user.username;
    
    const avtEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setTimestamp()
      .setTitle(`${username}'s Avatar:`)
      .setImage(user.displayAvatarURL({ dynamic: true, size: 2048 }))
      .setFooter({
        text: `Requested by ${message.author.username}`,
        iconURL: message.author.displayAvatarURL({dynamic: true})});      
  message.reply({ embeds: [avtEmbed] });
  } catch (err) {
      console.error(err);
      message.reply(`${erroremoji} | Error: \`\`\`${err}\`\`\``);
  }  
}