module.exports = {
	debug: true,
	name: 'get-log',
	description: 'Get Log',
    cooldown: 2,
	execute: async (message, args, Tags) => {
		const tagID = args[0];

		// equivalent to: SELECT * FROM tags WHERE name = 'tagID' LIMIT 1;
		const tag = await Tags.findOne({ where: { name: tagID } });
		if (tag) {
			// equivalent to: UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';
			tag.increment('usage_count');
			return message.channel.send(tag.get('description'));
		}
		return message.reply(`Could not find tag: ${tagID}`);
	},
};