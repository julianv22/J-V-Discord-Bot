const Discord = require("discord.js")
const { erroremoji, prefix, embedcolor } = require('../config.json')

exports.name = "embed"
exports.aliases = ["em"]
exports.description = `Tạo embed message.
\`${prefix}embed Tiêu đề | Nội dung\`
Alias: \`${prefix}em\``
exports.callback = async(client, message, args) => {
  const emErr = new Discord.MessageEmbed()
    .setTitle(`${erroremoji} | Câu lệnh chưa chính xác!`)
    .setDescription(`\`${prefix}embed Tiêu đề | Nội dung\``)
    .setColor("RED")
  const user = message.author
  let cmd = args.join(" ").split("|")  
  if(!cmd[0] || !cmd[1]) return message.reply({embeds: [emErr]})
  const embed = new Discord.MessageEmbed()
    .setAuthor(user.username,user.displayAvatarURL({dynamic:true}))    
    .setTitle(cmd[0])
    .setDescription(cmd[1])    
    .setColor(embedcolor)    
  message.channel.send({embeds: [embed]})
  message.delete()
}