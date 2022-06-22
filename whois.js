const Discord = require("discord.js")
const moment = require("moment")
const { erroremoji, prefix, embedcolor } = require('../config.json')

exports.name = "whois"
exports.description = `Xem thông tin thành viên.\n\`${prefix}whois @...\``
exports.callback = (client, message, args) => {
  let user = message.mentions.users.first() || message.author
  let member = message.mentions.members.first()
  if(!member) {
    return message.reply(`${erroremoji} | Cú pháp: \`${prefix}whois @tên thành viên\``)}
  var acknowledgements = "";
  if (member.id == message.guild.ownerId) {acknowledgements = "Chủ sở hữu"}
    if (member.premiumSince) {
      // If there was an acknowledgement, add a comma
      if (acknowledgements.length > 0) {acknowledgements += ", Server Booster"
      } else {acknowledgements = "Server Booster"}
    }
    // If no acknowledgement, set it to None
    if (!acknowledgements) {acknowledgements = "Không có"}
  const embed = new Discord.MessageEmbed()  
    .setColor(embedcolor)
    .setTitle("Thông tin thành viên")
    .setDescription(`<@${user.id}>`)
    .setAuthor({
        name: member.user.tag,
        iconURL: member.displayAvatarURL(true),
      })
    .setThumbnail(user.displayAvatarURL({dynamic:true}))            
    .addFields(
      {name: "Ngày tham gia server", value: `${moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, inline: true},
      {name: "Ngày tạo tài khoản", value: `${moment(message.author.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, inline: true},    
      {name: "User ID", value: `${user.id}`, inline: true}
    )
    .addField("Chức danh", `${acknowledgements}`, true)
    .addField(
        `Roles [${
          member.roles.cache
            .filter((r) => r.id !== message.guild.id)
            .map((roles) => `\`${roles.name}\``).length
        }]`,
        `${
          member.roles.cache
            .filter((r) => r.id !== message.guild.id)
            .map((roles) => `<@&${roles.id}>`)
            .join(" ") || "No Roles"
        }`        
      )
    .setFooter(`Requested by ${message.member.user.tag}`, `${message.member.displayAvatarURL()}`)
    .setTimestamp()
  message.reply({embeds: [embed]})  
}