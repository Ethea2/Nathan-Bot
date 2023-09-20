const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { natPics } = require('../../utils/nathanpics')
const { getRandomElement } = require('../../utils/helperFuncs')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription("Skips the song I am currently singing."),

    async execute({ client, interaction }) {
        try {
            const queue = client.distube.getQueue(interaction.guildId);
            if (!queue) return await interaction.reply("There is no song playing anyway!");
            if (queue.songs.length <= 1) return await interaction.reply("There is no song to skip to!");
            await interaction.deferReply()
            const embed = new EmbedBuilder()
                .setTitle('Successfully skipped the song! :track_next:')
                .setImage(getRandomElement(natPics.happy))
            client.distube.skip(interaction);
            await interaction.editReply({ embeds: [embed] });
        } catch (e) {
            const embed = new EmbedBuilder()
                .setTitle('There was an error with the command!')
                .setImage(getRandomElement(natPics.sad))
            await interaction.editReply({ embeds: [embed] })
        }
    }
}