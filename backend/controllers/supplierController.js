const Supplier = require('../models/Supplier');
const imageFile = require('../utils/imageFile')

module.exports = {
    addSupplier: async (req, res) => {
        const newSupplier = new Supplier(req.body)

        try {
            await newSupplier.save()
            res.status(201).json({ status: true, message: "Supplier Created Successfully" })
        } catch (error) {
            res.status(500).json({ status: false, message: "Error Creating Restaurant", error: error.message })
        }
    },
}