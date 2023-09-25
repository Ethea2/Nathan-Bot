require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders')
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { natPics } = require('./utils/nathanpics')
const { getRandomElement } = require('./utils/helperFuncs');
const { default: mongoose } = require('mongoose');
const { getTodosToday } = require('./utils/todoFuncs')
const cron = require('cron')


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates
        // Intents.FLAGS.GUILD_MESSAGES,
        // Intents.FLAGS.GUILDS,
        // Intents.FLAGS.GUILD_MEMBERS,
    ]
});

client.config = require('./config.js');

client.once(Events.ClientReady, c => {
    console.log(`Logged in as ${c.user.tag}`);
})

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

commandFolders.forEach(folder => {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    commandFiles.forEach(file => {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
            console.log(`[INFO] Loaded command ${command.data.name}`);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    })
})

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute({ client, interaction });
    } catch (error) {
        const embed = new EmbedBuilder()
            .setTitle('There was an error while excecuting this command!')
            .setImage(getRandomElement(natPics.sad))
            .setTimestamp()
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ embeds: [embed], ephemeral: true });
        } else {
            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
});

client.on("ready", async () => {
    mongoose.connect(process.env.MONGODB_URI)
    const user = await client.users.fetch(process.env.PATTY_ID).catch(() => null);

    let scheduledMessage = new cron.CronJob('00 00 04 * * *', () => {
        try {
            getTodosToday()
                .then(res => {
                    user.send(res).catch((e) => {
                        console.log(e)
                    });
                })
        } catch (error) {
            console.log(error)
        }
    }, null, true, 'Asia/Singapore')
    
    scheduledMessage.start()
    console.log("connected to mongodb")
})

client.distube = new DisTube(client, {
    leaveOnEmpty: false,
    leaveOnFinish: false,
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    nsfw: true, // depends on you if you want to play nsfw content or not. if you don't want to play set it to false
    plugins: [
        new SpotifyPlugin({
            emitEventsAfterFetching: true,
        }),
        new SoundCloudPlugin(),
        new YtDlpPlugin({
            update: false,
        }),
    ],
});

client.login(process.env.BOT_TOKEN);