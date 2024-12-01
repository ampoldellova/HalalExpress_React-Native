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
        type: String,
        required: true
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
        autopopulate: true,
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
        type: String,
        required: true,
    }
});

foodSchema.plugin(populate);
module.exports = mongoose.model('Food', foodSchema);
