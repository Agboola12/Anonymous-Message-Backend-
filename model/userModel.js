const { genSalt, hash } = require('bcrypt');
const  mongoose  = require('mongoose');

const userAnonymousSchema = mongoose.Schema({
    username: String,
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        select : false
    },
})

userAnonymousSchema.pre("save", async function (next) {
        const salt = await genSalt(10);
        console.log(this.password)
        this.password = await hash(this.password, salt)
        next();
    })

const userAnonymous = mongoose.model("userAnonymous", userAnonymousSchema);

module.exports = userAnonymous