module.exports = {
  debug: true,
	name: 'log',
	description: 'Log',
    args: true,
    usage: '<game-name>; <yyyy.mm.dd>; <player1>; <player2>; ...; <player10>',
    cooldown: 2,
    execute(message, args, Tags) {
		  const splitArgs = commandArgs.split(' ');
      const tagName = splitArgs.shift();
      const tagDescription = splitArgs.join(' ');

      try {
        // equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
        const tag = await Tags.create({
          id: Math.floor(Math.random() * 1000000),
          gameName: "a nameless game",
          date: "2021.07.01",
          player1: "",
          player2: "",
          player3: "",
          player4: "",
          player5: "",
          player6: "",
          player7: "",
          player8: "",
          player9: "",
          player10: "",
        });
        return message.reply(`Tag ${tag.name} added.`);
      }
      catch (e) {
        if (e.name === 'SequelizeUniqueConstraintError') {
          return message.reply('That tag already exists.');
        }
        return message.reply('Something went wrong with adding a tag.');
      }
	},
};