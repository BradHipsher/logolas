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

// Manually add "log" and "get-log"
client.commands.set("log", "log");
client.commands.set("get-log", "get-log");

client.once('ready', () => {
    console.log('Ready!');
    Tags.sync();
});

client.on('message', async message => {
    // Pass if message doesn't start with prefix or is written by a bot
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/); // TODO
    const commandName = args.shift().toLowerCase();

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

    if (command === 'log') {

        // const splitArgs = commandArgs.split(' ');
        // const tagName = splitArgs.shift();
        // const tagDescription = splitArgs.join(' ');

        try {
            // equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
            const tag = await Tags.create({
                randid: Math.floor(Math.random() * 1000000),
                gameName: "a nameless game",
                date: "2021.07.01",
                player1: "",
                player2: "",
                player3: "",
                player4: "",
                player5: "",
                player6: "",
                player7: "",
                player8: "",
                player9: "",
                player10: "",
            });
            return message.reply(`Tag ${tag.name} added.`);
        }
        catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                return message.reply('That tag already exists.');
            }
            return message.reply('Something went wrong with adding a tag.');
        }

    } else if (command === 'get-log') {

        console.log("get-log command");

    } else {

        // execute the command from module
        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }

    }

});

client.login(token);
