const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('author', authorSchema) // exporting the schema model with name author and providing the const schemaname created here as the actual input.