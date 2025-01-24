const router = require('express').Router();
const supplyCategoryController = require('../controllers/supplyCategoryController')
const { verifyAdmin, verifyVendor } = require('../middleware/verifyToken')

router.post('/', verifyAdmin, supplyCategoryController.createSupplyCategory)
router.get('/', verifyVendor, supplyCategoryController.getSupplyCategories)

module.exports = router;