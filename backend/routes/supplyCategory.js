const router = require('express').Router();
const supplyCategoryController = require('../controllers/supplyCategoryController')
const { verifyAdmin } = require('../middleware/verifyToken')

router.post('/', verifyAdmin, supplyCategoryController.createSupplyCategory)

module.exports = router;