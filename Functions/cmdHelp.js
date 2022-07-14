const cfg = require('../config.json')

function cmdHelp(message, stname, stussage) {  
  try {    
    let res = [{
        author: {
          name: message.guild.name, 
          icon_url: message.guild.iconURL(true)
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