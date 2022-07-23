const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

module.exports = (client) => {
  client.handleCommands = (cmdFolders, slashCommandFiles) => {
    try {
      // Commands Handle      
      const cmdFileArray = []
      for (const folder of cmdFolders) {
        const cmdFiles = fs.readdirSync(`./commands/${folder}`).filter(f => f.endsWith('.js'));
        for (const file of cmdFiles) {
          const command = require(`../commands/${folder}/${file}`);
          if (command.name) {
            client.commands.set(command.name, command);
            cmdFileArray.push(command.name);
          };
        };
      };

      console.log(`\nCommand's Catalogues: [${cmdFolders.length}]`);
      console.log(cmdFolders);
      console.log(`\nCommand Files: [${cmdFileArray.length}]`);
      console.log(cmdFileArray);

      // Slash Commands Handle    
      const slashCMD = [];
      for (const file of slashCommandFiles) {
        const slashcmd = require(`../slashcommands/${file}`);
        client.slashCommands.set(slashcmd.data.name, slashcmd);
        client.slashArray.push(slashcmd.data.toJSON());
        slashCMD.push(slashcmd.data.name)
      }
      (async () => {
        const rest = new REST({ version: '9' }).setToken(process.env.token);
        console.log('\nStarted refreshing application (/) commands.\n');
        await rest.put(Routes.applicationCommands(cfg.botID),
          { body: client.slashArray });
        console.log(`Loading Slash Commands: [${slashCMD.length}]`);
        console.log(slashCMD);
        console.log('\nSuccessfully reloaded application (/) commands.\n');
      })();
    } catch (e) {
      console.log;
    }
  }
}