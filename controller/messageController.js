const userMessage = require("../model/messageModel");


// Registering User
const message = async (req, res) => {
    console.log(req.body);
    const {userId, message  } = req.body;
    try {
        const newUser = await userMessage.create({ userId,message });

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

const getMessage = (req, res)=>{
    const id = req.params.id;
    userMessage.find({userId : id})
        .then(data => {
            if (data) {
                console.log(data);
                res.status(200).send({
                    success: true,
                    message: "successful in getting users message",
                    data
                })
            }
        }).catch(err => {
            res.status(500).send({
                success: false,
                message: "not successful in getting users message",
            })

            
        })

}

module.exports = { message, getMessage }