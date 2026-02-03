const userDao = require('../dao/userDao');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library');
const emailService = require('../services/emailService');
const { validationResult } = require('express-validator');

const authController = {
    login: async (req,res)=>{
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const {email,password} = req.body;
            const user = await userDao.findByEmail(email);
            if (!user) {
                return res.status(400).json({
                    message: "Invalid email or password"
                })
            }
            if(user.googleId){
                res.status(400).json({
                    message: `Login using google sso`,
                });
            } else {
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
            }
        } catch (error) {
            console.error("Login error:", error);
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    },
    register: async (req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { name, email, password } = req.body;

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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        res.status(200).json({
            message: "Verified",
            user: req.user
        });
    },
    isUserLoggedIn: async (request, response) => {
        try {
            const token = request.cookies?.jwtToken;

            if (!token) {
                return response.status(401).json({
                    message: 'Unauthorized access'
                });
            }

            jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
                if (error) {
                    return response.status(401).json({
                        message: 'Invalid token'
                    });
                } else {
                    response.json({
                        user: user
                    });
                }
            });
        } catch (error) {
            console.log(error);
            return response.status(500).json({
                message: 'Internal server error'
            });
        }
    },

    logout: async (request, response) => {
        try {
            response.clearCookie('jwtToken');
            response.json({ message: 'Logout successfull' });
        } catch (error) {
            console.log(error);
            return response.status(500).json({
                message: 'Internal server error'
            });
        }
    },
    googleSso: async (req,res) => {
        try{
            const {idToken}= req.body;
            if(!idToken){
                res.status(401).json({message: 'Invalid Request'});
            }
            const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
            const googleRes = googleClient.verifyIdToken({
                idToken,
                audience: process.env.GOOGLE_CLIENT_ID
            });

            const payload = (await googleRes).getPayload();
            const {sub:googleId,name,email} = payload;

            let user = await userDao.findByEmail(email);
            if(!user){
                user = await userDao.create({
                    name: name,
                    email: email,
                    googleId: googleId
                });
            }
            else{
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
                    message: `Welcome backkk, ${user.name}`,
                    user: user
                });
            }
        } catch (err){
            return res.status(500).json({
                message: 'internal Server Error'
            });
        }
    },
    resetPassword: async (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email } = req.body;
        try {
            const user = await userDao.findByEmail(email);
            if (!user) {
                return res.status(400).json({ 
                    message: 'User with this email does not exist' 
                });
            } 
            const resetToken = jwt.sign({
                id: user._id,
                email: user.email
            }, process.env.JWT_SECRET, {expiresIn: '15m'});
            const resetLink = `http://localhost:5001/auth/reset-password/${resetToken}`;
            await emailService.send(user.email, 'Password Reset', `Click here to reset your password: ${resetLink}`);
            console.log(`Password reset link (send this via email): ${resetLink}`);
            res.status(200).json({ 
                message: 'Password reset link has been sent to your email' 
            });
        } catch (err){
            console.log(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    
};

module.exports=authController;