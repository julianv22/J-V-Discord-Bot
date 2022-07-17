const expr = require("express");
const DC = require("discord.js");
const cfg = require('./config.json')
const func = require("./Functions/cmdError")
const app = expr();

app.listen(3000, () => {
  console.log("Project is running!");
})

const fs = require("fs");
let client = new DC.Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES"
  ],
  partials: [
    "MESSAGE", "CHANNEL", "REACTION"
  ]
});
client.commands = new DC.Collection();

const cmd_files = fs.readdirSync("./Commands").filter(file => file.endsWith(".js"));

//List Commands in Commands Folder
for (const file of cmd_files) {
  const cmd = require(`./Commands/${file}`);
  if (cmd.name) {
    client.commands.set(cmd.name, cmd);
  }
}

client.on("messageCreate", async (message) => {
  try {
    if (message.channel.type === "DM") return;
    if (message.author.bot) return;
    client.on('shardError', error => {
      return console.error('A websocket connection encountered an error:', error);
    });
    // Check bot permission
    const botPermission = "SEND_MESSAGES" && "MANAGE_MESSAGES" && "EMBED_LINKS" && "ADD_REACTIONS"
    if (!message.channel.permissionsFor(cfg.botID).toArray().includes(botPermission)) { return console.log("\n\n-----------Bot CANT send message!!-----------\n\n") }
    // Check message prefix 
    if (message.content.startsWith(cfg.prefix)) {
      const args = message.content.slice(cfg.prefix.length).split(/ +/);
      const cmdName = args.shift().toLowerCase()
      const command = client.commands.get(cmdName) || client.commands.find(a => a.aliases && a.aliases.includes(cmdName));
      // Check command
      if (!command) {
        return message.reply({
          embeds: (func.cmdError(message, 'Không tìm thấy command',`\`${cfg.prefix}${cmdName}\` chưa chính xác hoặc không tồn tại!`))
        })
      }
      command.callback(client, message, args);
    }
  } catch (error) {
    console.error(error);
  }
})
//---------------------BOT Stats---------------------
client.on("ready", async() => {  
  const activities = [
    { type: 'PLAYING',  message: `${cfg.prefix}${cfg.status}`  },
    { type: 'WATCHING', message: `${cfg.prefix}${cfg.status}` },
    { type: 'LISTENING', message: `${cfg.prefix}${cfg.status}` },
    { type: 'STREAMING', message: `${cfg.prefix}${cfg.status}`}
  ];
  console.log("Client has Logged on!");
  setInterval(() => {
    const index = Math.floor(Math.random() * activities.length);    
    client.user.setActivity(activities[index].message, {type: activities[index].type});
  }, 1000*60*5);
  //client.user.setActivity(`${cfg.status}`, { type: `${cfg.statustype[Math.floor(Math.random() * cfg.statustype.length)]}` });
  console.log(`${cfg.name} is online. Prefix = ${cfg.prefix}`);
  console.log(`Working in ${client.guilds.cache.size.toLocaleString()} Servers`)
  console.log(`Status = ${cfg.prefix}${cfg.status}`);
  console.log(`Status type = ${cfg.statustype}`);
  console.log(`Mod emoji = ${cfg.ModEmoji}`);
  console.log(`Owner emoji = ${cfg.OwnerEmoji}`);  
  console.log(`Error Emoji = ${cfg.erroremoji}`);
  console.log(`Success Emoji = ${cfg.successemoji}`);
  console.log(`Fun Emoji = ${cfg.FunEmoji}`);
  console.log(`Curency Emoji = ${cfg.CurrencyEmoji}`);
  console.log(`Currency Name = ${cfg.CurrencyName}`);
  console.log(`Embed Color = ${cfg.embedcolor}`);
  console.log(`Support Server = ${cfg.serverName}`);
  console.log(`Server ID = ${cfg.serverID}`);
  console.log(`OwnerID = ${cfg.ownerID}`);
  console.log(`Owner Server ID = ${cfg.ownerServerID}`);
  console.log(`--------SERVER IS STARTED--------`)
})
//---------------------End BOT Stats---------------------
app.get("/", (req, res) => {
  res.send(cfg.expresstext);
})
client.login(process.env.token)