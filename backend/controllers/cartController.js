const Cart = require('../models/Cart')

module.exports = {
    addProductToCart: async (req, res) => {
        const userId = req.user.id;
        const { productId, totalPrice, quantity } = req.body;

        let count;

        try {
            const existingProduct = await Cart.findOne({ userId, productId })
        } catch (error) {

        }

    },
    removeProductFromCart: async (req, res) => {

    },
    fetchUserCart: async (req, res) => {

    },
    clearUserCart: async (req, res) => {

    },
    getCartCount: async (req, res) => {

    },
    decrementProductQuantity: async (req, res) => {

    },
};