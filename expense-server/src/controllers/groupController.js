const groupDao = require("../dao/groupDao");

const groupController = {
    create: async (req,res)=>{
        try {
            const {name, description, adminEmail,membersEmail,thumbnail} = req.body;

            let allMembers = [adminEmail];
            if(membersEmail && Array.isArray(membersEmail)){
                allMembers = [...new Set([...allMembers,...membersEmail])]
            }

            const newGroup = await groupDao.createGroup({
                name,description,adminEmail,allMembers,thumbnail,paymentStatus: {
                    amount: 0,
                    currency: 'INR',
                    date: Date.now(),
                    isPaid: false
                }
            });

            res.status(200).json({
                message: 'Group created',
                groupId: newGroup._id
            })
        }
        catch{err}{
            console.log(err);
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    }
}