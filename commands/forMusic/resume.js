const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription("Resumes my AMAZING SINGING!!"),
    
    async execute({ client, interaction }) {
        const queue = client.distube.getQueue(interaction.guildId);
        if(!queue) return await interaction.reply("There is no song playing!");
        client.distube.resume(interaction);
        await interaction.reply("Resumed the song! :arrow_forward:");
    }
}