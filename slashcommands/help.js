const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Help command!'),
  async execute(interaction, client){
    const user = interaction.user;
    const cmdSize = client.commands.size;
    const joinCmd = client.commands.map(command => command.name).join(' | ');
    const cmds = client.commands.map(command => {
      return {
        name: command.name,
        value: command.description,
        inline: true
      }
    });
    const embed = new MessageEmbed()
      .setAuthor(`Hello ${user.tag}!`, user.displayAvatarURL(true))
      .setTitle('There is some commands may be you need')
      .setDescription(`I you need some help, join my support server: [\`🎭〔J-V Bot〕 SUPPORT\`](https://discord.gg/dyd8DXbrVq)\n
**Total commands: [${cmdSize}]**`)
      .setColor("RANDOM")
      .setThumbnail(cfg.helpPNG)
      .addFields(cmds)
      // .addField(`Command prefix: ${cfg.prefix}`, `**Command's Catalogue:**\n${cmdFolders.join(' | ').toUpperCase()}`)
      .addField(`Command prefix: ${cfg.prefix}`, `${joinCmd}`)
      .setFooter(`${cfg.prefix}[command] ? to show more help about that command.`,
        client.user.displayAvatarURL(true))

    await interaction.reply({ embeds: [embed]  });
  },
}