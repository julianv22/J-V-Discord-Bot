exports.name = "react"
exports.description = "Biểu cảm tương tác"
exports.callback = async (client, message, args) => {    
  await message.react("😎")  
  //await message.reply("Your react has been sent")
} 