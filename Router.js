const express = require('express');
const { register, login, getUser } = require('./controller/userController');
const { message } = require('./controller/messageController');
const { verifyUser } = require('./middleware/authMiddleware');
const rout = express.Router();

// user 
rout.post("/register", register )
rout.post("/login", login )
rout.get("/getUser",verifyUser, getUser)

// message 
rout.post("/message", message )
rout.get("/getMessage", get )



module.exports = {rout}
