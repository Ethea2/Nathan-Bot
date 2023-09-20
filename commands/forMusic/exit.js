const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { natPics } = require('../../utils/nathanpics')
const { getRandomElement } = require('../../utils/helperFuncs')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription("You're preventing me from showing off!"),

    async execute({ client, interaction }) {
        try {
            const queue = client.distube.getQueue(interaction.guildId);
            await interaction.deferReply()
            if (!queue) {
                const embed = new EmbedBuilder()
                    .setTitle('There is no song playing anyway!')
                    .setImage(getRandomElement(natPics.sad))
                    .setTimestamp()
                await interaction.editReply({ embeds: [embed] });
                return
            }
            const embed = new EmbedBuilder()
                .setTitle("I'm leaving now :disappointed:")
                .setImage(getRandomElement(natPics.sad))
                .setTimestamp()
            client.distube.stop(interaction);
            client.distube.voices.leave(interaction.guildId);
            await interaction.editReply({embeds: [embed]});
        } catch (error) {
            const embed = new EmbedBuilder()
                .setTitle('There was an error :disappointed:')
                .setImage(getRandomElement(natPics.sad))
                .setTimestamp()
            await interaction.reply({embeds: [embed]})
            console.log(error)
        }
    }
}