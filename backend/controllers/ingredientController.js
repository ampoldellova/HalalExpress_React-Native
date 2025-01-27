const Ingredient = require('../models/Ingredients')
const imageFile = require('../utils/imageFile')

module.exports = {
    getAllIngredients: async (req, res) => {
        try {
            const ingredients = await Ingredient.find().populate('category').populate('supplier');
            res.status(200).json(ingredients);
        } catch (error) {
            res.status(500).json({ error: "Error fetching ingredients" });
            console.log(error)
        }
    },

    addIngredient: async (req, res) => {
        try {
            const newIngredient = new Ingredient(req.body);

            await newIngredient.save();

            res.status(200).json({
                status: true,
                message: "Ingredient added successfully",
                data: newIngredient
            });
        } catch (error) {
            console.error("Error adding ingredient:", error);
            res.status(500).json({
                status: false,
                message: "Failed to add ingredient",
                error: error.message
            });
        }
    },

    getIngredientBySupplier: async (req, res) => {
        const supplierId = req.params.supplierId;

        try {
            const ingredients = await Ingredient.find({ supplier: supplierId });

            if (!ingredients || ingredients.length === 0) {
                return res.status(404).json({ status: false, message: "No ingredients found" })
            }

            res.status(200).json(ingredients)
        } catch (error) {
            res.status(500).json({ status: false, message: error.message })
        }
    },

    ingredientAvailability: async (req, res) => {
        const ingredientId = req.params.id;

        try {
            const ingredient = await Ingredient.findById(ingredientId);

            if (!ingredient) {
                return res.status(404).json({ status: false })
            }

            ingredient.isAvailable = !ingredient.isAvailable;

            await ingredient.save();

            res.status(200).json({ status: true, message: "Product availability successfully toggled" })
        } catch (error) {
            res.status(500).json({ status: false, message: "Product availability failed to toggled" })
        }
    },

    deleteIngredientById: async (req, res) => {
        const ingredientId = req.params.id;

        try {
            const ingredient = await Ingredient.findById(ingredientId);

            if (!ingredient) {
                return res.status(404).json({ status: false, message: "Product not found" })
            }

            await Ingredient.findByIdAndDelete(ingredientId)
            res.status(200).json({ status: true, message: "Product Deleted Successfully" })
        } catch (error) {
            res.status(500).json({ status: false, message: error.message })
        }
    },
}