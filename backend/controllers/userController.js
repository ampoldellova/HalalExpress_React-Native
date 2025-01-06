const User = require('../models/User')
const imageFile = require('../utils/imageFile')

module.exports = {
    getUser: async (req, res) => {
        const userId = req.user.id

        try {
            const user = await User.findById({ _id: userId }, { password: 0, _v: 0, createdAt: 0, updatedAt: 0 })
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving user', error: error.message })
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const userId = req.user.id;
            const users = await User.find({ _id: { $ne: userId } });
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: "Error fetching users" });
        }
    },


    deleteUser: async (req, res) => {
        const userId = req.user.id

        try {
            await User.findByIdAndDelete(userId)
            res.status(200).json({ status: true, message: "User Deleted Successfully!" })
        } catch (error) {
            res.status(500).json({ message: 'Error Deleting User' })
        }
    },

    updateUser: async (req, res) => {
        try {
            if (req.file) {
                req.body.profile = await imageFile.uploadSingle({
                    imageFiles: req.file,
                    request: req,
                });
                await User.findByIdAndUpdate(
                    req.params.id,
                    {
                        name: req.body.name,
                        email: req.body.email,
                        profile: req.body.profile,
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
                res.status(201).json({ success: true, message: "User is Updated" });
            } else {
                await User.findByIdAndUpdate(req.params.id, req.body, {
                    new: true,
                    runValidators: true,
                });
                res.status(201).json({ success: true, message: "User is Updated" });
            }
        } catch (err) {
            console.log(err);
        }
        // const userId = req.user.id

        // try {
        //     const updatedUser = await User.findByIdAndUpdate(userId, {
        //         $set: req.body
        //     }, { new: true })
        //     res.status(200).json({ status: true, message: "User Updated Successfully!" })
        // } catch (error) {
        //     res.status(500).json({ message: 'Error Updating User' })
        // }
    }
}