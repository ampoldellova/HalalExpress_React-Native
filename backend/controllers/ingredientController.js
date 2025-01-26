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
}