const { MessageEmbed } = require("discord.js")
const moment = require("moment")
const cfg = require('../config.json')

exports.name = "serverinfo"
exports.aliases = ["info", "inf"]
exports.description = `Xem thông tin server (hoặc thành viên nếu @).
Alias: \`${exports.aliases}\``
exports.ussage = `**Xem thông tin server:**
\`${cfg.prefix}${exports.name}\`
\n**Xem thông tin của thành viên:**
\`${cfg.prefix}${exports.name} @tên thành viên\``

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
    
    const msg = args.join(" ")  
  if (!msg) {
    let guild = message.guild  
    let members = guild.memberCount
    let bots = message.guild.members.cache.filter((bot) => bot.user.bot).size
    let channels = guild.channels.cache.filter(r => r.type === "GUILD_TEXT").size
    let voices = guild.channels.cache.filter(r => r.type === "GUILD_VOICE").size
    var embed = new MessageEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL(true))    
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
      .setColor(cfg.embedcolor)
      .setFooter(`Requested by ${message.member.user.tag}`, `${message.member.displayAvatarURL(true)}`)
      .setTimestamp()
      .setThumbnail(guild.iconURL(true))
  message.reply({embeds: [embed]}) 
  } else if(!message.mentions.members.first()) {
        return message.reply(`${cfg.erroremoji} | Bạn phải @ đến một thành viên!`)}
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
        .setDescription(`**Name:** ${member}`)
        .setAuthor({
          name: member.user.tag,
          iconURL: member.displayAvatarURL(true),
        })
        .setColor(cfg.embedcolor)
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL(true))
        .setThumbnail(member.displayAvatarURL(true))
        .setTimestamp()      
        .addField(
          "Joined at: ",
          `${moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm")}`,
          true
        )
        .addField(
          "Created at: ",
          `${moment(message.author.createdAt).format(
            "dddd, MMMM Do YYYY, HH:mm"
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
  } catch (error) {
    console.error(error);
  }
}