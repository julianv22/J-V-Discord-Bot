const Discord = require("discord.js")
const { embedcolor } = require('../config.json')

exports.name = "wow"
exports.aliases = [""]
exports.description = "😍 Wow!"
exports.callback = async(client, message, args) => {
  const user = message.author
  const embed = new Discord.MessageEmbed()
    .setAuthor(user.username,user.displayAvatarURL({dynamic:true}))
    .setTitle("😍 Wow!")    
    .setColor(embedcolor)
    .setImage("https://thumbs.gfycat.com/FavoriteBasicBadger-max-1mb.gif")    
  message.channel.send({embeds: [embed]})
  message.delete()
}