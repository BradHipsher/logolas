module.exports = {
	name: 'log',
	description: 'Log',
    args: true,
    usage: '<game-name>; <yyyy.mm.dd>; <player1>; <player2>; ...; <player10>',
    cooldown: 2,
    execute(message, args) {
		message.channel.send('WIP: Will submit entry to log.');
	},
};