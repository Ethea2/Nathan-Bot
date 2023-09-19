const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription("You're preventing me from showing off!"),
    
    async execute({ client, interaction }) {
        const queue = client.distube.getQueue(interaction.guildId);
        if(!queue) return await interaction.reply("There is no song playing anyway!");

        client.distube.stop(interaction);
        await interaction.reply("Stopped the all songs! :octagonal_sign:");
    }
}