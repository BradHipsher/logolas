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
			const colnames = ['rowid', 'gameName', 'date', 'player1', 'player2', 'player3', 'player4', 'player5', 'player6', 'player7', 'player8', 'player9', 'player10' ];

			var rows = [];
			rows[0] = colnames;
			var stringRows = [];

			var rowlist = await Tags.findAll({ attributes: ['rowid'] });
			var gamelist = await Tags.findAll({ attributes: ['gameName'] });
			var datelist = await Tags.findAll({ attributes: ['date'] });
			var player1list = await Tags.findAll({ attributes: ['player1'] });
			var player2list = await Tags.findAll({ attributes: ['player2'] })
			var player3list = await Tags.findAll({ attributes: ['player3'] });
			var player4list = await Tags.findAll({ attributes: ['player4'] });
			var player5list = await Tags.findAll({ attributes: ['player5'] });
			var player6list = await Tags.findAll({ attributes: ['player6'] });
			var player7list = await Tags.findAll({ attributes: ['player7'] });
			var player8list = await Tags.findAll({ attributes: ['player8'] });
			var player9list = await Tags.findAll({ attributes: ['player9'] });
			var player10list = await Tags.findAll({ attributes: ['player10'] });

			const rowString = rowlist.map(t => t.rowid).join(',');
			const gameString = gamelist.map(t => t.gameName).join(',');
			const dateString = datelist.map(t => t.date).join(',');
			const player1String = player1list.map(t => t.player1).join(',');
			const player2String = player2list.map(t => t.player2).join(',');
			const player3String = player3list.map(t => t.player3).join(',');
			const player4String = player4list.map(t => t.player4).join(',');
			const player5String = player5list.map(t => t.player5).join(',');
			const player6String = player6list.map(t => t.player6).join(',');
			const player7String = player7list.map(t => t.player7).join(',');
			const player8String = player8list.map(t => t.player8).join(',');
			const player9String = player9list.map(t => t.player9).join(',');
			const player10String = player10list.map(t => t.player10).join(',');

			console.log(`rowString looks like ${rowString}`);

			rowlist = rowString.split(","); 
			gamelist = gameString.split(","); 
			datelist = dateString.split(","); 
			player1list = player1String.split(","); 
			player2list = player2String.split(","); 
			player3list = player3String.split(","); 
			player4list = player4String.split(","); 
			player5list = player5String.split(","); 
			player6list = player6String.split(","); 
			player7list = player7String.split(","); 
			player8list = player8String.split(","); 
			player9list = player9String.split(","); 
			player10list = player10String.split(","); 

			console.log(`rowlist looks like ${rowlist}`);

			for (let i = 0; i < rowlist.length; i++) {
				var newrow = [];
				newrow.push(rowlist[i]);
				newrow.push(gamelist[i]);
				newrow.push(datelist[i]);
				newrow.push(player1list[i]);
				newrow.push(player2list[i]);
				newrow.push(player3list[i]);
				newrow.push(player4list[i]);
				newrow.push(player5list[i]);
				newrow.push(player6list[i]);
				newrow.push(player7list[i]);
				newrow.push(player8list[i]);
				newrow.push(player9list[i]);
				newrow.push(player10list[i]);
				console.log(`newrow being created for rowid ${i+1} and it looks like ${newrow}`);
				rows[i+1] = newrow;
			}

			console.log(`rows[0] looks like this: ${rows[0]}`);
			console.log(`rows[1] looks like this: ${rows[1]}`);

			for (let i = 0; i < rows.length; i++) {
				stringRows.push(rows[i].join(', '));
			}

			console.log(`stringRows is length: ${stringRows.length}`);

			stringRows = stringRows.join('\n');

			return message.reply(`These are the logged games: \n${stringRows}`);

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