const express = require('express');
const { register, login, getUser, getUserMessage } = require('./controller/userController');
const { message, getMessage } = require('./controller/messageController');
const { verifyUser } = require('./middleware/authMiddleware');
const rout = express.Router();

// user 
rout.post("/register", register )
rout.post("/login", login )
rout.get("/getUser",verifyUser, getUser)
rout.get("/getUserMessage/:id", getUserMessage)

// message 
rout.post("/message", message )
rout.get("/getMessage/:id", getMessage )



module.exports = {rout}
