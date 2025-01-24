const router = require('express').Router();
const supplierController = require('../controllers/supplierController')
const upload = require('../utils/multer');
const { verifyAndAuthorization, verifySupplier, verifyVendor } = require('../middleware/verifyToken')

router.post('/', verifySupplier, supplierController.addSupplier);
router.get('/owner/:ownerId', verifySupplier, supplierController.getSupplierStoreByOwner);
router.get('/list', verifyVendor, supplierController.getAllSuppliers);

module.exports = router;