const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders')
const Todo = require('../../models/todo')
const Day = require('../../models/day')
const { formatDate, getRandomElement, getPhilippineTime } = require('../../utils/helperFuncs')
const { natPics } = require('../../utils/nathanpics')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('todo')
        .setDescription("Set Patty's todos")
        .addStringOption((option) =>
            option
                .setName('what')
                .setDescription('What will you have to do today?')
                .setRequired(true)
        )
        .addStringOption((option) => (
            option
                .setName('when')
                .setDescription('When do you need to do it?')
        )),

    async execute({ client, interaction }) {
        try {
            await interaction.deferReply()
            const what = interaction.options.get('what').value
            let when = interaction.options.get('when')?.value
            if (!when) when = new Date(new Date().toLocaleString(undefined, 'Asia/Singapore'))
            console.log(when)
            const formattedDate = formatDate(new Date(when));
            let day = await Day.findOne({ date: formattedDate });
            if (!day) {
                const todo = await Todo.create({ when: formattedDate, what });
                day = await Day.create({ date: formattedDate, todos: [todo._id] });
                const embed = new EmbedBuilder()
                    .setTitle('Todo was listed successfully!')
                    .setDescription(`\`${what} was successfully added!\``)
                    .setImage(getRandomElement(natPics.happy))
                    .setTimestamp()

                return await interaction.editReply({ embeds: [embed] })
            }
            const todo = await Todo.create({ when: formattedDate, what });
            day.todos.push(todo._id);
            await day.save();

            const embed = new EmbedBuilder()
                .setTitle('Todo was listed successfully!')
                .setDescription(`\`${what} was successfully added!\``)
                .setImage(getRandomElement(natPics.happy))
                .setTimestamp()

            await interaction.editReply({ embeds: [embed] })
        } catch (error) {
            const embed = new EmbedBuilder()
                .setTitle('Something went wrong!')
                .setDescription('There was an error :(')
                .setImage(getRandomElement(natPics.sad))
                .setTimestamp()
            await interaction.editReply({ embeds: [embed] })
            console.log(error)
        }
    }
}