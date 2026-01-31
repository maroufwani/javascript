const jwt = require('jsonwebtoken');

const authMiddleware = {
    protect: async (req,res,next)=>{
        try {
            const token = req.cookies?.jwtToken;
            if(!token){
                res.status(401).json({
                    message: 'User Unauthorised'
                });
            }
            try {
                const user = jwt.verify(token,process.env.JWT_SECRET);
                req.user = user;
                next();
            } catch (err){
                res.status(401).json({
                    message: 'User Unauthorised'
                });
            }
        } catch(err){
            console.log(err);
            res.status(500).json({
                message: 'Internal Server Error'
            })
        }
    },
}

module.exports = authMiddleware;