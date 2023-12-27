const userMessage = require("../model/messageModel");


// Registering User
const message = async (req, res) => {
    console.log(req.body);
    const { message, userId } = req.body;
    try {
        const newUser = await userMessage.create({ message, userId });

        return res.status(200).json({
            success: true,
            message: "Message Sent successful",
            data: newUser,
        });
    } catch (error) {
        console.error(error);
        return res.status(200).json({
            success: false,
            message: "Message failed",
        });
    }
};

const UserMessgae = (req, res)=>{

}

module.exports = { message }