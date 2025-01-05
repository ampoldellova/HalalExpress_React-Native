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
        public_id: {
            type: String,
            default: 'HalalExpress/Profile/profile_nsvdbb'
        },
        url: {
            type: String,
            default: 'https://res.cloudinary.com/dwkmutbz3/image/upload/v1736011952/HalalExpress/Profile/profile_nsvdbb.png'
        },
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
        public_id: {
            type: String,
            default: 'HalalExpress/Profile/profile_nsvdbb'
        },
        url: {
            type: String,
            default: 'https://res.cloudinary.com/dwkmutbz3/image/upload/v1736011952/HalalExpress/Profile/profile_nsvdbb.png'
        },
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