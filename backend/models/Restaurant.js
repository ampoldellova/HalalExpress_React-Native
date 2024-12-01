const mongoose = require('mongoose')
const populate = require("mongoose-autopopulate");

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
    foods: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food',
            required: true,
            autopopulate: true,
        }
    ],
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        autopopulate: true,
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
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        },
        latitudeDelta: {
            type: Number,
            required: true,
            default: 0.0122
        },
        longitudeDelta: {
            type: Number,
            required: true,
            default: 0.0221
        },
        address: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        }
    }
}, { timestamps: true });

restaurantSchema.plugin(populate);
module.exports = mongoose.model('Restaurant', restaurantSchema)