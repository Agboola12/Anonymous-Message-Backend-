const { genSalt, hash } = require('bcrypt');
const  mongoose  = require('mongoose');

const userSchema = mongoose.Schema({
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




    userSchema.pre("save", async function (next) {
        const salt = await genSalt(10);
        console.log(this.password)
        this.password = await hash(this.password, salt)
        next();
    })

const User = mongoose.model("user", userSchema);

module.exports = User