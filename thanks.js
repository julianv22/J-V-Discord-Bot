const Discord = require("discord.js")
const { erroremoji, prefix, embedcolor } = require('../config.json')

exports.name = "thanks"
exports.aliases = ["ty"]
exports.description = `Gửi lời cảm ơn.
\`${prefix}thanks @...\`
Alias: \`${prefix}ty\``
exports.callback = async(client, message, args) => {
  let imgURL = ["https://cdn.discordapp.com/attachments/976364997066231828/987822146279587850/unknown.png",
    "https://media.discordapp.net/attachments/976364997066231828/988317420106174484/unknown.png",
    "https://cdn.discordapp.com/attachments/976364997066231828/988317854610907136/unknown.png",
    "https://cdn.discordapp.com/attachments/976364997066231828/988318049616670740/unknown.png",
    "https://media.discordapp.net/attachments/976364997066231828/988318184018960464/unknown.png",
    "https://cdn.discordapp.com/attachments/976364997066231828/988318415037005904/unknown.png",
    "https://cdn.discordapp.com/attachments/976364997066231828/988318803664445530/unknown.png",
"https://png.pngtree.com/thumb_back/fw800/background/20201020/pngtree-rose-thank-you-background-image_425104.jpg",
"https://www.ketoan.vn/wp-content/uploads/2020/12/thank.jpg",
"https://img.freepik.com/free-vector/thank-you-neon-sign-design-template-neon-sign_77399-331.jpg",
"https://i.pinimg.com/originals/7b/d9/46/7bd946c65b8aa3654236e6f5cb7fa0fd.gif",   "https://2.bp.blogspot.com/-83klB_SGIfA/VpyvOosaHyI/AAAAAAAASJI/ol3l6ADeLc0/s1600/Hinh-anh-cam-on-thank-you-dep-nhat-Ohaylam.com-%25283%2529.jpg"]
  let user = message.author
  let member = message.mentions.members.first()
  if(!member) {
    return message.reply(`${erroremoji} | Bạn phải @ đến một ai đó!`)}
  if (member.user.bot) {
    return message.reply(`${erroremoji} | Bot không cần cảm ơn 😝!`)}
  if (member.id === message.author.id) {
    return message.reply(`${erroremoji} | Bạn không thể cảm ơn chính mình 😅!`)}  
  const embed = new Discord.MessageEmbed()
    .setAuthor(user.username,user.displayAvatarURL({dynamic:true}))
    .setTitle("💖 | Thanks!")
    .setDescription(`Special thanks to **${member}**`)
    .setColor(embedcolor)
    .setImage(`${imgURL[Math.floor(Math.random() * imgURL.length)]}`)    
  message.reply({embeds: [embed]})  
}