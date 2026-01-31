const userDao = require('../dao/userDao');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const authController = {
    login: async (req,res)=>{
        try {
            const {email,password} = req.body;
            if(!email || !password){
                return res.status(400).json({
                    message: "Please enter email and password"
                })
            }

            const user = await userDao.findByEmail(email);
            if (!user) {
                return res.status(400).json({
                    message: "Invalid email or password"
                })
            }
            const isMatch = await bcrypt.compare(password,user.password)
            if (isMatch){
                const token = jwt.sign({
                    name:user.name,
                    email: user.email,
                    id: user._id
                }, process.env.JWT_SECRET, {expiresIn: '1h'});
                res.cookie('jwtToken', token, {
                    httpOnly: true,
                    secure: true,
                    domain: 'localhost',
                    path: '/'
                });
                res.status(200).json({
                    message: `Welcome back, ${user.name}`,
                    user: user
                });
            }
            else{
                return res.status(400).json({
                    message: "Invalid email or password"
                })
            }
        } catch (error) {
            console.error("Login error:", error);
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    },
    register: async (req,res)=>{
        
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ 
                message: 'Please provide name, email, and password' 
            });
        }

        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt);
            const user = await userDao.create({
                name: name,
                email: email,
                password: hashedPassword
            });

            res.status(201).json({ 
                message: 'User registered successfully',
                user: { id: user._id,}
            });
        } catch (err) {
            if(err.code === 'USER_EXIST'){
                res.status(400).json({
                    message: 'User with the email already exists'
                })
            }
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    verify: (req, res) => {
        res.status(200).json({
            message: "Verified",
            user: req.user
        });
    },
    logout: (req, res) => {
        res.clearCookie('jwtToken', {
            httpOnly: true,
            secure: true,
            domain: 'localhost',
            path: '/'
        });
        res.status(200).json({ message: 'Logged out successfully' });
    }
};

module.exports=authController;