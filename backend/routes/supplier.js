const router = require('express').Router();
const supplierController = require('../controllers/supplierController')
const upload = require('../utils/multer');
const { verifyAndAuthorization, verifySupplier } = require('../middleware/verifyToken')

router.post('/', verifySupplier, supplierController.addSupplier);
router.get('/owner/:ownerId', supplierController.getSupplierStoreByOwner);

module.exports = router;