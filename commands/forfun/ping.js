const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('To check if Nathan Bot is online!'),
    async execute(interaction) {
        await interaction.reply('I am online! BITCHES!');
    }
}