const users = require('../dao/userDB');

const authController = {
    login: (req,res)=>{
        
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({
            message: "Please enter email and password"
        })
    }
    const user = users.find(u=>u.email==email&&u.password==password)
    if (!user){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    else{
        res.status(200).json({
            message: `Welcome back, ${user.username}`
        })
    }

    },
    register: (req,res)=>{
        
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ 
            message: 'Please provide username, email, and password' 
        });
    }

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ 
            message: `user already exists with email: ${email}` 
        });
    }
    const newUser = {
        id: users.length+1,
        username: username,
        email: email,
        password: password
    }
    users.push(newUser);

    console.log('New user registration:', { username, email });
    console.log('All users:', users);

    res.status(201).json({ 
        message: 'User registered successfully',
        user: { id: newUser.id, username, email }
    });

    }
};

module.exports=authController;