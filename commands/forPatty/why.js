const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders')
const Miss = require('../../models/miss')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('why')
        .setDescription('Why Nathan Misses Patty'),
    async execute({ client, interaction }) {
        try {
            if (interaction.member.id !== process.env.PATTY_ID) return await interaction.reply("You are not my overlord!!");
            await interaction.deferReply()
            const miss = await Miss.aggregate([{ $sample: { size: 1 } }]);
            const embed = new EmbedBuilder()
                .setTitle('Why I miss Patty!')
                .setDescription(`${miss[0].why}`)
                .setImage(miss[0].img)
                .setTimestamp()

            await interaction.editReply({ embeds: [embed] })

        } catch (error) {
            console.log(error)
        }
    }
}
