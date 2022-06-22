const moment = require('moment');
const mongoose = require("mongoose");
//const fetch = require('node-fetch');
const url = require('url');
const db = require('quick.db');
const expr = require("express");
const DC = require("discord.js");
const fs = require("fs");
const app = expr();

app.listen(3000, () => {
  console.log("Project is running!");
})

//Load config
const { 
       name,
       botID,
       expresstext,
       prefix,
       status,
       statustype,
       embedcolor,
       ModEmoji,
       erroremoji,
       OwnerEmoji,
       ownerID,
       successemoji,
       serverName,
       serverID,
       utiemoji,
       CurrencyEmoji,
       CurrencyName,
       FunEmoji
} = require('./config.json');

let client = new DC.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});
    client.commands = new DC.Collection();
    client.cmdDesc = new DC.Collection();

client.login(process.env.token)

const cmd_files = fs.readdirSync("./Commands").filter(file => file.endsWith(".js"));

//List Commands in Commands Folder
for(const file of cmd_files) {
  const cmd = require(`./Commands/${file}`);
  if(cmd.name) {
    client.commands.set(cmd.name, cmd);
    client.cmdDesc.set(cmd.description, cmd);
  }
}

client.on("messageCreate", async(message) => {
  if(message.channel.type === "DM") return;
  if(message.author.bot) return;
  client.on('shardError', error => {
	  return console.error('A websocket connection encountered an error:', error);
  });
// Check bot permission
  const botPermission = "SEND_MESSAGES" && "MANAGE_MESSAGES" && "EMBED_LINKS" && "ADD_REACTIONS"
  if(!message.channel.permissionsFor(botID).toArray().includes(botPermission)){
    return console.log("\n\n-----------Bot CANT send message!!-----------\n\n")
  }
// Check message prefix */
  if(message.content.startsWith(prefix)) {    
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmdName = args.shift().toLowerCase()    
    const command = client.commands.get(cmdName) || client.commands.find(a => a.aliases && a.aliases.includes(cmdName));
// Check command
    if(!command) {      
      return message.reply(`Câu lệnh **${cmdName}** chưa chính xác hoặc không tồn tại!`)
    }      
    command.callback(client, message, args);    
  }
})

//---------------------BOT Stats---------------------
client.on("ready", () => {
  console.log("Client has Logged on!");
  client.user.setActivity(`${status}`, { type: `${statustype}` });
	console.log(`${client.user.username} bot is online. Prefix = ${prefix}`);
  console.log(`Working in ${client.guilds.cache.size.toLocaleString()} Servers`)
	console.log(`Status = ${status}`);
	console.log(`Status type = ${statustype}`);	
	console.log(`Mod emoji = ${ModEmoji}`);
	console.log(`Owner emoji = ${OwnerEmoji}`);	
	console.log(`Uti Emoji = ${utiemoji}`);
	console.log(`Error Emoji = ${erroremoji}`);
	console.log(`Success Emoji = ${successemoji}`);
  console.log(`Fun Emoji = ${FunEmoji}`);
  console.log(`Curency Emoji = ${CurrencyEmoji}`);
	console.log(`Currency Name = ${CurrencyName}`);  
	console.log(`Support Server = ${serverName}`);
  console.log(`Server ID = ${serverID}`);
	console.log(`OwnerID = ${ownerID}`);
  console.log(`Embed Color = ${embedcolor}`);	
  console.log(`--------SERVER IS STARTED--------`)  
})
//---------------------End BOT Stats---------------------
app.get("/",(req,res) => {
  res.send(expresstext);
})
