module.exports = {
	debug: true,
	name: 'get-log',
	description: 'Get Log',
	usage: 'all / <Tag>',
	cooldown: 2,
	execute: async (message, args, Tags) => {

		if (!args[0]) return message.reply('Too Few Arguments; consult \"!help get-log\"');

		if (args[0] === "all") {

			const tablist = await Tags.findAll({ where: {} });
			const tagString = tablist.map(t => t[0]).join(', ') || 'Nothing logged...';
			return message.reply(`List of all IDs: ${tagString}`);

		}

		const tagID = args[0];

		// equivalent to: SELECT * FROM tags WHERE name = 'tagID' LIMIT 1;
		const tag = await Tags.findOne({ where: { rowid: tagID } });
		if (tag) {
			return message.reply( "\n" +
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