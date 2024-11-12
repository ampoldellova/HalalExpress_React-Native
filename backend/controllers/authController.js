const User = require('../models/User')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')
const admin = require('firebase-admin')

module.exports = {
    createUser: async (req, res) => {
        const user = req.body;

        try {
            await admin.auth().getUserByEmail(user.email);

            res.status(400).json({ message: "Email is already registered" })

        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                try {
                    const userResponse = await admin.auth().createUser({
                        email: user.email,
                        password: user.password,
                        emailVerified: false,
                        disabled: false
                    })

                    console.log(userResponse.uid);

                    const newUser = new user({
                        username: user.username,
                        email: user.email,
                        password: CryptoJS.AES.encrypt(user.password, process.env.SECRET).toString,
                        uid: userResponse.uid,
                        userType: 'Client'
                    })

                    await newUser.save()

                    res.status(201).json({ status: true })
                } catch (error) {
                    res.status(500).json({ status: false, error: "Error on creating user" })
                }
            }
        }
    },
    loginUser: async (req, res) => {

    },
}