module.exports = {
    ownerOnly: true,
    debug: true,
    name: 'delete',
    description: 'Delete',
    usage: 'all / <Tag>',
    cooldown: 2,
    execute: async (message, args, Tags) => {

        if (!args[0]) return message.reply('Too Few Arguments; consult \"!help get-log\"');

		if (args[0] === "all") {

			const tagList = await Tags.destroy({ where: {} });
			return message.channel.reply(`Log has been fully cleared!`);

		}

        // equivalent to: DELETE from tags WHERE name = ?;
        const rowCount = await Tags.destroy({ where: { id: args[0] } });
        if (!rowCount) return message.reply('That tag did not exist.');

        return message.reply('Tag deleted.');

    },
}