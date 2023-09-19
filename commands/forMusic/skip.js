const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription("Skips the song I am currently singing."),

    async execute({ client, interaction }) {
        const queue = client.distube.getQueue(interaction.guildId);
        if(!queue) return await interaction.reply("There is no song playing anyway!");
        if(queue.songs.length <= 1) return await interaction.reply("There is no song to skip to!");

        client.distube.skip(interaction);
        await interaction.reply("Skipped the song! :track_next:");
    }
}