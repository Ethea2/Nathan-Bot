const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('To check if Nathan Bot is online!'),
    async execute({ client, interaction }) {
        try {
            await interaction.reply("I AM AWAKE! :smile:")
        } catch (error) {
            console.log(error);
        }
    }
}