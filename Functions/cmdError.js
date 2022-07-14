const cfg = require('../config.json')

function cmdError(message, stError, stHelp) {  
  try {    
    let res = [{
        author: {
          name: message.guild.name, 
          icon_url: message.guild.iconURL(true)
        },        
        title: "Error:",
        fields: [{
          name: stError,
          value: stHelp,
          inline: false
        }],
        thumbnail: {url: cfg.errorPNG},
        color: 'RED',          
      }]       
    return res    
  } catch (err) {
    console.error(err)
  }
}
module.exports = {cmdError}