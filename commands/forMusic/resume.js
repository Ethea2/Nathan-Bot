const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { getRandomElement } = require('../../utils/helperFuncs');
const { natPics } = require('../../utils/nathanpics');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription("Resumes my AMAZING SINGING!!"),

    async execute({ client, interaction }) {
        try {
            const queue = client.distube.getQueue(interaction.guildId);
            if (!queue) return await interaction.reply("There is no song playing!");
            client.distube.resume(interaction);
            const embed = new EmbedBuilder()
                .setTitle("Resumed the song! :arrow_forward:")
                .setImage(getRandomElement(natPics.happy))
                .setTimestamp()
            await interaction.reply({ embeds: [embed] });
        } catch (e) {
            console.log(e);
        }
    }
}