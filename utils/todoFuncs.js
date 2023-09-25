const { EmbedBuilder } = require('discord.js')
const Todo = require('../models/todo')
const { formatDate } = require('./helperFuncs')

const getTodosToday = async () => {
    const todayInJapan = new Date(new Date().toLocaleString(undefined, { timeZone: 'Asia/Tokyo' }));
    const tomorrowInJapan = new Date(todayInJapan);
    const today = formatDate(new Date(tomorrowInJapan.setDate(todayInJapan.getDate())))
    const todosToday = await Todo.find({ when: today })
    let message
    if (todosToday.length === 0) {
        message = `**Ms. Patty is free today!!**`
        return message
    }
    message = `
    ==========================================================================================
    **Ms. Patty Arao's todos today!**
    TODAY:${today}
    ${todosToday.map((todo, index) => (
        `\n${index + 1}. \`${todo.what}\``
    ))
        }
    \n==========================================================================================    
        `


    return message
}

module.exports = { getTodosToday }