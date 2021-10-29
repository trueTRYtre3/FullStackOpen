const mongoose = require('mongoose')

const schema = new mongoose.schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    favoriteGenre: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', schema)