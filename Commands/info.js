const { MessageEmbed } = require("discord.js")
const moment = require("moment")
//const mongoose = require("mongoose");
//const { userCache } = require("../Cache/Cache.js")
const { erroremoji, embedcolor, prefix } = require('../config.json')

exports.name = "serverinfo"
exports.aliases = ["info", "inf"]
exports.description = `Xem thông tin server (hoặc thành viên nếu @).
Alias: \`${prefix}info\`, \`${prefix}inf\``

exports.callback = async(client, message, args) => {
  const msg = args.join(" ")  
if (!msg) {
  let guild = message.guild  
  let members = guild.memberCount
  let bots = message.guild.members.cache.filter((bot) => bot.user.bot).size
  let channels = guild.channels.cache.filter(r => r.type === "GUILD_TEXT").size
  let voices = guild.channels.cache.filter(r => r.type === "GUILD_VOICE").size
  var embed = new MessageEmbed()
    .setAuthor(message.author.username,
               message.author.displayAvatarURL({dynamic:true}))    
    .setTitle("Server Info")
    .addField("Server Name", `${guild.name}`,true)
    .addField("Server ID", `${guild.id}`,true)
    .addField("Server Owner", `${guild.ownerID}`,true)
    .addField("Total Members", `${members} Members\n${bots} Bots`,true)    
    .addField("Total Roles", `${guild.roles.cache.size}`,true)
    .addField("Total Channels", ` ${channels} Text
${voices} Voice`,true)    
    .addField("Server Region", `${guild.region}`,true)
    .addField("Verification Level", `${guild.verificationLevel}`,true)
    .addField("Created in", `${guild.createdAt.toLocaleString()}`,true)
    .addField("Total Boosts", `${guild.premiumSubscriptionCount}`,true)
    .setColor(embedcolor)
    .setFooter(`Requested by ${message.member.user.tag}`, `${message.member.displayAvatarURL()}`)
    .setTimestamp()
    .setThumbnail(guild.iconURL({ dynamic: true }))
message.reply({embeds: [embed]}) 
} else if(!message.mentions.members.first()) {
      return message.reply(`${erroremoji} | Bạn phải @ đến một thành viên!`)}
  else {  
    var permissions = [];
    var acknowledgements = "";
    const member =
        message.mentions.members.first() || message.member || message.guild.members.cache.get(args[0]) 
    if (member.id == message.guild.ownerId) {acknowledgements = "Server Owner"}
    if (member.premiumSince) {
      // If there was an acknowledgement, add a comma
      if (acknowledgements.length > 0) {acknowledgements += ", Server Booster"
      } else {acknowledgements = "Server Booster"}
    }
    // If no acknowledgement, set it to None
    if (!acknowledgements) {acknowledgements = "None"}
    
    const embed = new MessageEmbed()
      .setTitle("Member Info")
      .setDescription(`<@${member.user.id}>`)
      .setAuthor({
        name: member.user.tag,
        iconURL: member.displayAvatarURL(true),
      })
      .setColor(embedcolor)
      .setFooter({
        text: `Requested by ${message.author.username}`,
      })
      .setThumbnail(member.displayAvatarURL(true))
      .setTimestamp()      
      .addField(
        "Joined at: ",
        `${moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`,
        true
      )
      .addField(
        "Created at: ",
        `${moment(message.author.createdAt).format(
          "dddd, MMMM Do YYYY, HH:mm:ss"
        )}`,
        true
      )
      .addField("User ID", `${member.user.id}`, true)
      .addField("Acknowledgements", `${acknowledgements}`, true)      
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
        }`)      
      .setThumbnail(member.displayAvatarURL(true))
    message.reply({ embeds: [embed] })
  }  
}