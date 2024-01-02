const userAnonymous = require("../model/userModel");
const { compare } = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");


// Registering User
const register = async (req, res) => {  
    console.log(req.body);
    const { username, email, password } = req.body;

    try {
        const alreadyExists = await userAnonymous.findOne({ email });

        if (alreadyExists) {
            return res.status(200).json({
                status: false,
                message: "Email already exists",
            });
        }

        const newUser = await userAnonymous.create({ username, email, password });

        return res.status(200).json({
            status: true,
            message: "User registration successful",
            data: newUser,
        });
    } catch (error) {
        console.error(error);
        return res.status(200).json({
            status: false,
            message: "Registration failed",
        });
    }
};

// Login User

const login = (req, res) => {
    const { email, password } = req.body;
    userAnonymous.findOne({ email }).select("+password").exec()
        .then(async data => {
            if (data) {
                try {
                    const validPassword = await compare(password, data.password)
                    if (validPassword) {
                        // jsonwebtoken
                        const token = jwt.sign({
                            email: data.email,
                            _id: data._id
                        },
                                process.env.JWT_SECRET,
                            
                            { expiresIn: "12h" }
                        )
                        data.password = "";
                        res.status(200).json({
                            token,
                            status: true,
                            message: " login successful",
                            data: { email: req.body.email }
                        })
                    }
                    else {
                        res.status(200).json({
                            status: false,
                            message: "email or password is not correct"
                        })
                    }
                }
                catch (error) {
                    res.send(error)
                    console.log(error);
                }
            }
            else {
                res.status(200).json({
                    status: false,
                    message: "email does not match "
                })
            }
        }).catch(err => {
            if (err) {
                res.status(500).json({
                    status: false,
                    message: err
                })
                console.log(err);
            }
        })
}

const getUser = async (req, res) => {
    let data = await jwt.verify(req.headers.authorization, process.env.JWT_SECRET);

    if (!data) {
        res.send({ message: "Invalid token", status: false })
    } else {
        userAnonymous.findById(data._id)
            .then(data => {
                res.status(200).json({
                    status: true,
                    data,
                    message: "User profile fetched"
                })
            })
            .catch(err => {
                res.status(200).json({
                    status: false,
                    message: "An error occurres when fetching user profile"
                })
                console.log(err, "Problem getting user");
            })
    }
}

const getUserMessage = (req, res)=>{
    const id = req.params.id;
    // console.log(id);
    userAnonymous.findById({ id})
        .then(data => {
            if (data) {
                // console.log(data);
                res.status(200).send({
                    status: true,
                    message: "successful in getting users ",
                    data
                })
            }
        }).catch(err => {
            res.status(200).send({
                status: false,
                message: "No details found for the user",
            })
            console.log("Error in getting user:", err);
        })

}



module.exports = { register, login, getUser, getUserMessage };
