const Discord = require("discord.js")
const { InviteLink, embedcolor } = require('../config.json')

exports.name = "link"
exports.aliases = ["invite"]
exports.description = `Link 🔞`
exports.callback = async(client, message, args) => {
  const user = message.author  
  const embed = new Discord.MessageEmbed()
    .setAuthor(user.username,user.displayAvatarURL({dynamic:true}))
    .setTitle("Links:")    
    .setColor(embedcolor)
    .addField("Discord:", "https://discord.gg/w33kj9z5fD")
    .addField("YouTube","https://www.youtube.com/Julian-V")
    .addField("Invite me (recommended)",`${InviteLink}`)
    .addField("Invite me (admin)","https://shorturl.ae/WnzIo")
  message.reply({embeds: [embed]})  
}