const express = require('express');
const { register, login, getUser } = require('./controller/userController');
const { message } = require('./controller/messageController');
const { verifyUser } = require('./middleware/authMiddleware');
const rout = express.Router();

rout.post("/register", register )
rout.post("/login", login )
rout.post("/message", message )
rout.get("/getUser",verifyUser, getUser)



module.exports = {rout}
