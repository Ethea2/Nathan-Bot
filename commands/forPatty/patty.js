const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('patty-special-playlist')
        .setDescription("A special playlist for MY OVERLORD MS. PATTY ARAO"),

    async execute({ client, interaction }) {
        try {
            if (interaction.member.voice.channel === null) return await interaction.reply("Please join a voice channel!!"); // it will check if user is in voice channel or not
            if (interaction.member.id !== "824669920938819666") return await interaction.reply("You are not my overlord!!");
            await interaction.deferReply();
            //let embed = new EmbedBuilder()
            //    voice channel where member is join in.
            let voice = interaction.member.voice.channel;

            const embed = new EmbedBuilder()
                .setTitle(":cherry_blossom: Patty's Special Playlist :green_heart:")
                .setColor(0xFFC0CB)
                .setThumbnail("https://res.cloudinary.com/dtocowzq2/image/upload/v1695106615/patty/kkhfx38jurhfpc5sbnfw.jpg")
                .setDescription(":hatched_chick: **A collection of my favorite songs from the mixtapes I made for you** :hatched_chick:")
                .setImage("https://res.cloudinary.com/dtocowzq2/image/upload/v1695107078/patty/evcpewjkutcfl6t91ujw.jpg")
                .setTimestamp()
            const specialPlaylist = [
                "https://www.youtube.com/watch?v=WHyzv1sjXTw",
                "https://www.youtube.com/watch?v=VAR2D9vgsvk",
                "https://www.youtube.com/watch?v=4KXI9yYKex0",
                "https://www.youtube.com/watch?v=NR6S89fs4k0",
                "https://www.youtube.com/watch?v=24LQ8BVm3v0",
                "https://www.youtube.com/watch?v=HGy1BNNaEn8",
                "https://www.youtube.com/watch?v=JY3BEc2j1NI",
                "https://www.youtube.com/watch?v=9tLglpFAyIg",
                "https://www.youtube.com/watch?v=XALYHA2OUSE",
                "https://www.youtube.com/watch?v=bfO2tBS94oE",
                "https://www.youtube.com/watch?v=0R54VbaU7P4",
                "https://www.youtube.com/watch?v=8LDOUFJVNmg",
                "https://www.youtube.com/watch?v=PedACuLiMxU",
                "https://www.youtube.com/watch?v=hXzPxBhhmY8"
            ]

            const playlist = await client.distube.createCustomPlaylist(specialPlaylist, {
                member: interaction.member,
                interaction,
                parallel: true,
            });

            await interaction.editReply({ embeds: [embed] });
            await client.distube.play(voice, playlist, {
                textChannel: interaction.channel,
                member: interaction.member,
                interaction,
            });

        } catch (e) {
            console.log(e)
        }
    }
}