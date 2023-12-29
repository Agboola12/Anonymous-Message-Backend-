const userMessage = require("../model/messageModel");


// Registering User
const message = async (req, res) => {
    const {userId, message  } = req.body;
    try {
        const newUser = await userMessage.create({ userId,message });

        return res.status(200).json({
            status: true,
            message: "Message Sent successful",
            data: newUser,
        });
    } catch (error) {
        console.error(error);
        return res.status(200).json({
            status: false,
            message: "Message failed",
        });
    }
};

const getMessage = (req, res)=>{
    const id = req.params.id;
    // console.log(id);
    userMessage.find({userId : id})
        .then(data => {
            if (data) {
                console.log(data);
                res.status(200).send({
                    status: true,
                    message: "successful in getting users message",
                    data
                })
            }
        }).catch(err => {
            res.status(200).send({
                status: false,
                message: "No messages found for the user",
            })
            console.log("Error in getting user's message:", err);
        })

}

module.exports = { message, getMessage }