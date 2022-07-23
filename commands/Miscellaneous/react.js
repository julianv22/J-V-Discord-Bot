exports.name = "react";
//exports.aliases = [""]
exports.description = "⤷Cool! 😎";
exports.ussage = `\`${cfg.prefix}${exports.name}\``;

exports.execute = async (message, args, client) => {
  if (args.join(' ').trim() === '?') return client.cmdGuide(message, exports.name, exports.ussage);

  let stReact = [
    "Cool!",
    "Greet!",
    "Perfect!",
    "Wonderful!",
    "Amazing!",
    "Holy!"
  ];
  message.delete();
  const msg = `${stReact[Math.floor(Math.random() * stReact.length)]}`;
  const msgReact = await message.channel.send(msg);
  await msgReact.react("😎");
}