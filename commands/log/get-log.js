module.exports = {
	debug: true,
	name: 'get-log',
	description: 'Get Log',
    cooldown: 2,
	execute: async (message, args, Tags) => {
		const tagID = args[0];

		// equivalent to: SELECT * FROM tags WHERE name = 'tagID' LIMIT 1;
		const tag = await Tags.findOne({ where: { randid: tagID } });
		if (tag) {
			return message.channel.send(tag.get('gameName'));
		}
		return message.reply(`Could not find tag: ${tagID}`);
	},
};