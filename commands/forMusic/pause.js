const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { getRandomElement } = require('../../utils/helperFuncs');
const { natPics } = require('../../utils/nathanpics');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription("Pauses my current singing."),

    async execute({ client, interaction }) {
        try {
            const queue = client.distube.getQueue(interaction.guildId);
            if (!queue) return await interaction.reply("There is no song playing!");

            client.distube.pause(interaction);
            
            const embed = new EmbedBuilder()
                .setTitle("Paused my singing! :pause_button:")
                .setImage(getRandomElement(natPics.sad))
                .setTimestamp()
            await interaction.reply({ embeds: [embed] });
        } catch (e) {
            console.log(e);
        }
    }
}