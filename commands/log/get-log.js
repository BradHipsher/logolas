module.exports = {
	debug: true,
	name: 'get-log',
	description: 'Get Log',
	usage: '<Tag>',
	cooldown: 2,
	execute: async (message, args, Tags) => {

		if (!args[0]) return message.reply('Too Few Arguments; consult \"!help get-log\"');

		if (args[0] === "all") {

			const tagList = await Tags.findAll({ attributes: ['id'] });
			const tagString = tagList.map(t => t.id).join(', ') || 'Nothing logged...';
			return message.channel.send(`List of all IDs: ${tagString}`);

		}

		const tagID = args[0];

		// equivalent to: SELECT * FROM tags WHERE name = 'tagID' LIMIT 1;
		const tag = await Tags.findOne({ where: { id: tagID } });
		if (tag) {
			return message.channel.send(
				"Game: " + tag.get('gameName') + "\n" +
				"Date: " + tag.get('date') + "\n" +
				"Player1: " + tag.get('player1') + "\n" +
				"Player2: " + tag.get('player2') + "\n" +
				"Player3: " + tag.get('player3') + "\n" +
				"Player4: " + tag.get('player4') + "\n" +
				"Player5: " + tag.get('player5') + "\n" +
				"Player6: " + tag.get('player6') + "\n" +
				"Player7: " + tag.get('player7') + "\n" +
				"Player8: " + tag.get('player8') + "\n" +
				"Player9: " + tag.get('player9') + "\n" +
				"Player10: " + tag.get('player10')
			);
		}

		return message.reply(`Could not find tag: ${tagID}`);
	},
};