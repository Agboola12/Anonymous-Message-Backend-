const  mongoose  = require('mongoose');

const userMessageSchema = mongoose.Schema({
    message: String,
    userId: String,
})

const userMessage = mongoose.model("userMessage", userMessageSchema);

module.exports = userMessage