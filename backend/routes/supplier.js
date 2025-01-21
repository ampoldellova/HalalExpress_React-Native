const router = require('express').Router();
const supplierController = require('../controllers/supplierController')
const upload = require('../utils/multer');
const { verifyAndAuthorization, verifySupplier } = require('../middleware/verifyToken')

router.post('/:id', verifySupplier, upload.fields([{ name: 'imageUrl', maxCount: 1 }, { name: 'logoUrl', maxCount: 1 }]), supplierController.addSupplier);

module.exports = router;