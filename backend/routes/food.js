const router = require('express').Router();
const foodController = require('../controllers/foodController')
const { verifyAndAuthorization, verifyVendor } = require('../middleware/verifyToken')

router.post('/', verifyVendor, foodController.addFood)
router.get('/:id', foodController.getFoodById)
router.post('/restaurant/:id', foodController.getFoodByRestaurant)
router.post('/', verifyVendor, foodController.deleteFoodById)
router.post('/', verifyVendor, foodController.foodAvailability)

module.exports = router; a