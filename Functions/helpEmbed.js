function helpEmbed(message, stname, stussage) => {  
    if (stname && stussage) {  
      var res = [{
          author: {
            name: message.author.username,
            icon_url: message.author.displayAvatarURL(true)
          },
          thumbnail: {url: cfg.helpPNG},
          title: `Huớng dẫn sử dụng command [${exports.name}]`,
          description: exports.ussage,          
          color: 'RANDOM',          
        }]       
      return res
    } else return    
}