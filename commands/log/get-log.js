module.exports = {
	debug: true,
	name: 'get-log',
	description: 'Get Log',
	usage: 'all / <Tag>',
	cooldown: 2,
	execute: async (message, args, Tags, sequelize) => {

		if (!args[0]) return message.reply('Too Few Arguments; consult \"!help get-log\"');

		if (args[0] === "all") {

			// jank implementation
			const rowlist = await Tags.findAll({ attributes: ['rowid'] });
			const gamelist = await Tags.findAll({ attributes: ['gameName'] });
			const datelist = await Tags.findAll({ attributes: ['date'] });
			const player1list = await Tags.findAll({ attributes: ['player1'] });
			const player2list = await Tags.findAll({ attributes: ['player2'] })
			const player3list = await Tags.findAll({ attributes: ['player3'] });
			const player4list = await Tags.findAll({ attributes: ['player4'] });
			const player5list = await Tags.findAll({ attributes: ['player5'] });
			const player6list = await Tags.findAll({ attributes: ['player6'] });
			const player7list = await Tags.findAll({ attributes: ['player7'] });
			const player8list = await Tags.findAll({ attributes: ['player8'] });
			const player9list = await Tags.findAll({ attributes: ['player9'] });
			const player10list = await Tags.findAll({ attributes: ['player10'] });

			rowlist = rowlist.map(t => t.rowid);
			gamelist = gamelist.map(t => t.gameName);
			datelist = datelist.map(t => t.date);
			player1list = player1list.map(t => t.player1);
			player2list = player2list.map(t => t.player2)
			player3list = player3list.map(t => t.player3);
			player4list = player4list.map(t => t.player4);
			player5list = player5list.map(t => t.player5);
			player6list = player6list.map(t => t.player6);
			player7list = player7list.map(t => t.player7);
			player8list = player8list.map(t => t.player8);
			player9list = player9list.map(t => t.player9);
			player10list = player10list.map(t => t.player10);

			console.log(rowlist);
			tagString = rowlist.join(', ') || 'Nothing logged...';
			return message.reply(`List of all IDs: ${tagString}`);

		}

		const tagID = args[0];

		// equivalent to: SELECT * FROM tags WHERE name = 'tagID' LIMIT 1;
		const tag = await Tags.findOne({ where: { rowid: tagID } });
		if (tag) {
			return message.reply("\n" +
				"ID: " + tag.get('rowid') + "\n" +
				"Game: " + tag.get('gameName') + "\n" +
				"Date: " + tag.get('date') + "\n" +
				"Player 1: " + tag.get('player1') + "\n" +
				"Player 2: " + tag.get('player2') + "\n" +
				"Player 3: " + tag.get('player3') + "\n" +
				"Player 4: " + tag.get('player4') + "\n" +
				"Player 5: " + tag.get('player5') + "\n" +
				"Player 6: " + tag.get('player6') + "\n" +
				"Player 7: " + tag.get('player7') + "\n" +
				"Player 8: " + tag.get('player8') + "\n" +
				"Player 9: " + tag.get('player9') + "\n" +
				"Player 10: " + tag.get('player10')
			);
		}

		return message.reply(`Could not find tag: ${tagID}`);
	},
};