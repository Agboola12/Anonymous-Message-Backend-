const userAnonymous = require("../model/userModel");

// Registering User
const register = async (req, res) => {  
    console.log(req.body);
    const { username, email, password } = req.body;

    try {
        const alreadyExists = await userAnonymous.findOne({ email });

        if (alreadyExists) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }

        const newUser = await userAnonymous.create({ username, email, password });

        return res.status(200).json({
            success: true,
            message: "User registration successful",
            data: newUser,
        });
    } catch (error) {
        console.error(error);
        return res.status(200).json({
            success: false,
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
                        res.json({
                            token,
                            success: true,
                            message: " login successful",
                            data: { email: req.body.email }
                        })
                    }
                    else {
                        res.status(200).json({
                            success: false,
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
                    success: false,
                    message: "email does not match "
                })
            }
        }).catch(err => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: err
                })
                console.log(err);
            }
        })

}

module.exports = { register, login };
