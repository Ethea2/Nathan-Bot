const { EmbedBuilder } = require('discord.js')
const Todo = require('../models/todo')
const { formatDate } = require('./helperFuncs')

const getTodosToday = async () => {
    const today = formatDate(new Date(new Date().toLocaleString(undefined, 'Asia/Singapore')))
    const todosToday = await Todo.find({ when: today })
    let message
    if (!todosToday) {
        message = `**Ms. Patty is free today!!**`
        return message
    }
    message = `
    ===========================================================
    **Ms. Patty Arao's todos today!**
    TODAY:${today}
    ${todosToday.map((todo, index) => (
        `\n${index + 1}. \`${todo.what}\``
    ))
        }
    \n===========================================================    
        `


    return message
}

module.exports = { getTodosToday }