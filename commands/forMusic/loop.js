const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { RepeatMode } = require('distube');
const { natPics } = require('../../utils/nathanpics')
const { getRandomElement } = require('../../utils/helperFuncs')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loop')
        .setDescription("Loops the current song or queue singing."),

    async execute({ client, interaction }) {
        try {
            const queue = client.distube.getQueue(interaction.guildId);
            if (!queue) return await interaction.reply("There is no song playing anyway!");
            let mode
            switch (client.distube.setRepeatMode(interaction.member.guild)) {
                case RepeatMode.DISABLED:
                    mode = "Disabled"
                    break
                case RepeatMode.SONG:
                    mode = "Repeat song"
                    break
                case RepeatMode.QUEUE:
                    mode = "Repeat queue"
                    break
            }
            const embed = new EmbedBuilder()
                .setTitle("Loop mode set to `" + mode + "`")
                .setImage(getRandomElement(natPics.happy))
                .setTimestamp()
            await interaction.reply({ embeds: [embed] });
        } catch (e) {
            console.log(e);
        }
    }
}