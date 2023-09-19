const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription("Nathan Bot sings for you!")
        .addStringOption(option => {
            return option
                .setName("query")
                .setDescription("The youtube song link you want me to sing!")
                .setRequired(true)
        }),
    async execute({ client, interaction }) {
        try {
            if (interaction.member.voice.channel === null) return await interaction.reply("Please join a voice channel!!"); // it will check if user is in voice channel or not

            await interaction.deferReply();

            //    voice channel where member is join in.
            let voice = interaction.member.voice.channel;
            // get the song name from user
            let message = interaction.options.get("query").value;
            const embed = new EmbedBuilder()
                .setTitle("Title: " + message)
                .setColor(0x00AE86)
                .setDescription("Requested by: " + interaction.user.tag)
                .setTimestamp()

            await interaction.editReply({ embeds: [embed] });
            await client.distube.play(voice, message, {
                textChannel: interaction.channel,
                member: interaction.member,
                interaction,
            });
        } catch (error) {
            console.log(error);
        }
    }
}