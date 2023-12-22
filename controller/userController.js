const { compare } = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../model/foodModel");
const AddFood = require("../model/addFoodModel");
const {handleUpload} =require('../upload')

// Registering User
const register =async (req, res) => {
    const cldRes = await handleUpload(req);

  
    const { firstname, lastname, email, password, phonenumber, address } = req.body;
    const alReadyexist= await User.findOne({email});
    if (alReadyexist){
       return res.status(200).json({
            message:"email already exist",
            success:false
        })
    }
    User.create({ firstname, lastname, email, password, phonenumber, address, imageLink: cldRes?.secure_url })
        .then(data => {
            res.status(200).json({
                success: true,
                message: "User registration successful",
                // data

            })
        }).catch(err => {
            res.status(400).json({
                success: false,
                message: "An error"
            })
            console.log(err, "wahala o");
        })
}