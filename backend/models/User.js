const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    uid: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: Array,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    userType: {
        type: String,
        required: true,
        default: "Client",
        enum: ['Admin', 'Supplier', 'Vendor', 'Client']
    },
    profile: {
        type: String,
        required: true,
        default: 'https://static-00.iconduck.com/assets.00/profile-default-icon-1024x1023-4u5mrj2v.png'
    }

}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema)