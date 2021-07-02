module.exports = {
	debug: true,
	name: 'log',
	description: 'Log',
	args: true,
	usage: '<game-name>, <yyyy.mm.dd>, <player1>, [player2], ..., [player10]',
	cooldown: 2,
	execute: async (message, args, Tags) => {

		if (args.length < 3) return message.reply('Too Few Arguments; consult \"!help log\"');

		var p1 = "";
		var p2 = "";
		var p3 = "";
		var p4 = "";
		var p5 = "";
		var p6 = "";
		var p7 = "";
		var p8 = "";
		var p9 = "";
		var p10 = "";

		if (args[2]) p1 = args[2].trim();
		if (args[3]) p2 = args[3].trim();
		if (args[4]) p3 = args[4].trim();
		if (args[5]) p4 = args[5].trim();
		if (args[6]) p5 = args[6].trim();
		if (args[7]) p6 = args[7].trim();
		if (args[8]) p7 = args[8].trim();
		if (args[9]) p8 = args[9].trim();
		if (args[10]) p9 = args[10].trim();
		if (args[11]) p10 = args[11].trim();

		try {
			// equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
			const tag = await Tags.create({
				randid: Math.floor(Math.random() * 1000000),
				gameName: args[0],
				date: args[1],
				player1: p1,
				player2: p2,
				player3: p3,
				player4: p4,
				player5: p5,
				player6: p6,
				player7: p7,
				player8: p8,
				player9: p9,
				player10: p10,
			});
			return message.reply(`Tag ${tag.randid} added.`);
		}
		catch (e) {
			if (e.name === 'SequelizeUniqueConstraintError') {
				return message.reply('That tag already exists.');
			}
			return message.reply('Something went wrong with adding a tag.');
		}
	},
};