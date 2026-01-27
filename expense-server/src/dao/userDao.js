const User = require('../model/users')
const userDao = {
    findByEmail: async (email)=>{
        const user = await User.findOne({email});
        return user;
    },
    create: async (userData)=>{
        try{
            const nweUser=new User(userData);
            return await nweUser.save();
        } catch (err) {
            if(err.code === 11000){
                const error = new Error()
                error.code = 'USER_EXIST';
                throw error;
            } else {
                console.log(err);
                const error= new Error("Something went wrong");
                error.code = 'ERROR_500';
                throw error;
            }
        }
    }
}

module.exports=userDao;