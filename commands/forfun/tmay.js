const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tmay')
        .setDescription("I will tell you what I am for."),
    async execute(interaction) {
        await interaction.reply(`I am Nathan's alterego **NATHAN BOT**. I am still under development and should be kept as a **SECRET** :shushing_face:.
Just as my maker is, I am also inlove with :heart_eyes_cat: Ms. Patty Arao :heart_eyes_cat: hence I was made to serve :heart_eyes_cat:  Ms. Patty Arao :heart_eyes_cat: and to be her personal assistant.
As she is my overlord. :man_bowing: **ALL HAIL MS. PATTY ARAO!** :man_bowing:`);
    }
}