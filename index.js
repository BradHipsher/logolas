const fs = require('fs');
const Discord = require('discord.js');
const Sequelize = require('sequelize');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    // SQLite only
    storage: 'database.sqlite',
});

const Tags = sequelize.define('tags', {

    randid: {
        type: Sequelize.INTEGER,
        unique: true,
        primaryKey: true,
    },
    gameName: Sequelize.STRING,
    date: Sequelize.STRING,
    player1: Sequelize.STRING,
    player2: Sequelize.STRING,
    player3: Sequelize.STRING,
    player4: Sequelize.STRING,
    player5: Sequelize.STRING,
    player6: Sequelize.STRING,
    player7: Sequelize.STRING,
    player8: Sequelize.STRING,
    player9: Sequelize.STRING,
    player10: Sequelize.STRING,

});

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

client.once('ready', () => {
    console.log('Ready!');
    Tags.sync();
});

client.on('message', async message => {
    // Pass if message doesn't start with prefix or is written by a bot
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const commandString = message.content.slice(prefix.length).trim().split(':'); // TODO
    console.log(`commandString is: ${commandString}`)
    const commandName = commandString.shift().toLowerCase();
    console.log(`commandName is: ${commandName}`)
    const args = commandString.shift().trim().split(',');
    console.log(`args is: ${args}`);

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    // Pass if recognized as command syntax but command doesn't exist
    if (!command) return;

    // Pass if guildOnly command in dm channel
    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    // Pass if permissions insufficient for command
    if (command.permissions) {
        const authorPerms = message.channel.permissionsFor(message.author);
        if (!authorPerms || !authorPerms.has(command.permissions)) {
            return message.reply('You can not do this!');
        }
    }

    // Pass if not owner and under debug
    if (command.debug && message.guild.ownerID !== message.author.id) return message.reply('Cannot use this command while in debug mode');

    // Pass if not owner
    if (command.ownerOnly && message.guild.ownerID !== message.author.id) return message.reply('You do not have permission to use this command');

    // Pass and reply if command takes args but no args givenn
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    // Cooldown
    const { cooldowns } = client;

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 2) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    // execute the command from module
    try {
        command.execute(message, args, Tags);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }

});

client.login(token);
