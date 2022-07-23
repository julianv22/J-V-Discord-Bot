const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('Express app started!');
});

global.cfg = require('./config.json');
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ]
});

client.commands = new Collection();
client.slashCommands = new Collection();
client.slashArray = [];

const funcFiles = fs.readdirSync('./functions').filter(f => f.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(f => f.endsWith('.js'));
global.cmdFolders = fs.readdirSync('./commands');
const slashCommandFiles = fs
  .readdirSync('./slashcommands')
  .filter(f => f.endsWith('.js'));

(async () => {

  for (file of funcFiles) require(`./functions/${file}`)(client);

  client.handleEvents(eventFiles);
  client.handleCommands(cmdFolders, slashCommandFiles);

  // CLIENT LOGIN
  client.login(process.env.token).catch(e => console.log(e));
})();