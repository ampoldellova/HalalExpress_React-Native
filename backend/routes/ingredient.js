const router = require('express').Router();
const ingredientController = require('../controllers/ingredientController')
const { verifySupplier, verifyVendor } = require('../middleware/verifyToken')
const upload = require('../utils/multer')

router.post('/', verifySupplier, upload.single('imageUrl'), ingredientController.addIngredient)
router.get('/list', verifyVendor, upload.single('imageUrl'), ingredientController.getAllIngredients)

module.exports = router; 