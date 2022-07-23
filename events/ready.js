module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    const stStatust = cfg.prefix + cfg.status
    setInterval(() => { // Set Activity
      const index = Math.floor(Math.random() * cfg.statustype.length);
      client.user.setActivity(stStatust, {
        type: cfg.statustype[index],
        url: cfg.youtube
      });
    }, 1000 * 60 * 5);

    console.log('-----------------Client is loging-----------------')
    console.log(`|        ${client.user.tag} has logged on      |`)
    console.log('-----------------Client is ready!-----------------\n')
  }
}