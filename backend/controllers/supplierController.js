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

    getSupplierStoreByOwner: async (req, res) => {
        const { ownerId } = req.params;
        try {
            const supplierStores = await Supplier.find({ owner: ownerId });

            if (!supplierStores.length) {
                return res.status(404).json({ status: false, message: "No Store of Supplier found for this owner" });
            }

            res.status(200).json({ status: true, data: supplierStores });
        } catch (error) {
            res.status(500).json({ status: false, message: "Error fetching Store by owner", error: error.message });
        }
    }
}