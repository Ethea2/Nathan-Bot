const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription("Pauses my current singing."),
    
    async execute({ client, interaction }) {
        const queue = client.distube.getQueue(interaction.guildId);
        if(!queue) return await interaction.reply("There is no song playing!");
        
        client.distube.pause(interaction);
        await interaction.reply("Paused the song! :pause_button:");
    }
}