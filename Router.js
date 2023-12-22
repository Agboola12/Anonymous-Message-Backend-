const express = require('express');
const { register, login } = require('./controller/userController');
const { message } = require('./controller/messageController');
const rout = express.Router();

rout.post("/register", register )
rout.post("/login", login )
rout.post("/message", message )


module.exports = {rout}
