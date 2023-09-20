const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { Playlist } = require('distube');
const { natPics } = require('../../utils/nathanpics')
const { getRandomElement } = require('../../utils/helperFuncs')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription("Nathan Bot sings for you!")
        .addStringOption(option => {
            return option
                .setName("query")
                .setDescription("The song you want me to sing!")
                .setRequired(true)
        }),
    async execute({ client, interaction }) {
        try {
            if (interaction.member.voice.channel === null) return await interaction.reply("Please join a voice channel!!"); // it will check if user is in voice channel or not

            await interaction.deferReply();
            let embed = new EmbedBuilder()
            //    voice channel where member is join in.
            let voice = interaction.member.voice.channel;
            // get the song name from user
            let message = interaction.options.get("query").value;

            client.distube.search(message)
                .then((result) => {
                    if (result.length === 0) return interaction.editReply(":x: No result found! :x:");

                    const userQuery = result[0];
                    embed
                        .setTitle(`${userQuery.name}`)
                        .setColor(0x00AE86)
                        .setImage(`${userQuery.thumbnail}`)
                        .setDescription(`The song has been added to the queue successfully!\nRequested by: <@${interaction.user.id}>`)
                        .setTimestamp()
                    interaction.editReply({ embeds: [embed] });
                    client.distube.play(voice, userQuery, {
                        textChannel: interaction.channel,
                        member: interaction.member,
                        interaction,
                    });
                })
                .catch((err) => {
                    embed
                        .setTitle('I could not find what you were looking for!')
                        .setDescription('If you sent a link try using the `/playlink` command instead')
                        .setImage(getRandomElement(natPics.sad))
                    interaction.editReply({ embeds: [embed] })
                    console.log(err)
                });

        } catch (error) {
            embed
                .setTitle('There was an error')
                .setImage(getRandomElement(natPics.sad))
            await interaction.editReply({ embeds: [embed] })
            console.log(error);
        }
    }
}