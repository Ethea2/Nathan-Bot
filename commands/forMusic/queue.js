const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription("I will show you the current queue!"),

    async execute({ client, interaction }) {
        const queue = client.distube.getQueue(interaction.guildId);
        if(!queue) return await interaction.reply("There is no song in the queue!");
        const embed = new EmbedBuilder()
            .setTitle(`Current Queue`)
            .setDescription(`As requested by <@${interaction.user.id}>\n**Current Song:** ${queue.songs[0].name}\n\n${queue.songs.map((song, id) => `**${id + 1}.** ${song.name} - \`${song.formattedDuration}\``).slice(1, 10).join("\n")} ${queue.songs.length > 10 ? `\nAnd **${queue.songs.length - 10}** more...` : ""}`)
            .setColor(0x00AE86)
            .setTimestamp()
        await interaction.reply({ embeds: [embed]})
    }
}
