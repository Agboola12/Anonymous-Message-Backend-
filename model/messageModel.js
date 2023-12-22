const  mongoose  = require('mongoose');

const userMessageSchema = mongoose.Schema({
    message: String,
})

const userMessage = mongoose.model("userMessage", userMessageSchema);

module.exports = userMessage