const cfg = require('../config.json')

function cmdHelp(client, message, stname, stussage) {  
  try {    
    let res = [{
        author: {
          name: message.author.username,
          icon_url: message.author.displayAvatarURL(true)
        },
        thumbnail: {url: cfg.helpPNG},
        title: `Huớng dẫn sử dụng command [${stname}]`,
        description: stussage,          
        color: 'RANDOM',          
      }]       
    return res    
  } catch (err) {
    console.error(err)
  }
}
module.exports = {cmdHelp}