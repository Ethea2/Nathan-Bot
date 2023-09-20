const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { natPics } = require('../../utils/nathanpics')
const { getRandomElement } = require('../../utils/helperFuncs')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('playlink')
        .setDescription("Nathan Bot looks for the link and sings the song for you :open_mouth:")
        .addStringOption(option => {
            return option
                .setName("link")
                .setDescription("The youtube song link you want me to sing!")
                .setRequired(true)
        }),
    async execute({ client, interaction }) {
        if(interaction.member.voice.channel === null) return await interaction.reply("Please join a voice channel!!"); 
        
        await interaction.deferReply();
        let voice = interaction.member.voice.channel;
        let message = interaction.options.get("link").value;
        let embed = new EmbedBuilder()
        client.distube.play(voice, message, {
            textChannel: interaction.channel,
            member: interaction.member,
            interaction,
        })
        .then(() => {
            embed
                .setTitle("Song has been added to the queue successfully!")
                .setDescription(`${message}\nRequested by: <@${interaction.user.id}>`)
                .setImage(getRandomElement(natPics.happy))
                .setTimestamp()
            interaction.editReply({ embeds: [embed] });
        })
        .catch((err) => {
            embed
                .setDescription("There was an error in searching for the song!")
                .setTitle(":x: Error :x:")
                .setImage(getRandomElement(natPics.sad))
                .setTimestamp()
            interaction.editReply({ embeds: [embed] });
        })
    }
}