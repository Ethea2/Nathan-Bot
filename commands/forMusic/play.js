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
            let embed = new EmbedBuilder()
            //    voice channel where member is join in.
            let voice = interaction.member.voice.channel;
            // get the song name from user
            let message = interaction.options.get("query").value;

            client.distube.search(message)
                .then((result) => {
                    if (result.length === 0) return interaction.editReply("No result found!");
                    const userQuery = result[0];
                    embed
                        .setTitle(`${userQuery.name}`)
                        .setColor(0x00AE86)
                        .setImage(`${userQuery.thumbnail}`)
                        .setDescription(`The song has been added to the queue successfully!\nRequested by: <@${interaction.user.tag}>`)
                        .setTimestamp()
                    interaction.editReply({ embeds: [embed] });
                    client.distube.play(voice, message, {
                        textChannel: interaction.channel,
                        member: interaction.member,
                        interaction,
                    });
                })
                .catch((err) => {
                    interaction.editReply("There was an error!")
                    console.log(err)
                });

        } catch (error) {
            console.log(error);
        }
    }
}