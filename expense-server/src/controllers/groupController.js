const groupDao = require("../dao/groupDao");

const groupController = {
    create: async (req,res)=>{
        try {
            const user = req.user;
            const {name, description, membersEmail,thumbnail} = req.body;

            let allMembers = [adminEmail];
            if(membersEmail && Array.isArray(membersEmail)){
                allMembers = [...new Set([...allMembers,...membersEmail])]
            }

            const newGroup = await groupDao.createGroup({
                name,description,adminEmail:user.email,allMembers,thumbnail,paymentStatus: {
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
        catch(err){
            console.log(err);
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    },
    update: async (req,res)=>{
        try {
            const { groupId, name, description, thumbnail, adminEmail, paymentStatus } = req.body;
            const updatedGroup = await groupDao.updateGroup({
                groupId, name, description, thumbnail, adminEmail, paymentStatus
            });
            res.status(200).json({
                message: 'Group updated',
                group: updatedGroup
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    },
    addMembers: async (req,res)=>{
        try {
            const { groupId, membersEmails } = req.body;
            const updatedGroup = await groupDao.addMembers(groupId, ...membersEmails);
            res.status(200).json({
                message: 'Members added',
                group: updatedGroup
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    },
    removeMembers: async (req,res)=>{
        try {
            const { membersEmails } = req.body;
            const updatedGroup = await groupDao.removeMembers(...membersEmails);
            res.status(200).json({
                message: 'Members removed',
                group: updatedGroup
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    },
    getGroupsByEmail: async (req,res)=>{
        try {
            const user = req.user;
            const groups = await groupDao.getGroupByEmail(user.email);
            res.status(200).json({
                message: 'Groups fetched',
                groups: groups
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    },
    getGroupsByStatus: async (req,res)=>{
        try {
            const { status } = req.params;
            const groups = await groupDao.getGroupByStatus(status);
            res.status(200).json({
                message: 'Groups fetched',
                groups: groups
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    }
}

module.exports = groupController;