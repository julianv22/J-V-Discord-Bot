const Discord = require("discord.js")
const { prefix, thumbnailURL } = require('../config.json')

exports.name = "help"
exports.aliases = ["h"]
exports.description = "Đọc kỹ hướng dẫn SD trước khi dùng!"
exports.callback = async(client, message, args) => {
  const user = message.author
  const cmdSize = client.commands.size  
  const myDesc = client.cmdDesc.map(command => command.description)
  const myCmd = client.commands.map(command => command.name)
  const joinCmd = myCmd.join(" | ")
  const embed = new Discord.MessageEmbed()
    .setAuthor(user.username,user.displayAvatarURL())
    .setTitle(`Hey ${user.username}, these is some commands you need to know.`)
    .setDescription(`**Total commands: ${cmdSize}**`)
    .setColor("RANDOM")
    .setThumbnail(thumbnailURL)
    .setFooter(`${joinCmd}\nCommand prefix: ${prefix}`)
  for(var i = 0; i < cmdSize; i++) {    
    embed.addField(myCmd[i], `〔${myDesc[i] || myCmd[i]}〕`, true)
  }
  message.channel.send({embeds: [embed]})
  message.delete()
}