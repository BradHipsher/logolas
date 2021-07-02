module.exports = {
	debug: true,
	name: 'log',
	description: 'Log',
	args: true,
	usage: '<game-name>; <yyyy.mm.dd>; <player1>; <player2>; ...; <player10>',
	cooldown: 2,
	execute: async (message, args, Tags) => {

		if (args.length < 3) return message.reply('Too Few Arguments; consult \"!help log\"');

		const p1 = "";
		const p2 = "";
		const p3 = "";
		const p4 = "";
		const p5 = "";
		const p6 = "";
		const p7 = "";
		const p8 = "";
		const p9 = "";
		const p10 = "";

		if (args[3]) p1 = args[3];
		if (args[4]) p2 = args[4];
		if (args[5]) p3 = args[5];
		if (args[6]) p4 = args[6];
		if (args[7]) p5 = args[7];
		if (args[8]) p6 = args[8];
		if (args[9]) p7 = args[9];
		if (args[10]) p8 = args[10];
		if (args[11]) p9 = args[11];
		if (args[12]) p10 = args[12];

		try {
			// equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
			const tag = await Tags.create({
				randid: Math.floor(Math.random() * 1000000),
				gameName: args[0],
				date: "2021.07.01",
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