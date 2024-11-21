const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    foods: {
        type: Array,
    },
    pickup: {
        type: Boolean,
        required: false,
        default: true
    },
    delivery: {
        type: Boolean,
        required: false,
        default: true
    },
    owner: {
        type: String,
        required: false,
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    code: {
        type: String,
        required: false,
    },
    logoUrl: {
        type: String,
        required: true,
        default: 'https://static-00.iconduck.com/assets.00/profile-default-icon-1024x1023-4u5mrj2v.png'
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    ratingCount: {
        type: String
    },
    coords: {
        id: {
            type: String,
            required: true
        },
        latitude: {
            type: Number, required: true
        },
        longitude: {
            type: Number, required: true
        },
        latitudeDelta: {
            type: Number, required: true
        },
        longitudeDelta: {
            type: Number, required: true
        },
        address: {
            type: Number, required: true
        },
        title: {
            type: String,
            required: true
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema)