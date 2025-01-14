const mongoose = require('mongoose');
const populate = require("mongoose-autopopulate");

const foodSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    foodTags: {
        type: Array,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
        // autopopulate: true,
    },
    code: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        required: true,
        default: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
        // autopopulate: { select: 'title' },
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5
    },
    ratingCount: {
        type: String
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    additives: [{
        id: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
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
});

foodSchema.plugin(populate);
module.exports = mongoose.model('Food', foodSchema);
