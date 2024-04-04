const fs = require('fs');
const {
    REST
} = require('@discordjs/rest');

const moment = require('moment')
const {
    Routes
} = require('discord-api-types/v9');
const {

    Discord,
    Client,
    AttachmentBuilder,
    EmbedBuilder,
    GatewayIntentBits,
    Collection,
    Partials,
    ActivityType,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    StringSelectMenuOptionBuilder,
    StringSelectMenuBuilder

} = require('discord.js');
const MAIN_SERVER_ID = 'MAIN_SERVER_ID_HERE'
const DISCORD_TOKEN = 'INSERT_TOKEN_HERE'
const client = new Client({
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],

    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageTyping,

    ],

});


client
    .on("debug", console.log)
    .on("warn", console.log)


client.on("debug", console.log)


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


const commands = [];

client.commands = new Collection();

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
}
client.on("debug", console.log)


client.once('ready', () => {

    client.user.setStatus('dnd');

    console.log(`${client} is Online & Commands Ready!`);



    const CLIENT_ID = client.user.id;
    const rest = new REST({
        version: '9'
    }).setToken(DISCORD_TOKEN);
    (async () => {
        try {
            if (!1117472887192956948) {
                await rest.put(
                    Routes.applicationCommands(CLIENT_ID), {
                        body: commands
                    },
                );
                console.log('[/] Commands have been registered.');
            } else {
                await rest.put(
                    Routes.applicationGuildCommands(CLIENT_ID, MAIN_SERVER_ID), {
                        body: commands
                    },
                );
                console.log('[/] Commands have been registered.');
            }
        } catch (error) {
            if (error) console.error(error);
        }
    })();



})



client.on('interactionCreate', async interaction => {

    if (interaction.isCommand()) {

        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        try {
            await command.execute(interaction, client);
        } catch (error) {
            if (error) console.error(error);
            await interaction.channel.send({
                content: '> **There was an issue with this command!**\n> ``` ${error} ```',
                ephemeral: true
            });

        }}
})




client.login()
