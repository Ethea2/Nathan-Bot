const { SlashCommandBuilder } = require('@discordjs/builders');
const { natPics } = require('../../utils/nathanpics')
const { getRandomElement } = require('../../utils/helperFuncs');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('volume')
        .setDescription("Changes the volume of the my singing.")
        .addNumberOption(option => {
            return option
                .setName('volume')
                .setDescription("The volume I set my volume to. (Between 0-100)")
                .setMaxValue(100)
                .setMinValue(0)
                .setRequired(true)
        }),
    async execute({ client, interaction }) {
        try {
            const queue = client.distube.getQueue(interaction.guildId)
            if (!queue) return await interaction.reply("I'm not even singing :/")
            await interaction.deferReply()
            const volume = interaction.options.getNumber('volume')
            client.distube.setVolume(interaction.guild, volume)

            const embed = new EmbedBuilder()
                .setTitle('The volume has been set to `' + volume + '`')
                .setDescription(`As requested by <@${interaction.member.id}>`)
                .setImage(getRandomElement(natPics.happy))
                .setTimestamp()

            await interaction.editReply({ embeds: [embed] })
        } catch (error) {
            const embed = new EmbedBuilder()
                .setTitle('There was an error with the command!')
                .setImage(getRandomElement(natPics.sad))
            await interaction.editReply({ embeds: [embed] })
            console.log(error)
        }
    }
}