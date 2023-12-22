const express = require('express');
const { register, login } = require('./controller/userController');
const rout = express.Router();

rout.post("/register", register )
rout.post("/login", login )


module.exports = {rout}
