const mongoose = require('mongoose')
const Schema = mongoose.Schema

const missSchema = new Schema({
    why: {
        type: String,
        required:true
    },
    img: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Miss', missSchema)