const { SlashCommandBuilder } = require('@discordjs/builders');
const { secToMin, minToSec } = require('../../utils/timeFuncs');
const { EmbedBuilder } = require('discord.js');
const { getRandomElement } = require('../../utils/helperFuncs');
const { natPics } = require('../../utils/nathanpics');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('seek')
        .setDescription("Seeks to a certain time in the song.")
        .addStringOption(option => {
            return option
                .setName('time')
                .setDescription("The time to seek to in minutes form (mm:ss).")
                .setRequired(true)
        }),
    async execute({ client, interaction }) {
        try {
            const queue = client.distube.getQueue(interaction.guildId)
            if (!queue) return await interaction.reply("There is no song playing!")
            const duration = queue.songs[0].duration;

            const userSeek = interaction.options.get('time').value
            await interaction.deferReply();
            if (!userSeek.includes(':')) return await interaction.editReply("Please use the format `mm:ss`!");

            const seconds = minToSec(userSeek);

            if (seconds > duration) return await interaction.editReply("You can't go past the song's duration! ARE YOU DUMB?!");

            const embed = new EmbedBuilder()
                .setTitle('Successfully skipped!')
                .setDescription(`Skipped to \`${secToMin(seconds)}\` seconds!`)
                .setImage(getRandomElement(natPics.happy))
                .setTimestamp()
                
            client.distube.seek(interaction, Number(seconds));
            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.log(error);
        }
    }
}