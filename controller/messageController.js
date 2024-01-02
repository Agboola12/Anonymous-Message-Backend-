const userMessage = require("../model/messageModel");
const userAnonymous = require("../model/userModel");


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

const getMessage = async (req, res)=>{
    const id = req.params.id;
    try{
   const user = await userAnonymous.findById({id})
   const data = await userMessage.find({userId : id})
   if(!user || !data ){
    console.log(user );
    return res.status(200).json({ 
      status: false, 
      error: " Details not found" });
  }
  return res.status(200).json({
    status: true,
     user ,
     data,
  })

} catch (error) { 
  console.error("Error fetching Artist message :", error);
  res.status(500).json({ status: false, error: "Error in getting message and user" });
}
        // .then((data) => {
        //     if (data) {
        //         res.status(200).send({
        //             status: true,
        //             message: "successful in getting users message",
        //             data
        //         })
        //     }
        // }).catch(err => {
        //     res.status(200).send({
        //         status: false,
        //         message: "No messages found for the user",
        //     })
        //     console.log("Error in getting user's message:", err);
        // })

}

module.exports = { message, getMessage }