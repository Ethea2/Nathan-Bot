const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders')
const { natPics } = require('../../utils/nathanpics')
const { getRandomElement } = require('../../utils/helperFuncs')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('Shuffles the order of songs I will sing!'),
    async execute({ client, interaction }) {
        try {
            const queue = client.distube.getQueue(interaction.guildId)
            if (!queue) await interaction.reply("WHAT?!?! There aren't even songs in the queue ARE YOU CRAZY??")
            await interaction.deferReply()
            client.distube.shuffle(interaction.guildId)
                .then(result => {
                    const newQueue = result.songs
                    const embed = new EmbedBuilder()
                        .setTitle('Current Queue')
                        .setDescription(`As requested by <@${interaction.member.id}> the queue was shuffled\n**Current Song:** ${newQueue[0]} - \`${newQueue[0].formattedDuration}\`\n\n${newQueue.map((song, index) => (
                            `${index + 1}. ${song.title} - \`${song.formattedDuration}\``
                        ).slice(1, 10).join('\n'))}
                        ${newQueue.length > 10 ? `And **${newQueue.length - 10} more...**` : ""}`)
                        .setImage(getRandomElement(natPics.happy))
                        .setTimestamp()
                    interaction.editReply({ embeds: [embed] })
                })
                .catch(e => console.log(e))
        } catch (error) {
            const embed = new EmbedBuilder()
                .setTitle('There was an error with the command!')
                .setImage(getRandomElement(natPics.sad))
            await interaction.editReply({ embeds: [embed] })
            console.log(error)
        }
    }
}