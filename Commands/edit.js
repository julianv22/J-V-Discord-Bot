const { MessageEmbed } = require("discord.js")
const cfg = require('../config.json')
const func = [require("../Functions/checkURL"), require("../Functions/cmdError")]

exports.name = "edit"
//exports.aliases = [""]
exports.description = `⤷${cfg.OwnerEmoji} only\n\`${cfg.prefix}${exports.name} ?\``
//\nAlias: \`${exports.aliases}\``
exports.ussage = ''
exports.callback = async (client, message, args) => {
  try {
    const isAdmin = message.member.permissions.has("ADMINISTRATOR")
    const editHelp = new MessageEmbed()
      .setTitle(`Hướng dẫn sử dụng [${exports.name}]`)
      .setColor('RANDOM')
      .setThumbnail('https://www.pngall.com/wp-content/uploads/5/Help.png')
      .setAuthor(message.guild.name, message.guild.iconURL(true))
      .addField(`${cfg.OwnerEmoji} only`, '*(dành cho quản trị viên)*')            
      .addFields(        
        {name: 'Edit tin nhắn thông thường', value: `\`${cfg.prefix}${exports.name} [Message ID] [Content]\``},
        {name: 'Edit embed (nâng cao)', value: `\`${cfg.prefix}${exports.name} embed [Message ID] [Title] > [Content] > [Footer] > [ThumbnailURL] > [ImageURL]\`
\n**Tham số:**`},
        {name: '[Message ID]' , value: 'ID của tin nhắn: chuột phải vào tin nhắn và chọn \`Sao chép ID\` *(xem hình bên dưới)*'},
        {name: '[Title]' , value: 'Tiêu đề', inline: true},
        {name: '[Content]' , value: 'Nội dung edit', inline: true},
        {name: '[Footer]' , value: 'Phần cuối embed *(có thể bỏ trống)*', inline: true},        
        {name: '[ThumbnailURL]' , value: 'Ảnh thumbnail góc bên phải embed *(nếu không set có thể bỏ trống)*'},
        {name: '[ImageURL]' , value: 'Chèn ảnh vào cuối embed *(nếu không set có thể bỏ trống)*'},
        {name: 'LƯU Ý' , value: `1. Chỉ có thể edit tin nhắn được gủi bởi <@${client.user.id}>
2. Cần phải sử dụng command tại channel có tin nhắn muốn edit`},
      )
      .setImage(
        'https://media.discordapp.net/attachments/989460807354048559/997625474878545931/unknown.png'
      )
    
    if (args.join(' ').trim() === '?' && isAdmin) return message.reply({ embeds: [editHelp] }) //Edit's Help    
  
    if (!isAdmin) return message.reply(`${cfg.erroremoji} | Bạn không phải Admin để sử dụng command này!`) //Check Permission
     
    const stEdit = args.join(' ').split(' ')   
      
    if (!stEdit[0]) { //Check arguments
      return message.reply({
      embeds: (func[1].cmdError(message,'Command chưa chính xác!', `\`${cfg.prefix}${exports.name} [Message ID] [Nội dung chỉnh sửa]\``))
      })
    }
    let msgID = await message.channel.messages.fetch(stEdit[0]).catch(() => undefined);
    const user = message.author
    switch(stEdit[0]) {
      case 'embed':        
        msgID = await message.channel.messages.fetch(stEdit[1]).catch(() => undefined);
        if (msgID === undefined || !stEdit[1]) { // Check Message ID
          return message.reply({
            embeds: (func[1].cmdError(message,'Lỗi Edit Embed', `Message ID \`${stEdit[1]}\` không chính xác hoặc không có quyền edit tin nhắn này!`))
          })
        }
        if (msgID.author.id != client.user.id) return message.reply({
          // Check Author
          embeds: (func[1].cmdError(message,'Lỗi Edit Embed', `${cfg.erroremoji} | Message ID: [\`${stEdit[1]}\`](${msgID.url}) không phải tin nhắn của <@${client.user.id}>`))
        })
        // Check Content
        if (!stEdit[2] || !stEdit[3]) return message.reply({
          embeds: (func[1].cmdError(message, 'Lỗi Edit Embed', `Chưa nhập nội dung edit!\n\`${cfg.prefix}${exports.name} embed [Message ID] [Tiêu đề] > [Nội dung]\``))
        })
          
        const stEmbed = args.slice(2).join(' ').split(' > ')        
        const embed = new MessageEmbed()
          .setAuthor(user.username, user.displayAvatarURL(true))
          .setTitle(stEmbed[0])
          .setDescription(stEmbed[1])
          .setColor(cfg.embedcolor)
          .setTimestamp()
          if (stEmbed[2]) {
            embed.setFooter({
              text: stEmbed[2],
              iconURL: message.guild.iconURL(true)
            })
          }
          if (func[0].checkURL(stEmbed[3])) {
            try {
              embed.setThumbnail(stEmbed[3])
            } catch (err) {console.error(err)}
          }
          if (func[0].checkURL(stEmbed[4])) {
            try {
              embed.setImage(stEmbed[4])
            } catch (err) {console.error(err)}
          }
        message.delete()
        await msgID.edit({ embeds: [embed] })
          .then(() => { message.channel.send({ //Send Report
            embeds: [{
              color: 'RANDOM',
              author: {
                name: message.guild.name, 
                icon_url: message.guild.iconURL(true)
              },          
              title: `${user.tag} đã sửa Embed`,
              description: `**Message ID:** \`${msgID.id}\` | **URL:** [[Jump link](${msgID.url})]`,
              thumbnail: {url: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/154/memo_1f4dd.png'}
              }]
            })
          })
        break;      
      default:
        const stContent = args.slice(1).join(' ')
        if (msgID === undefined || !stEdit[0]) { //Check Message ID
          return message.reply({
            embeds: (func[1].cmdError(message,'Lỗi Edit Message', `Message ID: \`${stEdit[0]}\` không chính xác hoặc không có quyền edit tin nhắn này!`))
          })
        }
        if (msgID.author.id != client.user.id) return message.reply({ 
          // Check Author
          embeds: (func[1].cmdError(message,'Lỗi Edit Message', `${cfg.erroremoji} | Message ID: [\`${stEdit[0]}\`](${msgID.url}) không phải tin nhắn của <@${client.user.id}>`))
        }) 
        // Check Content
        if (!stContent) return message.reply({
          embeds: (func[1].cmdError(message, 'Lỗi Edit Message', `Chưa nhập nội dung edit!\n\`${cfg.prefix}${exports.name} [Message ID] [Nội dung edit]\``))
        })
        
        message.delete()        
        await msgID.edit(stContent)
          .then(() => {message.channel.send({ //Send Report
            embeds: [{
              color: 'RANDOM',
              author: {
                name: message.guild.name, 
                icon_url: message.guild.iconURL(true)
              },          
              title: `${user.tag} đã sửa tin nhắn`,
              description: `**Message ID:** \`${msgID.id}\` | **URL:** [[Jump link](${msgID.url})]`,
              thumbnail: {url: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/154/memo_1f4dd.png'},
              fields: [{
                  name: 'Nội dung edit:',
                  value: stContent,
                  inline: false
              }],
            }]
          })
        })
      }
  } catch(err) {console.error(err)}
}