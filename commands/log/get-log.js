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
			const rowlist = await Tags.findAll({ attributes: ['rowid'] }).map(t => t.rowid);
			const gamelist = await Tags.findAll({ attributes: ['gameName'] }).map(t => t.gameName);
			const datelist = await Tags.findAll({ attributes: ['date'] }).map(t => t.date);
			const player1list = await Tags.findAll({ attributes: ['player1'] }).map(t => t.player1);
			const player2list = await Tags.findAll({ attributes: ['player2'] }).map(t => t.player2)
			const player3list = await Tags.findAll({ attributes: ['player3'] }).map(t => t.player3);
			const player4list = await Tags.findAll({ attributes: ['player4'] }).map(t => t.player4);
			const player5list = await Tags.findAll({ attributes: ['player5'] }).map(t => t.player5);
			const player6list = await Tags.findAll({ attributes: ['player6'] }).map(t => t.player6);
			const player7list = await Tags.findAll({ attributes: ['player7'] }).map(t => t.player7);
			const player8list = await Tags.findAll({ attributes: ['player8'] }).map(t => t.player8);
			const player9list = await Tags.findAll({ attributes: ['player9'] }).map(t => t.player9);
			const player10list = await Tags.findAll({ attributes: ['player10'] }).map(t => t.player10);

			console.log(rowlist);
			tagString = rowlist.join(', ') || 'Nothing logged...';
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