const cfg = require('../config.json')

function cmdError(message, stError) {  
  try {    
    let res = [{
        author: {
          name: message.guild.name, 
          icon_url: message.guild.iconURL(true)
        },
        thumbnail: {url: cfg.errorPNG},
        title: "Error:",
        description: stError,          
        color: 'RED',          
      }]       
    return res    
  } catch (err) {
    console.error(err)
  }
}
module.exports = {cmdError}